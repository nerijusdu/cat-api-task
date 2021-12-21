import { useState } from "react";
import { Entity } from "../../models/entity";
import { DatagridColumn } from "./Datagrid";
import UpArrow from '../../assets/arrow-up.svg';
import DownArrow from '../../assets/arrow-down.svg';
import { SortDirection } from "../../models/sort-direction";
import './DatagridHeaderCell.less';

export type DatagridHeaderCellProps<T> = {
  column: DatagridColumn<T>;
  onSort?: (field: keyof T, direction: SortDirection) => void;
  isSorted?: boolean;
};

const DatagridHeaderCell = <T extends Entity>({ column, onSort, isSorted }: DatagridHeaderCellProps<T>) => {
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  if (!column.isSortable || !onSort) {
    return <th>{column.title}</th>;
  }

  const handleSortClick = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(column.field, newDirection);
    setSortDirection(newDirection);
  };

  return (
    <th className="header-cell">
      <button onClick={handleSortClick}>
        {column.title}
        {isSorted && sortDirection === 'asc' && <DownArrow />}
        {isSorted && sortDirection === 'desc' && <UpArrow />}
      </button>
    </th>
  );
};

export default DatagridHeaderCell;
