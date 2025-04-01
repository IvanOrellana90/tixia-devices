import { useState, useEffect } from 'react';
import { supabase } from '../../../supabase/client';
import { toast } from 'react-toastify';
import DevicesByModeChart from '../Data/DevicesByModeChart';

const OverviewTab = () => {
  const [devices, setDevices] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    active: { PDA: 0, Tourniquet: 0, Kiosk: 0 },
    inactive: { PDA: 0, Tourniquet: 0, Kiosk: 0 },
    clientFilter: 'all',
  });

  const fetchDevices = async () => {
    try {
      const { data, error } = await supabase.from('devices').select(`
        id, location, mode, model, updated_at, created_at, active, 
        client_id
      `);

      if (error) throw error;
      setDevices(data || []);
    } catch (error) {
      toast.error(`Error fetching devices: ${error.message}`);
    }
  };

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase.from('clients').select('id, name');
      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      toast.error(`Error fetching clients: ${error.message}`);
    }
  };

  const getDeviceStatsByMode = (clientId = 'all') => {
    const modes = ['PDA', 'Tourniquet', 'Kiosk'];
    const stats = {
      active: { PDA: 0, Tourniquet: 0, Kiosk: 0 },
      inactive: { PDA: 0, Tourniquet: 0, Kiosk: 0 },
      clientFilter: clientId,
    };

    devices.forEach((device) => {
      if (!modes.includes(device.mode)) return;
      if (clientId !== 'all' && device.client_id !== clientId) return;

      if (device.active) {
        stats.active[device.mode]++;
      } else {
        stats.inactive[device.mode]++;
      }
    });

    return stats;
  };

  const handleClientFilter = (clientId) => {
    setStats(getDeviceStatsByMode(clientId));
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchDevices(), fetchClients()]);
      setLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (devices.length > 0) {
      setStats(getDeviceStatsByMode());
    }
  }, [devices]);

  if (loading)
    return <div className="text-center py-5">Loading devices data...</div>;
  if (devices.length === 0)
    return <div className="text-center py-5">No devices found</div>;

  return (
    <div className="row">
      <div className="col-md-12 col-xl-4">
        <DevicesByModeChart
          data={stats}
          title="Devices by Mode"
          clients={clients}
          onClientFilter={handleClientFilter}
        />
      </div>
    </div>
  );
};

export default OverviewTab;
