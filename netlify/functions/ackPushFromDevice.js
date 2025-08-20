// netlify/functions/ackPushFromDevice.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE || process.env.SUPABASE_ANON_KEY,
  { auth: { persistSession: false }, db: { schema: 'public' } }
);

const json = (code, body) => ({
  statusCode: code,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  },
  body: JSON.stringify(body),
});

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return json(204, {});
  if (event.httpMethod !== 'POST')
    return json(405, { error: 'Método no permitido' });

  try {
    const {
      unique_id,
      status = 'received',
      applied_at,
      error_message,
    } = JSON.parse(event.body || '{}');
    if (!unique_id) return json(400, { error: 'unique_id requerido' });

    // 1) resolver device
    const { data: device, error: devErr } = await supabase
      .from('devices')
      .select('id, unique_id, location')
      .eq('unique_id', unique_id)
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (devErr)
      return json(500, {
        error: 'Error buscando device',
        details: devErr.message,
      });
    if (!device)
      return json(404, { error: 'Dispositivo no encontrado', unique_id });

    const deviceId = device.id;
    const nowIso = new Date().toISOString();

    // 2) preparar columnas de tracking
    const tokenUpdate = {
      last_pushed_updated_at: nowIso,
      updated_at: nowIso,
      ...(status === 'received' ? { last_ack_received_at: nowIso } : {}),
      ...(status === 'applied'
        ? { last_ack_applied_at: applied_at || nowIso }
        : {}),
      ...(error_message ? { last_error_message: error_message } : {}),
    };

    // 3) upsert por device_id (no tocamos push_token)
    const { data: existing, error: exErr } = await supabase
      .from('device_push_tokens')
      .select('id, push_token')
      .eq('device_id', deviceId)
      .maybeSingle();
    if (exErr)
      return json(500, {
        error: 'Error verificando token',
        details: exErr.message,
      });

    if (existing) {
      // solo UPDATE de campos de ACK; NO tocar push_token
      const { error: updErr } = await supabase
        .from('device_push_tokens')
        .update(tokenUpdate)
        .eq('device_id', deviceId);
      if (updErr)
        return json(500, {
          error: 'Error actualizando ACK',
          details: updErr.message,
        });
    } else {
      // INSERT nuevo registro con push_token placeholder (NOT NULL)
      const insertRow = {
        device_id: deviceId,
        push_token: 'ack',
        ...tokenUpdate,
        created_at: nowIso,
      };
      const { error: insErr } = await supabase
        .from('device_push_tokens')
        .insert(insertRow);
      if (insErr)
        return json(500, {
          error: 'Error creando token',
          details: insErr.message,
        });
    }

    // 4) marca contacto del device (usa la columna correcta)
    const { error: dUpErr } = await supabase
      .from('devices')
      .update({ config_updated_at: nowIso, updated_at: nowIso })
      .eq('id', deviceId);

    if (dUpErr)
      console.warn(
        'No se pudo actualizar devices.config_updated_at:',
        dUpErr.message
      );

    return json(200, {
      ok: true,
      device_id: deviceId,
      status,
      device_location: device.location,
      timestamp: nowIso,
    });
  } catch (e) {
    return json(500, { error: 'Error interno', details: e.message });
  }
};
