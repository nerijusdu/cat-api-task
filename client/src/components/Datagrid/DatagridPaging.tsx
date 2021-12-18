import Button from '../Button/Button';
import './DatagridPaging.less';

export type DatagridPagingProps = {
  pageSize: number;
  page: number;
  onPageChange: (page: number) => void;
  totalItems: number;
};

const DatagridPaging : React.FC<DatagridPagingProps> = ({
  pageSize,
  page,
  onPageChange,
  totalItems,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className="paging">
      <Button
        onClick={() => onPageChange(page-1)}
        isDisabled={page === 0}
      >
        Previous
      </Button>

      <span>Page: {page+1}</span>

      <Button
        onClick={() => onPageChange(page+1)}
        isDisabled={page >= totalPages-1}
      >
        Next
      </Button>
    </div>
  );
};

export default DatagridPaging;
