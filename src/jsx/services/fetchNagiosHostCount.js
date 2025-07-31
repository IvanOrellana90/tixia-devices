import moment from 'moment';

const NAGIOS_URL =
  'https://nagios.ksec.cl/nagios/cgi-bin/statusjson.cgi?query=hostcount';

/**
 * Descarga el status de los hosts desde Nagios y devuelve un objeto { host: estad, lastUpdate: fecha }
 */
export async function fetchNagiosHostCount() {
  try {
    const response = await fetch(NAGIOS_URL, {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('No se pudo conectar con Nagios');
    const data = await response.json();
    return {
      hostCount: data.data.count,
      lastUpdate: moment(data.result.last_data_update).format(
        'DD/MM/YYYY HH:mm'
      ),
    };
  } catch (error) {
    console.error('Error al obtener estatus de Nagios:', error);
    return {
      hostCount: {},
      lastUpdate: null,
    };
  }
}
