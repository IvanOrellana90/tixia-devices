const { createClient } = require('@supabase/supabase-js');

// Crear cliente Supabase con clave de servicio
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
  { auth: { persistSession: false } }
);

// Helper para respuesta JSON
const json = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Método no permitido' });
  }

  try {
    const { unique_id, status = 'received' } = JSON.parse(event.body || '{}');

    if (!unique_id) {
      return json(400, { error: 'unique_id es requerido' });
    }

    // Resolver mobile -> device_id
    const { data: mobile, error: mErr } = await supabase
      .from('mobiles')
      .select('id')
      .eq('unique_id', unique_id)
      .single();

    if (mErr || !mobile) {
      return json(404, { error: 'Mobile no encontrado' });
    }

    const { data: device, error: dErr } = await supabase
      .from('devices')
      .select('id')
      .eq('mobile_id', mobile.id)
      .single();

    if (dErr || !device) {
      return json(404, { error: 'Device no encontrado' });
    }

    const deviceId = device.id;

    // Actualizar token con ACK
    const { error: updateErr } = await supabase
      .from('device_push_tokens')
      .update({
        last_pushed_updated_at: new Date().toISOString(),
        last_push_status: status,
      })
      .eq('device_id', deviceId);

    if (updateErr) {
      return json(500, {
        error: 'Error al actualizar ACK',
        details: updateErr.message,
      });
    }

    return json(200, { ok: true, device_id: deviceId, status });
  } catch (err) {
    return json(500, { error: 'Error inesperado', details: err.message });
  }
};
