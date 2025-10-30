import { useEffect, useState } from 'react';
import { supabase } from '../../supabase/client';
import { toast } from 'react-toastify';

const VisitDevicesCard = ({ visitId }) => {
  const [devices, setDevices] = useState([]);
  const [allDevices, setAllDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const [note, setNote] = useState('');
  const [visit, setVisit] = useState(null);

  // 🧩 Cargar visita actual (para filtrar por client/site/facility)
  useEffect(() => {
    const fetchVisit = async () => {
      const { data, error } = await supabase
        .from('visits')
        .select('id, client_id, site_id, facility_id')
        .eq('id', visitId)
        .single();
      if (error) {
        toast.error('Error loading visit details');
      } else {
        setVisit(data);
      }
    };
    if (visitId) fetchVisit();
  }, [visitId]);

  // 🧩 Cargar devices asignados
  useEffect(() => {
    if (!visitId) return;
    fetchVisitDevices();
  }, [visitId]);

  const fetchVisitDevices = async () => {
    const { data, error } = await supabase
      .from('visit_devices')
      .select(
        `
        device_id,
        notes,
        created_at,
        devices (id, location)
      `
      )
      .eq('visit_id', visitId);
    if (error) {
      toast.error('Error loading visit devices');
    } else {
      setDevices(data || []);
    }
  };

  useEffect(() => {
    if (!visit) return;

    const fetchAllDevices = async () => {
      let query = supabase
        .from('devices')
        .select(
          'id, location, mode, version_name, client_id, site_id, facility_id'
        )
        .eq('client_id', visit.client_id);

      if (visit.site_id) query = query.eq('site_id', visit.site_id);
      if (visit.facility_id) query = query.eq('facility_id', visit.facility_id);

      const { data, error } = await query.order('location', {
        ascending: true,
      });

      if (error) {
        toast.error('Error loading available devices');
      } else {
        setAllDevices(data || []);
      }
    };

    fetchAllDevices();
  }, [visit]);

  // ➕ Agregar equipo
  const handleAddDevice = async () => {
    try {
      const { error } = await supabase.from('visit_devices').insert([
        {
          visit_id: visitId,
          device_id: selectedDeviceId,
          notes: note || null,
        },
      ]);
      if (error) throw error;

      toast.success('Device added');
      setSelectedDeviceId('');
      setNote('');
      fetchVisitDevices();
    } catch (err) {
      toast.error(`Error adding device: ${err.message}`);
    }
  };

  // ❌ Eliminar equipo
  const handleRemoveDevice = async (deviceId) => {
    if (!window.confirm('Remove this device?')) return;
    try {
      const { error } = await supabase
        .from('visit_devices')
        .delete()
        .eq('visit_id', visitId)
        .eq('device_id', deviceId);
      if (error) throw error;
      setDevices((prev) => prev.filter((d) => d.device_id !== deviceId));
      toast.info('Device removed');
    } catch (err) {
      toast.error(`Error removing device: ${err.message}`);
    }
  };

  return (
    <div className="card mt-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">Devices Assigned</h5>
      </div>

      <div className="card-body">
        {devices.length > 0 ? (
          <div className="table-responsive mb-3">
            <table className="table table-sm table-striped align-middle">
              <thead>
                <tr>
                  <th>Location</th>
                  <th>Notes</th>
                  <th>Assigned</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {devices.map((d) => (
                  <tr key={d.device_id}>
                    <td>{d.devices?.location || '-'}</td>
                    <td>{d.notes || '-'}</td>
                    <td>
                      {d.created_at
                        ? new Date(d.created_at).toLocaleString(undefined, {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : '-'}
                    </td>
                    <td className="text-end">
                      <button
                        className="btn btn-danger btn-xs"
                        onClick={() => handleRemoveDevice(d.device_id)}
                      >
                        <i className="fa fa-trash" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted mb-3">No devices assigned yet.</p>
        )}

        {/* Add device form */}
        <div className="border-top pt-3">
          <h6 className="mb-2">Add Device</h6>
          <div className="row align-items-end">
            <div className="col-md-5">
              <label>Device</label>
              <select
                className="form-select"
                value={selectedDeviceId}
                onChange={(e) => setSelectedDeviceId(e.target.value)}
              >
                <option value="">Select device</option>
                {allDevices.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.location} ({d.mode})
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label>Notes</label>
              <input
                type="text"
                className="form-control"
                placeholder="Optional notes..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <button
                className="btn btn-outline-success btn-md w-100"
                onClick={handleAddDevice}
                disabled={!selectedDeviceId}
              >
                + Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitDevicesCard;
