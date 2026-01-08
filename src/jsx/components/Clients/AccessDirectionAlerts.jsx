import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightToBracket,
  faArrowRightFromBracket,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';

const AccessDirectionAlerts = ({ loading, metrics }) => {
  const {
    totalEntries = 0,
    totalExits = 0,
    entryPct = 0,
    exitPct = 0,
  } = metrics || {};

  if (loading) {
    return (
      <div className="d-flex align-items-center mb-3 text-muted">
        <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
        Loading access flow...
      </div>
    );
  }

  if (!metrics) return null;

  return (
    <div className="row">
      {/* ENTRIES */}
      <div className="col-xl-6 col-xxl-6 col-lg-6 col-sm-6 mb-3">
        <div role="alert" className="fade left-icon-big alert alert-success show h-100">
          <div className="media">
            <div className="alert-left-icon-big">
              <span className="me-3">
                <FontAwesomeIcon icon={faArrowRightToBracket} size="2x" />
              </span>
            </div>

            <div className="media-body flex-1">
              <h4 className="alert-heading mb-1">Total Entries</h4>

              <p className="mb-0">
                Accumulated entries:{' '}
                <strong>{totalEntries.toLocaleString()}</strong>
              </p>

              <small className="d-block opacity-75">
                Percentage:{' '}
                <strong>{entryPct.toFixed(1)}</strong>%
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* EXITS */}
      <div className="col-xl-6 col-xxl-6 col-lg-6 col-sm-6 mb-3">
        <div role="alert" className="fade left-icon-big alert alert-danger show h-100">
          <div className="media">
            <div className="alert-left-icon-big">
              <span className="me-3">
                <FontAwesomeIcon icon={faArrowRightFromBracket} size="2x" />
              </span>
            </div>

            <div className="media-body flex-1">
              <h4 className="alert-heading mb-1">Total Exits</h4>

              <p className="mb-0">
                Accumulated exits:{' '}
                <strong>{totalExits.toLocaleString()}</strong>
              </p>

              <small className="d-block opacity-75">
                Percentage:{' '}
                <strong>{exitPct.toFixed(1)}</strong>%
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessDirectionAlerts;
