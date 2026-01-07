const { BigQuery } = require('@google-cloud/bigquery');
const { getServiceAccount } = require('./getServiceAccount');

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

    // CONSULTA GENERAL: Devolvemos el result_id tal cual
    const query = `
      SELECT
      access_date,
      client_db,
      result_id,
      CASE result_id
        WHEN 1 THEN 'Authorized'
        WHEN 2 THEN 'Out of hours'
        WHEN 3 THEN 'Not authorized'
        WHEN 4 THEN 'Blocked'
        WHEN 5 THEN 'Authorized on-site'
        WHEN 6 THEN 'Double shift'
        ELSE 'Unknown'
      END AS result_label,
      SUM(total_events) AS total_events,
      SUM(people_traffic) AS people_traffic,
      SUM(vehicle_traffic) AS vehicle_traffic
    FROM \`ksec-datawarehouse.metrics.daily_access_facts\`
    WHERE client_db = @client_db
      AND access_date >= DATE_SUB(CURRENT_DATE(), INTERVAL @days DAY)
      AND (@site_id IS NULL OR site_id = @site_id)
      AND (@facility_id IS NULL OR facility_id = @facility_id)
      AND (@device_location IS NULL OR LOWER(TRIM(device_location)) = LOWER(TRIM(@device_location)))
    GROUP BY 1,2,3,4
    ORDER BY access_date ASC
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

    // Limpieza simple
    const cleaned = rows.map((r) => ({
      access_date: r.access_date?.value || r.access_date,
      client_db: r.client_db,
      result_id: r.result_id !== null ? Number(r.result_id) : -1,
      result_label: r.result_label || 'Unknown',
      total_events: Number(r.total_events),
      people_traffic: Number(r.people_traffic),
      vehicle_traffic: Number(r.vehicle_traffic),
    }));

    return { statusCode: 200, body: JSON.stringify(cleaned) };
  } catch (error) {
    console.error('❌ Error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};