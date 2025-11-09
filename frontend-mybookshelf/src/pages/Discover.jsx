import { useState } from 'react';
import TopBar from '../components/TopBar';
import useSWR from 'swr';
import AsyncData from '../components/AsyncData';
import { getBooks } from '../api';
import Book from '../components/Book';

export default function Discover() {
  const [searchValue, setSearchValue] = useState('');
  const [apiQuery, setApiQuery] = useState(null);

  const{
    data: books = [],
    error,
    isLoading,
  } = useSWR(apiQuery ? `?q=${apiQuery}` : null, getBooks);

  const handleSearch = () => {
    if (searchValue.trim()){
      setApiQuery(encodeURIComponent(searchValue.trim().toLocaleLowerCase()));
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <TopBar/>
        <div className='flex gap-3'>
          <input
            className='border rounded-xl p-2 focus:outline-0'
            type='search'
            id='search'
            placeholder='Search for books'
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button type='button' className='border rounded-xl p-2 bg-emerald-900 text-emerald-50 
          hover:bg-emerald-950 hover:cursor-pointer'
          onClick={handleSearch}>Search</button>
        </div>
        <div className='flex flex-col gap-10 max-w-400 mx-auto'>
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