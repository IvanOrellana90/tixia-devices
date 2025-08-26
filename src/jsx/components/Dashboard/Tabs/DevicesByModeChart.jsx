import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';

export default function DevicesByModeChart({ devices }) {

  const { pda, kiosk, tourniquet } = useMemo(() => {
    return {
      pda: devices.filter((d) => d.mode?.toLowerCase() === 'pda').length,
      kiosk: devices.filter((d) => d.mode?.toLowerCase() === 'kiosk').length,
      tourniquet: devices.filter((d) => d.mode?.toLowerCase() === 'tourniquet')
        .length,
    };
  }, [devices]);

  const chartOptions = {
    chart: {
      type: 'donut',
    },
    labels: ['PDA', 'Kiosk', 'Tourniquet'],
    colors: ['#FFB547', '#1E90FF', '#28A745'], // amarillo, azul, verde
    legend: {
      position: 'bottom',
    },
    dataLabels: {
      enabled: true,
      formatter: (val, opts) =>
        `${opts.w.config.labels[opts.seriesIndex]}: ${val.toFixed(1)}%`,
    },
  };

  const chartSeries = [pda, kiosk, tourniquet];

  return (
    <div className="card">
      <div className="card-header border-0 pb-3 d-sm-flex d-block">
        <h4 className="card-title">Devices by Mode</h4>
      </div>
      <div className="card-body">
        <div className="row mx-0 align-items-center">
          <div className="col-sm-8 col-md-7 col-xxl-7 px-0 text-center mb-3 mb-sm-0">
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="donut"
              height={300}
            />
          </div>
          <div className="col-sm-4 col-md-5 col-xxl-5 px-0">
            <div className="chart-deta">
              <div className="col px-0 d-flex align-items-center mb-2">
                <span
                  className="bg-warning rounded-circle"
                  style={{ width: 12, height: 12 }}
                />
                <div className="mx-3">
                  <p className="fs-14 mb-0">PDA</p>
                  <h5>{pda}</h5>
                </div>
              </div>
              <div className="col px-0 d-flex align-items-center mb-2">
                <span
                  className="bg-primary rounded-circle"
                  style={{ width: 12, height: 12 }}
                />
                <div className="mx-3">
                  <p className="fs-14 mb-0">Kiosk</p>
                  <h5>{kiosk}</h5>
                </div>
              </div>
              <div className="col px-0 d-flex align-items-center">
                <span
                  className="bg-success rounded-circle"
                  style={{ width: 12, height: 12 }}
                />
                <div className="mx-3">
                  <p className="fs-14 mb-0">Tourniquet</p>
                  <h5>{tourniquet}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
