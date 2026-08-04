import fallbackImage from '../../assets/altBook.jpg';
import { Link } from 'react-router';

export default function Book({author, imageLink, title, isbn, onDelete = () => {}, hasDeleteBtn}) {
  const bookImage = imageLink || fallbackImage;

  const handleRemoveFromSHelf = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(isbn);
  };

  return (
    <div className="flex w-[140px] shrink-0 flex-col items-center gap-3 text-center group/book">
      <div className="relative">
        {hasDeleteBtn && 
        <button
          onClick={handleRemoveFromSHelf}
          aria-label="Remove book"
          className="absolute top-2 right-2 z-10 flex h-6 w-6
                    items-center justify-center rounded-full bg-red-500 text-white
                    shadow-md hover:cursor-pointer
                    opacity-0 scale-75 transition-all duration-200
                    group-hover/book:opacity-100 group-hover/book:scale-100
                    hover:bg-red-600"
        >
          ✕
        </button>}
        
        <Link to={`/books/${isbn}`} className="flex flex-col items-center gap-3">
          <div
            className="relative overflow-hidden rounded-lg
            shadow-sm group-hover/book:shadow-lg transition-shadow duration-200"
          >
            <img
              src={bookImage}
              alt={title}
              className="h-44 w-32 object-cover transition-transform duration-200 group-hover/book:scale-105"
            />
          </div>

          <p
            className="font-display font-semibold text-sm
            text-gray-900 truncate max-w-36 hover:text-main transition-colors"
          >
            {title}
          </p>
        </Link>
      </div>

      <p className="font-display text-xs text-gray-400 truncate max-w-36">
        {author}
      </p>
    </div>
  );
}