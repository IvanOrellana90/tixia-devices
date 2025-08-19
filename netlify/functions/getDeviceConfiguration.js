// netlify/functions/getDeviceConfiguration.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
  { auth: { persistSession: false } }
);

const json = (s, b) => ({
  statusCode: s,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(b),
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST')
    return json(405, { error: 'Method not allowed' });

  try {
    const { unique_id, device_id } = JSON.parse(event.body || '{}');
    if (!unique_id && !device_id)
      return json(400, { error: 'unique_id o device_id requerido' });

    // 1) resolver device_id
    let devId = device_id;
    if (!devId) {
      const { data: mobile, error: mErr } = await supabase
        .from('mobiles')
        .select('id')
        .eq('unique_id', unique_id)
        .single();
      if (mErr || !mobile) return json(404, { error: 'Mobile no encontrado' });

      const { data: device, error: dErr } = await supabase
        .from('devices')
        .select('id')
        .eq('mobile_id', mobile.id)
        .single();
      if (dErr || !device) return json(404, { error: 'Device no encontrado' });
      devId = device.id;
    }

    // 2) config JSON
    const { data: cfgRow } = await supabase
      .from('device_configurations')
      .select('configuration')
      .eq('device_id', devId)
      .single();

    const configuration = cfgRow?.configuration || {};

    // 3) extras: devices + sites + clients
    const { data: deviceFull } = await supabase
      .from('devices')
      .select(
        `
        id, mode, location,
        site_id, site_ksec_id,
        facility_id, facility_ksec_id,
        clients:client_id ( url, api_key ),
        site:site_id ( id, ksec_id, name ),
        facility:facility_id ( id, ksec_id, name )
      `
      )
      .eq('id', devId)
      .single();

    if (!deviceFull)
      return json(404, { error: 'Device no encontrado (extras)' });

    // 4) consolidar (sin tocar tus defaults; esto SOLO agrega/reescribe extras controlados)
    const consolidated = {
      ...configuration,

      // extras que el device espera:
      device_mode: String(deviceFull.mode || 'Tourniquet').toLowerCase(), // 'tourniquet'|'kiosk'|'pda'
      location: deviceFull.location || configuration.location,

      // ids útiles
      site_id:
        deviceFull.site?.ksec_id ||
        deviceFull.site_ksec_id ||
        configuration.site_id,
      facility_id:
        deviceFull.facility?.ksec_id ||
        deviceFull.facility_ksec_id ||
        configuration.facility_id,

      // secretos/controlados por backend:
      client_url: deviceFull.clients?.url || configuration.client_url,
      api_token: deviceFull.clients?.api_key || configuration.api_token,

      // si necesitas exponer:
      nagios_url: configuration.nagios_url,
      nagios_token: configuration.nagios_token,
    };

    return json(200, { device_id: devId, configuration: consolidated });
  } catch (e) {
    console.error(e);
    return json(500, { error: e.message });
  }
};
