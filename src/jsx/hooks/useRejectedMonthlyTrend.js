import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { getRejectedTrendStatus } from '../helpers/details';

const parseAccessDate = (value) => {
  if (!value) return null;
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && value.value) return value.value;
  return String(value);
};

const isRejected = (resultId) => [3, 4].includes(Number(resultId));

const avg = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);

function buildMonthly(rows = []) {
  const m = new Map(); // YYYY-MM -> { rejected, total }

  for (const r of rows) {
    const accessDate = parseAccessDate(r.access_date);
    if (!accessDate) continue;

    const ym = accessDate.slice(0, 7);
    const events = Number(r.total_events || 0);
    const rid = Number(r.result_id);

    if (!m.has(ym)) m.set(ym, { rejected: 0, total: 0 });

    const b = m.get(ym);
    b.total += events;
    if (isRejected(rid)) b.rejected += events;
  }

  return Array.from(m.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([ym, v]) => ({ ym, ...v }));
}

export function useRejectedMonthlyTrend(clientDb) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMetrics = async () => {
      if (!clientDb) {
        setRows([]);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch('/.netlify/functions/getMetricsSummary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            client_db: clientDb,
            lookback_days: 365,
          }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || `HTTP ${res.status}`);
        }

        const json = await res.json();
        setRows(json || []);
      } catch (e) {
        console.error(e);
        toast.error(`Error loading rejected trend: ${e.message}`);
        setRows([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [clientDb]);

  const status = useMemo(() => {
    const monthly = buildMonthly(rows);

    // excluir último mes (incompleto)
    const usable = monthly.length >= 2 ? monthly.slice(0, -1) : [];

    // necesitas al menos 4 meses para comparar baseline vs últimos 3
    if (usable.length < 4) {
      return getRejectedTrendStatus();
    }

    const rejectedSeries = usable.map((x) => x.rejected);
    const totalSeries = usable.map((x) => x.total);

    const baselineRejected = rejectedSeries.slice(0, -3);
    const recentRejected = rejectedSeries.slice(-3);

    const baselineTotal = totalSeries.slice(0, -3);
    const recentTotal = totalSeries.slice(-3);

    const baselineAvg = avg(baselineRejected);
    const recentAvg = avg(recentRejected);

    const baselineRate = avg(baselineTotal) > 0 ? (avg(baselineRejected) / avg(baselineTotal)) * 100 : 0;
    const recentRate = avg(recentTotal) > 0 ? (avg(recentRejected) / avg(recentTotal)) * 100 : 0;

    return getRejectedTrendStatus({
      baselineAvg,
      recentAvg,
      baselineRate,
      recentRate,
    });
  }, [rows]);

  return { loading, status };
}
