const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

exports.handler = async (event) => {
  try {
    // Obtener los parámetros de la consulta
    const { unique_id, version_name } = event.queryStringParameters;

    // Validar que unique_id y version_name estén presentes
    if (!unique_id || !version_name) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'unique_id y version_name son requeridos',
        }),
      };
    }

    console.log('Valores recibidos:', { unique_id, version_name });

    // Actualizar los campos version_name y activated_at en la tabla devices
    const { data: updateData, error: updateError } = await supabase
      .from('devices') // Asegúrate de que el nombre de la tabla sea correcto
      .update({
        version_name: version_name,
        activated_at: new Date().toISOString(), // Fecha y hora actual en formato ISO
      })
      .eq('unique_id', unique_id);

    if (updateError) {
      console.error('Error al actualizar el dispositivo:', updateError);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: updateError.message }),
      };
    }

    console.log('Dispositivo actualizado:', updateData);
  } catch (err) {
    console.error('Error interno del servidor:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error interno del servidor' }),
    };
  }
};
