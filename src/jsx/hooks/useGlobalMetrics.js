import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export function useGlobalMetrics(lookbackDays = 30) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch('/.netlify/functions/getGlobalMetrics', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ lookback_days: lookbackDays }),
                });

                if (!res.ok) throw new Error(`Status: ${res.status}`);
                const rows = await res.json();
                setData(rows || []);
            } catch (e) {
                console.error(e);
                toast.error('Error loading global metrics');
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [lookbackDays]);

    return { data, loading };
}
