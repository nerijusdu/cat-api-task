import Datagrid, { DatagridColumn } from '../Datagrid/Datagrid';
import { Cat } from '../../models/cat';
import Loader from '../Loader/Loader';
import { useState } from 'react';
import Button from '../Button/Button';
import './Cats.less';
import AddCatModal from './AddCatModal';
import Input from '../Inputs/Input';
import { useCatsPaged, useRemoveCat } from '../../hooks/api/useCats';
import useDebouncedState from '../../hooks/useDebouncedState';

const itemsPerPage = 10;

const Cats : React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useDebouncedState('', 500);
  const [page, setPage] = useState(0);
  const { data, totalItems, isLoading, refetch } = useCatsPaged(page, itemsPerPage, searchTerm);
  const { mutate: removeCat } = useRemoveCat({ onSuccess: () => refetch() });
  const columns: DatagridColumn<Cat>[] = [
    { title: 'Name', field: 'name' },
    { title: 'Breed', field: 'breedName' },
    { title: 'Weight', field: 'weight' },
    {
      title: '',
      field: 'id',
      customRender: (cat: Cat) => (
        <div className="actions">
          <Button onClick={() => removeCat(cat.id)}>Remove</Button>
        </div>
      )
    }
  ];

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
        <Input type="text" placeholder="Search..." onChange={(e) => setSearchTerm(e.target.value)} />
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
