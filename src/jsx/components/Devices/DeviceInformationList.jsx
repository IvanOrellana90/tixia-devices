import React, { useMemo, useEffect, useState } from 'react';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
} from 'react-table';
import { supabase } from '../../supabase/client';
import PageTitle from '../../layouts/PageTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faCircleXmark,
  faClock,
  faRobot,
} from '@fortawesome/free-solid-svg-icons';
import { fetchNagiosStatus } from '../../services/nagiosService';

// 🔍 Filtro por columna
const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <input
      type="text"
      value={filterValue || ''}
      onChange={(e) => setFilter(e.target.value)}
      placeholder={`Search ${column.Header}`}
      className="form-control"
    />
  );
};

// 🔹 Renderizado del estado Nagios
const renderNagiosStatus = (nagios, location) => {
  const nagiosUrl = nagios?.name
    ? `https://nagios.ksec.cl/nagios/cgi-bin/extinfo.cgi?type=1&host=${location}`
    : `https://nagios.ksec.cl/nagios`;

  const wrapper = (content) => (
    <a
      href={nagiosUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      {content}
    </a>
  );

  if (!nagios) {
    return wrapper(
      <div className="d-flex align-items-center">
        <FontAwesomeIcon icon={faClock} className="text-warning me-2" />
        <span>Inactive</span>
      </div>
    );
  }

  if (nagios.status === 'DOWN' || nagios.status === 'UNREACHABLE') {
    return wrapper(
      <div className="d-flex align-items-center">
        <FontAwesomeIcon icon={faCircleXmark} className="text-danger me-2" />
        <span>{nagios.status}</span>
      </div>
    );
  }

  if (nagios.status === 'UP') {
    return wrapper(
      <div className="d-flex align-items-center">
        <FontAwesomeIcon icon={faCircleCheck} className="text-success me-2" />
        <span>UP ({nagios.uptime})</span>
      </div>
    );
  }

  return wrapper(
    <div className="d-flex align-items-center">
      <FontAwesomeIcon icon={faClock} className="text-secondary me-2" />
      <span>{nagios.status || 'Unknown'}</span>
    </div>
  );
};

const DeviceInformationList = () => {
  const [devices, setDevices] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // 📦 Devices
      const { data: devicesData, error: devicesError } = await supabase.from(
        'devices'
      ).select(`
        id,
        location,
        version_name,
        mobile:mobile_id (
          model
        )
      `);

      // 📦 Último reporte por location
      const { data: reportsData, error: reportsError } = await supabase.rpc(
        'get_latest_reports_per_location'
      );

      if (devicesError || reportsError) {
        console.error('Error fetching data:', devicesError || reportsError);
        setLoading(false);
        return;
      }

      // 📡 Obtener estado Nagios en paralelo
      const nagiosStates = await Promise.all(
        devicesData.map(async (d) => ({
          location: d.location,
          nagios: await fetchNagiosStatus(d.location),
        }))
      );

      // 🧩 Asociar estado Nagios a cada device
      const enrichedDevices = devicesData.map((d) => {
        const found = nagiosStates.find((n) => n.location === d.location);
        return { ...d, nagios: found?.nagios || null };
      });

      setDevices(enrichedDevices);
      setReports(reportsData);
      setLoading(false);
    };

    fetchData();
  }, []);

  // 🧮 Unir devices con su último reporte y parsear "systemVersion"
  const data = useMemo(() => {
    return devices.map((device) => {
      const lastReport = reports.find((r) => r.location === device.location);

      return {
        ...device,
        model: device.mobile?.model || 'N/A',
        last_windows: lastReport ? lastReport.windows_number : 0,
        last_version:
          lastReport?.version_name || device.version_name || 'unknown',
        system_version: lastReport?.system_version || '',
      };
    });
  }, [devices, reports]);

  // 🧱 Columnas
  const columns = useMemo(
    () => [
      {
        Header: 'Location',
        accessor: 'location',
        Filter: ColumnFilter,
        Cell: ({ row }) => (
          <a href={`/device/${row.original.id}`} className="text-primary">
            {row.original.location}
          </a>
        ),
      },
      {
        Header: 'Model',
        accessor: 'model',
        Filter: ColumnFilter,
      },
      {
        Header: 'Version',
        accessor: 'last_version',
        Filter: ColumnFilter,
      },
      {
        Header: 'Windows',
        accessor: 'last_windows',
        Filter: ColumnFilter,
      },
      {
        Header: 'System Version',
        accessor: 'system_version',
        Filter: ColumnFilter,
        Cell: ({ value }) => {
          const color = value ? 'text-success' : 'text-warning';
          const displayValue = value || '';
          return (
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faRobot} className={`${color} me-2`} />
              <span>{displayValue}</span>
            </div>
          );
        },
      },
      {
        Header: 'Nagios',
        accessor: (row) => row.nagios?.status || 'Unknown',
        Filter: ColumnFilter,
        Cell: ({ row }) =>
          renderNagiosStatus(row.original.nagios, row.original.location),
      },
    ],
    []
  );

  // ⚙️ React Table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter } = state;

  return (
    <>
      <PageTitle activeMenu="Devices Information" motherMenu="Table" />

      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Device Information</h4>
        </div>

        <div className="card-body">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"></div>
              <div className="mt-2">Loading devices and Nagios statuses...</div>
            </div>
          ) : (
            <>
              {/* 🔎 Buscador global */}
              <div className="mb-3">
                <input
                  type="text"
                  value={globalFilter || ''}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  placeholder="Search all columns..."
                  className="form-control"
                />
              </div>

              {/* 🧾 Tabla */}
              <div className="table-responsive">
                <table {...getTableProps()} className="table table-striped">
                  <thead>
                    {headerGroups.map((headerGroup) => {
                      const { key, ...restHeaderGroupProps } =
                        headerGroup.getHeaderGroupProps();
                      return (
                        <tr key={key} {...restHeaderGroupProps}>
                          {headerGroup.headers.map((column) => {
                            const { key: columnKey, ...restColumnProps } =
                              column.getHeaderProps(
                                column.getSortByToggleProps()
                              );
                            return (
                              <th key={columnKey} {...restColumnProps}>
                                {column.render('Header')}
                                <span className="ms-1">
                                  {column.isSorted ? (
                                    column.isSortedDesc ? (
                                      <i className="fa fa-arrow-down" />
                                    ) : (
                                      <i className="fa fa-arrow-up" />
                                    )
                                  ) : (
                                    ''
                                  )}
                                </span>
                                <div>
                                  {column.canFilter
                                    ? column.render('Filter')
                                    : null}
                                </div>
                              </th>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                      prepareRow(row);
                      const { key, ...restRowProps } = row.getRowProps();
                      return (
                        <tr key={key} {...restRowProps}>
                          {row.cells.map((cell) => {
                            const { key: cellKey, ...restCellProps } =
                              cell.getCellProps();
                            return (
                              <td key={cellKey} {...restCellProps}>
                                {cell.render('Cell')}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* 🔁 Paginación */}
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="text-muted small">
                  Showing {page.length} of {rows.length} records
                </div>
                <div className="pagination">
                  <button
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                    className="btn btn-primary me-2"
                  >
                    {'<<'}
                  </button>
                  <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                    className="btn btn-primary me-2"
                  >
                    {'<'}
                  </button>
                  <button
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                    className="btn btn-primary me-2"
                  >
                    {'>'}
                  </button>
                  <button
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                    className="btn btn-primary me-2"
                  >
                    {'>>'}
                  </button>
                  <select
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                    className="form-select ms-2"
                    style={{ width: 'auto' }}
                  >
                    {[10, 50, 100, 200].map((size) => (
                      <option key={size} value={size}>
                        Show {size}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DeviceInformationList;
