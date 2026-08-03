import useSWR from 'swr';
import { getBookById } from '../../api';
import { useParams } from 'react-router';
import AsyncData from '../asyncData/AsyncData';
import fallbackImage from '../../assets/altBook.jpg';
import Review from '../reviews/Review';
import Modal from '../general/Modal';
import { useState } from 'react';
import useSWRMutation from 'swr/mutation';
import AddBookToShelfForm from '../books/AddBookToShelfForm';
import { saveToShelf } from '../../api';

export default function BookDetails() {
  const {isbn} = useParams();
  const [modalOpen, setModalOpen] = useState(false);

  const {
    data: book,
    error,
    isLoading,
  } = useSWR(isbn ? isbn : null, getBookById);

  const isGoogleBooksDown = error?.status === 503 || error?.response?.status === 503;

  const mapAuthors = (book) => {
    return book?.volumeInfo?.authors?.join(', ') ?? 'Unknown author';
  };

  const {trigger: addToShelf, error: saveError} = useSWRMutation(
    'shelves',
    saveToShelf,
  );

  const bookImage = book?.volumeInfo?.imageLinks?.thumbnail || fallbackImage;

  if (isGoogleBooksDown) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 px-40 py-20 text-center">
        <p className="font-display text-gray-900 text-xl">
          Something went wrong with Google Books, try again later.
        </p>
      </div>
    );
  }

  return (
    <>
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
      </AsyncData>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <AsyncData error={saveError}>
          <AddBookToShelfForm isbn={isbn} book={book} 
            addToShelf={addToShelf} onClose={() => setModalOpen(false)} />
        </AsyncData>
      </Modal>
    </>

  );
}