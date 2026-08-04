import { useRef } from 'react';
import useSWR from 'swr';
import { deleteFromShelf, getData } from '../../api';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa6';
import AsyncData from '../asyncData/AsyncData';
import BookList from '../books/BookList';
import useSWRMutation from 'swr/mutation';

export default function Shelf({ shelfId, title }) {
  const {
    data: books,
    error,
    isLoading,
  } = useSWR(shelfId ? `shelves/${shelfId}/books` : null, getData);

  const {trigger: removeFromShelf} = useSWRMutation(
    `shelves/${shelfId}/books`,
    deleteFromShelf,
  );

  const scrollRef = useRef(null);

  const scrollNext = () => {
    scrollRef.current?.scrollBy({ left: 320, behavior: 'smooth' });
  };

  const scrollPrev = () => {
    scrollRef.current?.scrollBy({ left: -320, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col gap-4 py-6">
      <div className="flex items-baseline justify-between">
        <p className="font-display text-main font-bold text-xl">{title}</p>
        <p className="font-display text-gray-300 text-xs">
          {books?.length ?? 0} books
        </p>
      </div>

      <AsyncData error={error} loading={isLoading}>
        {books?.length === 0 ? (
          <p className="font-display text-gray-400 text-sm italic">
            No books on this shelf yet.
          </p>
        ) : (
          <div className="relative group">
            <BookList
              books={books}
              removeButtons
              containerRef={scrollRef}
              className="overflow-x-hidden scroll-smooth"
              onDelete={removeFromShelf}
              hasDeleteBtns={true}
            />

            <button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2
                rounded-full border border-gray-100 bg-white p-2 shadow-md
                opacity-0 transition-opacity duration-200
                group-hover:opacity-100 hover:bg-gray-50"
            >
              <FaChevronLeft size={16} className="text-main" />
            </button>

            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2
                rounded-full border border-gray-100 bg-white p-2 shadow-md
                opacity-0 transition-opacity duration-200
                group-hover:opacity-100 hover:bg-gray-50"
            >
              <FaChevronRight size={16} className="text-main" />
            </button>
          </div>
        )}
      </AsyncData>
    </div>
  );
}