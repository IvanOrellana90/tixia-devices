const { createClient } = require('@supabase/supabase-js');

const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, REPORT_KEY } = process.env;

const json = (status, body) => ({
  statusCode: status,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

function getSupabase() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SERVER_MISCONFIG');
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });
}

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST')
      return json(405, { error: 'Method not allowed' });

    // API key opcional
    const key = event.headers['x-report-key'];
    if (REPORT_KEY && key !== REPORT_KEY)
      return json(401, { error: 'Unauthorized' });

    const body = JSON.parse(event.body || '{}');
    const unique_id = body.unique_id;
    const token = body.token || '';
    const repair = body.repair !== false; // default true

    if (!unique_id) return json(400, { error: 'unique_id required' });

    const supabase = getSupabase();

    // 1) device por unique_id
    const { data: dev, error: dErr } = await supabase
      .from('devices')
      .select('id')
      .eq('unique_id', unique_id)
      .maybeSingle();

    if (dErr) return json(500, { error: `DB device error: ${dErr.message}` });
    if (!dev) return json(404, { status: 'NO_DEVICE', healthy: false });

    const deviceId = dev.id;

    // 2) token actual en DB (más reciente)
    // usamos order by id desc para no depender de columnas extra
    const { data: dbTok, error: tErr } = await supabase
      .from('device_push_tokens')
      .select('id, push_token')
      .eq('device_id', deviceId)
      .order('id', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (tErr) return json(500, { error: `DB token error: ${tErr.message}` });

    const dbToken = dbTok?.push_token || '';

    // 3) decisión simple
    if (!dbToken) {
      if (token && repair) {
        // inserta nuevo
        const { error: insErr } = await supabase
          .from('device_push_tokens')
          .insert([{ device_id: deviceId, push_token: token }]);
        if (insErr)
          return json(500, { error: `DB insert error: ${insErr.message}` });
        return json(200, { status: 'UPDATED', healthy: true });
      }
      return json(200, { status: 'MISSING_DB', healthy: false });
    }

    // hay dbToken
    if (!token) {
      // solo check de existencia en DB
      return json(200, { status: 'MATCH_DB_ONLY', healthy: true });
    }

    if (token === dbToken) {
      return json(200, { status: 'MATCH', healthy: true });
    }

    // mismatch
    if (repair) {
      // reemplaza: borra e inserta
      const { error: delErr } = await supabase
        .from('device_push_tokens')
        .delete()
        .eq('device_id', deviceId);
      if (delErr)
        return json(500, { error: `DB replace del error: ${delErr.message}` });

      const { error: insErr } = await supabase
        .from('device_push_tokens')
        .insert([{ device_id: deviceId, push_token: token }]);
      if (insErr)
        return json(500, { error: `DB replace ins error: ${insErr.message}` });

      return json(200, { status: 'UPDATED', healthy: true });
    }

    return json(200, { status: 'MISMATCH', healthy: false });
  } catch (e) {
    console.error('verifyDevicePushTokenSimple error', e);
    const msg = String(e?.message || '');
    if (msg === 'SERVER_MISCONFIG') {
      return json(500, { error: 'Server misconfigured' });
    }
    return json(500, { error: 'Internal error', details: String(e) });
  }
};
