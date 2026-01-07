import React, { useMemo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
} from 'react-table';
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
    Cell: ({ row }) => (
      <Link to={`/client/${row.original.id}`} className="text-primary">
        {row.original.name}
      </Link>
    ),
  },
  {
    Header: 'URL',
    accessor: 'url', // Accede a la propiedad "url" de cada cliente
    Filter: ColumnFilter, // Filtro por columna
    Cell: ({ value }) => (
      <a
        href={value}
        target="_blank"
        className="text-primary"
        rel="noopener noreferrer"
      >
        {value}
      </a>
    ),
  },
];

const ClientList = () => {
  const [clients, setClients] = useState([]); // Estado para almacenar la lista de clientes

  // Obtener la lista de clientes desde Supabase
  useEffect(() => {
    const fetchClients = async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('id, name, url'); // Seleccionar todas las columnas de la tabla "clients"

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
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

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
          <div className="pagination mt-3">
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
      </div>
    </>
  );
};

export default ClientList;
