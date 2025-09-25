import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { supabase } from '../../../supabase/client';
import { toast } from 'react-toastify';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function DevicesByVersionChart() {
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      const { data, error } = await supabase
        .from('devices')
        .select('id, version_name, mode');

      if (error) {
        toast.error(`Error fetching devices: ${error.message}`);
        return;
      }

      // Group devices by version_name and mode
      const grouped = {};
      data.forEach((device) => {
        const version = device.version_name || '1.50';
        const mode = device.mode ? device.mode.toLowerCase() : 'other';

        if (!grouped[version]) {
          grouped[version] = { pda: 0, kiosk: 0, tourniquet: 0, other: 0 };
        }

        if (['pda', 'kiosk', 'tourniquet'].includes(mode)) {
          grouped[version][mode]++;
        } else {
          grouped[version].other++;
        }
      });

      // Sort by version number (descending)
      const sorted = Object.entries(grouped).sort((a, b) => {
        const numA = parseFloat(a[0]);
        const numB = parseFloat(b[0]);
        return numB - numA; // de mayor a menor
      });

      const versions = sorted.map(([version]) => version);

      // Build datasets for each device type
      const deviceTypes = {
        pda: { label: 'PDA', color: 'rgb(136, 132, 216)' },
        kiosk: { label: 'Kiosk', color: 'rgb(130, 202, 157)' },
        tourniquet: { label: 'Tourniquet', color: 'rgb(255, 128, 66)' },
      };

      const datasets = Object.keys(deviceTypes).map((type) => ({
        label: deviceTypes[type].label,
        data: sorted.map(([_, counts]) => counts[type]),
        backgroundColor: deviceTypes[type].color,
        borderRadius: 6,
      }));

      setLabels(versions);
      setDatasets(datasets);
    };

    fetchDevices();
  }, []);

  const chartData = {
    labels,
    datasets,
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        callbacks: {
          title: () => null,
          label: (context) => {
            const datasetLabel = context.dataset.label || '';
            const value = context.raw;
            return ` ${datasetLabel}: ${value}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: { stepSize: 10 },
        grid: { color: '#f0f0f0' },
      },
    },
  };

  return (
    <div className="card">
      <div className="card-header pb-2">
        <h4 className="text-black mb-0">Devices by Version</h4>
      </div>
      <div className="card-body">
        <Bar data={chartData} options={chartOptions} height={120} />
      </div>
    </div>
  );
}
