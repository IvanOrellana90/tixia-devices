import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

const data = {
  defaultFontFamily: 'Poppins',
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'My First dataset',
      data: [25, 20, 60, 41, 66, 45, 80],
      borderColor: 'rgba(0, 0, 1128, .3)',
      borderWidth: '1',
      backgroundColor: 'rgba(64, 24, 157, .5)',
      pointBackgroundColor: 'rgba(0, 0, 1128, .3)',
      tension: 0.4,
      fill: true,
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
class BasicArea extends Component {
  render() {
    return <Line data={data} options={options} height={150} />;
  }
}

export default BasicArea;
