import { supabase } from '../supabase/client';

export async function fetchPushStatusByDeviceId(device_id) {
  if (!device_id) return { ok: false };

  try {
    const { data: tokenData, error } = await supabase
      .from('device_push_tokens')
      .select('push_token, last_pushed_at, last_push_status, updated_at')
      .eq('device_id', device_id)
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    const isInvalidToken =
      !tokenData || !tokenData.push_token || tokenData.push_token === 'ack';

    if (error || isInvalidToken) {
      return { ok: true, hasToken: false };
    }

    return {
      ok: true,
      hasToken: true,
      token: tokenData.push_token,
      lastPushedAt: tokenData.last_pushed_at,
      lastPushStatus: tokenData.last_push_status,
      checkedAt: tokenData.updated_at,
    };
  } catch (e) {
    console.error('fetchPushStatusByDeviceId error', e);
    return { ok: false };
  }
}

