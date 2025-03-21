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
import { supabase } from '../../../supabase/client';
import { toast } from 'react-toastify';

const DevicesChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      const twelveMonthsAgo = new Date();
      twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

      const { data: devices, error } = await supabase
        .from('devices')
        .select('id, created_at, mode') // Obtener el campo mode
        .gte('created_at', twelveMonthsAgo.toISOString());

      if (error) {
        toast.error(`Error fetching devices: ${error.message}`);
      } else {
        const processedData = processDeviceData(devices);
        setData(processedData);
      }
    };

    fetchDevices();
  }, []);

  const processDeviceData = (devices) => {
    const monthlyCounts = {};

    devices.forEach((device) => {
      const createdAt = new Date(device.created_at);
      const monthYear = `${createdAt.getFullYear()}-${String(createdAt.getMonth() + 1).padStart(2, '0')}`; // Formato: YYYY-MM
      const mode = device.mode; // Obtener el tipo de dispositivo (pda, kiosk, tourniquet)

      if (!monthlyCounts[monthYear]) {
        monthlyCounts[monthYear] = { pda: 0, kiosk: 0, tourniquet: 0 }; // Inicializar contadores para cada tipo
      }

      if (mode.toLowerCase() === 'pda') {
        monthlyCounts[monthYear].pda++;
      } else if (mode.toLowerCase() === 'kiosk') {
        monthlyCounts[monthYear].kiosk++;
      } else if (mode.toLowerCase() === 'tourniquet') {
        monthlyCounts[monthYear].tourniquet++;
      }
    });

    // Convertir el objeto a un array de objetos para Recharts
    const data = Object.keys(monthlyCounts).map((monthYear) => ({
      name: monthYear,
      ...monthlyCounts[monthYear], // Incluir los contadores de cada tipo
    }));

    return data;
  };

  return (
    <div style={{ width: '100%', height: '358px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pda"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            name="PDA"
          />
          <Line type="monotone" dataKey="kiosk" stroke="#82ca9d" name="Kiosk" />
          <Line
            type="monotone"
            dataKey="tourniquet"
            stroke="#ff8042"
            name="Tourniquet"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DevicesChart;
