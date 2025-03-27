import { useEffect, useState } from 'react';
import { supabase } from '../../../supabase/client';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';

const ActivityTab = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

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
      .not('user_email', 'is', null)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      toast.error(`Error fetching logs: ${error.message}`);
    } else {
      return data;
    }
  };

  const exportToExcel = async () => {
    try {
      // Obtener todos los logs de la base de datos
      const { data: logsData, error } = await supabase
        .from('logs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast.error(`Error fetching logs for export: ${error.message}`);
        return;
      }

      // Formatear los datos para Excel
      const formattedData = logsData.map((log) => ({
        ID: log.id,
        Table: log.table_name,
        Action: log.action,
        'Record ID': log.record_id,
        'Old Data': JSON.stringify(log.old_data),
        'New Data': JSON.stringify(log.new_data),
        'User Email': log.user_email,
        'Created At': new Date(log.created_at).toLocaleString(),
      }));

      // Crear una hoja de cálculo
      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Logs');

      // Generar y descargar el archivo Excel
      XLSX.writeFile(workbook, 'logs_export.xlsx');
      toast.success('Logs exported successfully!');
    } catch (err) {
      toast.error(`Error exporting logs: ${err.message}`);
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
    <div className="col-xl-6 col-xxxl-6 col-12">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4 className="card-title mb-0">Last Activity</h4>
          <button
            onClick={exportToExcel}
            className="btn btn-outline-success btn-sm"
          >
            <span className="d-none d-sm-inline">Excel</span>
            <i className="fas fa-file-excel d-sm-none"></i>
          </button>
        </div>
        <div className="card-body p-0">
          <div className="widget-timeline-status">
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <ul className="timeline timeline-mobile px-3">
                {logs.map((log) => (
                  <li key={log.id} className="timeline-item mb-3">
                    <div className="d-flex flex-column flex-sm-row">
                      <div className="d-flex align-items-start mb-2 mb-sm-0">
                        <div
                          className={`timeline-badge ${log.badgeClass} me-2`}
                        ></div>
                        <span className="timeline-status text-muted small">
                          {log.date}
                        </span>
                      </div>
                      <div className="timeline-panel flex-grow-1">
                        <span className="fs-14">{log.message}</span>
                      </div>
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
