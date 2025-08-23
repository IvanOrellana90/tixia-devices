import { useEffect, useState, useCallback, useRef } from 'react';
import { fetchPushReceptionByDeviceId } from '../services/fetchPushReceptionByDeviceId';

export function useDevicePushInsightsWeb(
  device_id,
  { auto = true, intervalMs = 60_000 } = {}
) {
  const [loading, setLoading] = useState(true);
  const [pushInfo, setPushInfo] = useState(null);
  const [status, setStatus] = useState('idle');
  const timerRef = useRef(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const data = await fetchPushReceptionByDeviceId(device_id);

    if (!data.ok) {
      setStatus('error');
      setPushInfo(null);
    } else if (data.exists === false) {
      setStatus('not_found');
      setPushInfo(null);
    } else {
      setStatus('ok');
      setPushInfo({
        lastPushedAt: data.lastPushedAt,
        lastPushUpdatedAt: data.lastPushUpdatedAt,
        lastPushStatus: data.lastPushStatus,
        lastPushError: data.lastPushError,
        lastErrorMessage: data.lastErrorMessage,
        lastReceivedAt: data.lastReceivedAt,
        lastAppliedAt: data.lastAppliedAt,
        hasToken: data.hasToken,
      });
    }

    setLoading(false);
  }, [device_id]);

  useEffect(() => {
    if (!auto) return;
    refresh();
    timerRef.current = setInterval(refresh, intervalMs);
    return () => clearInterval(timerRef.current);
  }, [refresh, intervalMs, auto]);

  return { loading, status, pushInfo, refresh };
}
