const { BigQuery } = require('@google-cloud/bigquery');
const { getServiceAccount } = require('./getServiceAccount');

exports.handler = async (event) => {
    try {
        const {
            client_db,
            site_id = null,
            lookback_days = 30,
        } = JSON.parse(event.body || '{}');

        if (!client_db) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Falta client_db' }) };
        }

        const credentials = await getServiceAccount('gcp.json');
        const bigquery = new BigQuery({ projectId: 'ksec-datawarehouse', credentials });

        const query = `
      SELECT
        IFNULL(facility_id, 0) as facility_id,
        SUM(total_events) as total_events
      FROM \`ksec-datawarehouse.metrics.daily_access_facts\`
      WHERE client_db = @client_db
        AND (@site_id IS NULL OR site_id = @site_id)
        AND access_date >= DATE_SUB(CURRENT_DATE(), INTERVAL @days DAY)
      GROUP BY 1
      ORDER BY 2 DESC
    `;

        const [rows] = await bigquery.query({
            query,
            params: { client_db, site_id, days: lookback_days },
            types: {
                client_db: 'STRING',
                site_id: 'INT64',
                days: 'INT64',
            },
        });

        const cleaned = rows.map((r) => ({
            facilityId: Number(r.facility_id),
            count: Number(r.total_events),
        }));

        return { statusCode: 200, body: JSON.stringify(cleaned) };
    } catch (error) {
        console.error('❌ Error:', error);
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
