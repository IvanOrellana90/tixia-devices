export const capitalizeFirstLetter = (string) => {
  if (!string) return ''; 
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// Función para convertir segundos a HH:MM:SS
export const formatDuration = (secondsInput) => {
  const seconds = Number(secondsInput || 0);
  
  // Si es negativo o cero/inválido, retornamos 00:00:00
  if (seconds <= 0) return "00:00:00";

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  // Agregamos el '0' a la izquierda si es necesario (pad)
  const hh = h.toString().padStart(2, '0');
  const mm = m.toString().padStart(2, '0');
  const ss = s.toString().padStart(2, '0');

  return `${hh}:${mm}:${ss}`;
};
