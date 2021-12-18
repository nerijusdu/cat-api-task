import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Breed } from "../../models/breed";
import Datagrid, { DatagridColumn } from "../Datagrid/Datagrid";
import Loader from "../Loader/Loader";
import SearchBox from "../SearchBox/SearchBox";

const itemsPerPage = 10;
const columns: DatagridColumn<Breed>[] = [
  {
    title: 'Name',
    field: 'name',
  },
  {
    title: 'Origin',
    field: 'origin',
  },
  {
    title: 'Temperament',
    field: 'temperament',
  }
];
// TODO: scope styles
const Breeds : React.FC = () => {
  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [visibleData, setVisibleData] = useState<Breed[]>([]);
  const { data, isLoading } = useQuery<Breed[]>(['breeds', page], async() => {
    const result = await fetch(`https://api.thecatapi.com/v1/breeds?limit=${itemsPerPage}&page=${page}`);
    setTotalItems(Number(result.headers.get('Pagination-Count')));
    return await result.json();
  });

  useEffect(() => {
    if (data) {
      setVisibleData(data);
    }
  }, [data]);

  const onSearch = (searchTerm: string) => {
    if (!searchTerm) {
      setVisibleData(data || []);
      return;
    }

    const filteredData = (data || []).filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setVisibleData(filteredData);
  };

  return (
    <>
      <div className="content-row">
        <SearchBox onSearch={onSearch}/>
      </div>
      {isLoading && <Loader />}
      <Datagrid
        data={visibleData}
        columns={columns}
        paging={{
          pageSize: itemsPerPage,
          page,
          onPageChange: (page: number) => setPage(page),
          totalItems
        }}
      />
    </>
  );
};

export default Breeds;
