import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';
import { Dropdown, Form } from 'react-bootstrap';

const DevicesByModeChart = ({
  data,
  title = 'Devices by Mode',
  clients,
  onClientFilter,
}) => {
  const [showActiveDevices, setShowActiveDevices] = useState(false);
  
  const devicesData = showActiveDevices ? data.active : data.inactive;
  const totalDevices = Object.values(devicesData).reduce((a, b) => a + b, 0);

  const colors = ['#8884D8', '#FF8042', '#82CA9D'];
  const categories = Object.keys(devicesData);

  return (
    <div className="card">
      <div className="card-header border-0 pb-0 d-flex justify-content-between align-items-center">
        <h4 className="card-title mb-0">{title}</h4>

        <Dropdown>
          <Dropdown.Toggle variant="light" size="sm" id="clientFilterDropdown">
            {data.clientFilter === 'all'
              ? 'All Clients'
              : clients.find((c) => c.id === data.clientFilter)?.name ||
                'Select Client'}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => onClientFilter('all')}>
              All Clients
            </Dropdown.Item>
            {clients.map((client) => (
              <Dropdown.Item
                key={client.id}
                onClick={() => onClientFilter(client.id)}
              >
                {client.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="card-body pt-2">
        <div className="border p-3 d-flex justify-content-between fs-14 rounded-lg mb-1">
          <span className="text-black">
            Total {showActiveDevices ? 'active' : 'inactive'} devices
          </span>
          <span className="text-black">{totalDevices}</span>
        </div>

        <Form.Check
          type="switch"
          id="active-switch"
          checked={showActiveDevices}
          onChange={() => setShowActiveDevices((prev) => !prev)}
          style={{
            cursor: 'pointer',
          }}
          className="mb-4 status-devices"
        />

        <div className="text-center">
          <ReactApexChart
            options={{
              chart: { type: 'pie' },
              labels: categories,
              colors: colors,
              legend: { position: 'bottom' },
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    chart: { width: 200 },
                    legend: { position: 'bottom' },
                  },
                },
              ],
              tooltip: { y: { formatter: (value) => `${value}` } },
            }}
            series={Object.values(devicesData)}
            type="pie"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

DevicesByModeChart.propTypes = {
  data: PropTypes.shape({
    active: PropTypes.object,
    inactive: PropTypes.object,
    clientFilter: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  title: PropTypes.string,
  clients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClientFilter: PropTypes.func.isRequired,
};

export default DevicesByModeChart;
