import useSWR from 'swr';
import { getData } from '../api';
import AsyncData from '../components/AsyncData';
import Book from '../components/Book';
import { Link } from 'react-router';
import TopBar from '../components/TopBar';
import useSWRMutation from 'swr/mutation';
import { save } from '../api/index';

export default function Overview(){
/*  const {
    data: books = [],
    error,
    isLoading,
  } = useSWR('?q=flowers+inauthor:keyes', getBooks);
*/

  const {
    data: books = [],
    error,
    isLoading,
  } = useSWR('books/popular', getData);

  const { trigger: saveBook, error: saveError} = useSWRMutation(
    '/books',
    save,
  );

  return (
    <>
      <div>
        <TopBar/>
        <div className='flex flex-col items-center'>
          <h1 className="text-7xl text-emerald-900 font-bold font p-14 text-center">My Bookshelf</h1>
          <div className='hidden sm:flex flex-row items-center justify-center gap-6'>
            <Link to='myReviews' className='mb-12'>
              <button className="bg-emerald-900 pb-3 pt-3 hover:cursor-pointer
            text-emerald-50 rounded-lg hover:bg-emerald-950 w-50">My Reviews</button>
            </Link>  
            <Link to='/Discover' className='mb-12'>
              <button className="bg-emerald-900 pb-3 pt-3 hover:cursor-pointer
             text-emerald-50 rounded-lg hover:bg-emerald-950 w-50">
                Discover</button>
            </Link> 
            <Link to='/myBooks' className='mb-12'>
              <button className="bg-emerald-900 pb-3 pt-3 hover:cursor-pointer
             text-emerald-50 rounded-lg hover:bg-emerald-950 w-50">My Books</button>
            </Link>  
          </div>
        </div>
        <div className='flex flex-wrap justify-center gap-10 max-w-400 mx-auto'>
          <AsyncData loading={isLoading} error={error || saveError}>
            {books.map((book) => {
              const {isbn = 'unknown', title = 'No title', genre = 'No genre', 
                description = 'No description', amountPages = 0, author = 'no author', imageLink} = book;
              console.log(book.img);
              return (
                <Book
                  key={isbn}
                  isbn={isbn}
                  title={title}
                  genre={genre}
                  description={description}
                  amountPages={amountPages}
                  author={author}
                  img={imageLink}
                  saveBook={saveBook} />
              );
            })}
          </AsyncData>
        </div>
      </div>
    </>
  );
}
