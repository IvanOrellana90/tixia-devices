import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { supabase } from '../../supabase/client';
import dayjs from 'dayjs';

const UpTimeChart = ({ deviceId }) => {
  const [chartData, setChartData] = useState({
    categories: [],
    upSeries: [],
    downSeries: [],
  });

  const [range, setRange] = useState('week'); // 'week' | 'month'

  useEffect(() => {
    const fetchLogs = async () => {
      const days = range === 'week' ? 7 : 30;
      const since = dayjs().subtract(days, 'day').startOf('day').toISOString();

      const { data, error } = await supabase
        .from('logs')
        .select('created_at, new_data')
        .eq('table_name', 'devices')
        .eq('record_id', deviceId)
        .eq('action', 'UPDATE')
        .gte('created_at', since)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching logs:', error.message);
        return;
      }

      const grouped = {};

      data.forEach((log, i) => {
        const date = dayjs(log.created_at).format('YYYY-MM-DD');
        const current = log.new_data;
        const prev = i > 0 ? data[i - 1].new_data : null;

        if (!grouped[date]) {
          grouped[date] = { up: 0, down: 0 };
        }

        if (prev && prev.active !== current.active) {
          const prevTime = dayjs(data[i - 1].created_at);
          const currTime = dayjs(log.created_at);
          const duration = currTime.diff(prevTime, 'minute');

          const newUp = grouped[date].up + (prev.active ? duration : 0);
          const newDown = grouped[date].down + (!prev.active ? duration : 0);

          grouped[date].up = Math.min(newUp, 1440);
          grouped[date].down = Math.min(newDown, 1440);
        }
      });

      const daysRange = [...Array(days)]
        .map((_, i) => dayjs().subtract(i, 'day').format('YYYY-MM-DD'))
        .reverse();

      const upSeries = daysRange.map((d) => grouped[d]?.up || 0);
      const downSeries = daysRange.map((d, i) => {
        const calculatedDown = 1440 - upSeries[i];
        return Math.min(calculatedDown, 1440);
      });

      setChartData({
        categories: daysRange,
        upSeries,
        downSeries,
      });
    };

    fetchLogs();
  }, [deviceId, range]);

  const chartOptions = {
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    colors: ['#3065d099', '#ee323280'],
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '40%',
        endingShape: 'rounded',
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: chartData.categories.map((date) =>
        dayjs(date).format('DD/MM')
      ),
    },
    yaxis: {
      labels: {
        formatter: (value) => Math.floor(value / 60),
      },
    },
    legend: { position: 'bottom' },
    tooltip: {
      y: {
        formatter: (val) => {
          const hours = Math.floor(val / 60);
          const mins = val % 60;
          const pct = ((val / 1440) * 100).toFixed(1);
          return `${hours}h ${mins}m (${pct}%)`;
        },
      },
    },
    grid: {
      borderColor: '#f1f1f1',
      strokeDashArray: 4,
    },
  };

  const chartSeries = [
    { name: 'Up Time', data: chartData.upSeries },
    { name: 'Down Time', data: chartData.downSeries },
  ];

  return (
    <div className="card">
      <div className="card-header border-0 pb-0 d-flex justify-content-between align-items-center">
        <h4 className="card-title">Device Status</h4>

        <div className="dropdown">
          <button
            type="button"
            className="btn btn-outline-light btn-rounded btn-sm dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {range === 'week' ? 'This Week' : 'This Month'}
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                className="dropdown-item"
                onClick={() => setRange('week')}
              >
                This Week
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => setRange('month')}
              >
                This Month
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="card-body">
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

export default UpTimeChart;
