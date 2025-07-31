const NAGIOS_URL =
  'https://nagios.ksec.cl/nagios/cgi-bin/statusjson.cgi?query=hostlist';

/**
 * Descarga el status de los hosts desde Nagios y devuelve un objeto { host: estad, lastUpdate: fecha }
 */
export async function fetchNagiosHostStatus() {
  try {
    const response = await fetch(NAGIOS_URL, {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('No se pudo conectar con Nagios');
    const data = await response.json();
    return {
      hostlist: data.data.hostlist,
      lastUpdate: data.result.last_data_update,
    };
  } catch (error) {
    console.error('Error al obtener estatus de Nagios:', error);
    return {
      hostlist: {},
      lastUpdate: null,
    };
  }
}
