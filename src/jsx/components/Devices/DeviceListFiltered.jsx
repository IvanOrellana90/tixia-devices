import { useMemo, useEffect, useState } from 'react';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
} from 'react-table';
import { supabase } from '../../supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';

// Componente para el filtro por columna
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

// Componente Reutilizable
const DeviceListFiltered = ({ filter = {}, clientName }) => {
  const [devices, setDevices] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [locationInput, setLocationInput] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [deviceToDelete, setDeviceToDelete] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const fetchDevices = async () => {
      // 1. Iniciamos la consulta base
      let query = supabase
        .from('devices')
        .select(
          `
            *,
            clients:client_id (name),
            facility:facility_id (name),
            site:site_id (name),
            mobile:mobile_id (
              id,
              imei,
              model,
              has_sim_card,
              is_rented,
              active
            ),
            device_configurations (
              configuration
            )
          `
        );

      // 2. Aplicamos filtros dinámicos si existen en los props
      if (filter.clientId) {
        query = query.eq('client_id', filter.clientId);
      }

      if (filter.siteId) {
        query = query.eq('site_id', filter.siteId);
      }

      if (filter.facilityId) {
        query = query.eq('facility_id', filter.facilityId);
      }

      // 3. Ordenamos y ejecutamos
      const { data, error } = await query.order('activated_at', { ascending: false });

      if (error) {
        console.error('Error fetching devices:', error.message);
        toast.error('Error loading devices');
      } else {
        const devicesWithNames = data.map((device) => ({
          ...device,
          client_name: device.clients?.name || '',
          facility_name: device.facility?.name || '',
          site_name: device.site?.name || '',
          model: device.mobile?.model || '',
          mobile: device.mobile || '',
          mobile_imei: device.mobile?.imei || '',
          mobile_active: device.mobile?.active || false,
          configuration_json: device.device_configurations?.configuration || {},
        }));
        setDevices(devicesWithNames);
      }
    };

    fetchDevices();

  }, [filter.clientId, filter.siteId, filter.facilityId]);

  const COLUMNS = [
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
      Header: 'Mobile',
      accessor: 'mobile_imei',
      Filter: ColumnFilter,
      Cell: ({ row }) => {
        const mobile = row.original.mobile;
        return mobile ? (
          mobile.imei
        ) : (
          <span className="text-muted">Sin IMEI</span>
        );
      },
    },
    {
      Header: 'Unique ID',
      accessor: 'unique_id',
      Filter: ColumnFilter,
    },
    {
      Header: 'Site',
      accessor: 'site_name',
      Filter: ColumnFilter,
    },
    {
      Header: 'Facility',
      accessor: 'facility_name',
      Filter: ColumnFilter,
    },
    {
      Header: 'Mode',
      accessor: 'mode',
      Filter: ColumnFilter,
    },
    {
      Header: 'Version',
      accessor: 'version_name',
      Filter: ColumnFilter,
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => devices, [devices]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
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
      globalFilter: (rows, _, globalFilter) => {
        const searchValue = globalFilter.toLowerCase();
        return rows.filter((row) => {
          return Object.values(row.original).some((value) => {
            if (value === null || value === undefined) return false;
            return String(value).toLowerCase().includes(searchValue);
          });
        });
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter } = state;

  const exportToExcel = () => {
    const fileName = clientName + '_devices_export_' + new Date().toISOString();
    const exportData = data.map((row) => ({
      Location: row.location,
      Mode: row.mode,
      Client: row.client_name,
      Site: row.site_name,
      Facility: row.facility_name,
      IMEI: row.mobile_imei || '',
      Model: row.model,
      Version: row.version_name,
      HasSim: row.mobile?.has_sim || false,
      IsRented: row.mobile?.is_rented || false,
      Status: row.mobile_active ? 'Active' : 'Inactive',
    }));

    const configData = data.map((row) => {
      const config =
        typeof row.configuration_json === 'object' &&
        row.configuration_json !== null
          ? row.configuration_json
          : {};
      return {
        Location: row.location,
        UniqueId: row.unique_id,
        ...config,
      };
    });

    const workbook = XLSX.utils.book_new();
    const worksheetDevices = XLSX.utils.json_to_sheet(exportData);
    const worksheetConfigs = XLSX.utils.json_to_sheet(configData);

    XLSX.utils.book_append_sheet(workbook, worksheetDevices, 'Devices');
    XLSX.utils.book_append_sheet(workbook, worksheetConfigs, 'Configurations');

    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Device List</h4>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <input
              type="text"
              value={globalFilter || ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search all columns..."
              className="form-control"
            />
          </div>

          <div className="table-responsive">
            <table {...getTableProps()} className="table table-striped">
              <thead>
                {headerGroups.map((headerGroup) => {
                  // 1. CORRECCIÓN AQUÍ: Header Groups
                  const { key: headerGroupKey, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
                  return (
                    <tr key={headerGroupKey} {...restHeaderGroupProps}>
                      {headerGroup.headers.map((column) => {
                        // 2. CORRECCIÓN AQUÍ: Column Headers
                        const { key: colKey, ...restColumnProps } = column.getHeaderProps(column.getSortByToggleProps());
                        return (
                          <th key={colKey} {...restColumnProps}>
                            {column.render('Header')}
                            <span className="ms-1">
                              {column.isSorted ? (column.isSortedDesc ? <i className="fa fa-arrow-down" /> : <i className="fa fa-arrow-up" />) : ''}
                            </span>
                            <div>{column.canFilter ? column.render('Filter') : null}</div>
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
                  // 3. CORRECCIÓN AQUÍ: Filas del cuerpo (Body Rows)
                  const { key: rowKey, ...restRowProps } = row.getRowProps();
                  return (
                    <tr key={rowKey} {...restRowProps}>
                      {row.cells.map((cell) => {
                        // 4. CORRECCIÓN AQUÍ: Celdas (Body Cells)
                        const { key: cellKey, ...restCellProps } = cell.getCellProps();
                        return (
                          <td key={cellKey} {...restCellProps}>{cell.render('Cell')}</td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="pagination">
              <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="btn btn-primary me-2">{'<<'}</button>
              <button onClick={() => previousPage()} disabled={!canPreviousPage} className="btn btn-primary me-2">{'<'}</button>
              <button onClick={() => nextPage()} disabled={!canNextPage} className="btn btn-primary me-2">{'>'}</button>
              <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="btn btn-primary me-2">{'>>'}</button>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="form-select ms-2"
                style={{ width: 'auto' }}
              >
                {[10, 50, 100, 200].map((size) => (
                  <option key={size} value={size}>Show {size}</option>
                ))}
              </select>
            </div>
            <button onClick={exportToExcel} className="me-1 btn btn-outline-success btn-rounded btn-sm">Excel</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeviceListFiltered;