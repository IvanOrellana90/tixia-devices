import { Table, Badge } from 'react-bootstrap';
import { useMemo, useState } from 'react';

export default function ClientDevicesTable({ clients, devices }) {
  const [sortBy, setSortBy] = useState({ key: 'total', dir: 'desc' }); // default

  const { clientStats, grandTotal, totalPda, totalKiosk, totalTourniquet } =
    useMemo(() => {
      if (!clients || !devices) {
        return {
          clientStats: [],
          grandTotal: 0,
          totalPda: 0,
          totalKiosk: 0,
          totalTourniquet: 0,
        };
      }

      const grandTotal = devices.length;
      const totalPda = devices.filter(
        (d) => d.mode?.toLowerCase() === 'pda'
      ).length;
      const totalKiosk = devices.filter(
        (d) => d.mode?.toLowerCase() === 'kiosk'
      ).length;
      const totalTourniquet = devices.filter(
        (d) => d.mode?.toLowerCase() === 'tourniquet'
      ).length;

      const clientStats = clients.map((client) => {
        const clientDevices = devices.filter((d) => d.client_id === client.id);
        const total = clientDevices.length;
        const pda = clientDevices.filter(
          (d) => d.mode?.toLowerCase() === 'pda'
        ).length;
        const kiosk = clientDevices.filter(
          (d) => d.mode?.toLowerCase() === 'kiosk'
        ).length;
        const tourniquet = clientDevices.filter(
          (d) => d.mode?.toLowerCase() === 'tourniquet'
        ).length;
        const percentage =
          grandTotal > 0 ? Number(((total / grandTotal) * 100).toFixed(1)) : 0;

        return {
          id: client.id,
          name: client.name,
          total,
          pda,
          kiosk,
          tourniquet,
          percentage,
        };
      });

      return { clientStats, grandTotal, totalPda, totalKiosk, totalTourniquet };
    }, [clients, devices]);

  // ---- ordenar por columna ----
  const sortedStats = useMemo(() => {
    const copy = [...clientStats];
    const { key, dir } = sortBy;

    copy.sort((a, b) => {
      const va = a[key];
      const vb = b[key];

      // texto vs número
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
        <Table
          responsive
          striped
          hover
          className="table-responsive-sm align-middle"
        >
          <thead>
            <tr>
              <th
                role="button"
                className="user-select-none"
                onClick={() => handleSort('name')}
              >
                Client{sortIndicator('name')}
              </th>
              <th
                role="button"
                className="text-center user-select-none"
                onClick={() => handleSort('pda')}
              >
                PDA{sortIndicator('pda')}
              </th>
              <th
                role="button"
                className="text-center user-select-none"
                onClick={() => handleSort('kiosk')}
              >
                KKO{sortIndicator('kiosk')}
              </th>
              <th
                role="button"
                className="text-center user-select-none"
                onClick={() => handleSort('tourniquet')}
              >
                TOR{sortIndicator('tourniquet')}
              </th>
              <th
                role="button"
                className="text-center user-select-none"
                onClick={() => handleSort('total')}
              >
                Total{sortIndicator('total')}
              </th>
            </tr>
          </thead>

          <tbody>
            {sortedStats.map((stat) => (
              <tr key={stat.id}>
                <td>{stat.name}</td>
                <td className="text-center">{stat.pda}</td>
                <td className="text-center">{stat.kiosk}</td>
                <td className="text-center">{stat.tourniquet}</td>
                <td className="text-center">
                  <div className="d-flex justify-content-center align-items-center gap-2">
                    <span className="text-primary light">{stat.total}</span>
                    <Badge bg="" className="light badge-primary" pill>
                      {stat.percentage}%
                    </Badge>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
