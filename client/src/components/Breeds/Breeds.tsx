import { useState } from "react";
import { useQuery } from "react-query";
import { Breed } from "../../models/breed";
import Datagrid, { DatagridColumn } from "../Datagrid/Datagrid";

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

const Breeds : React.FC = () => {
  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const { data, isLoading } = useQuery<Breed[]>(['breeds', page], async() => {
    const result = await fetch(`https://api.thecatapi.com/v1/breeds?limit=${itemsPerPage}&page=${page}`);
    setTotalItems(Number(result.headers.get('Pagination-Count')));
    return await result.json();
  });

  if (isLoading) {
    return <>Loading...</>; // TODO make loader better
  }

  return (
    <Datagrid
      data={data!}
      columns={columns}
      paging={{
        pageSize: itemsPerPage,
        page,
        onPageChange: (page: number) => setPage(page),
        totalItems
      }}
    />
  );
};

export default Breeds;
