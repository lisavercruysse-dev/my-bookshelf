// YourShelf.jsx
import useSWR from 'swr';
import { deleteById, getData, save } from '../api';
import Shelf from '../components/shelves/Shelf';
import ShelfForm from '../components/shelves/ShelfForm';
import AsyncData from '../components/asyncData/AsyncData';
import { useState } from 'react';
import Modal from '../components/general/modal';
import useSWRMutation from 'swr/mutation';

export default function YourShelf() {
  const [modal, setModal] = useState(false);
  const [editingShelf, setEditingShelf] = useState(null);

  const {
    data: shelves,
    error,
    isLoading,
  } = useSWR('shelves', getData);

  const { trigger: saveShelf, error: saveError } = useSWRMutation('shelves', save);
  const { trigger: deleteShelf } = useSWRMutation('shelves', deleteById);

  const closeModal = () => {
    setModal(false);
    setEditingShelf(null);
  };

  const handleCreate = () => {
    setEditingShelf(null);
    setModal(true);
  };

  const handleEdit = (shelf) => {
    setEditingShelf(shelf);
    setModal(true);
  };

  return (
    <div className='flex flex-col gap-2 px-10 py-8 max-w-6xl mx-auto'>
      <p className='font-display text-main font-bold text-4xl tracking-tight'>Your shelves</p>
      <p className='font-display text-gray-400 text-sm mb-4'>
        {shelves?.length ?? 0} shelf{shelves?.length === 1 ? '' : 's'}
      </p>
      <AsyncData error={error} loading={isLoading}>
        <div className='flex flex-col divide-y divide-gray-100'>
          {shelves?.map((shelf) => (
            <Shelf shelf={shelf} key={shelf.id} onDelete={deleteShelf} onEdit={handleEdit} />
          ))}
        </div>
      </AsyncData>
      <button className='primary self-center' onClick={handleCreate}>
        Create New Shelf
      </button>
      <Modal isOpen={modal} onClose={closeModal}>
        <div className="flex w-full flex-col items-center justify-center">
          <p className='font-display justify-self-center text-2xl pb-5'>
            {editingShelf ? 'Edit Shelf' : 'Add New Shelf'}
          </p>
          <AsyncData error={saveError}>
            <ShelfForm shelf={editingShelf} saveShelf={saveShelf} onDone={closeModal} />
          </AsyncData>
        </div>
      </Modal>
    </div>
  );
}