import React from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faThumbsDown,
  faPaperPlane,
  faInbox,
} from '@fortawesome/free-solid-svg-icons';
import { useDevicePushInsightsWeb } from '../../hooks/useDevicePushInsightsWeb';

export default function DevicePushAlerts({ device_id }) {
  const { loadingPushToken, pushTokenInfo, loadingDelivery, deliveryInfo } =
    useDevicePushInsightsWeb(device_id, { auto: true, intervalMs: 60_000 });

  const pretty = (ts) =>
    ts ? moment(ts).format('DD/MM/YYYY HH:mm') : 'No information';

  return (
    <div className="row g-3 align-items-stretch">
      {/* Alert #1: Push Token Status */}
      <div className="col-md-6">
        {loadingPushToken ? (
          <div className="alert alert-info h-100 mb-0" role="alert">
            Loading push token status...
          </div>
        ) : !pushTokenInfo ? (
          <div className="alert alert-warning h-100 mb-0" role="alert">
            <FontAwesomeIcon icon={faThumbsDown} className="me-2" />
            <strong>Token not registered</strong>
            <div className="small mt-1">Device has no push token</div>
          </div>
        ) : (
          <div className="alert alert-info h-100 mb-0" role="alert">
            <FontAwesomeIcon icon={faThumbsUp} className="me-2" />
            <strong>Token healthy</strong>
            <div className="small">
              Last check: {pretty(pushTokenInfo.checked_at)}
            </div>
          </div>
        )}
      </div>

      {/* Alert #2: Last Push (Send/Receive) */}
      <div className="col-md-6">
        {loadingDelivery ? (
          <div className="alert alert-info h-100 mb-0" role="alert">
            Checking last push delivery...
          </div>
        ) : (
          <div className="alert alert-light border h-100 mb-0" role="alert">
            <div className="small mt-1">
              Sent at:{' '}
              <span className="">
                {pretty(deliveryInfo?.lastSentAt)}
              </span>
              {deliveryInfo?.lastPushStatus
                ? ` (${deliveryInfo.lastPushStatus})`
                : ''}
            </div>
            <div className="small ">
              Received at:{' '}
              <span className="">
                {pretty(deliveryInfo?.lastReceivedAt)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
