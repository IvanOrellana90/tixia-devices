import { Fragment } from 'react';
import { SVGICON } from '../../content/theme';
import { Link } from 'react-router-dom';
import PageTitle from '../../layouts/PageTitle';
import { useEffect, useState } from 'react';
import { supabase } from '../../supabase/client';
import { toast } from 'react-toastify';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPhoneFlip, faPhoneSlash } from '@fortawesome/free-solid-svg-icons';

import DevicesChart from './Data/DevicesChart';
import { fetchNagiosHostCount } from '../../services/nagiosService';
import DevicesByModeChart from './Tabs/DevicesByModeChart';

const ProfilePages = [
  { pagename: 'Overview', pageurl: 'dashboard-overview' },
  { pagename: 'Activity', pageurl: 'dashboard-activity' },
];

function DashboardOverviewCard() {
  const [clients, setClients] = useState([]);
  const [sites, setSites] = useState([]);
  const [devices, setDevices] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [mobiles, setMobiles] = useState([]);
  const [nagios, setNagios] = useState({});

  const [activeTab, setActiveTab] = useState('dashboard-overview');

  useEffect(() => {
    const fetchClients = async () => {
      const { data, error } = await supabase.from('clients').select('*');
      if (error) toast.error(`Error fetching clients: ${error.message}`);
      else setClients(data);
    };

    const fetchSites = async () => {
      const { data, error } = await supabase.from('sites').select('*');
      if (error) toast.error(`Error fetching sites: ${error.message}`);
      else setSites(data);
    };

    const fetchDevices = async () => {
      const { data, error } = await supabase
        .from('devices')
        .select(
          `
            id,
            unique_id,
            location,
            mode,
            updated_at,
            created_at,
            client:client_id (name),
            mobile:mobile_id (
              id,
              imei,
              model
            )
          `
        )
        .order('created_at', { ascending: false });
      if (error) toast.error(`Error fetching devices: ${error.message}`);
      else setDevices(data);
    };

    const fetchMobiles = async () => {
      const { data, error } = await supabase.from('mobiles').select('*');
      if (error) toast.error(`Error fetching mobiles: ${error.message}`);
      else setMobiles(data);
    };

    const fetcFacilities = async () => {
      const { data, error } = await supabase.from('facilities').select('*');
      if (error) toast.error(`Error fetching facilities: ${error.message}`);
      else setFacilities(data);
    };

    fetchClients();
    fetchSites();
    fetchDevices();
    fetcFacilities();
    fetchMobiles();
  }, []);

  useEffect(() => {
    const fetchNagios = async () => {
      const status = await fetchNagiosHostCount();
      if (status) setNagios(status);
    };

    fetchNagios();

    const interval = setInterval(fetchNagios, 30000);

    return () => clearInterval(interval);
  }, [fetchNagiosHostCount]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const rentedMobiles = mobiles.filter((mobile) => mobile.is_rented).length;
  const simCardMobiles = mobiles.filter((mobile) => mobile.has_sim_card).length;

  const cardData = [
    { icon: SVGICON.Device, title: 'Devices', number: devices.length },
    { icon: SVGICON.DealBox, title: 'Rented', number: rentedMobiles },
    { icon: SVGICON.PostArticle, title: 'SIM', number: simCardMobiles },
    { icon: SVGICON.DoubleUser, title: 'Clients', number: clients.length },
    { icon: SVGICON.LocationData, title: 'Sites', number: sites.length },
    { icon: SVGICON.Building, title: 'Facilities', number: facilities.length },
  ];

  return (
    <>
      <PageTitle activeMenu="General" motherMenu="Home" />

      <Fragment>
        <div className="row">
          <div className="col-xl-6 col-xxl-6 col-lg-6 col-sm-6">
            {/* Alerta para dispositivos activos */}
            <a
              href="https://nagios.ksec.cl/nagios/cgi-bin/status.cgi?hostgroup=all&style=hostdetail&hoststatustypes=2"
              style={{ textDecoration: 'none' }}
              target="_blank"
            >
              <div
                role="alert"
                className="fade left-icon-big alert alert-success show"
              >
                <div className="media">
                  <div className="alert-left-icon-big">
                    <span className="me-3">
                      <FontAwesomeIcon
                        icon={faPhoneFlip}
                        className="mdi mdi-check-circle-outline"
                        size="2x" // Agrandar el icono
                      />
                    </span>
                  </div>
                  <div className="media-body flex-1">
                    <h4 className="alert-heading">Active Devices</h4>
                    <p className="mb-0">
                      Actual number of active devices:{' '}
                      <strong>{nagios?.hostCount?.up}</strong>
                    </p>
                    <small className="mb-0">
                      <strong>Last update:</strong> {nagios.lastUpdate}
                    </small>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div className="col-xl-6 col-xxl-6 col-lg-6 col-sm-6">
            {/* Alerta para dispositivos inactivos */}
            <a
              href="https://nagios.ksec.cl/nagios/cgi-bin/status.cgi?hostgroup=all&style=hostdetail&hoststatustypes=12"
              style={{ textDecoration: 'none' }}
              target="_blank"
            >
              <div
                role="alert"
                className="fade left-icon-big alert alert-danger show"
              >
                <div className="media">
                  <div className="alert-left-icon-big">
                    <span className="me-3">
                      <FontAwesomeIcon
                        icon={faPhoneSlash}
                        className="mdi mdi-check-circle-outline"
                        size="2x" // Agrandar el icono
                      />
                    </span>
                  </div>
                  <div className="media-body flex-1">
                    <h4 className="alert-heading">Inactive Devices</h4>
                    <p className="mb-0">
                      Actual number of inactive devices:{' '}
                      <strong>{nagios?.hostCount?.down}</strong>
                    </p>
                    <small className="mb-0">
                      <strong>Last update:</strong> {nagios.lastUpdate}
                    </small>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12 col-md-12">
            <div className="row g-3 mb-3">
              {' '}
              {cardData.map((data, ind) => (
                <div className="col-6 col-lg-2" key={ind}>
                  {' '}
                  {/* Ajusta columnas según necesidad */}
                  <div className="border outline-dashed rounded p-2 d-flex align-items-center bg-white h-100">
                    <div className="avatar avatar-md bg-primary-light text-primary rounded d-flex align-items-center justify-content-center">
                      {data.icon}
                    </div>
                    <div className="ms-2">
                      <h3 className="mb-0 fw-semibold lh-1 fs-5">
                        {data.number}
                      </h3>
                      <span className="fs-14 text-muted">{data.title}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-8 col-xxl-8 col-md-12">
            <div className="card">
              <div className="card-header pb-2">
                <h4 className="text-black">Entered Devices</h4>
              </div>
              <div className="card-body d-flex flex-column">
                <div className="mt-4">
                  {' '}
                  <DevicesChart />
                </div>
              </div>
              <div className="card-footer py-0 d-flex flex-wrap justify-content-between align-items-center">
                <ul
                  className="nav nav-underline nav-underline-primary nav-underline-text-dark nav-underline-gap-x-0"
                  id="tabMyProfileBottom"
                >
                  {ProfilePages.map((ele, ind) => (
                    <li className="nav-item ms-1" key={ind}>
                      <button
                        className={`nav-link py-3 border-3 text-dark ${activeTab === ele.pageurl ? 'active' : ''}`}
                        onClick={() => handleTabChange(ele.pageurl)}
                      >
                        {ele.pagename}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-xxxl-12 col-lg-4">
            <div className="card widget-media">
              <div className="card-header pb-2">
                <h4 className="text-black">Latest Devices</h4>
              </div>
              <div className="card-body timeline pb-2">
                {devices.slice(0, 6).map((device, index) => (
                  <div className="timeline-panel align-items-end" key={index}>
                    <div className="media-body">
                      <h5 className="mb-1">
                        <Link
                          className="text-black"
                          to={`/device/${device.id}`}
                        >
                          {device.location}
                        </Link>
                      </h5>
                      <p className="d-block mb-0 text-primary">
                        {device.mode} - {device.client?.name}
                      </p>
                      {/* Nuevo: Unique ID, Model, IMEI */}
                      <small className="d-block text-muted">
                        ID:{' '}
                        <span className="fw-bold">
                          {device.unique_id} {/* ✅ directo desde device */}
                        </span>
                        {' | '}
                        Model: <span>{device.mobile?.model}</span>
                      </small>
                    </div>
                    <p className="mb-0 fs-14 text-info">
                      {moment(device.created_at).format('DD MMM YYYY, h:mm A')}
                    </p>
                  </div>
                ))}
              </div>
              <div className="card-footer border-0 pt-0 text-center">
                <Link to="/device-list" className="btn-link">
                  View more <i className="fa fa-angle-down ms-2 scale-2" />
                </Link>
              </div>
            </div>
          </div>
          {activeTab === 'dashboard-overview'}
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-12">
              <DevicesByModeChart devices={devices} />
            </div>
          </div>
          {activeTab === 'dashboard-activity'}
        </div>
      </Fragment>
    </>
  );
}

export default DashboardOverviewCard;
