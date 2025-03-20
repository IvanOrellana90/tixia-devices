import { useEffect, useState } from 'react';
import { supabase } from '../../../supabase/client';
import { toast } from 'react-toastify';

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
              Se creó un nuevo registro en la tabla{' '}
              <strong>{table_name}</strong>.
            </>
          );
          badgeClass = 'border-success';
          break;
        case 'UPDATE':
          message = (
            <>
              Se actualizó un registro en la tabla <strong>{table_name}</strong>.
            </>
          );
          badgeClass = 'border-info';
          break;
        case 'DELETE':
          message = (
            <>
              Se eliminó un registro de la tabla <strong>{table_name}</strong>.
            </>
          );
          badgeClass = 'border-danger';
          break;
        default:
          message = (
            <>
              Acción desconocida en la tabla <strong>{table_name}</strong> (ID:{' '}
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
                      <span className="fs-14 fw-semibold">{log.message}</span>
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
