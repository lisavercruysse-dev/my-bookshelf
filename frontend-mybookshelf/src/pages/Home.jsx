import useSWR from 'swr';
import { getData } from '../api';
import BookList from '../components/books/BookList';
import AsyncData from '../components/asyncData/AsyncData';
import { Link } from 'react-router';

export default function Home() {
  const {
    data: popular = [],
    error,
    isLoading,
  } = useSWR('books/popular', getData);

  return (
    <>
      <div className='flex flex-col items-center'>
        <div className='flex flex-col gap-10 items-center pb-20'>
          <div className='text-center'>
            <p className='font-display text-main font-bold text-[80px]'>My Bookshelf</p>
            <p className='font-display text-gray-900 font-medium text-4xl'>Read, Review, Repeat</p>
          </div>
          <Link to='/discover'>
            <button className='primary'>Start Browsing</button>
          </Link>
        </div>
        <div className='grid grid-cols-2 gap-6 w-full'>
          <div className='flex flex-col items-center gap-3'>
            <p className='font-display text-gray-900 text-2xl'>Popular</p>
            <AsyncData error={error} isLoading={isLoading}>
              <BookList books={popular} maxAmount={3}/>
            </AsyncData>
          </div>
          <div className='flex flex-col items-center'>
            <p className='font-display text-gray-900 text-2xl'>Your current reads</p>
            <AsyncData error={error} isLoading={isLoading}>
              <BookList books={[]} maxAmount={3}/>
            </AsyncData>
          </div>
        </div>
      </div>
    </>
    
  );
}
