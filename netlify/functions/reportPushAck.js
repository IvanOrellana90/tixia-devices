const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
  { auth: { persistSession: false } }
);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Método no permitido' };
  }

  try {
    const { unique_id, device_id, status } = JSON.parse(event.body || '{}');
    if (!unique_id && !device_id) {
      return { statusCode: 400, body: 'unique_id o device_id requerido' };
    }

    // Resolver device_id si viene unique_id
    let resolvedDeviceId = device_id;
    if (!resolvedDeviceId && unique_id) {
      const { data: mobile, error: mErr } = await supabase
        .from('mobiles')
        .select('id')
        .eq('unique_id', unique_id)
        .single();
      if (mErr || !mobile)
        return { statusCode: 404, body: 'Mobile no encontrado' };

      const { data: device, error: dErr } = await supabase
        .from('devices')
        .select('id')
        .eq('mobile_id', mobile.id)
        .single();
      if (dErr || !device)
        return { statusCode: 404, body: 'Device no encontrado' };

      resolvedDeviceId = device.id;
    }

    // Update ACK timestamp (+ opcional: guarda status)
    const { error: upErr } = await supabase
      .from('device_push_tokens')
      .update({ last_pushed_updated_at: new Date().toISOString() })
      .eq('device_id', resolvedDeviceId);

    if (upErr) return { statusCode: 500, body: JSON.stringify(upErr) };

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, status: status || 'received' }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
