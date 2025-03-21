const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

exports.handler = async (event) => {
  const { unique_id, version_name } = event.queryStringParameters;

  if (!unique_id || !version_name) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'unique_id y version_name requeridos' }),
    };
  }

  const { data, error } = await supabase
    .from('devices')
    .update({
      version_name,
      activated_at: new Date().toISOString(),
      active: true,
    })
    .eq('unique_id', unique_id)
    .select();

  if (error) {
    return { statusCode: 400, body: JSON.stringify({ error: error.message }) };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Actualizado', data }),
  };
};
