import { Fragment, useContext } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import PrivateRoute from './layouts/PrivateRoute';

// Css
import './index.css';
import './chart.css';

// Layout
import Nav from './layouts/nav';
import Footer from './layouts/Footer';
import ScrollToTop from './layouts/ScrollToTop';
import { ThemeContext } from '../context/ThemeContext';

// Dashboard
import Overview from './components/Dashboard/OverviewCard';
import OverviewTab from './components/Dashboard/Tabs/OverviewTab';
import ActivityTab from './components/Dashboard/Tabs/ActivityTab';

// Client
import AddClient from './components/Clients/AddClient';
import ClientList from './components/Clients/ClientList';

// Sites
import AddSite from './components/Sites/AddSite';
import SiteList from './components/Sites/SiteList';

// Facility
import AddFacility from './components/Facilities/AddFacility';
import FacilityList from './components/Facilities/FacilityList';

// Mobile
import AddMobile from './components/Mobiles/AddMobile';
import MobileList from './components/Mobiles/MobileList';

// Device
import AddDevice from './components/Devices/AddDevice';
import DeviceList from './components/Devices/DeviceList';
import ActiveDevices from './components/Devices/FilterDevices/ActiveDevices';
import InactiveDevices from './components/Devices/FilterDevices/InactiveDevices';
import EditDevice from './components/Devices/EditDevice';
import DeviceDetail from './components/Devices/DeviceDetail';
import DeviceInformationList from './components/Devices/DeviceInformationList';

// Visit
import AddVisit from './components/Visits/AddVisit';
import VisitList from './components/Visits/VisitList';
import EditVisit from './components/Visits/EditVisit';
import VisitCalendar from './components/Visits/VisitCalendar';

// User
import UserList from './components/Users/UserList';
import EditUser from './components/Users/EditUser';

// Pages
import Login from './pages/Login';
import Error404 from './pages/Error404';
import Error503 from './pages/Error503';
import EditMobile from './components/Mobiles/EditMobile';

const Markup = () => {
  const allroutes = [
    // Dashboard
    { url: 'dashboard', component: <Overview /> },
    { url: 'dashboard-overview', component: <OverviewTab /> },
    { url: 'dashboard-activity', component: <ActivityTab /> },

    //Clients
    { url: 'add-client', component: <AddClient />, roles: ['admin']},
    { url: 'client-list', component: <ClientList /> },
    { url: 'clients', component: <ClientList /> },

    //Sites
    { url: 'add-site', component: <AddSite />, roles: ['admin']},
    { url: 'site-list', component: <SiteList /> },
    { url: 'sites', component: <SiteList /> },

    //Facility
    { url: 'add-facility', component: <AddFacility />, roles: ['admin'] },
    { url: 'facility-list', component: <FacilityList /> },
    { url: 'facilities', component: <FacilityList /> },

    //Mobile
    { url: 'add-mobile', component: <AddMobile />, roles: ['admin'] },
    { url: 'mobile-list', component: <MobileList /> },
    { url: 'mobiles', component: <MobileList /> },
    { url: 'edit-mobile/:id', component: <EditMobile />, roles: ['admin'] },

    //Device
    { url: 'add-device', component: <AddDevice />, roles: ['admin'] },
    { url: 'device-list', component: <DeviceList /> },
    { url: 'devices', component: <DeviceList /> },
    { url: 'edit-device/:id', component: <EditDevice />, roles: ['admin'] },
    { url: 'device/:id', component: <DeviceDetail /> },
    { url: 'active-devices', component: <ActiveDevices /> },
    { url: 'inactive-devices', component: <InactiveDevices /> },
    { url: 'device-information', component: <DeviceInformationList /> },

    //Visit
    { url: 'add-visit', component: <AddVisit />, roles: ['admin'] },
    { url: 'visit-list', component: <VisitList /> },
    { url: 'edit-visit/:id', component: <EditVisit />, roles: ['admin'] },
    { url: 'visit-calendar', component: <VisitCalendar /> },

    //User
    { url: 'user-list', component: <UserList />, roles: ['admin'] },
    { url: 'edit-user/:id', component: <EditUser />, roles: ['admin'] },
  ];

  return (
    <Fragment>
      <Routes>
        {/* Rutas públicas */}
        <Route path="page-login" element={<Login />} />
        <Route path="page-error-404" element={<Error404 />} />
        <Route path="page-error-503" element={<Error503 />} />

        {/* Rutas Protegidas */}
        {/* Nivel 1: PrivateRoute verifica si el usuario está LOGUEADO */}
        <Route element={<PrivateRoute />}>
          
          {/* Layout 2: Sin Sidebar completa (Overview) */}
          <Route element={<MainLayout2 />}>
            <Route path="/" element={<Overview />} />
          </Route>

          {/* Layout Principal: Con Sidebar y Nav */}
          <Route element={<MainLayout />}>
            {allroutes.map((route, i) => {
              return (
                <Route
                  key={i}
                  path={route.url}
                  element={
                    // Nivel 2: Verificación de ROLES específica para esta ruta
                    route.roles ? (
                      <PrivateRoute allowedRoles={route.roles}>
                        {route.component}
                      </PrivateRoute>
                    ) : (
                      // Si no hay roles específicos, renderiza directo
                      route.component
                    )
                  }
                />
              );
            })}
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
  return (
    <>
      <div id="main-wrapper" className={`show `}>
        <Nav />
        <div className={`content-body`}>
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
