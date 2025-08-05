const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Not Allowed' };
  }

  const { device_id, push_token } = JSON.parse(event.body);

  if (!device_id || !push_token) {
    return { statusCode: 400, body: 'device_id y push_token requeridos' };
  }

  // Elimina tokens anteriores de ese device (opcional, según tu lógica)
  await supabase.from('device_push_tokens').delete().eq('device_id', device_id);

  // Inserta el nuevo token (puedes cambiar a UPSERT si lo prefieres)
  const { error } = await supabase.from('device_push_tokens').insert([
    {
      device_id,
      push_token,
      updated_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    return { statusCode: 500, body: JSON.stringify(error) };
  }

  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
