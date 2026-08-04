import { useRef } from 'react';
import useSWR from 'swr';
import { deleteById, getData } from '../../api';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa6';
import AsyncData from '../asyncData/AsyncData';
import BookList from '../books/BookList';
import useSWRMutation from 'swr/mutation';
import { FaTrash, FaPen } from 'react-icons/fa6';

export default function Shelf({ shelf, onDelete, onEdit }) {
  const {
    data: books,
    error,
    isLoading,
  } = useSWR(shelf?.id ? `shelves/${shelf?.id}/books` : null, getData);

  const { trigger: removeFromShelf } = useSWRMutation(
    `shelves/${shelf?.id}/books`,
    deleteById,
  );

  const handleDeleteShelf = () => {
    onDelete?.(shelf?.id);
  };

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
        <p className="font-display text-main font-bold text-xl">{shelf?.title}</p>
        <div className="flex items-center gap-3">
          <p className="font-display text-gray-300 text-xs">
            {books?.length ?? 0} books
          </p>
          {shelf.canDelete && (
            <>
              <button
                onClick={handleDeleteShelf}
                className="flex items-center gap-2 rounded-md border border-red-200
             bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600
             transition hover:bg-red-100 hover:border-red-300 hover:cursor-pointer"
              >
                <FaTrash size={12} />
                Delete
              </button>

              <button
                onClick={() => onEdit(shelf)}
                className="flex items-center gap-2 rounded-md border border-main
                px-3 py-1.5 text-xs font-medium text-main hover:cursor-pointer
                transition hover:bg-main hover:text-white"
              >
                <FaPen size={12} />
                Edit
              </button>
            </>
          )}
        </div>
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