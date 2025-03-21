import { useEffect, useState } from 'react';
import { supabase } from '../../../supabase/client';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ActivityTab = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const logsData = await fetchLogs();
      if (logsData) {
        const processedLogs = processLogs(logsData);
        setLogs(processedLogs);
      }
    };

    fetchData();
  }, []);

  const fetchLogs = async () => {
    const { data, error } = await supabase
      .from('logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      toast.error(`Error fetching logs: ${error.message}`);
    } else {
      return data;
    }
  };

  const getAdditionalInfo = (data, email) => {
    if (data.name) {
      return (
        <>
          <br />
          <span className="font-monospace">Name: {data.name}</span>
          {email && (
            <>
              <br />
              <span className="text-warning">{email}</span>
            </>
          )}
        </>
      );
    } else if (data.location) {
      return (
        <>
          <br />
          <span className="font-monospace">Location: {data.location}</span>
          {email && (
            <>
              <br />
              <span className="text-warning">{email}</span>
            </>
          )}
        </>
      );
    }
    return null;
  };

  const processLogs = (logs) => {
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

      let message = '';
      let badgeClass = '';

      switch (action) {
        case 'INSERT':
          message = (
            <>
              A new record was created in the table{' '}
              <Link to={`/${table_name}`} className="text-info">
                {table_name}
              </Link>
              .{getAdditionalInfo(new_data, user_email)}
            </>
          );
          badgeClass = 'border-success';
          break;

        case 'UPDATE':
          message = (
            <>
              A record was updated in the table{' '}
              <Link to={`/${table_name}`} className="text-info">
                {table_name}
              </Link>
              {getAdditionalInfo(new_data, user_email)}
            </>
          );
          badgeClass = 'border-info';
          break;

        case 'DELETE':
          message = (
            <>
              A record was deleted from the table{' '}
              <Link to={`/${table_name}`} className="text-info">
                {table_name}
              </Link>
              {getAdditionalInfo(old_data, user_email)}
            </>
          );
          badgeClass = 'border-danger';
          break;

        default:
          message = (
            <>
              Unknown action in the table{' '}
              <span className="text-info">{table_name}</span> (ID:{' '}
              <strong>{record_id}</strong>).
            </>
          );
          badgeClass = 'border-warning';
      }

      return {
        id,
        date: formattedDate,
        message,
        badgeClass,
      };
    });
  };

  return (
    <div className="row">
      <div className="col-md-12 col-xxl-6">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title mb-0">Last Activity</h4>
          </div>
          <div className="card-body">
            <div className="widget-timeline-status">
              <ul className="timeline">
                {logs.map((log) => (
                  <li key={log.id} className="timeline-item">
                    <span className="timeline-status">{log.date}</span>
                    <div className={`timeline-badge ${log.badgeClass}`}></div>
                    <div className="timeline-panel">
                      <span className="fs-14">{log.message}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityTab;
