export const processLogs = (logs) => {
  return logs.map((log) => {
    const {
      id,
      table_name,
      record_id,
      action,
      old_data,
      new_data,
      created_at,
      user_email,
    } = log;

    const date = new Date(created_at);
    const formattedDate = date.toLocaleString('es-CL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });

    // Devuelve datos puros, sin JSX
    return {
      id,
      table_name,
      record_id,
      action,
      old_data,
      new_data,
      formattedDate,
      user_email,
    };
  });
};

export const getAdditionalInfo = (data) => {
  if (data.name) return `Name: ${data.name}`;
  if (data.location) return `Location: ${data.location}`;
  return '';
};
