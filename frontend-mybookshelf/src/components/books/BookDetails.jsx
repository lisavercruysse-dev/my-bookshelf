import useSWR from 'swr';
import { getBookById } from '../../api';
import { useParams } from 'react-router';
import AsyncData from '../asyncData/AsyncData';
import fallbackImage from '../../assets/altBook.jpg';
import Review from '../reviews/Review';

export default function BookDetails() {
  const {isbn} = useParams();

  const {
    data: book,
    error,
    isLoading,
  } = useSWR(isbn ? isbn : null, getBookById);

  const mapAuthors = (book) => {
    return book?.volumeInfo?.authors?.join(', ') ?? 'Unknown author';
  };

  const bookImage = book?.volumeInfo?.imageLinks?.thumbnail || fallbackImage;
  
  return (
    <AsyncData error={error} loading={isLoading}>
      <div className="flex flex-row gap-20 max-w-400 px-40">
        <div className="flex flex-row gap-10">
          <div className='flex flex-col gap-5 items-center'>
            <img src={bookImage} alt={book?.volumeInfo?.title} className='w-75 rounded-md object-cover'/>
            <button className='primary'>Add to shelf</button>
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

  );
}