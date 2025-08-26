import React, { useMemo, useEffect, useState } from 'react';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
} from 'react-table';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase/client';
import PageTitle from '../../layouts/PageTitle';

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


const MobileList = () => {
  const [mobiles, setMobiles] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const fetchMobiles = async () => {
      const { data, error } = await supabase
        .from('mobiles')
        .select(
          'id, imei, model, has_sim_card, is_rented, active, devices(id, location, unique_id)'
        );
      if (error) throw error;
      const mobilesNormalized = data.map((row) => {
        const devicesValue = row.devices;
        const device = Array.isArray(devicesValue)
          ? devicesValue[0]
          : devicesValue;
        return {
          ...row,
          device_id: device?.id ?? null,
          device_location: device?.location ?? '',
          unique_id: device?.unique_id ?? '',
        };
      });

      setMobiles(mobilesNormalized);
    };

    fetchMobiles();
  }, []);

  const COLUMNS = [
    {
      Header: 'IMEI',
      accessor: 'imei',
      Filter: ColumnFilter,
      Cell: ({ row }) => row.original.imei,
    },
    {
      Header: 'Device',
      accessor: 'device_location',
      Filter: ColumnFilter,
      Cell: ({ value, row }) => {
        const id = row.original.device_id;
        return id ? (
          <a href={`/device/${id}`} className="text-primary">
            {value || '(sin ubicación)'}
          </a>
        ) : (
          <span className="text-muted">—</span>
        );
      },
    },
    {
      Header: 'Unique ID',
      accessor: 'unique_id',
      Filter: ColumnFilter,
    },
    {
      Header: 'Model',
      accessor: 'model',
      Filter: ColumnFilter,
    },
    {
      Header: 'SIM Card',
      accessor: 'has_sim_card',
      Filter: ColumnFilter,
      Cell: ({ value }) =>
        value ? (
          <span className="text-xs py-[5px] px-3 rounded-lg leading-[1.5] inline-block text-success bg-success-light dark:bg-[#21b7311a]">
            Yes
          </span>
        ) : (
          <span className="text-xs py-[5px] px-3 rounded-lg leading-[1.5] inline-block text-danger bg-danger-light dark:bg-[#ed34431a]">
            No
          </span>
        ),
    },
    {
      Header: 'Rented',
      accessor: 'is_rented',
      Filter: ColumnFilter,
      Cell: ({ value }) =>
        value ? (
          <span className="text-xs py-[5px] px-3 rounded-lg leading-[1.5] inline-block text-success bg-success-light dark:bg-[#21b7311a]">
            Yes
          </span>
        ) : (
          <span className="text-xs py-[5px] px-3 rounded-lg leading-[1.5] inline-block text-danger bg-danger-light dark:bg-[#ed34431a]">
            No
          </span>
        ),
    },
    {
      Header: 'State',
      accessor: (row) => (row.active ? 'Active' : 'Inactive'),
      Filter: ColumnFilter,
      Cell: ({ value }) => (
        <div className="d-flex align-items-center">
          <i
            className={`fa fa-circle me-2 ${value === 'Active' ? 'text-success' : 'text-danger'}`}
          ></i>
          {value}
        </div>
      ),
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      disableGlobalFilter: true,
      Cell: ({ row }) => (
        <div className="d-flex">
          <button
            onClick={() => {
              nav(`/edit-mobile/${row.original.id}`);
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

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => mobiles, [mobiles]);

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
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
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
      <PageTitle activeMenu="Mobiles" motherMenu="Table" />
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Mobile Devices</h4>
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

export default MobileList;
