import { Table, Badge } from 'react-bootstrap';
import { useMemo } from 'react';

export default function ClientDevicesTable({ clients, devices }) {
  // 👇 agrupar dispositivos por cliente
  const clientStats = useMemo(() => {
    if (!clients || !devices) return [];

    return clients.map((client) => {
      const clientDevices = devices.filter((d) => d.client_id === client.id);

      return {
        id: client.id,
        name: client.name,
        total: clientDevices.length,
        pda: clientDevices.filter((d) => d.mode?.toLowerCase() === 'pda')
          .length,
        kiosk: clientDevices.filter((d) => d.mode?.toLowerCase() === 'kiosk')
          .length,
        tourniquet: clientDevices.filter(
          (d) => d.mode?.toLowerCase() === 'tourniquet'
        ).length,
      };
    });
  }, [clients, devices]);

  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Devices by Client</h4>
      </div>
      <div className="card-body">
        <Table responsive striped hover className="table-responsive-sm">
          <thead>
            <tr>
              <th>Client</th>
              <th>PDA</th>
              <th>KKO</th>
              <th>TOR</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {clientStats.map((stat, index) => (
              <tr key={stat.id}>
                <td>{stat.name}</td>
                <td>{stat.pda}</td>
                <td>{stat.kiosk}</td>
                <td>{stat.tourniquet}</td>
                <td>
                  <strong className="text-info">{stat.total}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
