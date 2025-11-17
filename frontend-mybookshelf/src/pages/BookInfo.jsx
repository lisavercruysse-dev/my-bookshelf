import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { getBooksById } from '../api';
import AsyncData from '../components/AsyncData';
import TopBar from '../components/TopBar';

export default function BookInfo() {
  const { isbn } = useParams();

  const { data: book, error, isLoading } = useSWR(
    isbn,
    getBooksById,
  );
  
  return (
    <>
      <TopBar/>
      <AsyncData loading={isLoading} error={error}>
        <>
          {book ? (
            <p>
              ISBN: {isbn}<br/>
              Title: {book.title || 'No title'}<br/>
              Author: {book.authors?.join(', ') || 'Unknown'}<br/>
              Genre: {book.categories?.join(', ') || 'Unknown'}<br/>
              Description: {book.description || 'No description'}<br/>
              Pages: {book.pageCount || 0}<br/>
            </p>
          ) : (
            <p>No book found for ISBN {isbn}</p>
          )}
        </>
      </AsyncData>

    </>
  );
}

// <p>
//    isbn: {isbn}<br/>
//     Title: {title}<br/>
//   Genre: {genre}<br/>
//     Description: {description}<br/>
//     Pages: {amountPages}<br/>
//    Author: {author}<br/>
//    {img && <img src={img} alt={title} />}
//   </p>