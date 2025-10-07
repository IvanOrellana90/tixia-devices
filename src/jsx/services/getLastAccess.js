export async function getLastAccess(client_db, device_location) {
  try {
    const response = await fetch('/.netlify/functions/getLastAccesses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_db, device_location }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) return null;

    // Retornamos el acceso más reciente (primer elemento)
    const latest = data[0];
    return {
      access: latest.access,
      location: latest.location,
    };
  } catch (error) {
    console.error('Error fetching last access:', error);
    return null;
  }
}
