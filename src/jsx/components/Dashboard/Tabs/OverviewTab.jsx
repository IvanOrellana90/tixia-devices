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

  return (
    <div className="row">
      <div className="col-xl-3 col-xxl-3 col-sm-6">
        <div className="card overflow-hidden">
          <div className="social-graph-wrapper widget-facebook"></div>
          <div className="row">
            <div className="col-6 border-end">
              <div className="pt-3 pb-3 ps-0 pe-0 text-center">
                <h4 className="m-1">
                  <span className="counter">{activeDevices}</span>
                </h4>
                {/* Alerta para dispositivos activos */}
                <a
                  href=""
                  className="badge-outline-success badge bg- badge-rounded"
                >
                  Active Devices
                </a>
              </div>
            </div>
            <div className="col-6">
              <div className="pt-3 pb-3 ps-0 pe-0 text-center">
                <h4 className="m-1">
                  <span className="counter">{inactiveDevices}</span>
                </h4>
                {/* Alerta para dispositivos inactivos */}
                <a
                  href=""
                  className="badge-outline-danger badge bg- badge-rounded"
                >
                  Inactive Devices
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
