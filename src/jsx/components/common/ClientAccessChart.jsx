import React, { useEffect, useMemo, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { toast } from 'react-toastify';

// --- Helpers ---
const parseAccessDate = (value) => {
  if (!value) return null;
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && value.value) return value.value;
  return String(value);
};

const formatMonthLabel = (yyyyMm) => {
  const [y, m] = yyyyMm.split('-');
  const dt = new Date(Number(y), Number(m) - 1, 1);
  return dt.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const formatDayLabel = (yyyyMmDd) => {
  const [, m, d] = yyyyMmDd.split('-');
  return `${m}/${d}`; // MM/DD
};

// --- BUSINESS LOGIC: define what counts as "Allowed" ---
const isAllowed = (resultId) => {
  // Adjust according to your real codes
  return Number(resultId) === 1;
};

// Group results by range (12m monthly, 30d/7d daily)
const processMetricsData = (rows, range) => {

  const RESULT_LABELS = {
    1: 'Authorized',
    2: 'Out of hours',
    3: 'Not authorized',
    4: 'Blocked',
    5: 'Authorized on-site',
    6: 'Double shift',
  };

  const isAllowed = (resultId) => [1, 5].includes(Number(resultId));
  const isDenied = (resultId) => [3, 4].includes(Number(resultId));

  const buckets = new Map();

  for (const r of rows) {
    const accessDate = parseAccessDate(r.access_date);
    if (!accessDate) continue;

    let key;
    let fullDateForSort;

    if (range === '12months') {
      key = accessDate.slice(0, 7); // YYYY-MM
      fullDateForSort = new Date(
        Number(key.slice(0, 4)),
        Number(key.slice(5, 7)) - 1,
        1
      );
    } else {
      key = accessDate; // YYYY-MM-DD
      const [yy, mm, dd] = key.split('-').map(Number);
      fullDateForSort = new Date(yy, mm - 1, dd);
    }

    if (!buckets.has(key)) {
      buckets.set(key, {
        name: key,
        total: 0,
        allowed: 0,
        denied: 0,
        other: 0,
        fullDate: fullDateForSort,
      });
    }

    const b = buckets.get(key);

    const events = Number(r.total_events || 0);
    const rId = Number(r.result_id);

    b.total += events;

    if (isAllowed(rId)) b.allowed += events;
    else if (isDenied(rId)) b.denied += events;
    else b.other += events;
  }

  const result = Array.from(buckets.values()).sort(
    (a, b) => a.fullDate - b.fullDate
  );

  return result.map((item) => ({
    ...item,
    name: range === '12months'
      ? formatMonthLabel(item.name)
      : formatDayLabel(item.name),
  }));
};


const getLookbackDays = (range) => {
  if (range === '12months') return 365;
  if (range === '30days') return 30;
  return 7;
};

const ClientAccessChart = ({ clientDb, siteId = null }) => {
  const [data, setData] = useState([]);
  const [timeRange, setTimeRange] = useState('12months');
  const [isLoading, setIsLoading] = useState(false);

  const lookbackDays = useMemo(() => getLookbackDays(timeRange), [timeRange]);

  useEffect(() => {
    const fetchMetrics = async () => {
      if (!clientDb) {
        setData([]);
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch('/.netlify/functions/getMetricsSummary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            client_db: clientDb,
            lookback_days: lookbackDays,
            site_id: siteId,
          }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || `HTTP ${res.status}`);
        }

        const rows = await res.json();
        setData(processMetricsData(rows, timeRange));
      } catch (error) {
        toast.error(`Error loading metrics: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, [clientDb, timeRange, lookbackDays, siteId]);

  const tooltipFormatter = (value, name) => {
    const labels = { total: 'Total', allowed: 'Allowed', denied: 'Denied', other: 'Other' };
    return [value, labels[name] || name];
  };


  return (
    <div className="row">
      <div className="col-xl-12 col-xxl-12 col-sm-12">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
            <h4 className="card-title mb-0">Access</h4>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setTimeRange('12months')}
                className={`btn ${timeRange === '12months' ? 'btn-info' : 'btn-outline-info'}`}
              >
                Year
              </button>
              <button
                onClick={() => setTimeRange('30days')}
                className={`btn ${timeRange === '30days' ? 'btn-info' : 'btn-outline-info'}`}
              >
                Month
              </button>
              <button
                onClick={() => setTimeRange('7days')}
                className={`btn ${timeRange === '7days' ? 'btn-info' : 'btn-outline-info'}`}
              >
                Week
              </button>
            </div>
          </div>

          <div className="card-body d-flex flex-column">
            <div style={{ width: '100%', height: '400px' }}>
              {isLoading ? (
                <div
                  style={{
                    height: '340px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  Loading...
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12 }}
                      interval={timeRange === '7days' ? 0 : 'preserveEnd'}
                    />
                    <YAxis />
                    <Tooltip
                      formatter={tooltipFormatter}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Legend />

                    <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} name="Total" />
                    <Line type="monotone" dataKey="allowed" stroke="#82ca9d" name="Allowed" />
                    <Line type="monotone" dataKey="denied" stroke="#ff8042" name="Denied" />
                    <Line type="monotone" dataKey="other" stroke="#999999" name="Other" />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientAccessChart;
