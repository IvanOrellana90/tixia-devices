const fetch = require('node-fetch');

const NAGIOS_BASE = 'https://nagios.ksec.cl/nagios/cgi-bin/';
const USER = process.env.NAGIOS_USER;
const PASS = process.env.NAGIOS_PASS;

const ALLOWED_ENDPOINTS = [
  'statusjson.cgi', // puedes agregar más si necesitas
  // 'another.cgi'
];

exports.handler = async (event) => {
  const { endpoint = '', ...params } = event.queryStringParameters || {};

  // Validación de endpoint
  if (!ALLOWED_ENDPOINTS.some((e) => endpoint.startsWith(e))) {
    return { statusCode: 400, body: 'Endpoint no permitido' };
  }

  // Construye URL con parámetros adicionales
  const paramString = Object.entries(params)
    .filter(([key]) => key !== 'endpoint')
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  const url = `${NAGIOS_BASE}${endpoint}${paramString ? '?' + paramString : ''}`;

  const auth = Buffer.from(`${USER}:${PASS}`).toString('base64');
  try {
    const response = await fetch(url, {
      headers: { Authorization: `Basic ${auth}` },
    });
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
