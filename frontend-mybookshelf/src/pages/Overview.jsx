import useSWR from 'swr';
import { getBookTest } from '../api';
import AsyncData from '../components/AsyncData';
import Book from '../components/Book';

export default function Overview(){
  const {
    data: books = [],
    error,
    isLoading,
  } = useSWR('?q=flowers+inauthor:keyes', getBookTest);

  return (
    <>
      <div>
        <div className="bg-emerald-900 p-3 text-emerald-50">
          topbar
        </div>
        <div className='flex flex-col items-center'>
          <h1 className="text-7xl text-emerald-900 font-bold font p-14 text-center">My Bookshelf</h1>
          <div className='hidden sm:flex flex-row items-center justify-center'>
            <button className="bg-emerald-900 pb-3 pt-3 mb-12
            text-emerald-50 rounded-lg m-2 hover:bg-emerald-950 w-50">My Reviews</button>
            <button className="bg-emerald-900 pb-3 pt-3 mb-12
             text-emerald-50 rounded-lg m-2 hover:bg-emerald-950 w-50">Discover</button>
            <button className="bg-emerald-900 pb-3 pt-3 mb-12
             text-emerald-50 rounded-lg m-2 hover:bg-emerald-950 w-50">My Books</button>
          </div>
        </div>
        <div className='flex flex-wrap justify-center gap-10 max-w-400 mx-auto'>
          <AsyncData loading={isLoading} error={error}>
            {books.map((book) => {
              const b = book.volumeInfo;

              const isbn =
                b.industryIdentifiers?.find((id) => id.type === 'ISBN_13')?.identifier ||
      b.industryIdentifiers?.find((id) => id.type === 'ISBN_10')?.identifier ||
      book.id;

              const title = b.title || 'No title';
              const genre = b.categories || [];
              const description = b.description || 'No description';
              const amountPages = b.pageCount || 0;
              const author = b.authors || [];
              const img = b.imageLinks?.thumbnail || null;

              return (
                <Book
                  key={isbn}
                  isbn={isbn}
                  title={title}
                  genre={genre}
                  description={description}
                  amountPages={amountPages}
                  author={author}
                  img={img}
                />
              );
            })}
          </AsyncData>
        </div>
      </div>
    </>
  );
}

//{books.map((book) =>
//  book.volumeInfo.title + ', ',
// )}