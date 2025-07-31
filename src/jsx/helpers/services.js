export const serviceTitle = (string) => {
  if (!string) return '';
  let str = string.replace(/_/g, ' ').toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const extractPercentage = (plugin_output) => {
  if (!plugin_output) return '';
  const match = plugin_output.match(/(\d+(\.\d+)?)%/);
  return match ? parseFloat(match[1]) : '';
};

export const serviceStatus = (service) => {
  if (service.status !== undefined) {
    switch (service.status) {
      case 0:
        return 'Critical';
      case 1:
        return 'Warning';
      case 2:
        return 'OK';
      case 3:
        return 'Unknown';
      case 16:
        return 'Pending';
      default:
        return 'Unknown';
    }
  }
  return service.status || 'Unknown';
};

export const statusColor = (status) => {
  switch (status.toUpperCase()) {
    case 'OK':
      return 'success';
    case 'WARNING':
      return 'warning';
    case 'CRITICAL':
      return 'danger';
    case 'UNKNOWN':
      return 'secondary';
    case 'PENDING':
      return 'info';
    default:
      return 'secondary';
  }
};

export const isNagiosErrorOutput = (plugin_output) => {
  if (!plugin_output) return false;
  return (
    plugin_output.includes('Return code of') &&
    plugin_output.includes('was out of bounds')
  );
};