import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaChevronDown } from 'react-icons/fa6';

export default function AddBookToShelfForm({ onClose }) {
  const EMPTY_SHELF = {
    id: undefined,
    title: undefined,
    user: undefined,
  };

  const shelf = EMPTY_SHELF;

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      id: shelf?.id,
      title: shelf?.title,
      user: shelf?.user,
    },
  });

  const [shelfError, setShelfError] = useState('');

  const onSubmit = (values) => {
    if (!values.existingShelf && !values.newShelf) {
      setShelfError('Choose an existing shelf or create a new shelf');
      return;
    }
    setShelfError('');
    console.log(JSON.stringify(values));
    reset();
    onClose?.();
  };

  return (
    <>
      <p className='font-display justify-self-center text-2xl pb-10'>Add book to a shelf</p>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3 items-center'>
        <div className='relative w-full'>
          <select
            defaultValue=''
            className='appearance-none border rounded-2xl px-5 py-1 pr-10 w-full outline-none'
            {...register('existingShelf')}
          >
            <option value='' className='text-gray-400'>
              --Choose a shelf--
            </option>
            <option>DNF</option>
          </select>
          <FaChevronDown className='absolute right-4 top-1/2 -translate-y-1/2 
        text-gray-500 pointer-events-none' size={12} />
        </div>
        <div className='flex flex-col w-full gap-1'>
          <p className='justify-self-start'>Want a new shelf?</p>
          <input {...register('newShelf')}
            className='border rounded-2xl px-5 py-1 font-display w-full outline-none' placeholder='Shelf Name'/>
        </div>
        {shelfError && <p className="text-red-500 text-sm mt-1">{shelfError}</p>}
        <button type='submit' className='primary mt-5'>Confirm</button>
      </form>
    </>
  );
}