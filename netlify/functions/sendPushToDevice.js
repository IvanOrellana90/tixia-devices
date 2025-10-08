// netlify/functions/sendPushToDevice.js
const { createClient } = require('@supabase/supabase-js');
const admin = require('firebase-admin');
const serviceAccount = require('../config/gsa.json');

const { SUPABASE_URL, SUPABASE_ANON_KEY } = process.env;

// ---- Firebase Admin ----
const initializeFirebase = () => {
  if (admin.apps.length) return admin.app();
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: serviceAccount.project_id,
  });
};

const json = (status, body) => ({
  statusCode: status,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST')
    return json(405, { error: 'Method not allowed' });

  // Supabase client (service role preferido)
  const supabaseKey = SUPABASE_ANON_KEY;
  if (!SUPABASE_URL || !supabaseKey)
    return json(500, { error: 'Supabase env missing' });
  const supabase = createClient(SUPABASE_URL, supabaseKey, {
    auth: { persistSession: false },
  });

  let deviceId; // accesible en catch
  try {
    const app = initializeFirebase();

    const { device_id, unique_id, title, body, data } = JSON.parse(
      event.body || '{}'
    );
    if (!device_id && !unique_id)
      return json(400, { error: 'device_id o unique_id requerido' });

    // 1) Resolver device por id o por unique_id (en "devices")
    if (device_id) {
      deviceId = Number(device_id);
    } else {
      const { data: dev, error: dErr } = await supabase
        .from('devices')
        .select('id')
        .eq('unique_id', unique_id)
        .order('updated_at', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false, nullsFirst: false })
        .limit(1)
        .maybeSingle();

      if (dErr)
        return json(500, { error: `Error buscando device: ${dErr.message}` });
      if (!dev)
        return json(404, { error: 'Device no encontrado para ese unique_id' });
      deviceId = dev.id;
    }

    // 2) Obtener push token
    const { data: tok, error: tErr } = await supabase
      .from('device_push_tokens')
      .select('push_token')
      .eq('device_id', deviceId)
      .maybeSingle();

    if (tErr)
      return json(500, { error: `Error leyendo token: ${tErr.message}` });
    if (!tok?.push_token)
      return json(404, { error: 'Sin push token para el device' });

    // 3) Enviar push
    const msg = {
      token: tok.push_token,
      // NOTA: Para data-only messages, NO uses notification payload
      data: {
        action: 'updateConfig',
        device_id: String(deviceId),
        unique_id: unique_id || '',
        timestamp: Date.now().toString(),
        click_action: 'UPDATE_CONFIG',
        priority: 'high',
      },
      android: {
        priority: 'high',
      },
      apns: {
        payload: {
          aps: {
            sound: 'default',
            contentAvailable: true,
            category: 'UPDATE_CONFIG',
            // Importante para iOS
            'mutable-content': 1,
          },
        },
        headers: {
          'apns-priority': '10',
          'apns-push-type': 'background',
        },
      },
      // Configuración importante para FCM
      fcmOptions: {
        analyticsLabel: 'config_update',
      },
    };

    // obtener una diferencia de 10 segundos para validar que recibio el equipo

    const now = new Date();
    const tenSecondsAgo = new Date(now.getTime() - 10 * 1000);
    const isoString = tenSecondsAgo.toISOString();

    const messageId = await admin.messaging(app).send(msg);
    console.log('FCM message ID:', messageId);

    // 4) Actualizar estado del token
    await supabase
      .from('device_push_tokens')
      .update({
        last_pushed_at: isoString,
        last_push_status: 'success',
      })
      .eq('device_id', deviceId);

    return json(200, { ok: true, messageId, deviceId });
  } catch (error) {
    console.error('Push error:', error);

    // Token inválido/no registrado → eliminar fila y pedir regen
    const code = error?.code || '';
    if (
      code === 'messaging/registration-token-not-registered' ||
      code === 'messaging/invalid-registration-token'
    ) {
      try {
        const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
          auth: { persistSession: false },
        });
        if (deviceId) {
          await supabase
            .from('device_push_tokens')
            .delete()
            .eq('device_id', deviceId);
        }
      } catch (dbErr) {
        console.error('Failed to remove invalid token:', dbErr);
      }
      return json(410, {
        error: 'Invalid token removed',
        action: 'regenerate_token',
      });
    }

    return json(500, { error: error.message || 'Internal server error' });
  }
};
