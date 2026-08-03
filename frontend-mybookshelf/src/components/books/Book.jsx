import fallbackImage from '../../assets/altBook.jpg';
import { Link } from 'react-router';

export default function Book(props) {
  const { author, imageLink, title, isbn } = props;
  const bookImage = imageLink || fallbackImage;

  return (
    <div className="flex w-[140px] shrink-0 flex-col items-center gap-3 text-center group/book">
      <div className="relative">
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