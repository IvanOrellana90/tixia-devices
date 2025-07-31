import { processLogs, getAdditionalInfo } from '../../helpers/logs';
import { useEffect, useState } from 'react';
import { fetchLogs } from '../../services/logs';
import { Link } from 'react-router-dom';

const TABLE_LABELS = {
  devices: 'Device',
  mobiles: 'Mobile',
  device_configurations: 'Configuration',
};

const ActivityDetail = ({ deviceId }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const logsData = await fetchLogs(deviceId);
      if (logsData) {
        const processed = processLogs(logsData);
        setLogs(processed);
      }
    };
    fetchData();
  }, [deviceId]);

  const getTableLabel = (tableName) => {
    return TABLE_LABELS[tableName] || tableName;
  };

  const getMessage = (log) => {
    let badgeClass = '';
    let message = null;

    const info = getAdditionalInfo(
      log.action === 'DELETE' ? log.old_data : log.new_data
    );

    switch (log.action) {
      case 'INSERT':
        badgeClass = 'border-success';
        message = (
          <>
            A new record was created in the{' '}
            <Link to={`/${log.table_name}`} className="text-info">
              {getTableLabel(log.table_name)}
            </Link>
            .
            {info && (
              <>
                <br />
                <span className="font-monospace">{info}</span>
              </>
            )}
            {log.user_email && (
              <>
                <br />
                <span className="text-warning">{log.user_email}</span>
              </>
            )}
          </>
        );
        break;
      case 'UPDATE':
        badgeClass = 'border-info';
        message = (
          <>
            A record was updated in the{' '}
            <Link to={`/${log.table_name}`} className="text-info">
              {getTableLabel(log.table_name)}
            </Link>
            .
            {info && (
              <>
                <br />
                <span className="font-monospace">{info}</span>
              </>
            )}
            {log.user_email && (
              <>
                <br />
                <span className="text-warning">{log.user_email}</span>
              </>
            )}
          </>
        );
        break;
      case 'DELETE':
        badgeClass = 'border-danger';
        message = (
          <>
            A record was deleted from the{' '}
            <Link to={`/${log.table_name}`} className="text-info">
              {getTableLabel(log.table_name)}
            </Link>
            .
            {info && (
              <>
                <br />
                <span className="font-monospace">{info}</span>
              </>
            )}
            {log.user_email && (
              <>
                <br />
                <span className="text-warning">{log.user_email}</span>
              </>
            )}
          </>
        );
        break;
      default:
        badgeClass = 'border-warning';
        message = (
          <>
            Unknown action in the table{' '}
            <span className="text-info">{log.table_name}</span> (ID:{' '}
            <strong>{log.record_id}</strong>).
          </>
        );
    }
    return { message, badgeClass };
  };

  return (
    <div className="card">
      <div className="card-header border-0 pb-0 d-flex justify-content-between align-items-center">
        <h4 className="card-title mb-0">Last Activity</h4>
      </div>
      <div className="card-body">
        <div className="widget-timeline-status">
          <ul className="timeline">
            {logs.map((log) => {
              const { message, badgeClass } = getMessage(log);
              return (
                <li key={log.id} className="timeline-item">
                  <span className="timeline-status">{log.formattedDate}</span>
                  <div className={`timeline-badge ${badgeClass}`}></div>
                  <div className="timeline-panel">
                    <span className="fs-14">{message}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetail;
