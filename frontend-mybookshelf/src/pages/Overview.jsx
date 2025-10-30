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
        <div className="bg-emerald-900 p-3 text-emerald-50 font-serif">
          topbar
        </div>
        <h1 className="text-5xl text-emerald-900 font-bold font font-serif p-4">My Bookshelf</h1> 
        <button className="bg-emerald-900 p-3 text-emerald-50 font-serif rounded-lg">Reviews</button>
        <button className="bg-emerald-900 p-3 text-emerald-50 font-serif rounded-lg">Discover</button>
        <button className="bg-emerald-900 p-3 text-emerald-50 font-serif rounded-lg">My Books</button>
        <div>
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