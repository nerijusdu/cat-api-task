import Datagrid, { DatagridColumn } from '../Datagrid/Datagrid';
import { Cat } from '../../models/cat';
import Loader from '../Loader/Loader';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Button from '../Button/Button';
import './Cats.less';
import SearchBox from '../SearchBox/SearchBox';
import Modal from 'react-modal';

const itemsPerPage = 10;
const apiUrl = 'http://localhost:3000'; // move to env
const columns: DatagridColumn<Cat>[] = [
  {
    title: 'Name',
    field: 'name',
  },
  {
    title: 'Breed',
    field: 'breedName',
  },
  {
    title: 'Weight',
    field: 'weight',
  }
];

const Cats : React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const { data, isLoading } = useQuery<Cat[]>(['cats', page], async () => {
    const response = await fetch(`${apiUrl}/cats?pageSize=${itemsPerPage}&page=${page}`);
    const result = await response.json();
    setTotalItems(result.totalItems);
    return result.items;
  });

  return (
    <>
      <Modal isOpen={isModalOpen} onRequestClose={() => setModalOpen(false)}>
        yeet
      </Modal>
      <div className="content-row">
        <SearchBox onSearch={() => null} />
        <Button onClick={() => setModalOpen(true)} isPrimary>Add a cat</Button>
      </div>
      {isLoading && <Loader />}
      <Datagrid
        data={data || []}
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

export default Cats;
