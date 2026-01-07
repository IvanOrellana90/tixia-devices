import { Table, Badge } from 'react-bootstrap';
import { useMemo, useState } from 'react';

const normMode = (m) => (m ?? '').toString().trim().toLowerCase();

export default function SitesDevicesTable({ sites = [], devices = [] }) {
  const [sortBy, setSortBy] = useState({ key: 'total', dir: 'desc' });

  const { rows, clientTotal } = useMemo(() => {
    const clientTotal = devices.length;

    // Group devices by site_id for performance
    const bySite = new Map();
    for (const d of devices) {
      const sid = d.site_id;
      if (!sid) continue;
      if (!bySite.has(sid)) bySite.set(sid, []);
      bySite.get(sid).push(d);
    }

    const rows = sites.map((site) => {
      const list = bySite.get(site.id) || [];

      const pda = list.filter((d) => normMode(d.mode) === 'pda').length;
      const kiosk = list.filter((d) => normMode(d.mode) === 'kiosk').length;
      const tourniquet = list.filter((d) => normMode(d.mode) === 'tourniquet').length;

      const total = pda + kiosk + tourniquet;
      const percentage =
        clientTotal > 0 ? Number(((total / clientTotal) * 100).toFixed(1)) : 0;

      return {
        id: site.id,
        name: site.name ?? `Site ${site.id}`,
        pda,
        kiosk,
        tourniquet,
        total,
        percentage,
      };
    });

    return { rows, clientTotal };
  }, [sites, devices]);

  // ---- sort by column ----
  const sortedRows = useMemo(() => {
    const copy = [...rows];
    const { key, dir } = sortBy;

    copy.sort((a, b) => {
      const va = a[key];
      const vb = b[key];

      // string vs number
      if (typeof va === 'string' || typeof vb === 'string') {
        const comp = String(va ?? '').localeCompare(String(vb ?? ''), 'en', {
          sensitivity: 'base',
        });
        return dir === 'asc' ? comp : -comp;
      }

      const comp = (va ?? 0) - (vb ?? 0);
      return dir === 'asc' ? comp : -comp;
    });

    return copy;
  }, [rows, sortBy]);

  // ---- header click ----
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
        <h4 className="text-black mb-0">Devices by Site</h4>
      </div>

      <div className="card-body">
        <Table responsive striped hover className="table-responsive-sm align-middle">
          <thead>
            <tr>
              <th
                role="button"
                className="user-select-none"
                onClick={() => handleSort('name')}
              >
                Site{sortIndicator('name')}
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
                Kiosk{sortIndicator('kiosk')}
              </th>

              <th
                role="button"
                className="text-center user-select-none"
                onClick={() => handleSort('tourniquet')}
              >
                Tourniquet{sortIndicator('tourniquet')}
              </th>

              <th
                role="button"
                className="text-center user-select-none"
                onClick={() => handleSort('total')}
              >
                Total{sortIndicator('total')}
              </th>

              <th
                role="button"
                className="text-center user-select-none"
                onClick={() => handleSort('percentage')}
                title="% of client devices"
              >
                %{sortIndicator('percentage')}
              </th>
            </tr>
          </thead>

          <tbody>
            {sortedRows.map((r) => (
              <tr key={r.id}>
                <td>
                  <span className="text-black">{r.name}</span>
                </td>

                <td className="text-center">{r.pda}</td>
                <td className="text-center">{r.kiosk}</td>
                <td className="text-center">{r.tourniquet}</td>

                <td className="text-center">
                  <span className="text-primary light">{r.total}</span>
                </td>

                <td className="text-center">
                  <Badge bg="" className="light badge-primary" pill>
                    {r.percentage}%
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="text-muted small mt-2">
          Client total devices: <strong>{clientTotal.toLocaleString()}</strong>
        </div>
      </div>
    </div>
  );
}
