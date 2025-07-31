import { useEffect, useState } from 'react';
import { fetchNagiosHostService } from '../../services/fetchNagiosHostService';
import {
  serviceTitle,
  extractPercentage,
  serviceStatus,
  statusColor,
  isNagiosErrorOutput,
} from '../../helpers/services';
import moment from 'moment';

const ServiceCard = ({ serviceName = '', hostName = '' }) => {
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!serviceName || !hostName) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchNagiosHostService(serviceName, hostName).then((data) => {
      setServiceData(data?.service);
      setLoading(false);
    });
  }, [serviceName, hostName]);

  if (loading) return null;
  if (!serviceData || Object.keys(serviceData).length === 0) return null;
  if (isNagiosErrorOutput(serviceData.plugin_output)) return null;

  const progress = extractPercentage(serviceData.plugin_output);
  const status = serviceStatus(serviceData);
  const progressColor = statusColor(status);
  const lastUpdateFormatted = serviceData.last_check
    ? moment(serviceData.last_check).format('DD/MM/YYYY HH:mm:ss')
    : '-';

  return (
    <div className="col-xl-4 col-sm-12">
      <div className="card" style={{ textDecoration: 'none' }}>
        <div className="card-body">
          <div className="clearfix d-flex">
            <div className="clearfix">
              <h6 className="mb-0 fw-semibold">
                {serviceTitle(serviceData.description)}
              </h6>
              <span className="text-muted fs-13">
                {serviceData.plugin_output}
              </span>
            </div>
          </div>
          {progress !== '' && (
            <div className="mt-3">
              <div className="d-flex justify-content-between">
                <span>Used percentage:</span>
                <span>{progress}%</span>
              </div>
              <div
                className="progress mt-2"
                style={{ height: 5, borderRadius: 4 }}
              >
                <div
                  className={`progress-bar bg-${progressColor}`}
                  style={{ width: `${progress}%`, height: 5, borderRadius: 4 }}
                  role="progressbar"
                />
              </div>
            </div>
          )}
        </div>
        <div className="card-footer d-flex justify-content-between flex-wrap">
          <div className="due-progress mb-0">
            <p className="mb-0 text-black">
              Last update{' '}
              <span className="text-danger">: {lastUpdateFormatted}</span>
            </p>
          </div>
          <span
            className={`badge badge-sm badge-${progressColor} light border-0`}
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
