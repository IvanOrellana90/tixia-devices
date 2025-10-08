const { BigQuery } = require('@google-cloud/bigquery');
const { getServiceAccount } = require('./getServiceAccount');

exports.handler = async (event) => {
  try {
    const {
      client_db,
      device_location,
      range = 'day',
    } = JSON.parse(event.body || '{}');

    if (!client_db || !device_location) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'Faltan parámetros: client_db y device_location',
        }),
      };
    }

    const credentials = await getServiceAccount('gcp.json');
    const bigquery = new BigQuery({
      projectId: 'ksec-datawarehouse',
      credentials,
    });

    console.log('🔍 Parámetros recibidos:', {
      client_db,
      device_location,
      range,
    });

    const dateExpr =
      range === 'year'
        ? 'FORMAT_TIMESTAMP("%Y", access)'
        : range === 'month'
          ? 'FORMAT_TIMESTAMP("%Y-%m", access)'
          : range === 'week'
            ? 'FORMAT_TIMESTAMP("%Y-W%V", access)'
            : 'FORMAT_TIMESTAMP("%Y-%m-%d", access)';

    const query = `
      WITH base AS (
        SELECT
          ${dateExpr} AS period,
          action,
          SAFE_CAST(location AS STRING) AS loc,
          SAFE_CAST(result AS STRING) AS result_str
        FROM \`ksec-datawarehouse.${client_db}.access_logs\`
        WHERE access IS NOT NULL
      ),
      prepared AS (
        SELECT * FROM base
        WHERE loc IS NOT NULL
      )
      SELECT
        period,
        action,
        COUNT(*) AS total_accesses,
        COUNTIF(result_str = 'allowed' OR result_str = '1') AS allowed,
        COUNTIF(result_str = 'denied' OR result_str = '0') AS denied
      FROM prepared
      WHERE loc = @device_location
      GROUP BY period, action
      ORDER BY period DESC
      LIMIT 100
    `;

    console.log('🚀 Ejecutando consulta principal...');
    console.log('📋 Query params:', {
      device_location: String(device_location),
    });

    const [rows] = await bigquery.query({
      query,
      params: { device_location: String(device_location) },
    });

    console.log('✅ Filas obtenidas:', rows.length);

    return { statusCode: 200, body: JSON.stringify(rows) };
  } catch (error) {
    console.error('❌ Error en getAccessesSummary:', error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
