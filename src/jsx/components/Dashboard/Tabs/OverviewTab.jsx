import { useState, useEffect } from 'react';
import { supabase } from '../../../supabase/client';
import { toast } from 'react-toastify';

const OverviewTab = () => {
  const [devices, setDevices] = useState([]);

  const activeDevices = devices.filter((device) => device.active).length;
  const inactiveDevices = devices.filter((device) => !device.active).length;

  const fetchDevices = async () => {
    const { data, error } = await supabase.from('devices').select(`
      id,
      location,
      mode,
      model,
      updated_at,
      created_at,
      active, 
      client:client_id (name)
    `);
    if (error) toast.error(`Error fetching devices: ${error.message}`);
    else setDevices(data);
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  return <div className="row"></div>;
};

export default OverviewTab;
