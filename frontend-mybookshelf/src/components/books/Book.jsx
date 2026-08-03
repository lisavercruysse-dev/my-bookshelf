import fallbackImage from '../../assets/altBook.jpg';
import { Link } from 'react-router';

export default function Book(props) {
  const { author, imageLink, title, isbn } = props;
  const bookImage = imageLink || fallbackImage;

  return (
    <div className='flex w-[150px] flex-col items-center gap-3 text-center'>
      <div className='flex flex-col items-center'>
        <p className='font-display font-bold text-gray-900 truncate max-w-40'>{title}</p>
        <p className='font-display text-sm text-gray-500 truncate max-w-40'>{author}</p>
      </div>

      <img src={bookImage} alt={title} className='h-40 w-28 rounded-md object-cover' />
      <Link to={`/books/${isbn}`}>
        <button className='primary text-sm px-2 py-1'>
          Details
        </button>
      </Link>
    </div>
  );
}