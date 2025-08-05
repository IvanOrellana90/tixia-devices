const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Metodo no permitido' };
  }

  const { unique_id, push_token } = JSON.parse(event.body);

  if (!unique_id || !push_token) {
    return { statusCode: 400, body: 'unique_id y push_token son requeridos' };
  }

  // 1. Buscar mobile_id
  const { data: mobile, error: mobileError } = await supabase
    .from('mobiles')
    .select('id')
    .eq('unique_id', unique_id)
    .single();

  if (mobileError || !mobile) {
    return { statusCode: 404, body: 'Mobile no encontrado' };
  }

  // 2. Buscar device_id
  const { data: device, error: deviceError } = await supabase
    .from('devices')
    .select('id')
    .eq('mobile_id', mobile.id)
    .single();

  if (deviceError || !device) {
    return { statusCode: 404, body: 'Device no encontrado para ese móvil' };
  }

  // 3. Guardar el token usando el device_id (entero)
  const { error: insertError } = await supabase
    .from('device_push_tokens')
    .upsert(
      [
        {
          device_id: device.id,
          push_token,
          updated_at: new Date().toISOString(),
        },
      ],
      { onConflict: ['device_id'] }
    );

  if (insertError) {
    return { statusCode: 500, body: JSON.stringify(insertError) };
  }

  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
