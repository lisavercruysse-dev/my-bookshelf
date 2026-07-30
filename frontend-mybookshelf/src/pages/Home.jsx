import useSWR from 'swr';
import { getData } from '../api';
import BookList from '../components/books/BookList';
import AsyncData from '../components/asyncData/AsyncData';
import { Link } from 'react-router';
import { useAuth } from '../contexts/auth';

export default function Home() {
  const {user} = useAuth();
  const userId = user?.id;
  const {
    data: popular = [],
    error,
    isLoading,
  } = useSWR('books/popular', getData);

  const {
    data: currentReads = [],
    currentReadsError,
    currentReadsLoading,
  } = useSWR(`users/${userId}/reading`, getData);

  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col gap-10 items-center pb-10'>
        <div className='text-center'>
          <p className='font-display text-main font-bold text-[80px]'>My Bookshelf</p>
          <p className='font-display text-gray-900 font-medium text-4xl'>Read, Review, Repeat</p>
        </div>
        <Link to='/discover'>
          <button className='primary'>Start Browsing</button>
        </Link>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl px-4'>
        <div className='flex flex-col items-center gap-4 
        bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6'>
          <p className='font-display text-gray-900 text-2xl font-semibold'>Popular</p>
          <AsyncData error={error} isLoading={isLoading}>
            <BookList books={popular} maxAmount={3}/>
          </AsyncData>
        </div>
        <div className='flex flex-col items-center gap-4 
        bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6'>
          <p className='font-display text-gray-900 text-2xl font-semibold'>Your current reads</p>
          <AsyncData error={currentReadsError} isLoading={currentReadsLoading}>
            <BookList books={currentReads} maxAmount={3}/>
          </AsyncData>
        </div>
      </div>
    </div>
  );
}