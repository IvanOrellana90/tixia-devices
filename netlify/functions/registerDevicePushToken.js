// netlify/functions/registerDevicePushToken.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY,
  { auth: { persistSession: false } }
);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Método no permitido' };
  }

  try {
    const { unique_id, push_token } = JSON.parse(event.body || '{}');
    if (!unique_id || !push_token) {
      return { statusCode: 400, body: 'unique_id y push_token son requeridos' };
    }

    // 1) Resolver device por unique_id (en devices)
    const { data: dev, error: dErr } = await supabase
      .from('devices')
      .select('id, updated_at, created_at')
      .eq('unique_id', unique_id)
      .order('updated_at', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false, nullsFirst: false })
      .limit(1)
      .maybeSingle();

    if (dErr)
      return {
        statusCode: 500,
        body: `Error buscando device: ${dErr.message}`,
      };
    if (!dev)
      return {
        statusCode: 404,
        body: 'Device no encontrado para ese unique_id',
      };

    // 2) Evitar write si no cambió el token
    const { data: existing, error: exErr } = await supabase
      .from('device_push_tokens')
      .select('id, push_token')
      .eq('device_id', dev.id)
      .maybeSingle();

    if (exErr)
      return { statusCode: 500, body: `Error leyendo token: ${exErr.message}` };
    if (existing && existing.push_token === push_token) {
      return {
        statusCode: 200,
        body: JSON.stringify({ ok: true, changed: false }),
      };
    }

    // 3) Upsert por device_id
    const { error: upErr } = await supabase.from('device_push_tokens').upsert(
      [
        {
          device_id: dev.id,
          push_token,
          updated_at: new Date().toISOString(),
        },
      ],
      { onConflict: 'device_id' }
    );

    if (upErr)
      return {
        statusCode: 500,
        body: `Error guardando token: ${upErr.message}`,
      };

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, changed: true }),
    };
  } catch (e) {
    return { statusCode: 500, body: `Error inesperado: ${e.message}` };
  }
};
