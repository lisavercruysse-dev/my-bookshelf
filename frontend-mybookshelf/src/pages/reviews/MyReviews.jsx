import useSWR from 'swr';
import TopBar from '../../components/TopBar';
import AsyncData from '../../components/AsyncData';
import Review from '../../components/reviews/Review';
import { getData } from '../../api';
import { Link } from 'react-router';

export default function MyReviews() {
  const {
    data: reviews = [],
    error,
    isLoading,
  } = useSWR('/users/1/reviews', getData);

  return (
    <>
      <TopBar />
      <div className="flex flex-col">
        <div className='flex items-center flex-col gap-5'>
          <h4>My Reviews</h4>
        </div>
        <AsyncData loading={isLoading} error={error}>
          {reviews.map((r) => {
            const { id, isbn, body, stars, date, title } = r;
            const bookTitle = r.book.title;
            const genre = r.book.genre;
            const pages = r.book.amountPages;
            const author = r.book.author;

            return (
              <div key={id}>
                <Review
                  id={id}
                  isbn={isbn}
                  body={body}
                  stars={stars}
                  date={date}
                  title={title}
                  bookTitle={bookTitle}
                  genre={genre}
                  pages={pages}
                  author={author}
                />
              </div>
            );
          })}
        </AsyncData>
      </div>
    </>
  );
}
