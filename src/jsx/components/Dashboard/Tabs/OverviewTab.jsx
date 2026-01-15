import DevicesByModeChart from '../Data/DevicesByModeChart';
import ClientDevicesTable from '../Data/ClientDevicesTable';
import DevicesByVersionChart from '../Data/DeviceByVersionChart';
import TagsListCard from '../Data/TagsListCard';

const OverviewTab = ({ devices, clients }) => {
  if (!devices || devices.length === 0) {
    return <div className="text-center py-5">No devices found</div>;
  }

  return (
    <> 
    

      <div className="row align-items-start">
        <div className="col-md-12 col-xl-12">
          <ClientDevicesTable clients={clients} devices={devices} />
        </div>
      </div>
      
      <div className="row align-items-start">
        <div className="col-md-12 col-xl-4">
          <DevicesByModeChart devices={devices} />
        </div>
        <div className="col-xl-4 col-md-12">
          <DevicesByVersionChart />
        </div>
        <div className="col-md-12 col-xl-4">
          <TagsListCard />
        </div>
      </div>
    </> 
  );
};

export default OverviewTab;
