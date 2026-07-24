import BookList from '../components/refactorBooks/BookList';
import TopBar from '../components/TopBar';
import useSWR from 'swr';
import { getData } from '../api';
import AsyncData from '../components/AsyncData';

export default function Overview(){
/*  const {
    data: books = [],
    error,
    isLoading,
  } = useSWR('?q=flowers+inauthor:keyes', getBooks);
*/
  const {
    data: popular = [],
    error,
    isLoading,
  } = useSWR('books/popular', getData);
  console.log(popular);
  /*
  const { trigger: saveBook, error: saveError} = useSWRMutation(
    '/books',
    save,
  );*/
  return (
    <>
      <div>
        <TopBar/>
        <div className='flex flex-col font-display items-center'>
          <div className='flex flex-col items-center gap-3 p-10'>
            <p className='text-7xl font-bold text-[#495C32]'>My Bookshelf</p>
            <p className='text-4xl text-[#495C32]'>Read, Review, Repeat</p>
          </div>
          <button className='px-4 py-2 rounded-xl bg-[#495C32] hover:cursor-pointer hover:bg-[#3C4C29] mb-10'>
            <p className='font-bold text-white'>Start Browsing</p>
          </button>
          <div className='flex flex-row w-full justify-evenly'>
            <div className='flex flex-col'>
              <p className='text-[#495C32] text-xl'>Popular</p>
              <AsyncData error={error} isLoading={isLoading}>
                <BookList direction='horizontal' books={popular} maxWidth="full"/>
              </AsyncData>
            </div>
            <div className='flex flex-col'>
              <p className='text-[#495C32] text-xl'>Your current reads</p>
              <AsyncData>
                <BookList />
              </AsyncData>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
