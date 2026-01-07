const { BigQuery } = require('@google-cloud/bigquery');
const { getServiceAccount } = require('./getServiceAccount');

const normalize = (s) =>
  (s ?? '')
    .toString()
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

const mapInputType = (raw) => {
  const t = normalize(raw);
  if (t === 'qr') return 'QR';
  if (t === 'manual') return 'manual';
  if (t === 'chip') return 'CHIP';
  if (t === 'leido') return 'LEIDO';
  if (t === 'integracion') return 'integración';
  if (t === 'digitado') return 'DIGITADO';
  return raw || 'Unknown';
};

exports.handler = async (event) => {
  try {
    const {
      client_db,
      site_id = null,
      facility_id = null,
      device_location = null,
      lookback_days = 365,
    } = JSON.parse(event.body || '{}');

    if (!client_db) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Falta client_db' }) };
    }

    const credentials = await getServiceAccount('gcp.json');
    const bigquery = new BigQuery({ projectId: 'ksec-datawarehouse', credentials });

    // Usamos 'input_type' como confirmaste
    const query = `
      SELECT
        input_type, 
        SUM(total_events) AS total_events
      FROM \`ksec-datawarehouse.metrics.daily_access_facts\`
      WHERE client_db = @client_db
        AND access_date >= DATE_SUB(CURRENT_DATE(), INTERVAL @days DAY)
        AND (@site_id IS NULL OR site_id = @site_id)
        AND (@facility_id IS NULL OR facility_id = @facility_id)
        AND (@device_location IS NULL OR LOWER(device_location) = LOWER(@device_location))
      GROUP BY 1
      ORDER BY 2 DESC
    `;

    const [rows] = await bigquery.query({
      query,
      params: { client_db, site_id, facility_id, device_location, days: lookback_days },
      types: {
        client_db: 'STRING',
        site_id: 'INT64',
        facility_id: 'INT64',
        device_location: 'STRING',
        days: 'INT64',
      },
    });

    // Mapeo usando la columna correcta
    const cleaned = rows.map((r) => ({
        type: mapInputType(r.input_type),
        count: Number(r.total_events),
    }));

    return { statusCode: 200, body: JSON.stringify(cleaned) };
  } catch (error) {
    console.error('❌ Error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};