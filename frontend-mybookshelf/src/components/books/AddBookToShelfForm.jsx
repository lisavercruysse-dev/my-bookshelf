import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { getData } from '../../api';
import { FaChevronDown } from 'react-icons/fa6';

export default function AddBookToShelfForm({ isbn, book, addToShelf, onClose }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { existingShelf: '', newShelf: '' },
  });

  const [shelfError, setShelfError] = useState('');

  const { data: shelves } = useSWR('shelves', getData);

  const onSubmit = async (values) => {
    if (values.existingShelf && values.newShelf) {
      setShelfError('Choose either an existing shelf or a new one, not both');
      return;
    }
    if (!values.existingShelf && !values.newShelf) {
      setShelfError('Choose an existing shelf or create a new shelf');
      return;
    }
    setShelfError('');

    await addToShelf({
      isbn,
      bookData: {
        title: book?.volumeInfo?.title,
        author: book?.volumeInfo?.authors?.join(', '),
        description: book?.volumeInfo?.description,
        pageCount: book?.volumeInfo?.pageCount,
        genre: book?.volumeInfo?.categories?.[0] ?? 'Uncategorized',
        imageLink: book?.volumeInfo?.imageLinks?.thumbnail ?? '',
      },
      existingShelf: values.existingShelf,
      newShelf: values.newShelf,
    });

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
            <option value='' className='text-gray-400'>--Choose a shelf--</option>
            {shelves
              ?.filter((shelf) => !shelf.shelfBooks?.some((sb) => sb.isbn === isbn))
              .map((shelf) => (
                <option key={shelf.id} value={shelf.id}>{shelf.title}</option>
              ))}
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