const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
  { auth: { persistSession: false } }
);

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Método no permitido' }),
    };
  }

  const { unique_id } = event.queryStringParameters || {};

  if (!unique_id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'unique_id es requerido' }),
    };
  }

  const { data: mobile, error: mobileError } = await supabase
    .from('mobiles')
    .select('unique_id, id')
    .eq('unique_id', unique_id)
    .single();

  if (mobileError) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: mobileError.message }),
    };
  }
  if (!mobile) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Móvil no encontrado' }),
    };
  }

  const { data: device, error: deviceError } = await supabase
    .from('devices')
    .select('*, clients (url, api_key)')
    .eq('mobile_id', mobile.id)
    .single();

  if (deviceError) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: deviceError.message }),
    };
  }
  if (!device) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Device no encontrado para este móvil' }),
    };
  }

  const { data: deviceConfig, error: configError } = await supabase
    .from('device_configurations')
    .select('configuration')
    .eq('device_id', device.id)
    .single();

  if (configError && configError.code !== 'PGRST116') {

    return {
      statusCode: 400,
      body: JSON.stringify({ error: configError.message }),
    };
  }

  const response = {
    unique_id: mobile.unique_id,

    site_ksec_id: device.site_ksec_id,
    facility_ksec_id: device.facility_ksec_id,
    location: device.location,
    mode: device.mode,
    clients: device.clients,

    device_configuration: deviceConfig ? deviceConfig.configuration : null,
  };

  return {
    statusCode: 200,
    body: JSON.stringify(response),
    headers: { 'Content-Type': 'application/json' },
  };
};
