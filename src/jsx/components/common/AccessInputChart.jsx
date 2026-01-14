import React, { useMemo, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { toast } from 'react-toastify';
import { Badge, Spinner } from 'react-bootstrap';

// Normaliza: lower + quita acentos + trim
const normalize = (s) =>
  (s ?? '')
    .toString()
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

// Mapeo EXACTO de tus valores -> etiqueta final
const mapInputType = (rawType) => {
  const t = normalize(rawType);

  if (t === 'qr') return 'QR';
  if (t === 'manual') return 'Manual';
  if (t === 'chip') return 'Chip';
  if (t === 'leido' || t === 'leido/a' || t === 'read') return 'Read';
  if (t === 'integracion' || t === 'integration') return 'Integration';
  if (t === 'digitado' || t === 'digitized') return 'Digitized';

  return 'Other';
};

// ✅ Define categories fuera (o al inicio del componente)
const categories = [
  { key: 'QR', label: 'QR', color: '#008FFB', badge: 'bg-qr' },
  { key: 'Manual', label: 'Manual', color: '#82CA9D', badge: 'bg-manual' },
  { key: 'Chip', label: 'Chip', color: '#FF8042', badge: 'bg-chip' },
  { key: 'Read', label: 'Read', color: '#8884D8', badge: 'bg-read' },
  { key: 'Integration', label: 'Integration', color: '#00E396', badge: 'bg-integration' },
  { key: 'Digitized', label: 'Digitized', color: '#999999', badge: 'bg-digitized' },
  { key: 'Other', label: 'Other', color: '#775DD0', badge: 'bg-secondary' },
];

export default function AccessInputChart({ clientDb, siteId = null }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMetrics = async () => {
      if (!clientDb) {
        setData([]);
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch('/.netlify/functions/getInputMetrics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ client_db: clientDb, site_id: siteId }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || `HTTP ${res.status}`);
        }

        const rows = await res.json();
        setData(Array.isArray(rows) ? rows : []);
      } catch (error) {
        toast.error(`Error loading metrics: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, [clientDb, siteId]);

  const { counts, total } = useMemo(() => {
    const base = {
      QR: 0,
      Manual: 0,
      Chip: 0,
      Read: 0,
      Integration: 0,
      Digitized: 0,
      Other: 0,
    };

    for (const item of data) {
      const category = mapInputType(item?.type);
      base[category] = (base[category] || 0) + Number(item?.count || 0);
    }

    const totalVisible =
      base.QR + base.Manual + base.Chip + base.Read + base.Integration + base.Digitized;

    return { counts: base, total: totalVisible };
  }, [data]);

  // ✅ Ahora sí: visibleCategories después de counts
  const visibleCategories = useMemo(
    () => categories.filter((c) => (counts[c.key] || 0) > 0),
    [counts]
  );

  const labels = useMemo(
    () => visibleCategories.map((c) => c.label),
    [visibleCategories]
  );

  const series = useMemo(
    () => visibleCategories.map((c) => counts[c.key]),
    [visibleCategories, counts]
  );

  const chartOptions = useMemo(() => {
    return {
      chart: {
        type: 'donut',
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: { enabled: true, delay: 150 },
          dynamicAnimation: { enabled: true, speed: 400 },
        },
        events: {
          dataPointMouseEnter: function () { },
          dataPointMouseLeave: function () { },
        },
      },
      labels,
      colors: visibleCategories.map((c) => c.color),
      legend: { position: 'bottom' },
      dataLabels: { enabled: false },
      plotOptions: { pie: { donut: { labels: { show: false } } } },
      tooltip: {
        y: {
          formatter: function (value) {
            if (!total) return '(0.0%)';
            const percentage = ((value / total) * 100).toFixed(1);
            return `${Number(value).toLocaleString()} (${percentage}%)`;
          },
        },
      },
      stroke: { width: 0 },
    };
  }, [labels, visibleCategories, total]);

  return (
    <div className="card">
      <div className="card-header">
        <h4 className="text-black mb-0">Access Methods</h4>
      </div>

      <div className="card-body">
        {isLoading ? (
          <div className="d-flex align-items-center justify-content-center" style={{ minHeight: 300 }}>
            <Spinner animation="border" role="status" />
          </div>
        ) : (
          <div className="row mx-0 align-items-center">
            <div className="col-sm-8 text-center mb-3 mb-sm-0">
              {total > 0 && series.length > 0 ? (
                <Chart options={chartOptions} series={series} type="donut" height={300} />
              ) : (
                <div className="d-flex align-items-center justify-content-center" style={{ height: 300, color: '#ccc' }}>
                  No data
                </div>
              )}
            </div>

            <div className="col-sm-4">
              <div className="chart-deta">
                <p className="card-title" style={{ textAlign: 'left' }}>
                  Summary:
                </p>

                {visibleCategories.map((c) => (
                  <SummaryLine
                    key={c.key}
                    label={c.label}
                    value={counts[c.key]}
                    total={total}
                    badgeClass={c.badge}
                    fallbackColor={c.color}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryLine({ label, value, total, badgeClass, fallbackColor }) {
  const pct = total ? (value / total) * 100 : 0;
  return (
    <p className="mb-2 d-flex align-items-center justify-content-between">
      <span className="d-flex align-items-center">
        <Badge className={`badge-xs me-2 ${badgeClass}`} style={{ backgroundColor: fallbackColor }}>
          {' '}
        </Badge>
        <span>{label}</span>
      </span>

      <strong className="ms-1">{pct.toFixed(1)}%</strong>
    </p>
  );
}
