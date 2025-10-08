import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { toast } from 'react-toastify';

const AccessesChartCard = ({ client_db, device_location }) => {
  const [data, setData] = useState([]);
  const [range, setRange] = useState('day');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAccesses = async () => {
      if (!client_db || !device_location) return;
      setLoading(true);
      try {
        const res = await fetch('/.netlify/functions/getAccessesSummary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ client_db, device_location, range }),
        });

        const result = await res.json();

        if (!res.ok) throw new Error(result.error || 'Error al obtener datos');

        // 🔄 Reestructurar los datos
        const grouped = {};
        result.forEach((row) => {
          const period = row.period;
          if (!grouped[period]) {
            grouped[period] = { name: period, manual: 0, qr: 0, lectura: 0 };
          }
          const action = row.action?.toLowerCase();
          if (grouped[period][action] !== undefined) {
            grouped[period][action] += row.total_accesses;
          }
        });

        const chartData = Object.values(grouped).reverse();
        setData(chartData);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAccesses();
  }, [client_db, device_location, range]);

  return (
    <div className="card shadow-sm p-3">
      <h5 className="mb-3 text-center">Accesos por {range}</h5>
      <div className="d-flex justify-content-center mb-3 gap-2">
        {['day', 'week', 'month', 'year'].map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`btn btn-sm ${range === r ? 'btn-primary' : 'btn-outline-primary'}`}
          >
            {r === 'day'
              ? 'Diario'
              : r === 'week'
                ? 'Semanal'
                : r === 'month'
                  ? 'Mensual'
                  : 'Anual'}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-5">Cargando datos...</div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="manual"
              stroke="#007bff"
              name="Manual"
            />
            <Line type="monotone" dataKey="qr" stroke="#28a745" name="QR" />
            <Line
              type="monotone"
              dataKey="lectura"
              stroke="#ffc107"
              name="Lectura"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default AccessesChartCard;
