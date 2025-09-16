import DevicesByModeChart from '../Data/DevicesByModeChart';
import ClientDevicesTable from '../Data/ClientDevicesTable';
import DevicesByVersionChart from '../Data/DeviceByVersionChart';

const OverviewTab = ({ devices, clients }) => {
  if (!devices || devices.length === 0) {
    return <div className="text-center py-5">No devices found</div>;
  }

  return (
    <div className="row">
      <div className="col-md-12 col-xl-4">
        {/* Donut chart con animación */}
        <DevicesByModeChart devices={devices} />
      </div>
      <div className="col-md-12 col-xl-8">
        <ClientDevicesTable clients={clients} devices={devices} />
      </div>
      <div className="col-xl-4 col-md-6">
        <DevicesByVersionChart />
      </div>
    </div>
  );
};

export default OverviewTab;
