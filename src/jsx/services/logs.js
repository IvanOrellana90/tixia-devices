import { supabase } from '../supabase/client';
import { toast } from 'react-toastify';

export const fetchLogs = async (deviceId) => {
  const { data: device, error: deviceError } = await supabase
    .from('devices')
    .select('mobile_id')
    .eq('id', deviceId)
    .single();

  if (deviceError) {
    toast.error('Error fetching device info: ' + deviceError.message);
    return [];
  }

  const mobileId = device?.mobile_id;

  const { data: configRow, error: configError } = await supabase
    .from('device_configurations')
    .select('id')
    .eq('device_id', deviceId)
    .single();

  if (configError && configError.code !== 'PGRST116') {
    toast.error('Error fetching configuration info: ' + configError.message);
    return [];
  }

  const configId = configRow?.id;

  const filters = [];

  filters.push({ table: 'devices', record: Number(deviceId) });

  if (configId)
    filters.push({ table: 'device_configurations', record: Number(configId) });
  if (mobileId) filters.push({ table: 'mobiles', record: Number(mobileId) });

  const logFetches = filters.map(async (f) => {
    try {
      const { data, error } = await supabase
        .from('logs')
        .select('*')
        .eq('table_name', f.table)
        .eq('record_id', f.record)
        .not('user_email', 'is', null)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error(`Error fetching logs for ${f.table}:${f.record}`, error);
        return [];
      }
      return data || [];
    } catch (err) {
      console.error(`Unexpected error for ${f.table}:${f.record}`, err);
      return [];
    }
  });

  const results = await Promise.all(logFetches);

  const allLogs = results.flat();
  return allLogs
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 10);
};
