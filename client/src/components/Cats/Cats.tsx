import Datagrid, { DatagridColumn } from '../Datagrid/Datagrid';
import { Cat } from '../../models/cat';
import Loader from '../Loader/Loader';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Button from '../Button/Button';
import './Cats.less';
import AddCatModal from './AddCatModal';
import Input from '../Inputs/Input';
import { useCatsPaged } from '../../hooks/api/useCats';

const itemsPerPage = 10;
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
  const [isModalOpen, setModalOpen] = useState(true);
  const [page, setPage] = useState(0);
  const { data, totalItems, isLoading, refetch } = useCatsPaged(page, itemsPerPage);

  return (
    <>
      <AddCatModal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        onSubmit={() => {
          refetch();
          setModalOpen(false);
        }}
      />

      <div className="content-row">
        <Input type="text" placeholder="Search..." />
        <Button onClick={() => setModalOpen(true)} isPrimary>Add a cat</Button>
      </div>

      {isLoading && <Loader />}

      <Datagrid
        data={data}
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
