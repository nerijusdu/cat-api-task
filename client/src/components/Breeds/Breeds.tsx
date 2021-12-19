import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useCatBreedsPaged } from "../../hooks/api/useCatBreeds";
import { Breed } from "../../models/breed";
import Datagrid, { DatagridColumn } from "../Datagrid/Datagrid";
import Input from "../Inputs/Input";
import Loader from "../Loader/Loader";

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
  const [visibleData, setVisibleData] = useState<Breed[]>([]);
  const { data, isLoading, totalItems } = useCatBreedsPaged(page, itemsPerPage);

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
        <Input type="text" placeholder="Search..." onChange={(e) => onSearch(e.target.value)}/>
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
