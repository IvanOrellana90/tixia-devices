import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { getMonthlyDeviationStatus } from '../helpers/details';

// saca YYYY-MM desde access_date (string o {value})
const parseAccessDate = (value) => {
  if (!value) return null;
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && value.value) return value.value;
  return String(value);
};

function buildMonthlyTotals(rows = []) {
  const buckets = new Map(); // key YYYY-MM -> total

  for (const r of rows) {
    const accessDate = parseAccessDate(r.access_date);
    if (!accessDate) continue;

    const ym = accessDate.slice(0, 7); // YYYY-MM
    const events = Number(r.total_events || 0);

    buckets.set(ym, (buckets.get(ym) || 0) + events);
  }

  // ordenar por fecha (YYYY-MM ordena bien como string)
  const sorted = Array.from(buckets.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([, total]) => total);

  return sorted;
}

export function useMonthlyAccessDeviation(clientDb) {
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
        toast.error(`Error loading monthly metrics: ${e.message}`);
        setRows([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [clientDb]);

  const status = useMemo(() => {
    const monthTotals = buildMonthlyTotals(rows);

    // EXCLUIR el último mes (posible incompleto)
    const withoutLast = monthTotals.length >= 2 ? monthTotals.slice(0, -1) : [];

    return getMonthlyDeviationStatus(withoutLast);
  }, [rows]);

  return { loading, status };
}
