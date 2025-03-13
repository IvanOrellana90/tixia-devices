import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

// var activityData = [
//    {
//       first: [50, 75, 34, 55, 25, 70, 30, 80, 30, 90, 25, 65],
//    },
//    {
//       first: [50, 35, 10, 45, 40, 50, 60, 35, 10, 70, 34, 35],
//    },
//    {
//       first: [20, 35, 70, 45, 40, 35, 30, 35, 10, 40, 60, 20],
//    },
// ];

class RevenueChart extends Component {
  render() {
    const data = {
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'January',
        'February',
        'March',
        'April',
      ],
      datasets: [
        {
          label: 'Sales Stats',
          backgroundColor: ['rgba(33, 48, 184, .08)'],
          borderColor: '#2130b8',
          pointBackgroundColor: '#2130b8',
          pointBorderColor: '#2130b8',
          borderWidth: 2,
          pointHoverBackgroundColor: '#2130b8',
          pointHoverBorderColor: '#2130b8',
          data: [
            8, 7, 6, 3, 2, 4, 6, 8, 12, 6, 12, 13, 10, 18, 14, 24, 16, 12, 19,
            21, 16, 14, 24, 21, 13, 15, 27, 29, 21, 11, 14, 19, 21, 17,
          ],
          fill: true,
        },
      ],
    };

    const options = {
      plugins: {
        legend: {
          display: !1,
        },
      },
      title: {
        display: !1,
      },
      tooltips: {
        intersect: !1,
        mode: 'nearest',
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10,
      },
      responsive: !0,
      maintainAspectRatio: !1,
      hover: {
        mode: 'index',
      },
      scales: {
        x: {
          display: !1,
          gridLines: !1,
          scaleLabel: {
            display: !0,
            labelString: 'Month',
          },
        },

        y: {
          display: !1,
          grid: !1,
          scaleLabel: {
            display: !0,
            labelString: 'Value',
          },
          ticks: {
            beginAtZero: !0,
          },
        },
      },
      elements: {
        line: {
          tension: 0.15,
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
    return (
      <div style={{ height: '100px' }}>
        <Line data={data} options={options} height={100} />
      </div>
    );
  }
}

export default RevenueChart;
