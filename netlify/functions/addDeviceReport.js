const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Método no permitido' }),
    };
  }

  let unique_id, location, version_name, information;
  try {
    const body = JSON.parse(event.body);
    unique_id = body.unique_id;
    location = body.location;
    version_name = body.version_name;
    information = body.information;
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Cuerpo inválido' }),
    };
  }

  if (!unique_id || !version_name || !information) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'unique_id, version_name e information requeridos',
      }),
    };
  }

  const { data, error } = await supabase
    .from('device_reports')
    .insert([
      {
        unique_id,
        location,
        version_name,
        information,
      },
    ])
    .select();

  if (error) {
    return { statusCode: 400, body: JSON.stringify({ error: error.message }) };
  }

  return {
    statusCode: 201,
    body: JSON.stringify({ message: 'Reporte guardado', data }),
  };
};
