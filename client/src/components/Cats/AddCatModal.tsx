import './AddCatModal.less';
import Modal from 'react-modal';
import Button from '../Button/Button';
import { useCatBreeds } from '../../hooks/api/useCatBreeds';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import Input from '../Inputs/Input';
import Select from '../Inputs/Select';
import { Cat } from '../../models/cat';
import { useAddCat } from '../../hooks/api/useCats';

const modalStyle = {
  content: {
    top: '20%',
    left: '25%',
    right: '25%',
    bottom: 'auto',
  }
};

export type AddCatModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit?: () => void;
}

const AddCatModal : React.FC<AddCatModalProps> = ({ isOpen, onRequestClose, onSubmit }) => {
  const { data: breeds, isLoading: isLoadingBreeds } = useCatBreeds();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Cat>();
  const { mutate } = useAddCat(breeds, { onSuccess: () => {
    reset();
    onSubmit?.();
  }});

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={modalStyle}
    >
      <div className="add-cat-modal">
        <h1>Add a cat</h1>
        <form onSubmit={handleSubmit((data) => mutate(data))}>
          <label>Name</label>
          <Input type="text" {...register('name', { required: 'Please enter a name' })} />
          {/* TODO: show errors */}

          <label>Breed</label>
          <Select
            {...register('breedId', { required: 'Please select breed' })}
            options={breeds?.map(breed => ({ value: breed.id, label: breed.name }))}
            isLoading={isLoadingBreeds}
          />

          <label>Weight (in KG)</label>
          <Input type="number" {...register('weight', { required: 'Please enter weight' })} />
          <Button type="submit" isPrimary>Add</Button>
        </form>
      </div>
    </Modal>
  );
};

export default AddCatModal;
