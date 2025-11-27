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
import { useNavigate } from 'react-router-dom';

// 🔍 Filtro individual por columna
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

const VisitList = () => {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  // 🚀 Cargar visitas desde Supabase
  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const { data, error } = await supabase
          .from('visits')
          .select(
            `
            id,
            date,
            type,
            status,
            clients(name),
            sites(name),
            facilities(name),
            created_at
          `
          )
          .order('date', { ascending: false });

        if (error) throw error;
        setVisits(data || []);
      } catch (error) {
        console.error('Error fetching visits:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVisits();
  }, []);

  // 📋 Definición de columnas
  const COLUMNS = [
    {
      Header: 'Date',
      accessor: 'date',
      Filter: ColumnFilter,
      Cell: ({ value }) =>
        value
          ? new Date(value).toLocaleString(undefined, {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })
          : '-',
    },
    {
      Header: 'Client',
      accessor: 'clients.name',
      Filter: ColumnFilter,
    },
    {
      Header: 'Site',
      accessor: 'sites.name',
      Filter: ColumnFilter,
    },
    {
      Header: 'Facility',
      accessor: 'facilities.name',
      Filter: ColumnFilter,
    },
    {
      Header: 'Type',
      accessor: 'type',
      Filter: ColumnFilter,
      Cell: ({ value }) => (
        <span
          className={`badge ${
            value === 'preventive'
              ? 'bg-success-light text-success border-success'
              : value === 'corrective'
                ? 'bg-warning-light text-warning border-warning'
                : 'bg-info-light text-info border-info'
          }`}
        >
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      ),
    },
    {
      Header: 'Status',
      accessor: 'status',
      Filter: ColumnFilter,
      Cell: ({ value }) => (
        <span
          className={`badge ${
            value === 'scheduled'
              ? 'bg-secondary-light text-secondary border-secondary'
              : value === 'in_progress'
                ? 'bg-primary-light text-primary border-primary'
                : value === 'completed'
                  ? 'bg-success-light text-success border-success'
                  : 'bg-danger-light text-danger border-danger'
          }`}
        >
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      ),
    },
    {
      Header: '',
      accessor: 'actions',
      disableGlobalFilter: true,
      Cell: ({ row }) => (
        <div className="d-flex">
          <button
            onClick={() => nav(`/edit-visit/${row.original.id}`)}
            className="btn btn-primary shadow btn-xs me-1"
          >
            <i className="fa fa-edit" />
          </button>
        </div>
      ),
      disableFilters: true,
    },
  ];

  // ⚙️ Configuración de react-table
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => visits, [visits]);

  const tableInstance = useTable(
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
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      <PageTitle activeMenu="Visits" motherMenu="Operations" />
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4 className="card-title">Visit List</h4>
        </div>
        <div className="card-body">
          {loading ? (
            <p>Loading visits...</p>
          ) : (
            <>
              {/* 🔍 Búsqueda global */}
              <div className="mb-3">
                <input
                  type="text"
                  value={globalFilter || ''}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  placeholder="Search all columns..."
                  className="form-control"
                />
              </div>

              {/* 📋 Tabla */}
              <div className="table-responsive">
                <table {...getTableProps()} className="table table-striped">
                  <thead>
                    {headerGroups.map((headerGroup) => {
                      const { key: headerGroupKey, ...safeHeaderGroupProps } =
                        headerGroup.getHeaderGroupProps();
                      return (
                        <tr key={headerGroupKey} {...safeHeaderGroupProps}>
                          {headerGroup.headers.map((column) => {
                            const headerProps = column.getHeaderProps(
                              column.getSortByToggleProps()
                            );
                            // 🔧 quitar key del spread
                            const { key, ...safeHeaderProps } = headerProps;
                            return (
                              <th key={column.id} {...safeHeaderProps}>
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

                      // Sacamos el key que genera react-table
                      const { key: rowKey, ...rowProps } = row.getRowProps();

                      return (
                        <tr key={rowKey} {...rowProps}>
                          {row.cells.map((cell) => {
                            const { key: cellKey, ...cellProps } = cell.getCellProps();

                            return (
                              <td key={cellKey} {...cellProps}>
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

              {/* 📄 Paginación */}
              <div className="pagination mt-3 d-flex align-items-center">
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
                  className="btn btn-primary me-3"
                >
                  {'>>'}
                </button>

                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="form-select"
                  style={{ width: 'auto' }}
                >
                  {[10, 25, 50, 100].map((size) => (
                    <option key={size} value={size}>
                      Show {size}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default VisitList;
