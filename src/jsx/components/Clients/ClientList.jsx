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

// Definición de columnas
const COLUMNS = [
  {
    Header: 'Name',
    accessor: 'name', // Accede a la propiedad "name" de cada cliente
    Filter: ColumnFilter, // Filtro por columna
  },
  {
    Header: 'URL',
    accessor: 'url', // Accede a la propiedad "url" de cada cliente
    Filter: ColumnFilter, // Filtro por columna
  },
  {
    Header: 'API Key',
    accessor: 'api_key', // Accede a la propiedad "api_key" de cada cliente
    Filter: ColumnFilter, // Filtro por columna
  },
];

const ClientList = () => {
  const [clients, setClients] = useState([]); // Estado para almacenar la lista de clientes

  // Obtener la lista de clientes desde Supabase
  useEffect(() => {
    const fetchClients = async () => {
      const { data, error } = await supabase.from('clients').select('*'); // Seleccionar todas las columnas de la tabla "clients"

      if (error) {
        console.error('Error fetching clients:', error.message);
      } else {
        setClients(data); // Guardar la lista de clientes en el estado
      }
    };

    fetchClients();
  }, []);

  // Configuración de react-table
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => clients, [clients]); // Usar los datos de Supabase en lugar de MOCK_DATA

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
      <PageTitle activeMenu="Clients" motherMenu="Table" />
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Client List</h4>
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

export default ClientList;
