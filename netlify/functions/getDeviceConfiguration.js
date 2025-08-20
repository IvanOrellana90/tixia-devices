// netlify/functions/getDeviceConfiguration.js
const { createClient } = require('@supabase/supabase-js');

const { SUPABASE_URL, SUPABASE_ANON_KEY } = process.env;

const json = (status, body) => ({
  statusCode: status,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

// Defaults actualizados para coincidir con Redux
const DEFAULTS_SERVER = {
  device_mode: 'tourniquet',
  orientation_mode: 'default',
  debug_mode: 'False',
  site_id: '3327',
  api_token: 'ffeb5e82c942660cf38e839d-532',
  config_mode: 'entry',
  client_url: 'https://beta.ksec.cl/',
  facility_id: '',
  location: 'TEST DEVICE',
  camera_zoom: '0',
  movement_sensibility: '30',
  manual_entry_password: '438082',
  exit_confirmation: 'False',
  manual_entry: 'True',
  time_standby_screen: '20',
  enable_flash: 'False',
  enable_chip_validation: 'False',
  enable_vehicle_flow: 'False',
  enable_carrier_flow: 'False',
  raspberry_photo: 'False',
  access_fast_upload: 'False',
  last_windows_sync: '0',
  full_sync_hour: '2',
  nagios_url: 'https://nagios.ksec.cl/nrdp/',
  nagios_token: 'ksecR227MrcJ',
  shift_rule: '0',
  double_shift_rule: '0',
};

// Función para normalizar valores a string
const normalizeValue = (value) => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'boolean') return value ? 'True' : 'False';
  if (typeof value === 'number') return String(value);
  return String(value);
};

// Función para extraer valores de relaciones y mapear a campos planos
const extractRelationshipValues = (deviceData) => {
  const mapped = {};

  // Campos directos del device
  if (deviceData.mode) mapped.device_mode = deviceData.mode.toLowerCase();
  if (deviceData.location) mapped.location = deviceData.location;
  if (deviceData.site_ksec_id) mapped.site_id = deviceData.site_ksec_id;
  if (deviceData.facility_ksec_id)
    mapped.facility_id = deviceData.facility_ksec_id;

  // Campos de la relación clients
  if (deviceData.clients) {
    const client = Array.isArray(deviceData.clients)
      ? deviceData.clients[0]
      : deviceData.clients;
    if (client?.url) mapped.client_url = client.url;
    if (client?.api_key) mapped.api_token = client.api_key;
  }

  return mapped;
};

exports.handler = async (event) => {
  console.log('getDeviceConfiguration called');

  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return json(500, { error: 'Supabase configuration missing' });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false },
  });

  try {
    const body = JSON.parse(event.body || '{}');
    const { unique_id } = body;

    console.log('Request received for unique_id:', unique_id);

    if (!unique_id) {
      return json(400, { error: 'unique_id is required' });
    }

    // 1) Buscar el dispositivo por unique_id con las relaciones necesarias
    const { data: device, error: deviceError } = await supabase
      .from('devices')
      .select(
        `
        id, 
        mode, 
        location, 
        unique_id,
        site_ksec_id,
        facility_ksec_id,
        clients:client_id (url, api_key)
      `
      )
      .eq('unique_id', unique_id)
      .order('updated_at', { ascending: false })
      .limit(1)
      .single();

    if (deviceError) {
      console.error('Device lookup error:', deviceError);
      return json(404, { error: 'Device not found' });
    }

    console.log('Device found:', {
      id: device.id,
      unique_id: device.unique_id,
      hasClient: !!device.clients,
    });

    // 2) Extraer valores de las relaciones y mapear a campos de configuración
    const deviceMappedConfig = extractRelationshipValues(device);

    // 3) Obtener configuración específica del dispositivo
    const { data: deviceConfig, error: configError } = await supabase
      .from('device_configurations')
      .select('configuration, updated_at')
      .eq('device_id', device.id)
      .maybeSingle(); // Usar maybeSingle por si no existe configuración

    if (configError) {
      console.error('Config lookup error:', configError);
      // Continuamos con configuración vacía
    }

    // 4) Combinar todas las configuraciones (prioridad: DB > Device relations > Defaults)
    const dbConfig = deviceConfig?.configuration || {};
    const normalizedConfig = { ...DEFAULTS_SERVER };

    // Primero aplicar mapeo del device (relaciones)
    Object.keys(deviceMappedConfig).forEach((key) => {
      if (deviceMappedConfig[key] !== undefined) {
        normalizedConfig[key] = normalizeValue(deviceMappedConfig[key]);
      }
    });

    // Luego sobrescribir con valores de la DB (máxima prioridad)
    Object.keys(dbConfig).forEach((key) => {
      normalizedConfig[key] = normalizeValue(dbConfig[key]);
    });

    console.log('Configuration built:', {
      fromDevice: Object.keys(deviceMappedConfig).length,
      fromDB: Object.keys(dbConfig).length,
      total: Object.keys(normalizedConfig).length,
    });

    return json(200, {
      success: true,
      configuration: normalizedConfig,
      device: {
        id: device.id,
        unique_id: device.unique_id,
        mode: device.mode,
        location: device.location,
        config_updated_at: deviceConfig?.updated_at,
      },
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return json(500, {
      error: 'Internal server error',
      message: error.message,
    });
  }
};
