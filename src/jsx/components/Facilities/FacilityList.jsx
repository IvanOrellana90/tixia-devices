import React, { useMemo, useEffect, useState } from 'react';
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table';
import { supabase } from '../../supabase/client'; // Asegúrate de importar el cliente de Supabase
import PageTitle from '../../layouts/PageTitle';

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

const FacilityList = () => {
  const [facilities, setFacilities] = useState([]); // Estado para almacenar la lista de instalaciones
  const [sites, setSites] = useState([]); // Estado para almacenar la lista de sitios
  const [clients, setClients] = useState([]); // Estado para almacenar la lista de clientes

  // Obtener la lista de instalaciones, sitios y clientes desde Supabase
  useEffect(() => {
    const fetchData = async () => {
      // Obtener instalaciones
      const { data: facilitiesData, error: facilitiesError } = await supabase
        .from('facilities')
        .select('*');

      // Obtener sitios
      const { data: sitesData, error: sitesError } = await supabase
        .from('sites')
        .select('*');

      // Obtener clientes
      const { data: clientsData, error: clientsError } = await supabase
        .from('clients')
        .select('*');

      if (facilitiesError || sitesError || clientsError) {
        console.error(
          'Error fetching data:',
          facilitiesError || sitesError || clientsError
        );
      } else {
        setFacilities(facilitiesData);
        setSites(sitesData);
        setClients(clientsData);
      }
    };

    fetchData();
  }, []);

  // Relacionar instalaciones con sitios y clientes para obtener el nombre del sitio y del cliente
  const data = useMemo(() => {
    return facilities.map((facility) => {
      const site = sites.find((site) => site.id === facility.site_id);
      const client = site
        ? clients.find((client) => client.id === site.client_id)
        : null;

      return {
        ...facility,
        site_name: site ? site.name : 'Unknown Site', // Mostrar el nombre del sitio o "Unknown Site" si no se encuentra
        client_name: client ? client.name : 'Unknown Client', // Mostrar el nombre del cliente o "Unknown Client" si no se encuentra
      };
    });
  }, [facilities, sites, clients]);

  // Definición de columnas
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name', // Accede a la propiedad "name" de cada instalación
        Filter: ColumnFilter, // Filtro por columna
      },
      {
        Header: 'Site',
        accessor: 'site_name', // Accede a la propiedad "site_name" (nombre del sitio)
        Filter: ColumnFilter, // Filtro por columna
      },
      {
        Header: 'Client',
        accessor: 'client_name', // Accede a la propiedad "client_name" (nombre del cliente)
        Filter: ColumnFilter, // Filtro por columna
      },
      {
        Header: 'KSEC ID',
        accessor: 'ksec_id', // Accede a la propiedad "ksec_id" de cada instalación
        Filter: ColumnFilter, // Filtro por columna
      },
    ],
    []
  );

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
  } = useTable({ columns, data }, useFilters, useGlobalFilter, useSortBy);

  const { globalFilter } = state;

  return (
    <>
      <PageTitle activeMenu="Facilities" motherMenu="Table" />
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Facility List</h4>
        </div>
        <div className="card-body">
          {/* Campo de búsqueda global */}
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
                            {/* Filtro por columna */}
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
                {rows.map((row) => {
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
              <tfoot>
                {footerGroups.map((footerGroup) => {
                  const { key, ...restFooterGroupProps } =
                    footerGroup.getFooterGroupProps();
                  return (
                    <tr key={key} {...restFooterGroupProps}>
                      {footerGroup.headers.map((column) => {
                        const { key: columnKey, ...restColumnProps } =
                          column.getFooterProps();
                        return (
                          <td key={columnKey} {...restColumnProps}>
                            {column.render('Footer')}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default FacilityList;
