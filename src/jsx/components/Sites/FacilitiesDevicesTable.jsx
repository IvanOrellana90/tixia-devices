import { Table, Badge } from 'react-bootstrap';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFacilitiesMetrics } from '../../hooks/useFacilitiesMetrics';

const normMode = (m) => (m ?? '').toString().trim().toLowerCase();

export default function FacilitiesDevicesTable({ facilities = [], devices = [], clientDb, siteId }) {
    const [sortBy, setSortBy] = useState({ key: 'total', dir: 'desc' });
    const { data: metricsData, loading: metricsLoading } = useFacilitiesMetrics(clientDb, siteId, 30);

    const { rows, siteTotalDevices, siteTotalAccess } = useMemo(() => {
        const siteTotalDevices = devices.length;

        // Map metrics by facilityId
        const metricsMap = new Map();
        let totalAccess = 0;
        if (metricsData) {
            metricsData.forEach((m) => {
                metricsMap.set(m.facilityId, m.count);
                totalAccess += m.count;
            });
        }

        // Group devices by facility_id
        const byFacility = new Map();
        for (const d of devices) {
            const fid = d.facility_id;
            if (!fid) continue;
            if (!byFacility.has(fid)) byFacility.set(fid, []);
            byFacility.get(fid).push(d);
        }

        const rows = facilities.map((facility) => {
            const list = byFacility.get(facility.id) || [];

            const pda = list.filter((d) => normMode(d.mode) === 'pda').length;
            const kiosk = list.filter((d) => normMode(d.mode) === 'kiosk').length;
            const tourniquet = list.filter((d) => normMode(d.mode) === 'tourniquet').length;

            const totalDevices = pda + kiosk + tourniquet;

            const devicePercentage =
                siteTotalDevices > 0 ? Number(((totalDevices / siteTotalDevices) * 100).toFixed(1)) : 0;

            // Access metrics
            const ksecId = facility.ksec_id ? Number(facility.ksec_id) : null;
            const accessCount = ksecId ? (metricsMap.get(ksecId) || 0) : 0;
            const accessPercentage =
                totalAccess > 0 ? Number(((accessCount / totalAccess) * 100).toFixed(1)) : 0;

            return {
                id: facility.id,
                name: facility.name ?? `Facility ${facility.id}`,
                pda,
                kiosk,
                tourniquet,
                totalDevices,
                devicePercentage,
                accessCount,
                accessPercentage,
            };
        });

        return { rows, siteTotalDevices, siteTotalAccess: totalAccess };
    }, [facilities, devices, metricsData]);

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
                <h4 className="text-black mb-0">Devices & Access by Facility</h4>
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
                                Facility{sortIndicator('name')}
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
                                onClick={() => handleSort('totalDevices')}
                            >
                                Devices{sortIndicator('totalDevices')}
                            </th>

                            <th
                                role="button"
                                className="text-center user-select-none"
                                onClick={() => handleSort('devicePercentage')}
                                title="% of site devices"
                            >
                                % Dev{sortIndicator('devicePercentage')}
                            </th>

                            <th
                                role="button"
                                className="text-center user-select-none"
                                onClick={() => handleSort('accessCount')}
                            >
                                Access {sortIndicator('accessCount')}
                            </th>

                            <th
                                role="button"
                                className="text-center user-select-none"
                                onClick={() => handleSort('accessPercentage')}
                                title="% of total access"
                            >
                                % Acc{sortIndicator('accessPercentage')}
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
                                    <span className="text-primary light">{r.totalDevices}</span>
                                </td>

                                <td className="text-center">
                                    <Badge bg="" className="light badge-primary" pill>
                                        {r.devicePercentage}%
                                    </Badge>
                                </td>

                                <td className="text-center">
                                    <span className="text-success">{metricsLoading ? '...' : r.accessCount.toLocaleString()}</span>
                                </td>

                                <td className="text-center">
                                    <Badge bg="" className="light badge-success" pill>
                                        {r.accessPercentage}%
                                    </Badge>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <div className="text-muted small mt-2 d-flex gap-4">
                    <span>Total devices: <strong>{siteTotalDevices.toLocaleString()}</strong></span>
                    <span>Total access (30d): <strong>{metricsLoading ? 'Loading...' : siteTotalAccess.toLocaleString()}</strong></span>
                </div>
            </div>
        </div>
    );
}
