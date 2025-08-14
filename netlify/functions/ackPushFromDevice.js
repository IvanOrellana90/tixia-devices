// netlify/functions/ackPushFromDevice.js
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
  { auth: { persistSession: false } }
);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST')
    return { statusCode: 405, body: 'Método no permitido' };

  try {
    const { unique_id, device_id, status } = JSON.parse(event.body || '{}');
    if (!unique_id && !device_id)
      return { statusCode: 400, body: 'unique_id o device_id requerido' };

    // resolver device_id
    let devId = device_id;
    if (!devId) {
      const { data: mobile } = await supabase
        .from('mobiles')
        .select('id')
        .eq('unique_id', unique_id)
        .single();
      if (!mobile) return { statusCode: 404, body: 'Mobile no encontrado' };
      const { data: device } = await supabase
        .from('devices')
        .select('id')
        .eq('mobile_id', mobile.id)
        .single();
      if (!device) return { statusCode: 404, body: 'Device no encontrado' };
      devId = device.id;
    }

    // marcar ACK
    const { error } = await supabase
      .from('device_push_tokens')
      .update({
        last_pushed_updated_at: new Date().toISOString(),
        last_push_status: status || 'received',
      })
      .eq('device_id', devId);

    if (error) return { statusCode: 500, body: JSON.stringify(error) };
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
