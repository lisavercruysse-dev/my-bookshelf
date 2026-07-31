import useSWR from 'swr';
import { getBooks } from '../api';
import AsyncData from '../components/asyncData/AsyncData';
import BookList from '../components/books/BookList';
import { IoMdArrowDroprightCircle } from 'react-icons/io';
import { IoMdArrowDropleftCircle } from 'react-icons/io';
import { useState, useEffect } from 'react';

export default function Discover() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const maxResults = 15;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(0); 
    }, 400);

    return () => clearTimeout(timeout);
  }, [search]);

  const query = debouncedSearch.trim() ? debouncedSearch.trim() : 'harrypotter';

  const {
    data: books = [],
  } = useSWR(
    `?q=${encodeURIComponent(query)}&startIndex=${page * maxResults}&maxResults=${maxResults}&orderBy=relevance`,
    getBooks,
  );

  const listSize = 5;
  const rows = [
    books.slice(0, listSize),
    books.slice(listSize, listSize * 2),
    books.slice(listSize * 2, listSize * 3),
  ];

  return (
    <div className='flex flex-col items-center gap-10'>
      <div className='flex flex-col items-center gap-5'>
        <p className='font-display text-main font-bold text-5xl'>Explore</p>
        <div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search for books'
            className='font-display border border-gray-900 rounded-l-xl px-4 py-2 w-100 focus:outline-none focus:ring-0'
          />
          <button className='primary rounded-r-xl rounded-l-none'>
            Advanced search
          </button>
        </div>
      </div>

      <div className='flex flex-col gap-8 w-full items-center'>
        <AsyncData loading={books.length === 0}>
          {rows.map((row, i) => (
            <BookList key={i} books={row} maxAmount={5} />
          ))}
        </AsyncData>
      </div>
      <div className='flex flex-row gap-5 items-center'>
        <button onClick={() => page > 0 && setPage((p) => p - 1)}>
          <IoMdArrowDropleftCircle
            className={`size-10 ${
              page === 0
                ? 'text-gray-400 cursor-pointer'
                : 'text-main hover:text-mainDark cursor-pointer'
            }`}
          />
        </button>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={books.length < maxResults}
        >
          <IoMdArrowDroprightCircle
            className={`size-10 hover:cursor-pointer ${
              books.length < maxResults ? 'text-gray-400 cursor-pointer' : 'text-main hover:text-mainDark'
            }`}
          />
        </button>
      </div>
    </div>
  );
}