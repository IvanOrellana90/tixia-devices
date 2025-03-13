import React, { useState, useRef, useLayoutEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Nav, Tab } from 'react-bootstrap';

const EarningTab = [
  { title: 'Agents', type: 'agents' },
  { title: 'Clients', type: 'clients' },
];

const AccountActivityChart = () => {
  const earningRef = useRef();
  const chartWidth = useRef(null);
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    setWidth(chartWidth.current.offsetWidth);
  }, []);

  const series = [
    {
      name: 'Net Profit',
      data: [700, 650, 680, 590, 720, 610, 760, 530, 610],
    },
  ];
  const options = {
    chart: {
      type: 'area',
      height: 280,
      width: width + 55,
      offsetX: -45,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ['var(--primary)'],

    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    stroke: {
      show: true,
      width: 2,
      curve: 'straight',
      colors: ['var(--primary)'],
    },
    grid: {
      show: true,
      borderColor: '#eee',
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      show: true,
      tickAmount: 4,
      min: 0,
      max: 800,
      labels: {
        offsetX: 50,
      },
    },
    xaxis: {
      categories: [
        '',
        'May',
        'June',
        'July',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      overwriteCategories: undefined,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
        // offsetX:5,
        style: {
          fontSize: '12px',
        },
      },
    },
    fill: {
      opacity: 0.5,
      colors: 'var(--primary)',
      type: 'gradient',
      gradient: {
        colorStops: [
          {
            offset: 0.6,
            color: 'var(--primary)',
            opacity: 0.2,
          },
          {
            offset: 0.6,
            color: 'var(--primary)',
            opacity: 0.15,
          },
          {
            offset: 100,
            color: 'white',
            opacity: 0,
          },
        ],
      },
    },
    tooltip: {
      enabled: true,
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val) {
          return '$' + val + '';
        },
      },
    },
  };

  const dataSeries = (seriesType) => {
    var columnData = [];
    switch (seriesType) {
      case 'agents':
        columnData = [700, 650, 680, 590, 720, 610, 760, 530, 610];
        break;
      case 'clients':
        columnData = [680, 620, 540, 680, 640, 655, 730, 580, 620];
        break;
      default:
        columnData = [700, 650, 680, 590, 720, 610, 760, 530, 610];
    }
    earningRef.current.chart.ctx.updateSeries([
      {
        name: 'Net Profit',
        data: columnData,
      },
    ]);
  };

  return (
    <>
      <Tab.Container defaultActiveKey={'Agents'}>
        <div className="card-body pb-0">
          <div className="row mb-2">
            <div className="col-sm-4 col-6 mb-3">
              <div className="bg-success-light rounded px-3 py-2 text-center">
                <span className="fs-14 text-success">User Sign-in</span>
                <h3 className="mb-0 fw-semibold">36,899</h3>
              </div>
            </div>
            <div className="col-sm-4 col-6 mb-3">
              <div className="bg-primary-light rounded px-3 py-2 text-center">
                <span className="fs-14 text-primary">Admin Sign-in</span>
                <h3 className="mb-0 fw-semibold">72</h3>
              </div>
            </div>
            <div className="col-sm-4 col-6 mb-3">
              <div className="bg-danger-light rounded px-3 py-2 text-center">
                <span className="fs-14 text-danger">Failed Attempts</span>
                <h3 className="mb-0 fw-semibold">291</h3>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <h4 className="heading mb-0">Activity Chart</h4>
            <Nav as="ul" className="nav chart-summary-tab nav-pills">
              {EarningTab.map((item, ind) => (
                <Nav.Item as="li" key={ind}>
                  <Nav.Link
                    as="button"
                    className="btn btn-light btn-sm me-1"
                    eventKey={item.title}
                    onClick={() => dataSeries(item.type)}
                  >
                    {item.title}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </div>
        </div>
        <div className="clearfix overflow-hidden">
          <div id="lineChartSecuritySummary" ref={chartWidth}>
            <ReactApexChart
              options={options}
              series={series}
              type="area"
              height={280}
              ref={earningRef}
              width={width + 55}
            />
          </div>
        </div>
      </Tab.Container>
    </>
  );
};

export default AccountActivityChart;
