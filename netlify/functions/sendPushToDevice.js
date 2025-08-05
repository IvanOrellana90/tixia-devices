// sendPushToDevice.js
const { createClient } = require('@supabase/supabase-js');
const fetch = require('node-fetch');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
); // Usa SERVICE_KEY para bypass RLS
const FCM_SERVER_KEY = process.env.FCM_SERVER_KEY; // tu clave de servidor FCM

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Metodo no permitido' };
  }

  const { device_id, title, body } = JSON.parse(event.body);

  if (!device_id || !title || !body) {
    return { statusCode: 400, body: 'device_id, title y body requeridos' };
  }

  // 1. Buscar el token push en device_push_tokens
  const { data, error } = await supabase
    .from('device_push_tokens')
    .select('push_token')
    .eq('device_id', device_id)
    .maybeSingle();

  if (error || !data) {
    return { statusCode: 404, body: 'No push token found for device' };
  }

  // 2. Enviar push a FCM
  const pushToken = data.push_token;
  const fcmMessage = {
    to: pushToken,
    notification: {
      title,
      body,
    },
    data: {
      type: 'custom',
      ts: Date.now(),
    },
  };

  const fcmRes = await fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'POST',
    headers: {
      Authorization: `key=${FCM_SERVER_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(fcmMessage),
  });

  const fcmResult = await fcmRes.json();
  return { statusCode: 200, body: JSON.stringify(fcmResult) };
};
