const { BigQuery } = require('@google-cloud/bigquery');
const { getServiceAccount } = require('./getServiceAccount');
exports.handler = async (event) => {
    try {
        const { lookback_days = 30 } = JSON.parse(event.body || '{}');
        const credentials = await getServiceAccount('gcp.json');
        const bigquery = new BigQuery({ projectId: 'ksec-datawarehouse', credentials });
        const query = `
      SELECT
        client_db,
        SUM(total_events) as total_events,
        AVG(avg_latency_seconds) as avg_latency
      FROM \`ksec-datawarehouse.metrics.daily_access_facts\`
      WHERE access_date >= DATE_SUB(CURRENT_DATE(), INTERVAL @days DAY)
      GROUP BY 1
      ORDER BY 2 DESC
    `;
        const [rows] = await bigquery.query({
            query,
            params: { days: lookback_days },
            types: { days: 'INT64' },
        });
        const cleaned = rows.map((r) => ({
            clientDb: r.client_db,
            count: Number(r.total_events),
            avgLatency: r.avg_latency ? Number(r.avg_latency) : 0,
        }));
        return { statusCode: 200, body: JSON.stringify(cleaned) };
    } catch (error) {
        console.error('❌ Error:', error);
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};