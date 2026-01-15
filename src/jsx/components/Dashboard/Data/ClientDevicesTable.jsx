import { Table, Badge } from 'react-bootstrap';
import { useMemo, useState } from 'react';
import { useGlobalMetrics } from '../../../hooks/useGlobalMetrics';
// Si prefieres usar tu archivo de helpers, descomenta esta línea y borra la función formatDuration de abajo
// import { formatDuration } from '../../../helpers/helpers';

export default function ClientDevicesTable({ clients, devices }) {
  const [sortBy, setSortBy] = useState({ key: 'total', dir: 'desc' }); // default

  const { data: metricsData, loading: metricsLoading } = useGlobalMetrics(30);

  const { 
    clientStats, 
    grandTotal, 
    totalAccess, 
    globalAvgLatency // <--- Variable nueva recuperada del useMemo
  } = useMemo(() => {
    if (!clients || !devices) {
      return {
        clientStats: [],
        grandTotal: 0,
        totalPda: 0,
        totalKiosk: 0,
        totalTourniquet: 0,
        totalAccess: 0,
        globalAvgLatency: 0,
      };
    }

    // --- 1. Procesar Métricas de BigQuery ---
    const metricsMap = new Map();
    let totalAccess = 0;
    let accumulatedLatency = 0; // Acumulador para promedio ponderado

    if (metricsData) {
      metricsData.forEach((m) => {
        const count = Number(m.count || 0);
        const lat = Number(m.avgLatency || 0);

        metricsMap.set(m.clientDb, { count, avgLatency: lat });
        
        totalAccess += count;
        // Multiplicamos (Latencia del cliente * Sus eventos) para ponderar
        accumulatedLatency += (lat * count);
      });
    }

    // Calculamos el promedio global ponderado
    const globalAvgLatency = totalAccess > 0 
      ? accumulatedLatency / totalAccess 
      : 0;

    // --- 2. Procesar Dispositivos ---
    const grandTotal = devices.length;
    const totalPda = devices.filter((d) => d.mode?.toLowerCase() === 'pda').length;
    const totalKiosk = devices.filter((d) => d.mode?.toLowerCase() === 'kiosk').length;
    const totalTourniquet = devices.filter((d) => d.mode?.toLowerCase() === 'tourniquet').length;

    // --- 3. Mapear Clientes ---
    const clientStats = clients.map((client) => {
      const clientDevices = devices.filter((d) => d.client_id === client.id);

      const total = clientDevices.length;
      const pda = clientDevices.filter((d) => d.mode?.toLowerCase() === 'pda').length;
      const kiosk = clientDevices.filter((d) => d.mode?.toLowerCase() === 'kiosk').length;
      const tourniquet = clientDevices.filter((d) => d.mode?.toLowerCase() === 'tourniquet').length;

      const percentage =
        grandTotal > 0 ? Number(((total / grandTotal) * 100).toFixed(1)) : 0;

      // Access metrics
      const clientMetric = client.bigquery_db ? metricsMap.get(client.bigquery_db) : null;
      // Usamos Nullish Coalescing (??) para seguridad
      const accessCount = clientMetric?.count ?? 0;
      const avgLatency = clientMetric?.avgLatency ?? 0;
      
      const accessPercentage = totalAccess > 0 ? Number(((accessCount / totalAccess) * 100).toFixed(1)) : 0;

      return {
        id: client.id,
        name: client.name,
        total,
        pda,
        kiosk,
        tourniquet,
        percentage,
        accessCount,
        avgLatency,
        accessPercentage,
      };
    });

    return { 
      clientStats, 
      grandTotal, 
      totalPda, 
      totalKiosk, 
      totalTourniquet, 
      totalAccess, 
      globalAvgLatency // Retornamos el cálculo global
    };
  }, [clients, devices, metricsData]);

  // ---- ordenar por columna ----
  const sortedStats = useMemo(() => {
    const copy = [...clientStats];
    const { key, dir } = sortBy;

    copy.sort((a, b) => {
      const va = a[key];
      const vb = b[key];

      if (typeof va === 'string' || typeof vb === 'string') {
        const comp = String(va ?? '').localeCompare(String(vb ?? ''), 'es', {
          sensitivity: 'base',
        });
        return dir === 'asc' ? comp : -comp;
      } else {
        const comp = (va ?? 0) - (vb ?? 0);
        return dir === 'asc' ? comp : -comp;
      }
    });

    return copy;
  }, [clientStats, sortBy]);

  // ---- click en headers ----
  const handleSort = (key) => {
    setSortBy((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
        : { key, dir: 'asc' }
    );
  };

  const sortIndicator = (key) =>
    sortBy.key === key ? (sortBy.dir === 'asc' ? ' ▲' : ' ▼') : '';

  return (
    <div className="card">
      <div className="card-header">
        <h4 className="text-black mb-0">Devices by Client</h4>
      </div>

      <div className="card-body">
        <Table responsive striped hover className="table-responsive-sm align-middle">
          <thead>
            <tr>
              <th role="button" className="user-select-none" onClick={() => handleSort('name')}>
                Client{sortIndicator('name')}
              </th>

              <th role="button" className="text-center user-select-none" onClick={() => handleSort('pda')}>
                PDA{sortIndicator('pda')}
              </th>

              <th role="button" className="text-center user-select-none" onClick={() => handleSort('kiosk')}>
                KKO{sortIndicator('kiosk')}
              </th>

              <th role="button" className="text-center user-select-none" onClick={() => handleSort('tourniquet')}>
                TOR{sortIndicator('tourniquet')}
              </th>

              <th role="button" className="text-center user-select-none" onClick={() => handleSort('total')}>
                Total{sortIndicator('total')}
              </th>

              <th
                role="button"
                className="text-center user-select-none"
                onClick={() => handleSort('percentage')}
                title="% of all devices"
              >
                % Dev{sortIndicator('percentage')}
              </th>

              <th
                role="button"
                className="text-center user-select-none"
                onClick={() => handleSort('accessCount')}
              >
                Access{sortIndicator('accessCount')}
              </th>

              <th
                role="button"
                className="text-center user-select-none"
                onClick={() => handleSort('accessPercentage')}
                title="% of total access"
              >
                % Acc{sortIndicator('accessPercentage')}
              </th>

              <th
                role="button"
                className="text-center user-select-none"
                onClick={() => handleSort('avgLatency')}
                title="Average upload latency"
              >
                Latency{sortIndicator('avgLatency')}
              </th>
            </tr>
          </thead>

          <tbody>
            {sortedStats.map((stat) => (
              <tr key={stat.id}>
                <td>
                  <a href={`/client/${stat.id}`} className="link-primary">
                    {stat.name}
                  </a>
                </td>

                <td className="text-center">{stat.pda}</td>
                <td className="text-center">{stat.kiosk}</td>
                <td className="text-center">{stat.tourniquet}</td>

                <td className="text-center">
                  <span className="text-primary light">{stat.total}</span>
                </td>

                <td className="text-center">
                  <Badge bg="" className="light badge-primary" pill>
                    {stat.percentage}%
                  </Badge>
                </td>

                <td className="text-center">
                  <span className="text-success">{metricsLoading ? '...' : stat.accessCount.toLocaleString()}</span>
                </td>

                <td className="text-center">
                  <Badge bg="" className="light badge-success" pill>
                    {stat.accessPercentage}%
                  </Badge>
                </td>

                <td className="text-center">
                  {/* Usamos formatDuration y nos aseguramos que no sea undefined */}
                  <span className="text-info font-monospace">
                    {metricsLoading ? '...' : formatDuration(stat.avgLatency)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="text-muted small mt-2 d-flex gap-4">
          <span>Total devices: <strong>{grandTotal.toLocaleString()}</strong></span>
          
          <span>
            Total access (30d): <strong>{metricsLoading ? 'Loading...' : totalAccess.toLocaleString()}</strong>
          </span>
          
          {/* Corregido: Usamos globalAvgLatency y el formateador */}
          <span>
            Avg Latency (30d): <strong>
                {metricsLoading ? 'Loading...' : formatDuration(globalAvgLatency)}
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
}

// --- Helper Function (Puedes moverla a helpers.js si prefieres) ---
const formatDuration = (secondsInput) => {
  const seconds = Number(secondsInput || 0);
  
  // Si es negativo o cero/inválido, retornamos 00:00:00
  if (seconds <= 0) return "00:00:00";

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const hh = h.toString().padStart(2, '0');
  const mm = m.toString().padStart(2, '0');
  const ss = s.toString().padStart(2, '0');

  return `${hh}:${mm}:${ss}`;
};