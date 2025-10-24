export const MenuList = [
  {
    title: 'Home',
    to: '/',
    iconStyle: <i className="flaticon-381-home-2" />,
  },

  // Devices
  {
    title: 'Devices',
    classsChange: 'mm-collapse',
    iconStyle: <i className="flaticon-381-search" />,
    content: [
      {
        title: 'Add Device',
        to: 'add-device',
      },
      {
        title: 'Device List',
        to: 'device-list',
      },
      {
        title: 'Device Information List',
        to: 'device-information',
      },
    ],
  },

  // Mobiles
  {
    title: 'Mobiles',
    classsChange: 'mm-collapse',
    iconStyle: <i className="flaticon-381-smartphone-5" />,
    content: [
      {
        title: 'Add Mobile',
        to: 'add-mobile',
      },
      {
        title: 'Mobile List',
        to: 'mobile-list',
      },
    ],
  },

  // Clients
  {
    title: 'Clients',
    classsChange: 'mm-collapse',
    iconStyle: <i className="flaticon-381-user-9" />,
    content: [
      {
        title: 'Add Client',
        to: 'add-client',
      },
      {
        title: 'Client List',
        to: 'client-list',
      },
    ],
  },

  // Sites
  {
    title: 'Sites',
    classsChange: 'mm-collapse',
    iconStyle: <i className="flaticon-381-location-4" />,
    content: [
      {
        title: 'Add Site',
        to: 'add-site',
      },
      {
        title: 'Site List',
        to: 'site-list',
      },
    ],
  },

  // Facility
  {
    title: 'Facilities',
    classsChange: 'mm-collapse',
    iconStyle: <i className="flaticon-381-notification" />,
    content: [
      {
        title: 'Add Facility',
        to: 'add-facility',
      },
      {
        title: 'Facilities List',
        to: 'facilities-list',
      },
    ],
  },

  { type: 'divider' },

  // ✅ NEW SECTION: Visits
  {
    title: 'Visits',
    classsChange: 'mm-collapse',
    iconStyle: <i className="flaticon-381-calendar-7" />, // puedes cambiar el ícono
    content: [
      { title: 'Add Visit', to: 'add-visit' },
      { title: 'Visit List', to: 'visit-list' },
      { title: 'Visit Calendar', to: 'visit-calendar' },
    ],
  },
];
