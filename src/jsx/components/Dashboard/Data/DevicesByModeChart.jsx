import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { Badge } from 'react-bootstrap';

export default function DevicesByModeChart({ devices }) {
  const { pda, kiosk, tourniquet, total } = useMemo(() => {
    // ... tu lógica de conteo sigue igual ...
    const pdaCount = devices.filter((d) => d.mode?.toLowerCase() === 'pda').length;
    const kioskCount = devices.filter((d) => d.mode?.toLowerCase() === 'kiosk').length;
    const tourniquetCount = devices.filter((d) => d.mode?.toLowerCase() === 'tourniquet').length;
    const totalCount = pdaCount + kioskCount + tourniquetCount;

    return { pda: pdaCount, kiosk: kioskCount, tourniquet: tourniquetCount, total: totalCount };
  }, [devices]);

  const chartOptions = {
    chart: {
      type: 'donut',
      // ... animaciones ...
    },
    labels: ['PDA', 'Kiosk', 'Tourniquet'],
    colors: ['#8884D8', '#82CA9D', '#FF8042'],
    
    // --- CAMBIO IMPORTANTE AQUÍ ---
    legend: { 
      show: true,
      position: 'bottom'
    },
    // ------------------------------
    
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        donut: {
          size: '65%', // Puedes hacer el donut un poco más grueso si quieres
          labels: { show: false },
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (value) {
          if(!total) return '0%';
          const percentage = ((value / total) * 100).toFixed(1);
          return `(${percentage}%)`;
        },
      },
    },
    stroke: { width: 0 } // Estético: quita bordes blancos
  };

  const chartSeries = [pda, kiosk, tourniquet];

  return (
    <div className="card h-100"> {/* h-100 ayuda si está en una columna flex */}
      <div className="card-header">
        <h4 className="text-black mb-0">Devices by Mode</h4>
      </div>
      <div className="card-body">
        {/* align-items-center es el que centra verticalmente el texto respecto al gráfico */}
        <div className="row mx-0 align-items-center h-100">
          
          <div className="col-sm-8 text-center mb-3 mb-sm-0">
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="donut"
              height={250} // <--- Reduje un poco la altura para que quede más compacto
            />
          </div>
          
          <div className="col-sm-4">
            <div className="chart-deta">
              <p className="card-title" style={{ textAlign: 'left' }}>Summary:</p>
              
              {/* Items del resumen */}
              <p className="mb-2 d-flex align-items-center">
                <Badge className="badge-xs me-2 bg-pda" style={{backgroundColor: '#8884D8'}}> </Badge>
                PDA: <strong className="ms-1">{pda}</strong>
              </p>

              <p className="mb-2 d-flex align-items-center">
                <Badge className="badge-xs me-2 bg-kiosk" style={{backgroundColor: '#82CA9D'}}> </Badge>
                KKO: <strong className="ms-1">{kiosk}</strong>
              </p>

              <p className="mb-2 d-flex align-items-center">
                <Badge className="badge-xs me-2 bg-tourniquet" style={{backgroundColor: '#FF8042'}}> </Badge>
                TOR: <strong className="ms-1">{tourniquet}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}