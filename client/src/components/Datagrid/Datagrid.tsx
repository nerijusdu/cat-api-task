import './Datagrid.less';
import { Entity } from "../../models/entity";
import DatagridPaging, { DatagridPagingProps } from './DatagridPaging';

export type DatagridColumn<T> = {
  title: string;
  field: keyof T & string;
};

export type DatagridProps<T> = {
  data: T[];
  columns: DatagridColumn<T>[];
  paging?: DatagridPagingProps;
};

const Datagrid = <T extends Entity>({ data, columns, paging }: DatagridProps<T>) => {
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
              {columns.map(column => (
                <td key={column.field}>
                  {item[column.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {paging && <DatagridPaging {...paging}/>}
    </div>
  );
};

export default Datagrid;
