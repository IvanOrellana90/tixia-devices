import { Fragment, useState, useContext, useEffect } from 'react';

/// React router dom
import { Routes, Route, Outlet } from 'react-router-dom';
import PrivateRoute from './layouts/PrivateRoute';
/// Css
import './index.css';
import './chart.css';

/// Layout
import Nav from './layouts/nav';
import Footer from './layouts/Footer';
import ScrollToTop from './layouts/ScrollToTop';
import { ThemeContext } from '../context/ThemeContext';

// Client
import AddClient from './components/Clients/AddClient';
import ClientList from './components/Clients/ClientList';

// Sites
import AddSite from './components/Sites/AddSite';
import SiteList from './components/Sites/SiteList';

// Facility
import AddFacility from './components/Facilities/AddFacility';
import FacilityList from './components/Facilities/FacilityList';

// Device
import AddDevice from './components/Devices/AddDevice';
import DeviceList from './components/Devices/DeviceList';

/// Pages
import Login from './pages/Login';
import Error404 from './pages/Error404';

const Markup = () => {
  const allroutes = [
    //Clients
    { url: 'add-client', component: <AddClient /> },
    { url: 'client-list', component: <ClientList /> },

    //Sites
    { url: 'add-site', component: <AddSite /> },
    { url: 'site-list', component: <SiteList /> },

    //Facility
    { url: 'add-facility', component: <AddFacility /> },
    { url: 'facility-list', component: <FacilityList /> },

    //Device
    { url: 'add-device', component: <AddDevice /> },
    { url: 'device-list', component: <DeviceList /> },
  ];

  return (
    <Fragment>
      <Routes>
        {/* Rutas públicas */}
        <Route path="page-login" element={<Login />} />
        <Route path="page-error-404" element={<Error404 />} />

        {/* Rutas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout2 />}>
            <Route path="/" element={<DeviceList />} />
          </Route>
          <Route element={<MainLayout />}>
            {allroutes.map((data, i) => (
              <Route
                key={i}
                exact
                path={`${data.url}`}
                element={data.component}
              />
            ))}
          </Route>
        </Route>

        {/* Ruta para errores */}
        <Route path="*" element={<Error404 />} />
      </Routes>
      <ScrollToTop />
    </Fragment>
  );
};

function MainLayout() {
  const { sidebariconHover } = useContext(ThemeContext);
  return (
    <>
      <div
        className={`show  ${sidebariconHover ? 'iconhover-toggle' : ''}`}
        id="main-wrapper"
      >
        <Nav />
        <div
          className="content-body"
          style={{ minHeight: window.screen.height - 45 }}
        >
          <div className="container-fluid">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
function MainLayout2() {
  const [activeEvent, setActiveEvent] = useState(true);
  return (
    <>
      <div id="main-wrapper" className={`show `}>
        <Nav onClick={() => setActiveEvent(true)} />
        <div className={`content-body ${activeEvent ? 'rightside-event' : ''}`}>
          <div className={`container-fluid`}>
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
export default Markup;
