import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { supabase } from '../../supabase/client';
import dayjs from 'dayjs';
import { Dropdown } from 'react-bootstrap';

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

      // 1. Obtener el estado inicial del dispositivo
      const { data: deviceData } = await supabase
        .from('devices')
        .select('created_at, active')
        .eq('id', deviceId)
        .single();

      // 2. Obtener los logs de actualización
      const { data: logs, error } = await supabase
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

      // 3. Procesar los datos
      const allStatusChanges = [
        // Estado inicial
        {
          created_at: deviceData.created_at,
          active: deviceData.active,
          isInitial: true,
        },
        // Todos los cambios de estado
        ...logs.map((log) => ({
          created_at: log.created_at,
          active: log.new_data.active,
          isInitial: false,
        })),
      ].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

      const now = dayjs();
      const grouped = {};

      // 4. Calcular el tiempo para cada período
      for (let i = 0; i < allStatusChanges.length; i++) {
        const current = allStatusChanges[i];
        const next = allStatusChanges[i + 1] || {
          created_at: now.toISOString(),
        };

        const start = dayjs(current.created_at);
        const end = dayjs(next.created_at);
        const duration = end.diff(start, 'minute');

        // Agrupar por día
        const startDate = start.format('YYYY-MM-DD');
        const endDate = end.format('YYYY-MM-DD');

        if (startDate === endDate) {
          // Mismo día
          if (!grouped[startDate]) {
            grouped[startDate] = { up: 0, down: 0 };
          }
          if (current.active) {
            grouped[startDate].up += duration;
          } else {
            grouped[startDate].down += duration;
          }
        } else {
          // Período que cruza días
          const daysBetween = end.diff(start, 'day');

          for (let d = 0; d <= daysBetween; d++) {
            const currentDate = start.add(d, 'day').format('YYYY-MM-DD');
            if (!grouped[currentDate]) {
              grouped[currentDate] = { up: 0, down: 0 };
            }

            const dayStart =
              d === 0 ? start : dayjs(currentDate).startOf('day');
            const dayEnd =
              d === daysBetween ? end : dayjs(currentDate).endOf('day');

            const dayDuration = dayEnd.diff(dayStart, 'minute');

            if (current.active) {
              grouped[currentDate].up += dayDuration;
            } else {
              grouped[currentDate].down += dayDuration;
            }
          }
        }
      }

      // 5. Preparar datos para el gráfico
      const daysRange = [...Array(days)]
        .map((_, i) => dayjs().subtract(i, 'day').format('YYYY-MM-DD'))
        .reverse();

      const upSeries = daysRange.map((date) => {
        const dayData = grouped[date] || { up: 0, down: 0 };
        const isToday = date === dayjs().format('YYYY-MM-DD');
        const maxMinutes = isToday
          ? dayjs().diff(dayjs(date).startOf('day'), 'minute')
          : 1440;

        // Asegurar que no exceda el máximo de minutos del día
        return Math.min(dayData.up, maxMinutes);
      });

      const downSeries = daysRange.map((date, i) => {
        const isToday = date === dayjs().format('YYYY-MM-DD');
        const maxMinutes = isToday
          ? dayjs().diff(dayjs(date).startOf('day'), 'minute')
          : 1440;
        return maxMinutes - upSeries[i];
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

        <Dropdown>
          <Dropdown.Toggle
            variant="outline-light"
            size="sm"
            className="btn-rounded"
          >
            {range === 'week' ? 'This Week' : 'This Month'}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setRange('week')}>
              This Week
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setRange('month')}>
              This Month
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
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
