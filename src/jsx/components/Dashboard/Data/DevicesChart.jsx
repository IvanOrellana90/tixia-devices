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

// Helper function to get device name in tooltip
const getDeviceName = (dataKey) => {
  switch (dataKey) {
    case 'pda':
      return 'PDAs';
    case 'kiosk':
      return 'Kiosks';
    case 'tourniquet':
      return 'Tourniquets';
    default:
      return dataKey;
  }
};

const DevicesChart = () => {
  const [data, setData] = useState([]);
  const [timeRange, setTimeRange] = useState('30days'); // '12months', '30days', '7days'
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDevices = async () => {
      setIsLoading(true);
      try {
        const now = new Date();
        let startDate = new Date();

        // Adjust start date based on selected range
        if (timeRange === '12months') {
          startDate.setMonth(now.getMonth() - 12);
        } else if (timeRange === '30days') {
          startDate.setDate(now.getDate() - 30);
        } else if (timeRange === '7days') {
          startDate.setDate(now.getDate() - 7);
        }

        const { data: devices, error } = await supabase
          .from('devices')
          .select('id, created_at, mode')
          .gte('created_at', startDate.toISOString())
          .order('created_at', { ascending: true });

        if (error) {
          throw error;
        }

        const processedData = processDeviceData(devices, timeRange);
        setData(processedData);
      } catch (error) {
        toast.error(`Error fetching devices: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDevices();
  }, [timeRange]);

  const processDeviceData = (devices, range) => {
    const counts = {};

    devices.forEach((device) => {
      const createdAt = new Date(device.created_at);
      let key;

      // Determine granularity based on time range
      if (range === '12months') {
        // Monthly grouping for annual range
        key = `${createdAt.getFullYear()}-${String(createdAt.getMonth() + 1).padStart(2, '0')}`;
      } else {
        // Daily grouping for monthly and weekly ranges
        key = `${createdAt.getFullYear()}-${String(createdAt.getMonth() + 1).padStart(2, '0')}-${String(createdAt.getDate()).padStart(2, '0')}`;
      }

      const mode = device.mode.toLowerCase();

      if (!counts[key]) {
        counts[key] = {
          name: key,
          pda: 0,
          kiosk: 0,
          tourniquet: 0,
          // Add full date for sorting
          fullDate: new Date(
            createdAt.getFullYear(),
            createdAt.getMonth(),
            createdAt.getDate()
          ),
        };
      }

      if (mode === 'pda') counts[key].pda++;
      else if (mode === 'kiosk') counts[key].kiosk++;
      else if (mode === 'tourniquet') counts[key].tourniquet++;
    });

    // Convert to array and sort by date
    const result = Object.values(counts).sort(
      (a, b) => a.fullDate - b.fullDate
    );

    // Format name for better display
    return result.map((item) => ({
      ...item,
      name: formatLabel(item.name, range),
    }));
  };

  // Function to format X-axis labels based on range
  const formatLabel = (dateString, range) => {
    if (range === '12months') {
      // Display as "MMM YYYY" (e.g., "Jan 2023")
      const [year, month] = dateString.split('-');
      return new Date(year, month - 1).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      });
    } else {
      // Display as "MM/DD" (e.g., "01/15")
      const [year, month, day] = dateString.split('-');
      return `${month}/${day}`;
    }
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <div
        style={{
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
        }}
      >
        <button
          onClick={() => setTimeRange('12months')}
          className={`btn ${timeRange === '12months' ? 'btn-info' : 'btn-outline-info'}`}
        >
          Last 12 Months
        </button>
        <button
          onClick={() => setTimeRange('30days')}
          className={`btn ${timeRange === '30days' ? 'btn-info' : 'btn-outline-info'}`}
        >
          Last 30 Days
        </button>
        <button
          onClick={() => setTimeRange('7days')}
          className={`btn ${timeRange === '7days' ? 'btn-info' : 'btn-outline-info'}`}
        >
          Last 7 Days
        </button>
      </div>

      {isLoading ? (
        <div
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Loading data...
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="90%">
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
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              interval={timeRange === '7days' ? 0 : 'preserveEnd'} // Show all labels for 7 days
            />
            <YAxis />
            <Tooltip
              formatter={(value, name) => [value, getDeviceName(name)]}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="pda"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              name="PDA"
            />
            <Line
              type="monotone"
              dataKey="kiosk"
              stroke="#82ca9d"
              name="Kiosk"
            />
            <Line
              type="monotone"
              dataKey="tourniquet"
              stroke="#ff8042"
              name="Tourniquet"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default DevicesChart;
