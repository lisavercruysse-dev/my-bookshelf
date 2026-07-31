import useSWR from 'swr';
import { getBookById } from '../../api';
import { useParams } from 'react-router';
import AsyncData from '../asyncData/AsyncData';
import fallbackImage from '../../assets/altBook.jpg';
import Review from '../reviews/Review';
import Modal from '../general/Modal';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';

export default function BookDetails() {
  const {isbn} = useParams();
  const [modalOpen, setModalOpen] = useState(false);

  const {
    data: book,
    error,
    isLoading,
  } = useSWR(isbn ? isbn : null, getBookById);

  const mapAuthors = (book) => {
    return book?.volumeInfo?.authors?.join(', ') ?? 'Unknown author';
  };

  const handleAddShelf = () => {
    setModalOpen(false);
  };

  const bookImage = book?.volumeInfo?.imageLinks?.thumbnail || fallbackImage;
  
  return (
    <AsyncData error={error} loading={isLoading}>
      <div className="flex flex-row gap-20 max-w-400 px-40">
        <div className="flex flex-row gap-10">
          <div className='flex flex-col gap-5 items-center'>
            <img src={bookImage} alt={book?.volumeInfo?.title} className='w-75 rounded-md object-cover'/>
            <button onClick={() => setModalOpen(true)} className='primary'>Add to shelf</button>
          </div>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <p className='font-display text-gray-900 text-3xl max-w-150'>{book?.volumeInfo?.title}</p>
              <p className='font-display text-gray-900 text-lg'>{mapAuthors(book)}</p>
              <p className='font-display text-gray-500 text-sm'>{book?.volumeInfo?.pageCount} pages</p>
            </div>
            <p className='font-display text-gray-900 max-w-150'>{book?.volumeInfo?.description}</p>
          </div>
        </div>
        <div className='flex flex-col gap-5'>
          <p className='font-display text-gray-900 text-3xl max-w-150'>Reviews</p>
          <Review/>
        </div>
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>         
        <p className='font-display justify-self-center text-2xl pb-10'>Add book to a shelf</p>
        <div className='flex flex-col gap-3 items-center'>
          <div className='relative w-full'>
            <select
              defaultValue=''
              className='appearance-none border rounded-2xl px-5 py-1 pr-10 w-full outline-none'
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
            <input className='border rounded-2xl px-5 py-1 font-display w-full outline-none' placeholder='Shelf Name'/>
          </div>
          <button className='primary mt-5' onClick={handleAddShelf}>Confirm</button>
        </div>
      </Modal>
    </AsyncData>

  );
}