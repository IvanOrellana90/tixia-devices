import { useEffect, Fragment, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from '../../layouts/PageTitle';
import { supabase } from '../../supabase/client';
import { SVGICON } from '../../content/theme';
import { Card } from 'react-bootstrap';

import DeviceListFiltered from '../Devices/DeviceListFiltered';
import ClientAccessChart from '../Clients/ClientAccessChart';
import AccessInputChart from '../Clients/AccessInputChart';
import SitesDevicesTable from '../Clients/SitesDevicesTable';
import AccessDirectionAlerts from '../Clients/AccessDirectionAlerts';

import { useDirectionMetrics } from '../../hooks/useDirectionMetrics';
import { useMonthlyAccessDeviation } from '../../hooks/useMonthlyAccessDeviation';
import { getBalanceStatus } from '../../helpers/details';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faUser } from '@fortawesome/free-solid-svg-icons';

const SiteDetail = () => {
  const { id } = useParams(); // id del site
  const [site, setSite] = useState(null);
  const [client, setClient] = useState(null);
  const [devices, setDevices] = useState([]);

  // --- DB para métricas (ideal: site.bigquery_db; fallback: client.bigquery_db) ---
  const metricsDb = site?.bigquery_db || client?.bigquery_db;

  const { loading: dirLoading, metrics: dirMetrics } = useDirectionMetrics(metricsDb);
  const { loading: devLoading, status: devStatus } = useMonthlyAccessDeviation(metricsDb);

  const balance = getBalanceStatus(dirMetrics?.totalEntries, dirMetrics?.totalExits);

  // --- Fetch Site ---
  useEffect(() => {
    const fetchSite = async () => {
      const { data, error } = await supabase
        .from('sites')
        .select(`*`)
        .eq('id', id)
        .single();

      if (error) console.error('Error fetching site:', error.message);
      setSite(data);
    };

    fetchSite();
  }, [id]);

  // --- Fetch Client (solo si lo necesitas como fallback) ---
  useEffect(() => {
    const fetchClient = async () => {
      if (!site?.client_id) return;

      const { data, error } = await supabase
        .from('clients')
        .select(`*`)
        .eq('id', site.client_id)
        .single();

      if (error) console.error('Error fetching client:', error.message);
      setClient(data);
    };

    fetchClient();
  }, [site?.client_id]);

  // --- Fetch Devices del Site ---
  useEffect(() => {
    const fetchDevices = async () => {
      const { data, error } = await supabase
        .from('devices')
        .select(`*`)
        .eq('site_id', id);

      if (error) console.error('Error fetching devices:', error.message);
      setDevices(data || []);
    };

    fetchDevices();
  }, [id]);

  const cardData = useMemo(() => {
    const total = devices.length;

    const totalKiosk = devices.filter((d) => d.mode === 'Kiosk').length;
    const totalPda = devices.filter((d) => d.mode === 'PDA').length;
    const totalTourniquet = devices.filter((d) => d.mode === 'Tourniquet').length;

    return [
      // En Site ya no tiene sentido "Sites", así que lo cambié a "Devices"
      { icon: SVGICON.TabGrid, title: 'Kiosks', number: totalKiosk },
      { icon: SVGICON.Device, title: 'PDAs', number: totalPda },
      { icon: SVGICON.DoubleUser, title: 'Tourniquets', number: totalTourniquet },
      { icon: SVGICON.Building, title: 'Total Devices', number: total },
    ];
  }, [devices]);

  return (
    <Fragment>
      <PageTitle activeMenu="Site Detail" motherMenu="Sites" />

      {/* HEADER */}
      <div className="row">
        <div className="col-xl-12 col-xxl-12 col-sm-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                {/* Izquierda */}
                <div className="col-lg-9 col-md-12">
                  <div className="clearfix pe-md-5">
                    <div className="d-flex align-items-center mb-3">
                      <h3 className="display-6 mb-0 me-3">
                        <strong>{site?.name}</strong>
                      </h3>
                    </div>

                    <ul className="d-flex flex-column fs-6">
                      <li className="mb-1 d-flex align-items-center">
                        <div
                          className="d-flex align-items-center justify-content-center me-2"
                          style={{ width: '24px', height: '24px' }}
                        >
                          <FontAwesomeIcon icon={faUser} className="me-2 fs-18 text-primary" />
                        </div>
                        <span className="fw-light me-2">Cliente:</span>
                        {client?.name}
                      </li>
                      <li className="mb-1 d-flex align-items-center">
                        <div
                          className="d-flex align-items-center justify-content-center me-2"
                          style={{ width: '24px', height: '24px' }}
                        >
                          <FontAwesomeIcon icon={faMobileAlt} className="me-2 fs-18 text-primary" />
                        </div>
                        <span className="fw-light me-2">Devices:</span>
                        {devices.length}
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Derecha: alertas */}
                <div className="col-lg-3 col-md-12 d-flex flex-column gap-2">
                  <div className={`alert alert-${balance.variant} align-items-center text-center m-0`}>
                    <div>
                      <strong className="mb-2">{balance.label}</strong>
                    </div>
                    <span className="opacity-75">
                      Difference: <strong>{Number.isFinite(balance.pct) ? balance.pct.toFixed(1) : '0.0'}%</strong>
                    </span>
                  </div>

                  <div className={`alert alert-${devStatus.variant} text-center m-0`}>
                    <div><strong>{devStatus.label}</strong></div>

                    {devLoading ? (
                      <span className="opacity-75">Loading...</span>
                    ) : (
                      <span className="opacity-75 small lh-sm">
                        Average: <strong>{Math.round(devStatus.mean || 0).toLocaleString()}</strong> <br />
                        Deviation: <strong>{Number.isFinite(devStatus.pct) ? devStatus.pct.toFixed(1) : '0.0'}%</strong>
                      </span>
                    )}
                  </div>
                </div>
                {/* fin alertas */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CARDS */}
      <div className="row">
        <div className="col-xl-12 col-md-12">
          <div className="row">
            {cardData.map((data, ind) => (
              <div className="col-6 col-lg-3" key={ind}>
                <Card className="shadow-sm border">
                  <Card.Body className="d-flex align-items-center p-2">
                    <div className="avatar avatar-md bg-primary-light text-primary rounded d-flex align-items-center justify-content-center">
                      {data.icon}
                    </div>
                    <div className="ms-2">
                      <h3 className="mb-0 fw-semibold lh-1 fs-5">{data.number}</h3>
                      <span className="fs-14 text-muted">{data.title}</span>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ALERTAS DIRECCIÓN */}
      <div className="row mb-2">
        <div className="col-12">
          <AccessDirectionAlerts loading={dirLoading} metrics={dirMetrics} />
        </div>
      </div>

      {/* GRÁFICO ACCESOS */}
      {metricsDb && <ClientAccessChart clientDb={metricsDb} />}

      <div className="row">
        {/* Donut inputs */}
        <div className="col-md-12 col-xl-6">
          <div className="clearfix mt-3 mt-xl-0 ms-auto d-flex flex-column">
            <div className="clearfix mb-3 text-xl-center">
              {metricsDb && <AccessInputChart clientDb={metricsDb} />}
            </div>
          </div>
        </div>

        {/* Tabla (en site, puedes mostrar la misma tabla pero con 1 solo site) */}
        <div className="col-md-12 col-xl-6">
          <div className="clearfix mt-3 mt-xl-0 ms-auto d-flex flex-column">
            {site && (
              <SitesDevicesTable
                sites={[site]}      
                devices={devices}   
              />
            )}
          </div>
        </div>
      </div>

      {/* Lista de dispositivos filtrada */}
      {site?.id && (
        <DeviceListFiltered
          filter={{ siteId: site.id }} 
          clientName={site?.name}     
        />
      )}
    </Fragment>
  );
};

export default SiteDetail;
