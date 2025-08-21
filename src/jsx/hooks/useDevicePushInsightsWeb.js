import { useEffect, useState, useCallback, useRef } from 'react';
import { fetchPushReceptionByDeviceId } from '../services/fetchPushReceptionByDeviceId';
import { fetchPushStatusByDeviceId } from '../services/fetchPushStatusByDeviceId';

export function useDevicePushInsightsWeb(
  device_id,
  { auto = true, intervalMs = 60_000 } = {}
) {
  const [loadingPushToken, setLoadingPushToken] = useState(true);
  const [pushTokenInfo, setPushTokenInfo] = useState(null);

  const [loadingDelivery, setLoadingDelivery] = useState(true);
  const [deliveryInfo, setDeliveryInfo] = useState(null);

  const timerRef = useRef(null);

  const refresh = useCallback(async () => {
    setLoadingPushToken(true);
    setLoadingDelivery(true);

    const [status, reception] = await Promise.all([
      fetchPushStatusByDeviceId(device_id),
      fetchPushReceptionByDeviceId(device_id),
    ]);

    console.log('DEBUG pushTokenInfo status:', status);

    if (status.ok && status.hasToken) {
      setPushTokenInfo({
        status: status.lastPushStatus || 'success',
        last_pushed_at: status.lastPushedAt,
        last_push_status: status.lastPushStatus,
        checked_at: status.checkedAt,
      });
    } else {
      setPushTokenInfo(null);
    }
    setLoadingPushToken(false);

    if (reception.ok) {
      setDeliveryInfo({
        lastSentAt: status.lastPushedAt,
        lastPushStatus: status.lastPushStatus,
        lastReceivedAt: reception.lastReceivedAt,
      });
    } else {
      setDeliveryInfo(null);
    }
    setLoadingDelivery(false);
  }, [device_id]);

  useEffect(() => {
    if (!auto) return;
    refresh();
    timerRef.current = setInterval(refresh, intervalMs);
    return () => clearInterval(timerRef.current);
  }, [refresh, intervalMs, auto]);

  return {
    loadingPushToken,
    pushTokenInfo,
    loadingDelivery,
    deliveryInfo,
    refresh,
  };
}
