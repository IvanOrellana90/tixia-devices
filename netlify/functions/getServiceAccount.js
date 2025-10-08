const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// caché en memoria para evitar descargas repetidas
const cache = {};

/**
 * Descarga y devuelve un archivo JSON almacenado en el bucket
 * privado "service-accounts" de Supabase.
 *
 * @param {string} filename - Nombre del archivo (ej. "gsa.json" o "gcp.json")
 * @returns {Promise<object>} Objeto JSON con las credenciales
 */
async function getServiceAccount(filename) {
  // Usa caché si ya fue descargado
  if (cache[filename]) return cache[filename];

  const { data, error } = await supabase.storage
    .from('service-accounts')
    .download(filename);

  if (error)
    throw new Error(`Error al descargar ${filename}: ${error.message}`);

  const content = await data.text();
  const json = JSON.parse(content);

  cache[filename] = json;
  return json;
}

module.exports = { getServiceAccount };
