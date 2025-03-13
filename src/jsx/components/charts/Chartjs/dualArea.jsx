import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

const data = {
  defaultFontFamily: 'Poppins',
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'My First dataset',
      data: [25, 20, 60, 41, 66, 45, 80],
      borderColor: 'rgb(64, 24, 157)',
      borderWidth: '1',
      backgroundColor: 'rgba(64, 24, 157, .5)',
      fill: true,
      tension: 0.4,
    },
    {
      label: 'My First dataset',
      data: [5, 25, 20, 41, 36, 75, 70],
      borderColor: 'rgb(254, 128, 36)',
      borderWidth: '1',
      backgroundColor: 'rgba(254, 128, 36, .5)',
      fill: true,
      tension: 0.4,
    },
  ],
};

const options = {
  plugins: {
    legend: false,
  },
  scales: {
    y: {
      max: 100,
      min: 0,
      ticks: {
        beginAtZero: true,
        stepSize: 20,
        padding: 10,
      },
    },

    x: {
      ticks: {
        padding: 5,
      },
    },
  },
};
class DualArea extends Component {
  render() {
    return <Line data={data} options={options} height={150} />;
  }
}

export default DualArea;
