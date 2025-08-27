import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { Badge } from 'react-bootstrap';

export default function DevicesByModeChart({ devices }) {
  const { pda, kiosk, tourniquet, total } = useMemo(() => {
    const pdaCount = devices.filter(
      (d) => d.mode?.toLowerCase() === 'pda'
    ).length;
    const kioskCount = devices.filter(
      (d) => d.mode?.toLowerCase() === 'kiosk'
    ).length;
    const tourniquetCount = devices.filter(
      (d) => d.mode?.toLowerCase() === 'tourniquet'
    ).length;
    const totalCount = pdaCount + kioskCount + tourniquetCount;

    return {
      pda: pdaCount,
      kiosk: kioskCount,
      tourniquet: tourniquetCount,
      total: totalCount,
    };
  }, [devices]);

  const chartOptions = {
    chart: {
      type: 'donut',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 400,
        },
      },
      events: {
        // Deshabilitar el hover que cambia el valor central
        dataPointMouseEnter: function () {
          // No hacer nada para mantener el valor total
        },
        dataPointMouseLeave: function () {
          // No hacer nada para mantener el valor total
        },
      },
    },
    labels: ['PDA', 'Kiosk', 'Tourniquet'],
    colors: ['#8884D8', '#82CA9D', '#FF8042'],
    legend: { position: 'bottom' },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: false,
          },
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (value) {
          // Mostrar el porcentaje en el tooltip
          const percentage = ((value / total) * 100).toFixed(1);
          return `(${percentage}%)`;
        },
      },
    },
  };

  const chartSeries = [pda, kiosk, tourniquet];

  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Devices by Mode</h4>
      </div>
      <div className="card-body">
        <div className="row mx-0 align-items-center">
          <div className="col-sm-8 text-center mb-3 mb-sm-0">
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="donut"
              height={300}
            />
          </div>
          <div className="col-sm-4">
            <div className="chart-deta">
              <p className="card-title capitalize text-muted card-intro-title">
                Summary:
              </p>
              <p className="mb-2 d-flex align-items-center">
                <Badge className="badge-xs me-2 bg-pda"> </Badge>
                PDA: <strong className="ms-1">{pda}</strong>
              </p>

              <p className="mb-2 d-flex align-items-center">
                <Badge className="badge-xs me-2 bg-kiosk"> </Badge>
                KKO: <strong className="ms-1">{kiosk}</strong>
              </p>

              <p className="mb-2 d-flex align-items-center">
                <Badge className="badge-xs me-2 bg-tourniquet"> </Badge>
                TOR: <strong className="ms-1">{tourniquet}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
