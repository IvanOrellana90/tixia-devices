import { useMemo, useEffect, useState } from 'react';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
} from 'react-table';
import { supabase } from '../../supabase/client';
import PageTitle from '../../layouts/PageTitle';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';
import { is } from 'date-fns/locale';

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

const DeviceList = () => {
  const [devices, setDevices] = useState([]);
  const [showAlert, setShowAlert] = useState(false); // Controla la visibilidad de la alerta
  const [locationInput, setLocationInput] = useState(''); // Almacena el location ingresado
  const [deviceToDelete, setDeviceToDelete] = useState(null); // Almacena el dispositivo a eliminar
  const nav = useNavigate();

  useEffect(() => {
    const fetchDevices = async () => {
      const { data, error } = await supabase
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
        )
        .order('activated_at', { ascending: false });

      if (error) {
        console.error('Error fetching devices:', error.message);
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
  }, []);

  const handleDelete = (device) => {
    setDeviceToDelete(device); // Guardar el dispositivo a eliminar
    setShowAlert(true); // Mostrar la alerta
  };

  const confirmDelete = async () => {
    if (locationInput === deviceToDelete.location) {
      try {
        const { error } = await supabase
          .from('devices')
          .delete()
          .eq('id', deviceToDelete.id);

        if (error) {
          throw error;
        }

        // Actualizar el estado local eliminando el dispositivo
        setDevices((prevDevices) =>
          prevDevices.filter((device) => device.id !== deviceToDelete.id)
        );

        // Mostrar mensaje de éxito
        toast.success('Device deleted successfully!');
      } catch (error) {
        console.error('Error deleting device:', error.message);
        toast.error('Error deleting device.');
      }
    } else {
      toast.error('Incorrect location. Deletion canceled.');
    }

    // Cerrar la alerta y resetear los estados
    setShowAlert(false);
    setLocationInput('');
    setDeviceToDelete(null);
  };

  // Definición de columnas
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
      Header: 'Client',
      accessor: 'client_name',
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
    {
      Header: 'Actions',
      accessor: 'actions',
      disableGlobalFilter: true,
      Cell: ({ row }) => (
        <div className="d-flex">
          {/* Botón de editar */}
          <button
            onClick={() => {
              // Redirigir a la página de edición con el ID del dispositivo
              nav(`/edit-device/${row.original.id}`);
            }}
            className="btn btn-primary shadow btn-xs me-1"
          >
            <i className="fa fa-edit" />
          </button>

          {/* Botón de eliminar */}
          <button
            onClick={() => handleDelete(row.original)}
            className="btn btn-danger shadow btn-xs"
          >
            <i className="fa fa-trash" />
          </button>
        </div>
      ),
      disableFilters: true,
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => devices, [devices]);

  // Configuración de react-table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    page, // Página actual
    canPreviousPage, // ¿Se puede retroceder a la página anterior?
    canNextPage, // ¿Se puede avanzar a la página siguiente?
    pageOptions, // Opciones de página (número total de páginas)
    pageCount, // Número total de páginas
    gotoPage, // Ir a una página específica
    nextPage, // Ir a la página siguiente
    previousPage, // Ir a la página anterior
    setPageSize, // Cambiar el tamaño de la página
    state: { pageIndex, pageSize }, // Estado de la paginación
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
    const fileName = 'devices_export';
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

    // Crear una hoja de cálculo
    const workbook = XLSX.utils.book_new();
    const worksheetDevices = XLSX.utils.json_to_sheet(exportData);
    const worksheetConfigs = XLSX.utils.json_to_sheet(configData);

    XLSX.utils.book_append_sheet(workbook, worksheetDevices, 'Devices');
    XLSX.utils.book_append_sheet(workbook, worksheetConfigs, 'Configurations');

    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  return (
    <>
      <PageTitle activeMenu="Devices" motherMenu="Table" />
      {/* Alerta de confirmación */}
      {showAlert && (
        <div
          role="alert"
          className="fade notification alert alert-danger show mb-4"
        >
          <p className="notification-title mb-2">
            <strong>Confirm Deletion</strong>
          </p>
          <p>Please enter the location of the device to confirm deletion:</p>
          <input
            type="text"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            className="form-control mb-2"
            placeholder="Enter location"
          />
          <button
            type="button"
            onClick={confirmDelete}
            className="btn btn-danger btn-sm me-2"
          >
            Confirm
          </button>
          <button
            type="button"
            onClick={() => setShowAlert(false)}
            className="btn btn-link btn-sm"
          >
            Cancel
          </button>
        </div>
      )}
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
                  const { key, ...restHeaderGroupProps } =
                    headerGroup.getHeaderGroupProps();
                  return (
                    <tr key={key} {...restHeaderGroupProps}>
                      {headerGroup.headers.map((column) => {
                        const { key: columnKey, ...restColumnProps } =
                          column.getHeaderProps(column.getSortByToggleProps());
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
          {/* Controles de paginación */}
          <div className="d-flex justify-content-between align-items-center mt-3">
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
            {/* Botón de exportación a Excel */}
            <button
              onClick={exportToExcel}
              className="me-1 btn btn-outline-success btn-rounded btn-sm"
            >
              Excel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeviceList;
