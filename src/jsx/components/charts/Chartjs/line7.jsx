import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';
ChartJS.register(
  PointElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

var activityData = [
  {
    first: [50, 75, 34, 55, 25, 70, 30, 80, 30, 90, 25, 65],
  },
  {
    first: [50, 35, 10, 45, 40, 50, 60, 35, 10, 70, 34, 35],
  },
  {
    first: [20, 35, 70, 45, 40, 35, 30, 35, 10, 40, 60, 20],
  },
];

class LineChart7 extends Component {
  render() {
    const data = {
      defaultFontFamily: 'Poppins',
      labels: [
        'Jan',
        'Febr',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      datasets: [
        {
          label: 'My First dataset',
          data: activityData[this.props.data ? this.props.data : 0].first,
          borderColor: '#2130b8',
          borderWidth: '5',
          barThickness: 'flex',
          backgroundColor: 'rgba(47, 76, 221, 0.05)',
          minBarLength: 10,
          tension: 0.4,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          gridColor: 'navy',
          gridLines: {
            color: 'rgba(0,0,0,0.1)',
            height: 50,
            drawBorder: true,
          },
          ticks: {
            fontColor: '#3e4954',
            max: 100,
            min: 0,
            stepSize: 20,
          },
        },

        x: {
          grid: {
            display: false,
            zeroLineColor: 'transparent',
          },
          ticks: {
            stepSize: 20,
            fontColor: '#3e4954',
            fontFamily: 'Nunito, sans-serif',
          },
        },
      },
      tooltips: {
        mode: 'index',
        intersect: false,
        titleFontColor: '#888',
        bodyFontColor: '#555',
        titleFontSize: 12,
        bodyFontSize: 15,
        backgroundColor: 'rgba(255,255,255,1)',
        displayColors: true,
        xPadding: 10,
        yPadding: 7,
        borderColor: 'rgba(220, 220, 220, 1)',
        borderWidth: 1,
        caretSize: 6,
        caretPadding: 10,
      },
    };
    return (
      <div style={{ height: '350px' }}>
        <Line data={data} options={options} height={350} />
      </div>
    );
  }
}

export default LineChart7;
