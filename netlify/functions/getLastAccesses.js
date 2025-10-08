const { BigQuery } = require('@google-cloud/bigquery');
const { getServiceAccount } = require('./getServiceAccount');

exports.handler = async (event) => {
  try {
    const { client_db, device_location } = JSON.parse(event.body || '{}');

    if (!client_db || !device_location) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'Faltan parámetros: client_db y device_location',
        }),
      };
    }

    const credentials = await getServiceAccount('gcp.json');

    // ✅ Sigue usando credentials directas (sin GoogleAuth)
    const bigquery = new BigQuery({
      projectId: 'ksec-datawarehouse',
      credentials,
    });

    const query = `
      SELECT
        rut,
        action,
        access,
        result,
        site_id,
        name,
        location,
        plates,
        informed_result,
        facility_id
      FROM \`ksec-datawarehouse.${client_db}.access_logs\`
      WHERE LOWER(location) = LOWER(@device_location)
      ORDER BY access DESC
      LIMIT 5
    `;

    const [rows] = await bigquery.query({
      query,
      params: { device_location },
    });

    const cleaned = rows.map((r) => ({
      rut: r.rut,
      action: r.action,
      access: r.access?.value || r.access,
      result: r.result,
      site_id: r.site_id,
      name: r.name,
      location: r.location,
      plates: r.plates,
      informed_result: r.informed_result,
      facility_id: r.facility_id,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(cleaned),
    };
  } catch (error) {
    console.error('❌ Error en getLastAccesses:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
