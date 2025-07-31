const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

exports.handler = async (event) => {
  try {
    const { unique_id } = event.queryStringParameters;

    if (!unique_id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'unique_id es requerido' }),
      };
    }

    const { data, error } = await supabase
      .from('mobiles')
      .select(
        `
        unique_id,
        devices (
          site_ksec_id,
          facility_ksec_id,
          location,
          mode,
          clients (url, api_key)
        )
      `
      )
      .eq('unique_id', unique_id)
      .single();

    if (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: error.message }),
      };
    }

    if (!data || !data.devices || !data.devices.length) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Dispositivo no encontrado' }),
      };
    }

    // Tomar el primer device relacionado (ajusta si hay varios)
    const device = data.devices[0];

    // Armar respuesta plana para el frontend
    const response = {
      site_ksec_id: device.site_ksec_id,
      facility_ksec_id: device.facility_ksec_id,
      location: device.location,
      mode: device.mode,
      clients: device.clients,
      // puedes agregar aquí más campos si los necesitas
    };

    return {
      statusCode: 200,
      body: JSON.stringify(response),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error interno del servidor ' + err }),
    };
  }
};
