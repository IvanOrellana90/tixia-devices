import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export function useFacilitiesMetrics(clientDb, siteId = null, lookbackDays = 30) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!clientDb) {
                setData([]);
                return;
            }

            setLoading(true);
            try {
                const res = await fetch('/.netlify/functions/getFacilitiesMetrics', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        client_db: clientDb,
                        site_id: siteId,
                        lookback_days: lookbackDays,
                    }),
                });

                if (!res.ok) throw new Error(`Status: ${res.status}`);
                const rows = await res.json();
                setData(rows || []);
            } catch (e) {
                console.error(e);
                toast.error('Error loading facility metrics');
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [clientDb, siteId, lookbackDays]);

    return { data, loading };
}
