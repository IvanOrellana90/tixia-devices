// Recibe el nombre del equipo y retorna el estado Nagios como objeto
export async function fetchNagiosStatus(deviceLocation) {
  if (!deviceLocation) return null;
  const url = `https://nagios.ksec.cl/nagios/cgi-bin/statusjson.cgi?query=host&hostname=${encodeURIComponent(deviceLocation)}`;

  try {
    const res = await fetch(url, {
      credentials: 'include', // por si requiere cookie de login, si es público puedes omitir
    });
    if (!res.ok) throw new Error('Error fetching from Nagios');
    const json = await res.json();

    const host = json?.data?.host;
    if (!host) return null;

    // Traducción de status a texto/color
    const statusMap = {
      0: { text: 'UP', color: 'success' },
      1: { text: 'DOWN', color: 'danger' },
      2: { text: 'UNREACHABLE', color: 'warning' },
    };
    const stateInfo = statusMap[host.status] || {
      text: 'Unknown',
      color: 'secondary',
    };

    // Convertir milisegundos a fecha legible
    const msToDate = (ms) =>
      ms && ms > 0 ? new Date(ms).toLocaleString('es-CL') : 'N/A';

    // Calcular uptime desde el último UP (puedes mejorar este cálculo si tienes info de eventos)
    let uptime = 'N/A';
    if (host.last_time_up && host.last_time_down) {
      const upMs = host.last_time_up - host.last_time_down;
      if (upMs > 0) {
        // Mostrar días, horas, minutos
        const days = Math.floor(upMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((upMs / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((upMs / (1000 * 60)) % 60);
        uptime = `${days}d ${hours}h ${minutes}m`;
      }
    }

    // Armar objeto de resultado
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
  } catch (err) {
    console.error('Error fetching Nagios status:', err);
    return null;
  }
}
