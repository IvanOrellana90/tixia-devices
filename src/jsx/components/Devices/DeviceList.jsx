import React, { useMemo, useEffect, useState } from 'react';
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table';
import { supabase } from '../../supabase/client';
import PageTitle from '../../layouts/PageTitle';
import { useNavigate } from 'react-router-dom';

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
  const nav = useNavigate();

  useEffect(() => {
    const fetchDevices = async () => {
      const { data, error } = await supabase.from('devices').select(`
        *,
        clients (name)
      `);

      if (error) {
        console.error('Error fetching devices:', error.message);
      } else {
        const devicesWithClientName = data.map((device) => ({
          ...device,
          client_name: device.clients.name,
        }));
        setDevices(devicesWithClientName);
      }
    };

    fetchDevices();
  }, []);

  // Definición de columnas
  const COLUMNS = [
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
      Header: 'Client',
      accessor: 'client_name',
      Filter: ColumnFilter,
    },
    {
      Header: 'Site KSEC ID',
      accessor: 'site_ksec_id',
      Filter: ColumnFilter,
    },
    {
      Header: 'Facility KSEC ID',
      accessor: 'facility_ksec_id',
      Filter: ColumnFilter,
    },
    {
      Header: 'Location',
      accessor: 'location',
      Filter: ColumnFilter,
    },
    {
      Header: 'Mode',
      accessor: 'mode',
      Filter: ColumnFilter,
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <button
          onClick={() => {
            // Redirigir a la página de edición con el ID del dispositivo
            nav(`/edit-device/${row.original.id}`);
          }}
          className="btn btn-primary btn-xs"
        >
          <i className="fa fa-edit" />
        </button>
      ),
      disableFilters: true,
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => devices, [devices]);

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
      <PageTitle activeMenu="Devices" motherMenu="Table" />
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

export default DeviceList;
