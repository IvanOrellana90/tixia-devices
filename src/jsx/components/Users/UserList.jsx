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

const UserList = () => {
  const [users, setUsers] = useState([]);
  const nav = useNavigate();

  // 🚀 Cargar usuarios desde Supabase
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('id, email, first_name, last_name, phone, role');

      if (error) {
        console.error('Error fetching users:', error.message);
      } else {
        setUsers(data || []);
      }
    };
    fetchUsers();
  }, []);

  // 📋 Definición de columnas
  const COLUMNS = [
    {
      Header: 'Email',
      accessor: 'email',
      Filter: ColumnFilter,
    },
    {
      Header: 'First Name',
      accessor: 'first_name',
      Filter: ColumnFilter,
    },
    {
      Header: 'Last Name',
      accessor: 'last_name',
      Filter: ColumnFilter,
    },
    {
      Header: 'Phone',
      accessor: 'phone',
      Filter: ColumnFilter,
    },
    {
      Header: 'Role',
      accessor: 'role',
      Filter: ColumnFilter,
      Cell: ({ value }) => (
        <span
          className={`badge ${value === 'admin' ? 'bg-primary-light text-primary dark border-primary' : 'bg-success-light text-success dark border-success border-success'}`}
        >
          {value ? value.charAt(0).toUpperCase() + value.slice(1) : 'Viewer'}
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
            onClick={() => {
              nav(`/edit-user/${row.original.id}`);
            }}
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
  const data = useMemo(() => users, [users]);

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
      <PageTitle activeMenu="Users" motherMenu="Admin" />
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">User List</h4>
        </div>
        <div className="card-body">
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
                  const rowProps = row.getRowProps();
                  const { key, ...safeRowProps } = rowProps;
                  return (
                    <tr key={row.original.id || row.id} {...safeRowProps}>
                      {row.cells.map((cell) => {
                        const cellProps = cell.getCellProps();
                        const { key, ...safeCellProps } = cellProps;
                        return (
                          <td key={cell.column.id} {...safeCellProps}>
                            {cell.render('Cell') || '-'}
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
        </div>
      </div>
    </>
  );
};

export default UserList;
