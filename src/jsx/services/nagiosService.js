import moment from 'moment';

async function fetchNagiosApi(url) {
  try {
    const res = await fetch(url);
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await res.text();
      // Imprime el HTML para debug, solo primeras líneas
      console.error(
        'Respuesta inesperada de la función Netlify:',
        text.slice(0, 300)
      );
      throw new Error('Respuesta inesperada (no JSON): ' + text.slice(0, 100));
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error en fetchNagiosApi:', error);
    throw error;
  }
}

// 1. Contar hosts
export async function fetchNagiosHostCount() {
  try {
    const data = await fetchNagiosApi(
      '/.netlify/functions/nagios?endpoint=statusjson.cgi&query=hostcount'
    );
    return {
      hostCount: data.data.count,
      lastUpdate: moment(data.result.last_data_update).format(
        'DD/MM/YYYY HH:mm'
      ),
    };
  } catch (error) {
    return {
      hostCount: null,
      lastUpdate: null,
      error: error.message,
    };
  }
}

// 2. Listar hosts
export async function fetchNagiosHostStatus() {
  try {
    const data = await fetchNagiosApi(
      '/.netlify/functions/nagios?endpoint=statusjson.cgi&query=hostlist'
    );
    return {
      hostlist: data.data.hostlist,
      lastUpdate: moment(data.result.last_data_update).format(
        'DD/MM/YYYY HH:mm'
      ),
    };
  } catch (error) {
    return {
      hostlist: null,
      lastUpdate: null,
      error: error.message,
    };
  }
}

// 3. Obtener servicios de un host
export async function fetchNagiosHostService(serviceName, hostName) {
  if (!serviceName) return null;
  try {
    const params = new URLSearchParams({
      endpoint: 'statusjson.cgi',
      query: 'service',
      hostname: hostName,
      servicedescription: serviceName,
    });
    const data = await fetchNagiosApi('/.netlify/functions/nagios?' + params);
    return { service: data.data.service };
  } catch (error) {
    return { service: null, error: error.message };
  }
}

// 4. Estado específico de un host
export async function fetchNagiosStatus(deviceLocation) {
  if (!deviceLocation) return null;
  try {
    const params = new URLSearchParams({
      endpoint: 'statusjson.cgi',
      query: 'host',
      hostname: deviceLocation,
    });
    const json = await fetchNagiosApi('/.netlify/functions/nagios?' + params);

    const host = json?.data?.host;
    if (!host) return null;

    const statusMap = {
      0: { text: 'UP', color: 'success' },
      1: { text: 'DOWN', color: 'danger' },
      2: { text: 'UNREACHABLE', color: 'warning' },
    };
    const stateInfo = statusMap[host.status] || {
      text: 'Unknown',
      color: 'secondary',
    };

    const msToDate = (ms) =>
      ms && ms > 0 ? new Date(ms).toLocaleString('es-CL') : 'N/A';

    let uptime = 'N/A';
    if (host.last_time_up && host.last_time_down) {
      const upMs = host.last_time_up - host.last_time_down;
      if (upMs > 0) {
        const days = Math.floor(upMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((upMs / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((upMs / (1000 * 60)) % 60);
        uptime = `${days}d ${hours}h ${minutes}m`;
      }
    }

    return {
      name: host.name,
      status: stateInfo.text,
      statusColor: stateInfo.color,
      pluginOutput: host.plugin_output,
      longPluginOutput: host.long_plugin_output,
      lastCheck: msToDate(host.last_check),
      lastStateChange: msToDate(host.last_state_change),
      lastHardStateChange: msToDate(host.last_hard_state_change),
      lastTimeUp: msToDate(host.last_time_up),
      lastTimeDown: msToDate(host.last_time_down),
      uptime,
      checkEnabled: host.checks_enabled,
      notificationsEnabled: host.notifications_enabled,
      lastNotification: msToDate(host.last_notification),
      problemAcknowledged: host.problem_has_been_acknowledged,
      isFlapping: host.is_flapping,
      currentAttempt: host.current_attempt,
      maxAttempts: host.max_attempts,
    };
  } catch (error) {
    return { error: error.message };
  }
}
