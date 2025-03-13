// src/config/client.js
import { createClient } from '@supabase/supabase-js';

// Obtener las credenciales de las variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// Verificar que las credenciales estén definidas
if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Las credenciales de Supabase no están configuradas en el archivo .env'
  );
}

// Crear y exportar el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);
