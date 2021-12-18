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
      <button
        className="paging-button"
        onClick={() => onPageChange(page-1)}
        disabled={page === 0}
      >
        Previous
      </button>

      <span>Page: {page}</span>

      <button
        className="paging-button"
        onClick={() => onPageChange(page+1)}
        disabled={page === totalPages-1}
      >
        Next
      </button>
    </div>
  );
};

export default DatagridPaging;
