import { supabase } from '../supabase/client';

export async function fetchPushReceptionByDeviceId(device_id) {
  if (!device_id) return { ok: false, reason: 'no_device' };

  try {
    const { data: tokenRow, error } = await supabase
      .from('device_push_tokens')
      .select(
        `
        push_token,
        updated_at,
        last_pushed_at,
        last_pushed_updated_at,
        last_push_status,
        last_push_error,
        last_applied_at,
        last_error_message,
        last_ack_received_at,
        last_ack_applied_at
      `
      )
      .eq('device_id', device_id)
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('fetchPushReceptionByDeviceId error:', error);
      return { ok: false, reason: 'error', error };
    }

    if (!tokenRow) {
      // no hay fila => “no registrado”
      return { ok: true, exists: false };
    }

    return {
      ok: true,
      exists: true,
      hasToken: !!tokenRow.push_token,
      lastReceivedAt: tokenRow.last_ack_received_at || null,
      lastAppliedAt: tokenRow.last_ack_applied_at || null,
      lastPushedAt: tokenRow.last_pushed_at || null,
      lastPushUpdatedAt:
        tokenRow.last_pushed_updated_at || tokenRow.updated_at || null,
      lastPushStatus: tokenRow.last_push_status || null,
      lastPushError: tokenRow.last_push_error || null,
      lastErrorMessage: tokenRow.last_error_message || null,
    };
  } catch (e) {
    console.error('fetchPushReceptionByDeviceId catch error:', e);
    return { ok: false, reason: 'exception', error: e };
  }
}
