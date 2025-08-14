const { createClient } = require('@supabase/supabase-js');
const admin = require('firebase-admin');

const { SUPABASE_URL, SUPABASE_ANON_KEY, GOOGLE_SERVICE_ACCOUNT_KEY } =
  process.env;

// Initialize Firebase Admin
const initializeFirebase = () => {
  if (admin.apps.length) return admin.app();

  const serviceAccount = JSON.parse(GOOGLE_SERVICE_ACCOUNT_KEY);
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');

  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: serviceAccount.project_id,
  });
};

const jsonResponse = (status, body) => ({
  statusCode: status,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Method not allowed' });
  }

  try {
    const { device_id, unique_id, title, body } = JSON.parse(
      event.body || '{}'
    );

    if (!device_id && !unique_id) {
      return jsonResponse(400, { error: 'Device ID or Unique ID required' });
    }

    // Initialize services
    const app = initializeFirebase();
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: false },
    });

    // Resolve device ID
    let deviceId = device_id;
    if (!deviceId && unique_id) {
      const { data: mobile } = await supabase
        .from('mobiles')
        .select('id')
        .eq('unique_id', unique_id)
        .single();

      if (!mobile) return jsonResponse(404, { error: 'Mobile not found' });

      const { data: device } = await supabase
        .from('devices')
        .select('id')
        .eq('mobile_id', mobile.id)
        .single();

      if (!device) return jsonResponse(404, { error: 'Device not found' });

      deviceId = device.id;
    }

    // Get push token
    const { data: token } = await supabase
      .from('device_push_tokens')
      .select('push_token')
      .eq('device_id', deviceId)
      .single();

    if (!token?.push_token) {
      return jsonResponse(404, { error: 'No push token for device' });
    }

    // Send push notification
    const message = {
      token: token.push_token,
      data: { action: 'updateConfig' },
      android: { priority: 'high' },
      apns: { headers: { 'apns-priority': '10' } },
    };

    const messageId = await admin.messaging(app).send(message);

    // Update push status
    await supabase
      .from('device_push_tokens')
      .update({
        last_pushed_at: new Date().toISOString(),
        last_push_status: 'success',
      })
      .eq('device_id', deviceId);

    return jsonResponse(200, {
      success: true,
      messageId,
      deviceId,
    });
  } catch (error) {
    console.error('Error:', error);

    // Handle specific FCM errors
    if (error.code === 'messaging/registration-token-not-registered') {
      try {
        const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
          auth: { persistSession: false },
        });

        await supabase
          .from('device_push_tokens')
          .delete()
          .eq('device_id', deviceId);
      } catch (dbError) {
        console.error('Failed to remove invalid token:', dbError);
      }

      return jsonResponse(410, {
        error: 'Invalid token - removed from database',
        action: 'regenerate_token',
      });
    }

    return jsonResponse(500, {
      error: error.message || 'Internal server error',
    });
  }
};
