import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const DynamicChart = () => {
  const [chartData, setChartData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales',
        backgroundColor: ['rgba(33, 48, 184, .08)'],
        borderColor: '#2130b8',
        pointBackgroundColor: '#2130b8',
        pointBorderColor: '#2130b8',
        borderWidth: 2,
        pointHoverBackgroundColor: '#2130b8',
        pointHoverBorderColor: '#2130b8',
        data: [
          8, 7, 15, 3, 2, 4, 6, 8, 12, 6, 12, 13, 10, 18, 14, 24, 16, 12, 19,
          21, 16, 14, 24, 21, 13, 15, 27, 29, 21,
        ],
        fill: true,
      },
    ],
  });
  const options = {
    plugins: {
      legend: {
        display: !1,
      },
    },
    responsive: !0,
    maintainAspectRatio: !1,
    scales: {
      x: {
        display: !1,
        gridLines: !1,
      },
      y: {
        display: !1,
        grid: !1,
      },
    },
    elements: {
      line: {
        tension: 0.6,
      },
      point: {
        radius: 0,
        borderWidth: 0,
      },
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 5,
        bottom: 0,
      },
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prevData) => ({
        ...prevData,
        datasets: [
          {
            ...prevData.datasets[0],
            data: prevData.datasets[0].data.map((value) =>
              Math.floor(Math.random() * 100)
            ),
          },
        ],
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ height: '70px' }}>
      <Line data={chartData} options={options} height={70} />;
    </div>
  );
};

export default DynamicChart;
