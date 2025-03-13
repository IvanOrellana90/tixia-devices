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

/// Dashboard
import Home from './components/Dashboard/Home';
import DashboardDark from './components/Dashboard/DashboardDark';
import Analytics from './components/Dashboard/Analytics';
import Events from './components/Dashboard/Events';
import OrderList from './components/Dashboard/OrderList';
import CustomerList from './components/Dashboard/CustomerList';
import Reviews from './components/Dashboard/Reviews';

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
import EventSidebar from './layouts/EventSidebar';

const Markup = () => {
  const allroutes = [
    /// Dashboard
    { url: 'analytics', component: <Analytics /> },
    { url: 'events', component: <Events /> },
    { url: 'order-list', component: <OrderList /> },
    { url: 'customer-list', component: <CustomerList /> },
    { url: 'reviews', component: <Reviews /> },

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
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/dashboard-dark" element={<DashboardDark />} />
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
  const [activeEvent, setActiveEvent] = useState(false);
  return (
    <>
      <div
        className={`show  ${sidebariconHover ? 'iconhover-toggle' : ''}`}
        id="main-wrapper"
      >
        <Nav onClick={() => setActiveEvent(!activeEvent)} />
        <EventSidebar activeEvent={activeEvent} />
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
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1401) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <>
      <div id="main-wrapper" className={`show `}>
        <Nav onClick={() => setActiveEvent(true)} />
        <EventSidebar activeEvent={activeEvent} isMobile={isMobile} />
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
