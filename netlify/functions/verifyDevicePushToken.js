const { createClient } = require('@supabase/supabase-js');
const admin = require('firebase-admin');
const crypto = require('crypto');

const {
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  GOOGLE_SERVICE_ACCOUNT_KEY,
  REPORT_KEY,
} = process.env;

function sha256(s) {
  return crypto.createHash('sha256').update(String(s)).digest('hex');
}

function json(status, body) {
  return {
    statusCode: status,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

function getSupabase() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SERVER_MISCONFIG: Supabase env missing');
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });
}

function getAdmin() {
  if (admin.apps.length) return admin.app();
  if (!GOOGLE_SERVICE_ACCOUNT_KEY)
    throw new Error('SERVER_MISCONFIG: GOOGLE_SERVICE_ACCOUNT_KEY missing');
  const sa = JSON.parse(GOOGLE_SERVICE_ACCOUNT_KEY);
  sa.private_key = sa.private_key.replace(/\\n/g, '\n');
  return admin.initializeApp({
    credential: admin.credential.cert(sa),
    projectId: sa.project_id,
  });
}

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST')
      return json(405, { error: 'Method not allowed' });

    // API key opcional
    const apiKey = event.headers['x-report-key'];
    if (REPORT_KEY && apiKey !== REPORT_KEY)
      return json(401, { error: 'Unauthorized' });

    const {
      unique_id,
      token,
      repair = false,
      probe = false,
    } = JSON.parse(event.body || '{}') || {};
    if (!unique_id) return json(400, { error: 'unique_id required' });

    const supabase = getSupabase();
    const adminApp = getAdmin();
    const adminProjectId = adminApp.options.projectId;

    // 1) Resolver device
    const { data: dev, error: dErr } = await supabase
      .from('devices')
      .select('id, unique_id, updated_at')
      .eq('unique_id', unique_id)
      .maybeSingle();

    if (dErr) return json(500, { error: `DB device error: ${dErr.message}` });
    if (!dev) return json(404, { status: 'NO_DEVICE', unique_id });

    // 2) Leer tokens del device (último primero)
    const { data: tokens, error: tErr } = await supabase
      .from('device_push_tokens')
      .select(
        'id, push_token, fcm_project_id, updated_at, last_pushed_at, last_push_status'
      )
      .eq('device_id', dev.id)
      .order('updated_at', { ascending: false })
      .limit(5);

    if (tErr) return json(500, { error: `DB token error: ${tErr.message}` });

    const primary = tokens?.[0] || null;
    const dbToken = primary?.push_token || null;
    const dbProj = primary?.fcm_project_id || null;

    // 3) Comparaciones
    const clientHash = token ? sha256(token) : null;
    const dbHash = dbToken ? sha256(dbToken) : null;

    // 4) Opcional: probar validez con FCM (dryRun)
    let probeDbValid = null;
    let probeClientValid = null;
    if (probe) {
      const messaging = admin.messaging(adminApp);
      const tryProbe = async (t) => {
        try {
          await messaging.send(
            { token: t, data: { ping: '1' } },
            /*dryRun*/ true
          );
          return true;
        } catch (e) {
          return false;
        }
      };
      if (dbToken) probeDbValid = await tryProbe(dbToken);
      if (token) probeClientValid = await tryProbe(token);
    }

    // 5) Decisión + reparación opcional
    // a) Sin token en DB
    if (!dbToken) {
      if (!token) {
        return json(200, {
          status: 'NO_TOKEN_IN_DB',
          device_id: dev.id,
          db_token_hash: null,
          client_token_hash: null,
          project_ids: { adminProjectId, db: dbProj || null },
          probe_valid_db: probeDbValid,
          probe_valid_client: probeClientValid,
        });
      }

      if (repair) {
        // Limpia duplicados por si acaso y sube el nuevo
        await supabase
          .from('device_push_tokens')
          .delete()
          .eq('device_id', dev.id);
        const { error: upErr } = await supabase
          .from('device_push_tokens')
          .insert([
            {
              device_id: dev.id,
              push_token: token,
              fcm_project_id: adminProjectId,
              last_push_status: 'verified',
              last_pushed_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ]);
        if (upErr)
          return json(500, { error: `DB upsert error: ${upErr.message}` });
        return json(200, {
          status: 'UPDATED',
          device_id: dev.id,
          db_token_hash: sha256(token),
          client_token_hash: clientHash,
          project_ids: { adminProjectId, db: adminProjectId },
          probe_valid_client: probeClientValid,
        });
      }

      return json(200, {
        status: 'NO_TOKEN_IN_DB',
        device_id: dev.id,
        db_token_hash: null,
        client_token_hash: clientHash,
        project_ids: { adminProjectId, db: null },
        probe_valid_client: probeClientValid,
      });
    }

    // b) Hay múltiples → resolver si repair
    if (tokens.length > 1 && repair) {
      // Conserva el más reciente válido (si probe habilitado) o el más reciente
      let keepId = primary.id;
      if (probe && probeDbValid === false) {
        // si el primero es inválido, busca alguno válido
        for (const t of tokens) {
          const ok = await (async () => {
            try {
              await admin
                .messaging(adminApp)
                .send({ token: t.push_token, data: { ping: '1' } }, true);
              return true;
            } catch {
              return false;
            }
          })();
          if (ok) {
            keepId = t.id;
            break;
          }
        }
      }
      await supabase
        .from('device_push_tokens')
        .delete()
        .eq('device_id', dev.id)
        .neq('id', keepId);
      // recarga primary
    }

    // c) Con token en DB, comparar contra el del cliente si vino
    if (token) {
      if (token === dbToken) {
        return json(200, {
          status: 'MATCH',
          device_id: dev.id,
          db_token_hash: dbHash,
          client_token_hash: clientHash,
          project_ids: { adminProjectId, db: dbProj },
          probe_valid_db: probeDbValid,
          probe_valid_client: probeClientValid,
        });
      }

      // mismatch
      if (repair) {
        // Reemplaza el token por el del cliente
        await supabase
          .from('device_push_tokens')
          .delete()
          .eq('device_id', dev.id);
        const { error: upErr } = await supabase
          .from('device_push_tokens')
          .insert([
            {
              device_id: dev.id,
              push_token: token,
              fcm_project_id: adminProjectId,
              last_push_status: 'verified',
              last_pushed_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ]);
        if (upErr)
          return json(500, { error: `DB upsert error: ${upErr.message}` });

        return json(200, {
          status: 'UPDATED',
          device_id: dev.id,
          previous_db_token_hash: dbHash,
          db_token_hash: sha256(token),
          client_token_hash: clientHash,
          project_ids: { adminProjectId, db: adminProjectId },
          probe_valid_client: probeClientValid,
        });
      }

      return json(200, {
        status: 'MISMATCH',
        device_id: dev.id,
        db_token_hash: dbHash,
        client_token_hash: clientHash,
        project_ids: { adminProjectId, db: dbProj },
        probe_valid_db: probeDbValid,
        probe_valid_client: probeClientValid,
      });
    }

    // d) No vino token del cliente: solo informe del DB
    return json(200, {
      status: tokens.length > 1 ? 'MULTIPLE_TOKENS_RESOLVED' : 'MATCH_DB_ONLY',
      device_id: dev.id,
      db_token_hash: dbHash,
      client_token_hash: null,
      project_ids: { adminProjectId, db: dbProj },
      probe_valid_db: probeDbValid,
    });
  } catch (err) {
    console.error('verifyDevicePushToken error', err);
    const msg = String(err?.message || '');
    if (msg.startsWith('SERVER_MISCONFIG')) {
      return json(500, {
        error: 'Server misconfigured',
        code: 'SERVER_MISCONFIG',
      });
    }
    return json(500, { error: 'Internal error' });
  }
};
