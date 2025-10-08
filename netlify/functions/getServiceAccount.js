const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// caché en memoria local (evita descargar en cada request)
const cache = {};

async function getServiceAccount(filename) {
  if (cache[filename]) return cache[filename];

  const { data, error } = await supabase.storage
    .from('service-accounts')
    .download(filename);

  if (error)
    throw new Error(`Error al descargar ${filename}: ${error.message}`);

  const content = await data.text();
  const json = JSON.parse(content);

  // guardar copia temporal en /tmp (opcional)
  const tempPath = path.join('/tmp', filename);
  fs.writeFileSync(tempPath, content);

  cache[filename] = json;
  return json;
}

module.exports = { getServiceAccount };
