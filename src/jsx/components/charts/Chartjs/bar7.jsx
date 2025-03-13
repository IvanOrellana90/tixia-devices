import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

class BarChart7 extends Component {
  render() {
    const data = {
      defaultFontFamily: 'Poppins',
      labels: [
        'Jan',
        'Feb',
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
          label: 'Expense',
          backgroundColor: this.props.backgroundColor
            ? this.props.backgroundColor
            : '#2130b8',
          hoverBackgroundColor: this.props.hoverBackgroundColor
            ? this.props.hoverBackgroundColor
            : '#142193',
          data: [
            '20',
            '14',
            '18',
            '25',
            '27',
            '22',
            '12',
            '24',
            '20',
            '14',
            '18',
            '16',
          ],
        },
        {
          label: 'Earning',
          backgroundColor: this.props.backgroundColor2
            ? this.props.backgroundColor2
            : '#f0f0f0',
          hoverBackgroundColor: this.props.hoverBackgroundColor2
            ? this.props.hoverBackgroundColor2
            : '#e6e6e6',
          data: [
            '12',
            '18',
            '14',
            '7',
            '5',
            '10',
            '20',
            '8',
            '12',
            '18',
            '14',
            '16',
          ],
        },
      ],
    };
    const options = {
      plugins: {
        legend: {
          display: false,
        },
      },
      title: {
        display: false,
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      responsive: true,
      maintainAspectRatio: false,
      barPercentage: 0.25,
      scales: {
        x: {
          stacked: true,

          //   barThickness: 15,
          ticks: {
            display: true,
            color: this.props.fontColor,
          },
          grid: {
            display: false,
            drawBorder: false,
          },
          border: {
            display: false,
          },
        },
        y: {
          stacked: true,
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            display: false,
          },
          border: {
            display: false,
          },
        },
      },
    };

    return (
      <div style={{ height: '217px' }}>
        <Bar
          data={data}
          height={this.props.height ? this.props.height : 217}
          options={options}
        />
      </div>
    );
  }
}

export default BarChart7;
