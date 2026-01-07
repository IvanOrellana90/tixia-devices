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

    // Consultamos agrupando por action_id
    const query = `
      SELECT
        action_id, 
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

    // Devolvemos el array limpio con ID y conteo
    const cleaned = rows.map((r) => ({
      id: Number(r.action_id),
      count: Number(r.total_events),
    }));

    return { statusCode: 200, body: JSON.stringify(cleaned) };
  } catch (error) {
    console.error('❌ Error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};