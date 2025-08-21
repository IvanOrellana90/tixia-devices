import React from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { useDevicePushInsightsWeb } from '../../hooks/useDevicePushInsightsWeb';

export default function DevicePushAlerts({ device_id }) {
  const { loading, pushInfo } = useDevicePushInsightsWeb(device_id, {
    auto: true,
    intervalMs: 60_000,
  });

  const pretty = (ts) =>
    ts ? moment(ts).format('DD/MM/YYYY HH:mm') : 'No information';

  return (
    <div className="row g-3 align-items-stretch">
      {/* Alert #1: Push Token Status */}
      <div className="col-md-6">
        {loading ? (
          <div className="alert alert-info h-100 mb-0" role="alert">
            Loading push token status...
          </div>
        ) : !pushInfo ? (
          <div className="alert alert-warning h-100 mb-0" role="alert">
            <FontAwesomeIcon icon={faThumbsDown} className="me-2" />
            <strong>Token not registered</strong>
            <div className="small mt-1">Device has no push token</div>
          </div>
        ) : (
          <div className="alert alert-info h-100 mb-0" role="alert">
            <FontAwesomeIcon icon={faThumbsUp} className="me-2" />
            <strong>Token healthy</strong>
            <div className="small fw-light">
              Last check: {pretty(pushInfo.lastPushUpdatedAt)}
            </div>
          </div>
        )}
      </div>

      {/* Alert #2: Last Push (Send/Receive) */}
      <div className="col-md-6">
        {loading ? (
          <div className="alert alert-info h-100 mb-0" role="alert">
            Checking last push delivery...
          </div>
        ) : (
          (() => {
            const sent = pushInfo?.lastPushedAt
              ? new Date(pushInfo.lastPushedAt).getTime()
              : null;
            const received = pushInfo?.lastReceivedAt
              ? new Date(pushInfo.lastReceivedAt).getTime()
              : null;

            let alertClass = 'alert-light border'; // gris por defecto

            if (sent && received) {
              if (received >= sent) {
                alertClass = 'alert-success'; // verde: ACK ok
              } else {
                alertClass = 'alert-danger'; // rojo: ACK pendiente
              }
            }

            return (
              <div className={`alert ${alertClass} h-100 mb-0`} role="alert">
                <div className="small fw-light">
                  Sent at:{' '}
                  <span className="">{pretty(pushInfo?.lastPushedAt)}</span>
                </div>
                <div className="small fw-light">
                  Received at:{' '}
                  <span className="">{pretty(pushInfo?.lastReceivedAt)}</span>
                </div>
                {pushInfo?.lastPushError && (
                  <div className="small text-danger mt-1">
                    Error: {pushInfo.lastPushError}
                  </div>
                )}
              </div>
            );
          })()
        )}
      </div>
    </div>
  );
}
