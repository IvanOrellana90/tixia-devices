import DevicesByModeChart from '../Data/DevicesByModeChart';

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
        {/* Aquí podrías mostrar más estadísticas filtradas por client si quieres */}
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Summary</h4>
          </div>
          <div className="card-body">
            <p>
              Total devices: <strong>{devices.length}</strong>
            </p>
            <p>
              Total clients: <strong>{clients?.length || 0}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
