import { useState } from 'react';
import TopBar from '../components/TopBar';
import useSWR from 'swr';
import AsyncData from '../components/AsyncData';
import { getBooks } from '../api';
import Book from '../components/Book';

export default function Discover() {
  const [searchValue, setSearchValue] = useState([]);
  const [apiQuery, setApiQuery] = useState(null);
  const [page, setPage] = useState(0);
  const [isAdvancedSearch, setAdvancedSearch] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const maxResults = 9;

  const{
    data: books = [],
    error,
    isLoading,
  } = useSWR(apiQuery ? `?q=${apiQuery}
    &startIndex=${page * maxResults}&maxResults=${maxResults}&orderBy=relevance
` : null, getBooks);

  const handleSearch = () => {
    setPage(0);
    if (isAdvancedSearch){
      const filters = [];

      if (title.trim()) filters.push(`intitle:${title.trim()}`);
      if (author.trim()) filters.push(`inauthor:${author.trim()}`);
      if (isbn.trim()) filters.push(`isbn:${isbn.trim()}`);

      if (filters.length === 0){
        alert('Please fill in at least 1 field');
      }

      const query = filters.join('+');
      setApiQuery(encodeURIComponent(query));
      return;
    } 
    if (searchValue.trim()){
      setApiQuery(encodeURIComponent(searchValue.trim().toLocaleLowerCase()));
    }
  };

  const handleNext = () => {
    setPage((p) => p + 1);
  };

  const handlePrev = () => {
    if (page > 0) {
      setPage((p) => p - 1);
    }   
  };

  const handleAdvancedSearch = () => {
    if (isAdvancedSearch) {
      setAdvancedSearch(false);
      return;
    } setAdvancedSearch(true);
  };

  return (
    <>
      <TopBar/>
      <div className="flex flex-col items-center gap-5">
       
        <div className={`${isAdvancedSearch ? 'hidden' : 'block'} flex gap-3 sm:items-center flex-col`}>
          <div>
            <input
              className='border rounded-xl p-2 focus:outline-0 sm:w-lg mt-6'
              type='search'
              id='search'
              placeholder='Search for books'
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button type='button' className='border rounded-xl p-2 bg-emerald-900 text-emerald-50 
          hover:bg-emerald-950 hover:cursor-pointer'
            onClick={handleSearch}>Search</button>
          </div>
        </div>
        <div className={`${isAdvancedSearch ? 'block': 'hidden'} flex flex-col gap-6`}>
          <input
            className='border rounded-xl p-2 focus:outline-0 sm:w-lg'
            type='search'
            id='titleSearch'
            placeholder='title'
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className='border rounded-xl p-2 focus:outline-0 sm:w-lg'
            type='search'
            id='authorSearch'
            placeholder='author'
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            className='border rounded-xl p-2 focus:outline-0 sm:w-lg'
            type='search'
            id='isbnSearch'
            placeholder='isbn'
            onChange={(e) => setIsbn(e.target.value)}
          />
          <button type='button' className='border rounded-xl p-2 bg-emerald-900 text-emerald-50 
          hover:bg-emerald-950 hover:cursor-pointer'
          onClick={handleSearch}>
            Search
          </button>
        </div>
          
        <button className='italic text-gray-400 border rounded-lg p-1 hover:cursor-pointer hover:border-gray-500 
          hover:underline col-span-4 w-40' onClick={handleAdvancedSearch}>
          {isAdvancedSearch ? 'normal search' : 'advanced search'}
        </button> 
        
        <div className='flex flex-wrap justify-center gap-10 max-w-400 mx-auto'>
          <AsyncData loading={isLoading} error={error}>
            {books.map((book) => {
              const b = book.volumeInfo;
                
              const isbn =
                b.industryIdentifiers?.find((id) => id.type === 'ISBN_13')?.identifier ||
                      b.industryIdentifiers?.find((id) => id.type === 'ISBN_10')?.identifier; 
                
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
        <div className='flex'>
          <button
            className={`${apiQuery && page > 0 ? 'block' : 'hidden'} 
          border rounded-lg pl-3 pr-3 pt-1 pb-1 m-3 bg-emerald-900 text-center
         hover:bg-emerald-950 hover:cursor-pointer text-emerald-50 w-20`}
            onClick={handlePrev}
          >
            Previous
          </button>
          <button
            className={`${apiQuery ? 'block' : 'hidden'} 
          border rounded-lg pl-3 pr-3 pt-1 pb-1 m-3 bg-emerald-900 text-center 
         hover:bg-emerald-950 hover:cursor-pointer text-emerald-50 w-20`}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

