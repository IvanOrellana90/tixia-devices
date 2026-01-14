import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export function useSitesMetrics(clientDb, lookbackDays = 30) {
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
                const res = await fetch('/.netlify/functions/getSitesMetrics', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ client_db: clientDb, lookback_days: lookbackDays }),
                });

                if (!res.ok) throw new Error(`Status: ${res.status}`);
                const rows = await res.json();
                setData(rows || []);
            } catch (e) {
                console.error(e);
                toast.error('Error loading site metrics');
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [clientDb, lookbackDays]);

    return { data, loading };
}
