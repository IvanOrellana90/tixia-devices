const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export const handler = async (event) => {
  try {
    const { unique_id } = event.queryStringParameters;

    if (!unique_id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'unique_id es requerido' }),
      };
    }

    console.log('Valor de unique_id recibido:', unique_id);

    const { data, error } = await supabase
      .from('devices')
      .select(
        `site_ksec_id, facility_ksec_id, location, mode, clients (url, api_key)`
      )
      .eq('unique_id', unique_id);

    if (error) {
      console.error('Error en Supabase:', error);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: error.message }),
      };
    }

    if (!data || data.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Dispositivo no encontrado' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data[0]),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error interno del servidor ' + err }),
    };
  }
};
