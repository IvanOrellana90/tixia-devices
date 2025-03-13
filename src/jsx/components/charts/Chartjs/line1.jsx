import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class LineChart1 extends Component {
  render() {
    const data = {
      defaultFontFamily: 'Poppins',
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'My First dataset',
          data: [25, 20, 50, 41, 55, 45, 70],
          borderColor: '#2130b8',
          borderWidth: this.props.borderWidth ? this.props.borderWidth : '2',
          backgroundColor: 'rgba(64, 24, 157, 0)',
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
          min: 0,
          max: 100,
          ticks: {
            stepSize: 20,
            beginAtZero: true,
            padding: 0,
          },
        },

        x: {
          ticks: {
            padding: 0,
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
      },
    };
    return (
      <>
        <Line
          data={data}
          options={options}
          height={this.props.height ? this.props.height : 150}
        />
      </>
    );
  }

  // componentDidMount() {
  //     const { datasets } = this.refs.chart.chartInstance.data
  //     console.log(datasets[0].data);
  // }
}

export default LineChart1;
