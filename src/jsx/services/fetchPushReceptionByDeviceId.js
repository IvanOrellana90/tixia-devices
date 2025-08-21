import { supabase } from "../supabase/client";

export async function fetchPushReceptionByDeviceId(device_id) {
  if (!device_id) return { ok: false };

  const eventKeywords = [
    'push_received',
    'fcm_received',
    'ack',
    'config_update_applied',
  ];

  try {
    const { data: reports, error } = await supabase
      .from('device_reports')
      .select('created_at, information')
      .eq('device_id', device_id)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error || !reports) return { ok: true, lastReceivedAt: null };

    for (const rep of reports) {
      const info = rep.information || {};
      const ev = info.event || info.type || info.action;
      if (eventKeywords.includes(ev) || info.ack === true) {
        return { ok: true, lastReceivedAt: rep.created_at };
      }
    }

    return { ok: true, lastReceivedAt: null };
  } catch (e) {
    console.error('fetchPushReceptionByDeviceId error', e);
    return { ok: false };
  }
}
