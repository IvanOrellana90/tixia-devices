import { useEffect, Fragment, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../supabase/client';
import PageTitle from '../../layouts/PageTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapPin,
  faMobileScreenButton,
  faCircleCheck,
  faCircleXmark,
  faClock,
  faPhoneFlip,
  faPhoneSlash,
  faIdBadge,
  faSimCard,
  faUser,
  faMobileRetro,
  faGear,
  faWindowRestore,
  faBookmark,
  faCode,
} from '@fortawesome/free-solid-svg-icons';
import ActivityDetail from './ActivityDetail';
import DeviceConfigurationForm from './DeviceConfigurationForm';
import { toast } from 'react-toastify';
import { fetchNagiosStatus } from '../../services/nagiosService';
import ServiceCard from './ServiceCard';
import IconBubble from './IconBubble';
import { getLastAccess } from '../../services/getLastAccess';
import RoleGuard from '../Auth/RoleGuard';

const DeviceDetail = () => {
  const { id } = useParams();
  const [device, setDevice] = useState(null);
  const [lastReport, setLastReport] = useState(null);
  const [showRemoveAlert, setShowRemoveAlert] = useState(false);
  const [removeInput, setRemoveInput] = useState('');
  const [nagios, setNagios] = useState(null);
  const [lastAccess, setLastAccess] = useState(null);

  useEffect(() => {
    if (device?.location) {
      const fetchLastReport = async () => {
        const { data: lastReport, error } = await supabase
          .from('device_reports')
          .select('created_at, windows_number, version_name')
          .eq('location', device.location)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();
        if (error) console.error('Error fetching last report:', error.message);
        setLastReport(lastReport);
      };
      fetchLastReport();
    }
  }, [device?.location]);

  useEffect(() => {
    if (device?.location) {
      const fetchNagios = async () => {
        const status = await fetchNagiosStatus(device?.location);
        setNagios(status);
      };
      fetchNagios();
    }
  }, [device?.location]);

  useEffect(() => {
    const fetchDevice = async () => {
      const { data, error } = await supabase
        .from('devices')
        .select(
          `*,
          client:client_id (name, bigquery_db),
          mobile:mobile_id (model, imei, has_sim_card, is_rented, active),
          site:site_id (name),
          facility:facility_id (name)
          `
        )
        .eq('id', id)
        .single();
      if (error) console.error('Error fetching device:', error.message);
      setDevice(data);
    };
    fetchDevice();
  }, [id]);

  useEffect(() => {
    const fetchLastAccess = async () => {
      if (device?.client?.bigquery_db && device?.location) {
        const client_db = device.client.bigquery_db;
        const device_location = device.location;

        const access = await getLastAccess(client_db, device_location);
        if (access) setLastAccess(access.access);
      }
    };

    fetchLastAccess();
  }, [device]);

  // Funcion to render the mobile status
  const renderMobileStatus = () => {
    if (!device?.mobile || !device.mobile.active)
      return (
        <div
          role="alert"
          className="fade alert alert-warning alert-dismissible show"
        >
          <FontAwesomeIcon icon={faPhoneSlash} className="me-2" />
          <strong>Mobile Disassociation</strong>
          <div className="small mt-1">
            This device is not associated with a mobile or the mobile is
            inactive.
            <br />
            <Link
              to={`/edit-device/${id}`}
              className="btn btn-sm btn-primary mt-2"
            >
              Associate Mobile
            </Link>
          </div>
        </div>
      );
    else if (device.mobile.active)
      return (
        <div
          role="alert"
          className="fade alert alert-success alert-dismissible show"
        >
          <FontAwesomeIcon icon={faPhoneFlip} className="me-2" />
          <strong>Mobile Association</strong>
          <div className="small mt-1">
            IMEI: <strong>{device.mobile.imei}</strong>
            <RoleGuard allowedRoles={['admin']}>
              <br />
            <button
              className="btn btn-sm btn-primary mt-2"
              onClick={() => setShowRemoveAlert(true)}
            >
              Remove Mobile
            </button>
            </RoleGuard>
          </div>
        </div>
      );
  };

  const renderLastReport = (lastReport, lastAccess) => {
    const hasReport = lastReport && lastReport.created_at;
    const hasAccess = lastAccess && lastAccess !== '00:00:00';

    let alertClass = 'alert-danger';
    let reportDate = 'No available';
    let accessDate = 'No registered';

    // 🔹 Evaluar reporte
    if (hasReport) {
      const reportTime = new Date(lastReport.created_at);
      const now = new Date();
      const diffHours = (now - reportTime) / (1000 * 60 * 60);

      if (diffHours < 24) {
        alertClass = 'alert-success';
      } else {
        alertClass = 'alert-warning';
      }

      reportDate = reportTime.toLocaleString('es-CL', {
        timeZone: 'America/Santiago',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }

    // 🔹 Evaluar acceso (basado en lastAccess global)
    if (hasAccess) {
      const accessTime = new Date(lastAccess);
      accessDate = accessTime.toLocaleString('es-CL', {
        timeZone: 'America/Santiago',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } else if (hasReport) {
      // ⚠️ Tiene reporte pero sin acceso
      alertClass = 'alert-warning';
    }

    return (
      <div
        role="alert"
        className={`fade alert ${alertClass} alert-dismissible show`}
        style={{ cursor: 'default' }}
      >
        <FontAwesomeIcon icon={faBookmark} className="me-2" />
        <strong>Report Information</strong>

        <div className="small mt-1">
          Last Report: <strong>{reportDate}</strong>
        </div>

        <div className="small mt-1">
          Last Access: <strong>{accessDate}</strong>
        </div>
      </div>
    );
  };

  // Función para renderizar el estado del dispositivo
  const renderDeviceStatus = () => {
    const nagiosUrl =
      nagios && nagios.name
        ? `https://nagios.ksec.cl/nagios/cgi-bin/extinfo.cgi?type=1&host=${device.location}`
        : `https://nagios.ksec.cl/nagios`;

    const wrapper = (content) =>
      nagiosUrl ? (
        <a
          href={nagiosUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          {content}
        </a>
      ) : (
        content
      );

    if (!nagios) {
      return wrapper(
        <div
          role="alert"
          className="fade alert alert-warning alert-dismissible show"
          style={{ cursor: nagiosUrl ? 'pointer' : 'default' }}
        >
          <FontAwesomeIcon icon={faClock} className="me-2" />
          <strong>Inactive Device</strong>
          <div className="small mt-1">
            You need to create a Nagios host for this device to see its status.
          </div>
        </div>
      );
    } else if (nagios?.uptime === 'N/A') {
      return wrapper(
        <div
          role="alert"
          className="fade alert alert-danger alert-dismissible show"
          style={{ cursor: nagiosUrl ? 'pointer' : 'default' }}
        >
          <FontAwesomeIcon icon={faCircleXmark} className="me-2" />
          <strong>Device Unreachable</strong>
          <div className="small mt-1">
            Last check: <strong>{nagios?.lastCheck || 'Unknown'}</strong>
          </div>
        </div>
      );
    } else {
      return wrapper(
        <div
          role="alert"
          className="fade alert alert-success alert-dismissible show"
          style={{ cursor: nagiosUrl ? 'pointer' : 'default' }}
        >
          <FontAwesomeIcon icon={faCircleCheck} className="me-2" />
          <strong>Device Connected</strong>
          <div className="small mt-1">
            Up time: <strong>{nagios?.uptime}</strong>
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
          {/* Alerta de confirmación de remoción */}
          {showRemoveAlert && (
            <div
              role="alert"
              className="fade notification alert alert-danger show"
            >
              <p className="notification-title mb-2">
                <strong>Confirm Disassociation</strong>
              </p>
              <p>
                Please enter the <strong>IMEI</strong> (
                <span className="text-primary">{device.mobile.imei}</span>) to
                confirm removal:
              </p>
              <input
                type="text"
                value={removeInput}
                onChange={(e) => setRemoveInput(e.target.value)}
                className="form-control mb-2"
                placeholder="Enter IMEI"
              />
              <button
                type="button"
                onClick={async () => {
                  if (removeInput === device.mobile.imei) {
                    try {
                      // Desasociar el mobile del device
                      const { error } = await supabase
                        .from('devices')
                        .update({ mobile_id: null })
                        .eq('id', device.id);
                      if (error) throw error;

                      // Opcional: actualizar el estado del device
                      setDevice((prev) => ({
                        ...prev,
                        mobile: null,
                        mobile_id: null,
                      }));

                      setShowRemoveAlert(false);
                      setRemoveInput('');
                      // Opcional: recargar datos
                      toast.success('Mobile removed successfully!');
                    } catch (error) {
                      toast.error('Error removing mobile. ' + error.message);
                    }
                  } else {
                    toast.error('Incorrect IMEI. Removal canceled.');
                  }
                }}
                className="btn btn-danger btn-sm me-2"
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowRemoveAlert(false);
                  setRemoveInput('');
                }}
                className="btn btn-link btn-sm"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-xl-12 col-xxl-12 col-sm-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                {/* Device Info */}
                <div className="col-md-9">
                  <div className="clearfix pe-md-5">
                    <div className="d-flex align-items-center mb-3">
                      <h3 className="display-6 mb-0 me-3">
                        <strong>{device?.location}</strong>
                      </h3>

                      <IconBubble
                        active={!!device?.mobile?.has_sim_card}
                        icon={faSimCard}
                        title="SIM Card"
                        onText="The mobile has an active SIM card."
                        offText="The mobile does not have a SIM card."
                        className={
                          device?.mobile?.has_sim_card
                            ? 'me-2 bg-info-subtle text-info-emphasis'
                            : 'me-2 bg-warning-subtle text-warning-emphasis'
                        }
                      />

                      <IconBubble
                        active={!!device?.mobile?.is_rented}
                        icon={faMobileRetro}
                        title="Rented"
                        onText="The device is rented."
                        offText="The device is not rented."
                        className={
                          device?.mobile?.is_rented
                            ? 'bg-info-subtle text-info-emphasis'
                            : 'bg-warning-subtle text-warning-emphasis'
                        }
                      />
                    </div>
                    <ul className="d-flex flex-column fs-6">
                      {/* Unique ID */}
                      <li className="mb-1 d-flex align-items-center">
                        <div
                          className="d-flex align-items-center justify-content-center me-2"
                          style={{ width: '24px', height: '24px' }}
                        >
                          <FontAwesomeIcon
                            icon={faIdBadge}
                            className="me-2 fs-18 text-primary"
                          />
                        </div>
                        <span className="fw-light me-2">Unique ID:</span>
                        {device?.unique_id}
                      </li>
                      <li className="mb-1 d-flex align-items-center">
                        <div
                          className="d-flex align-items-center justify-content-center me-2"
                          style={{ width: '24px', height: '24px' }}
                        >
                          <FontAwesomeIcon
                            icon={faGear}
                            className="me-2 fs-18 text-primary"
                          />
                        </div>
                        <span className="fw-light me-2">Mode:</span>
                        {device?.mode}
                      </li>
                      {/* Ubicación jerárquica */}
                      <li className="mb-1 d-flex align-items-center">
                        <div
                          className="d-flex align-items-center justify-content-center me-2"
                          style={{ width: '24px', height: '24px' }}
                        >
                          <FontAwesomeIcon
                            icon={faUser}
                            className="me-2 fs-18 text-primary"
                          />
                        </div>
                        <span className="fw-light me-2">Client:</span>
                        {device?.client?.name}
                      </li>
                      <li className="mb-1 d-flex align-items-center">
                        <div
                          className="d-flex align-items-center justify-content-center me-2"
                          style={{ width: '24px', height: '24px' }}
                        >
                          <FontAwesomeIcon
                            icon={faMapPin}
                            className="me-2 fs-18 text-primary"
                          />
                        </div>
                        <span className="fw-light me-2">Site:</span>
                        {device?.site?.name}
                      </li>
                      {/* Facility */}
                      {device?.facility?.name && (
                        <li className="mb-1 d-flex align-items-center">
                          <div
                            className="d-flex align-items-center justify-content-center me-2"
                            style={{ width: '24px', height: '24px' }}
                          >
                            <FontAwesomeIcon
                              icon={faMapPin}
                              className="me-2 fs-18 text-primary"
                            />
                          </div>
                          <span className="fw-light me-2">Facility:</span>
                          {device?.facility?.name}
                        </li>
                      )}
                      {/* Modelo de móvil */}
                      <li className="mb-1 d-flex align-items-center">
                        <div
                          className="d-flex align-items-center justify-content-center me-2"
                          style={{ width: '24px', height: '24px' }}
                        >
                          <FontAwesomeIcon
                            icon={faMobileScreenButton}
                            className="me-2 fs-18 text-primary"
                          />
                        </div>
                        <span className="fw-light me-2">Model:</span>
                        {device?.mobile?.model || (
                          <span className="text-muted">Not assigned</span>
                        )}
                      </li>
                      {/* Windows */}
                      <li className="mb-1 d-flex align-items-center">
                        <div
                          className="d-flex align-items-center justify-content-center me-2"
                          style={{ width: '24px', height: '24px' }}
                        >
                          <FontAwesomeIcon
                            icon={faWindowRestore}
                            className="me-2 fs-18 text-primary"
                          />
                        </div>
                        <span className="fw-light me-2">Windows:</span>
                        {lastReport?.windows_number || (
                          <span className="text-muted">0</span>
                        )}
                      </li>
                      {/* Version */}
                      <li className="mb-1 d-flex align-items-center">
                        <div
                          className="d-flex align-items-center justify-content-center me-2"
                          style={{ width: '24px', height: '24px' }}
                        >
                          <FontAwesomeIcon
                            icon={faCode}
                            className="me-2 fs-18 text-primary"
                          />
                        </div>
                        <span className="fw-light me-2">Version:</span>
                        {device?.version_name || (
                          <span className="text-muted">0</span>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Actions and Status */}
                <div className="col-md-3">
                  <div className="clearfix mt-3 mt-xl-0 ms-auto d-flex flex-column">
                    <div className="clearfix mb-3 text-xl-center">
                      {renderDeviceStatus()}
                      {renderLastReport(lastReport, lastAccess)}
                      {renderMobileStatus()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <ServiceCard serviceName="ENERGY" hostName={device?.location} />
        <ServiceCard serviceName="RAM_USAGE" hostName={device?.location} />
        <ServiceCard serviceName="STORAGE_USAGE" hostName={device?.location} />
      </div>
      
      <RoleGuard allowedRoles={['admin']}>
      <div className="row">
        <div className="col-xl-12 col-xxl-12 col-sm-12">
          <DeviceConfigurationForm deviceId={id} />
        </div>
      </div>
      </RoleGuard>

      <div className="row">
        <div className="col-md-12 col-xxl-6"></div>
        <div className="col-md-12 col-xxl-6">
          <ActivityDetail deviceId={id} />
        </div>
      </div>
    </Fragment>
  );
};

export default DeviceDetail;
