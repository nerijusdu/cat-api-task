import './Datagrid.less';
import { Entity } from "../../models/entity";
import DatagridPaging, { DatagridPagingProps } from './DatagridPaging';
import { useEffect, useState } from 'react';
import { SortDirection } from '../../models/sort-direction';
import DatagridHeaderCell from './DatagridHeaderCell';

export type DatagridColumn<T> = {
  title: string;
  field: keyof T & string;
  customRender?: (item: T) => React.ReactNode;
  isSortable?: boolean;
};

export type DatagridProps<T> = {
  data: T[];
  columns: DatagridColumn<T>[];
  paging?: DatagridPagingProps;
  onSort?: (field: keyof T, direction: SortDirection) => void;
};

const Datagrid = <T extends Entity>({ data, columns, paging, onSort }: DatagridProps<T>) => {
  const [sortedField, setSortedField] = useState<keyof T | null>(null);
  const handleSortClick = (field: keyof T, direction: SortDirection) => {
    setSortedField(field);
    onSort?.(field, direction);
  };

  if (data.length === 0) {
    return <div className="empty-message">Nothing to show.</div>;
  }

  return (
    <div className="data-grid">
      <table className="data-table">
        <thead>
          <tr className="data-table-header">
            {columns.map(column => (
              <DatagridHeaderCell
                key={column.field}
                column={column}
                onSort={handleSortClick}
                isSorted={column.isSortable && sortedField === column.field}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id} className="data-table-row">
              {columns.map(column => <DatagridCell key={column.field} item={item} column={column} />)}
            </tr>
          ))}
        </tbody>
      </table>
      {paging && <DatagridPaging {...paging}/>}
    </div>
  );
};

type DatagridCellProps<T> = {
  item: T;
  column: DatagridColumn<T>;
};

const DatagridCell = <T extends Entity>({ item, column }: DatagridCellProps<T>) => {
  if (column.customRender) {
    return <td>{column.customRender(item)}</td>;
  }

  return <td>{item[column.field]}</td>;
};

export default Datagrid;
