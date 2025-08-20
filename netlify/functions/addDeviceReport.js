// netlify/functions/addDeviceReport.js
const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY, // server-side
  { auth: { persistSession: false } }
);

// Rate-limit & de-dupe en memoria (válido por instancia)
const WINDOW_MS = 10_000;
const MAX_REQ_PER_IP = 50;
const ipHits = new Map();
const recentHashes = new Map();
const DEDUPE_TTL_MS = 5_000;

const now = () => Date.now();
const rateLimit = (ip) => {
  const t = now();
  const cur = ipHits.get(ip);
  if (!cur || t - cur.ts > WINDOW_MS) {
    ipHits.set(ip, { c: 1, ts: t });
    return false;
  }
  cur.c += 1;
  return cur.c > MAX_REQ_PER_IP;
};
const hashBody = (b) => crypto.createHash('sha256').update(b).digest('hex');
const isDup = (h) => {
  const t = now();
  for (const [k, ts] of recentHashes)
    if (t - ts > DEDUPE_TTL_MS) recentHashes.delete(k);
  const last = recentHashes.get(h);
  if (last && t - last <= DEDUPE_TTL_MS) return true;
  recentHashes.set(h, t);
  return false;
};

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Método no permitido' }),
      };
    }

    // API key
    const apiKey = event.headers['x-report-key'];
    if (process.env.REPORT_KEY && apiKey !== process.env.REPORT_KEY) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Unauthorized' }),
      };
    }

    // Rate limit por IP
    const ip =
      event.headers['x-forwarded-for']?.split(',')[0]?.trim() || 'unknown';
    if (rateLimit(ip)) {
      return {
        statusCode: 429,
        body: JSON.stringify({ error: 'Too Many Requests' }),
      };
    }

    // De-dupe por body
    const raw = event.body || '';
    const h = hashBody(raw);
    if (isDup(h)) {
      return {
        statusCode: 202,
        body: JSON.stringify({ ok: true, deduped: true }),
      };
    }

    // Parse
    let payload;
    try {
      payload = JSON.parse(raw);
    } catch {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Cuerpo inválido' }),
      };
    }

    // Campos
    const unique_id = payload.unique_id ?? null;
    const location = payload.location ?? undefined; // undefined => usa DEFAULT si lo seteaste
    const version_name =
      payload.version_name ?? payload.version_number ?? undefined;
    const windows_number =
      typeof payload.windows_number === 'number'
        ? payload.windows_number
        : undefined;
    const information = payload.information ?? null;

    // Requisito mínimo: unique_id
    if (!unique_id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'unique_id requerido' }),
      };
    }

    // Resolver device_id (best-effort)
    let device_id = null;

    // a) por devices.unique_id  ✅
    const { data: devByUnique, error: devUniqueErr } = await supabase
      .from('devices')
      .select('id')
      .eq('unique_id', unique_id)
      .maybeSingle();

    if (devUniqueErr)
      console.error('devices lookup by unique_id', devUniqueErr);
    if (devByUnique?.id) device_id = devByUnique.id;

    // b) fallback por location si aún no hay device_id y tenemos location
    if (!device_id && location !== undefined) {
      const { data: devByLoc, error: devLocErr } = await supabase
        .from('devices')
        .select('id')
        .eq('location', location)
        .maybeSingle();
      if (devLocErr) console.error('devices lookup by location', devLocErr);
      if (devByLoc?.id) device_id = devByLoc.id;
    }

    // Construir fila usando DEFAULTS si faltan campos (no mandes null para NOT NULL)
    const row = { unique_id, device_id, information };
    if (location !== undefined) row.location = location;
    if (version_name !== undefined) row.version_name = version_name;
    if (windows_number !== undefined) row.windows_number = windows_number;

    const { data, error } = await supabase
      .from('device_reports')
      .insert([row])
      .select('id, created_at');

    if (error) throw error;

    return { statusCode: 201, body: JSON.stringify({ ok: true, data }) };
  } catch (err) {
    console.error('addDeviceReport error', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal error' }),
    };
  }
};
