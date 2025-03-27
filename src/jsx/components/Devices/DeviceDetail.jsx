import { useEffect, Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../supabase/client';
import PageTitle from '../../layouts/PageTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapPin,
  faMobileScreenButton,
  faCircleCheck,
  faCircleXmark,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment/moment';
import UpTimeChart from './UpTimeChart';

const DeviceDetail = () => {
  const { id } = useParams();
  const [device, setDevice] = useState(null);

  useEffect(() => {
    const fetchDevice = async () => {
      const { data, error } = await supabase
        .from('devices')
        .select(
          `*,
          client:client_id (name)
          `
        )
        .eq('id', id)
        .single();
      if (error) console.error('Error fetching device:', error.message);
      setDevice(data);
    };
    fetchDevice();
  }, [id]);

  // Función para determinar si el dispositivo está activo
  const isDeviceActive = () => {
    if (!device?.active_at) return false;
    const lastActive = moment(device.active_at);
    const now = moment();
    return now.diff(lastActive, 'minutes') < 15; // Considerar activo si se conectó en los últimos 15 minutos
  };

  // Función para renderizar el estado del dispositivo
  const renderDeviceStatus = () => {
    if (!device) return null;

    if (isDeviceActive()) {
      return (
        <div
          role="alert"
          className="fade alert alert-success alert-dismissible show"
        >
          <FontAwesomeIcon icon={faCircleCheck} className="me-2" />
          <strong>Active Device</strong>
          <div className="small mt-1">
            Last connection:{' '}
            {moment(device.activated_at).format('DD MMM YYYY, h:mm A')}
          </div>
        </div>
      );
    } else if (device.activated_at) {
      return (
        <div
          role="alert"
          className="fade alert alert-warning alert-dismissible show"
        >
          <FontAwesomeIcon icon={faClock} className="me-2" />
          <strong>Inactive Device</strong>
          <div className="small mt-1">
            Last connection:{' '}
            {moment(device.activated_at).format('DD MMM YYYY, h:mm A')}
          </div>
        </div>
      );
    } else {
      return (
        <div
          role="alert"
          className="fade alert alert-danger alert-dismissible show"
        >
          <FontAwesomeIcon icon={faCircleXmark} className="me-2" />
          <strong>Device Never Connected</strong>
          <div className="small mt-1">
            Created: {moment(device.created_at).format('DD MMM YYYY, h:mm A')}
          </div>
        </div>
      );
    }
  };

  return (
    <Fragment>
      <PageTitle activeMenu="Device Detail" motherMenu="Devices" />

      {/* Main Card */}
      <div className="row">
        <div className="col-xl-12 col-xxl-12 col-sm-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                {/* Device Info */}
                <div className="col-md-9">
                  <div className="clearfix pe-md-5">
                    <h3 className="display-6 mb-2">{device?.location}</h3>
                    <ul className="d-flex flex-column fs-6">
                      <li className="mb-2 d-flex align-items-center">
                        <FontAwesomeIcon
                          icon={faMapPin}
                          className="las la-user me-1 fs-18"
                        />
                        {device?.client?.name}
                      </li>
                      <li className="mb-2 d-flex align-items-center">
                        <FontAwesomeIcon
                          icon={faMobileScreenButton}
                          className="las la-user me-1 fs-18"
                        />
                        {device?.model}
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Actions and Status */}
                <div className="col-md-3">
                  <div className="clearfix mt-3 mt-xl-0 ms-auto d-flex flex-column">
                    <div className="clearfix mb-3 text-xl-center">
                      {renderDeviceStatus()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-8 col-xxl-8 col-sm-12">
          <UpTimeChart deviceId={id} />
        </div>
      </div>
    </Fragment>
  );
};

export default DeviceDetail;
