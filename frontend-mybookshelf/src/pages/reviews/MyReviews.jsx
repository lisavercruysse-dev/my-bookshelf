import useSWR from 'swr';
import TopBar from '../../components/TopBar';
import AsyncData from '../../components/AsyncData';
import Review from '../../components/reviews/Review';
import { deleteById, getData } from '../../api';
import { Link } from 'react-router';
import useSWRMutation from 'swr/mutation';

export default function MyReviews() {
  const {
    data: reviews = [],
    error,
    isLoading,
  } = useSWR('users/1/reviews', getData);

  const {
    trigger: deleteReview, error: deleteError,
  } = useSWRMutation(
    'users/1/reviews',
    deleteById,
  );

  return (
    <>
      <TopBar />
      <div className="flex flex-col items-center">
        <div className='flex items-center flex-col gap-5'>
          <h3>My Reviews</h3>
        </div>
        <AsyncData loading={isLoading} error={error || deleteError}>
          {reviews.length === 0 ? (
            <p className='text-center pt-3'>You don't have any reviews yet.</p>
          )
            : reviews.map((r) => {
              const { id, isbn, body, stars, date, title } = r;
              const bookTitle = r.book.title;
              const genre = r.book.genre;
              const pages = r.book.amountPages;
              const author = r.book.author;
              const img = r.book.imageLink;

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
                    img={img}
                    onDelete={deleteReview}
                  />
                </div>
              );
            })}
        </AsyncData>
      </div>
    </>
  );
}
