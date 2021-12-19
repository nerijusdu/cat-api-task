import './Datagrid.less';
import { Entity } from "../../models/entity";
import DatagridPaging, { DatagridPagingProps } from './DatagridPaging';

export type DatagridColumn<T> = {
  title: string;
  field: keyof T & string;
  customRender?: (item: T) => React.ReactNode;
};

export type DatagridProps<T> = {
  data: T[];
  columns: DatagridColumn<T>[];
  paging?: DatagridPagingProps;
};

// TODO: add sorting

const Datagrid = <T extends Entity>({ data, columns, paging }: DatagridProps<T>) => {
  if (data.length === 0) {
    return <div className="empty-message">Nothing to show.</div>;
  }

  return (
    <div className="data-grid">
      <table className="data-table">
        <thead>
          <tr className="data-table-header">
            {columns.map(column => (
              <th key={column.field}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id} className="data-table-row">
              {columns.map(column => <DataGridCell key={column.field} item={item} column={column} />)}
            </tr>
          ))}
        </tbody>
      </table>
      {paging && <DatagridPaging {...paging}/>}
    </div>
  );
};

type DataGridCellProps<T> = {
  item: T;
  column: DatagridColumn<T>;
};

const DataGridCell = <T extends Entity>({ item, column }: DataGridCellProps<T>) => {
  if (column.customRender) {
    return <td>{column.customRender(item)}</td>;
  }

  return <td>{item[column.field]}</td>;
};

export default Datagrid;
