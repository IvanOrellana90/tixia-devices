import { useEffect, Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from '../../layouts/PageTitle';
import { supabase } from '../../supabase/client';
import { SVGICON } from '../../content/theme';
import { Card } from 'react-bootstrap';
import DeviceListFiltered from '../Devices/DeviceListFiltered';
import ClientAccessChart from './ClientAccessChart';
import AccessInputChart from './AccessInputChart';
import SitesDevicesTable from './SitesDevicesTable';
import AccessDirectionAlerts from './AccessDirectionAlerts';
import { useDirectionMetrics } from '../../hooks/useDirectionMetrics';
import { getBalanceStatus } from '../../helpers/details';
import { useMonthlyAccessDeviation } from '../../hooks/useMonthlyAccessDeviation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';

// ELIMINADA LA LÍNEA DE date-fns QUE CAUSABA EL ERROR

const ClientDetail = () => {
    const { id } = useParams();
    const [client, setClient] = useState(null);
    const [sites, setSites] = useState([]);
    const [devices, setDevices] = useState([]);

    const { loading: dirLoading, metrics: dirMetrics } = useDirectionMetrics(client?.bigquery_db);
    const { loading: devLoading, status: devStatus } = useMonthlyAccessDeviation(client?.bigquery_db);


    const balance = getBalanceStatus(dirMetrics?.totalEntries, dirMetrics?.totalExits);

    useEffect(() => {
        const fetchClient = async () => {
          const { data, error } = await supabase
            .from('clients')
            .select(`*`)
            .eq('id', id)
            .single();
          if (error) console.error('Error fetching client:', error.message);
          setClient(data);
        };
        fetchClient();
      }, [id]);

    useEffect(() => {
        const fetchSites = async () => {
          const { data, error } = await supabase
            .from('sites')
            .select(`*`)
            .eq('client_id', id);
          if (error) console.error('Error fetching sites:', error.message);
          setSites(data);
        };
        fetchSites();
      }, [id]);

    useEffect(() => {
        const fetchDevices = async () => {
          const { data, error } = await supabase
            .from('devices')
            .select(`*`)
            .eq('client_id', id);
          if (error) console.error('Error fetching devices:', error.message);
          setDevices(data);
        };
        fetchDevices();
      }, [id]); 

    const cardData = [
        { icon: SVGICON.Building, title: 'Sites', number: sites.length },
        { icon: SVGICON.TabGrid, title: 'Kiosks', number: devices.filter(device => device.mode === 'Kiosk').length },
        { icon: SVGICON.Device, title: 'PDAs', number: devices.filter(device => device.mode === 'PDA').length },
        { icon: SVGICON.DoubleUser, title: 'Tourniquets', number: devices.filter(device => device.mode === 'Tourniquet').length },
    ];

    return (
        <Fragment>
            <PageTitle activeMenu="Client Detail" motherMenu="Clients" />

            <div className="row">
                <div className="col-xl-12 col-xxl-12 col-sm-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                {/* COLUMNA IZQUIERDA (CONTENIDO) - OCUPA 9 ESPACIOS */}
                                <div className="col-lg-9 col-md-12">
                                    <div className="clearfix pe-md-5">
                                        <div className="d-flex align-items-center mb-3">
                                            <h3 className="display-6 mb-0 me-3">
                                                <strong>{client?.name}</strong>
                                            </h3>
                                        </div>
                                        <ul className="d-flex flex-column fs-6">
                                            {/* Unique ID */}
                                            <li className="mb-1 d-flex align-items-center">
                                            <div
                                                className="d-flex align-items-center justify-content-center me-2"
                                                style={{ width: '24px', height: '24px' }}
                                            >
                                                <FontAwesomeIcon
                                                icon={faMobileAlt}
                                                className="me-2 fs-18 text-primary"
                                                />
                                            </div>
                                            <span className="fw-light me-2">Devices:</span>
                                            {devices.length}
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* COLUMNA DERECHA (ALERTAS) - OCUPA 3 ESPACIOS */}
                                {/* Aquí agrupamos las 3 alertas dentro de una sola columna */}
                                <div className="col-lg-3 col-md-12 d-flex flex-column gap-2"> 
                                    
                                    {/* Alerta 1 */}
                                    <div className={`alert alert-${balance.variant} align-items-center text-center m-0`}>
                                        <div><strong className="mb-2">{balance.label}</strong></div>
                                        <span className="opacity-75">
                                            Difference: <strong>{balance.pct.toFixed(1)}%</strong>
                                        </span>
                                    </div>

                                    {/* Alerta 2 */}
                                    <div className={`alert alert-${devStatus.variant} text-center m-0`}>
                                        <div><strong>{devStatus.label}</strong></div>

                                        {devLoading ? (
                                            <span className="opacity-75">Loading...</span>
                                        ) : (
                                            <span className="opacity-75 small lh-sm">
                                            Average: <strong>{Math.round(devStatus.mean).toLocaleString()}</strong> <br />
                                            Deviation: <strong>{devStatus.pct.toFixed(1)}%</strong> 
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
                                <h3 className="mb-0 fw-semibold lh-1 fs-5">
                                {data.number}
                                </h3>
                                <span className="fs-14 text-muted">{data.title}</span>
                            </div>
                            </Card.Body>
                        </Card>
                        </div>
                    ))}
                    </div>
                </div>
            </div>

            <div className="row mb-2">
                <div className="col-12">
                    <AccessDirectionAlerts
                        loading={dirLoading}
                        metrics={dirMetrics}
                    />
                </div>
            </div>

            {/* Gráfico de Accesos General */}
            {client?.bigquery_db && (
                <ClientAccessChart clientDb={client?.bigquery_db} />
            )}

            <div className="row">
                {/* Gráfico de Inputs (Donut) */}
                <div className="col-md-12 col-xl-6">
                    <div className="clearfix mt-3 mt-xl-0 ms-auto d-flex flex-column">
                        <div className="clearfix mb-3 text-xl-center">
                            <AccessInputChart clientDb={client?.bigquery_db} />
                        </div>
                    </div>
                </div>
                
                {/* Tabla de Sitios */}
                <div className="col-md-12 col-xl-6">
                    <div className="clearfix mt-3 mt-xl-0 ms-auto d-flex flex-column">
                        {sites.length > 0 && (
                            <SitesDevicesTable sites={sites} devices={devices} />
                        )}
                    </div>
                </div>
            </div>

           {client?.id && (
                <DeviceListFiltered filter={{ clientId: client.id }} clientName={client.name} />
            )}

        </Fragment>
    );
};

export default ClientDetail;