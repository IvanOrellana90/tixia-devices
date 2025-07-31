export async function fetchNagiosHostService(serviceName, hostName) {
  if (!serviceName) return null;
  const url = `https://nagios.ksec.cl/nagios/cgi-bin/statusjson.cgi?query=service&hostname=${encodeURIComponent(hostName)}&servicedescription=${encodeURIComponent(serviceName)}`;

  try {
    const response = await fetch(url, {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('No se pudo conectar con Nagios');
    const data = await response.json();
    return {
      service: data.data.service,
    };
  } catch (error) {
    console.error('Error al obtener estatus de Nagios:', error);
    return {
      service: {},
    };
  }
}
