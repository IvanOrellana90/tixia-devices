// useDirectionMetrics.js
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

export function useDirectionMetrics(clientDb, siteId = null) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!clientDb) return;

      setLoading(true);
      try {
        const res = await fetch('/.netlify/functions/getDirectionMetrics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ client_db: clientDb, site_id: siteId }),
        });

        if (!res.ok) throw new Error(`Status: ${res.status}`);
        const rows = await res.json();
        setData(rows || []);
      } catch (e) {
        console.error(e);
        toast.error('Error loading access flow');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [clientDb, siteId]);

  const metrics = useMemo(() => {
    let entries = 0;
    let exits = 0;

    data.forEach((item) => {
      const count = Number(item.count || 0);
      const id = Number(item.id);
      if ([1, 4, 5].includes(id)) entries += count;
      if ([2, 6].includes(id)) exits += count;
    });

    const total = entries + exits;

    return {
      totalEntries: entries,
      totalExits: exits,
      totalEvents: total,
      entryPct: total > 0 ? (entries / total) * 100 : 0,
      exitPct: total > 0 ? (exits / total) * 100 : 0,
    };
  }, [data]);

  return { data, loading, metrics };
}
