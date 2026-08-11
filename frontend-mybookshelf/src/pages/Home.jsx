import useSWR from 'swr';
import { getData } from '../api';
import BookList from '../components/books/BookList';
import AsyncData from '../components/asyncData/AsyncData';
import { Link } from 'react-router';
import { useAuth } from '../contexts/auth';

export default function Home() {
  const { user } = useAuth();
  const userId = user?.id;

  const {
    data: popular = [],
    error,
    isLoading,
  } = useSWR('books/popular', getData);

  const {
    data: currentReads = [],
    error: currentReadsError,
    isLoading: currentReadsLoading,
  } = useSWR(
    userId ? `users/${userId}/reading` : null,
    getData,
  );

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col gap-10 items-center pb-10">
        <div className="text-center">
          <p className="font-display text-main font-bold text-[80px]" data-cy="title">
            My Bookshelf
          </p>
          <p className="font-display text-gray-900 font-medium text-4xl" data-cy="slogan">
            Read, Review, Repeat
          </p>
        </div>

        {!user ? (
          <div className="flex flex-col items-center gap-3">
            <p className="font-display text-lg text-gray-800" data-cy="loginCallToAction">
              Login or create an account to get started
            </p>

            <Link to="/login">
              <button className="primary" data-cy="loginBtn">Login</button>
            </Link>
          </div>
        ) : (
          <>
            <Link to="/discover">
              <button className="primary" data-cy="browseBtn">Start Browsing</button>
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl px-4">
              <div className="flex flex-col items-center gap-4 bg-white 
              rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6" data-cy="popularSection">
                <p className="font-display text-gray-900 text-2xl font-semibold">
                  Popular
                </p>
                <AsyncData error={error} loading={isLoading}>
                  <div data-cy="popularBookList">
                    <BookList books={popular} maxAmount={3} className="flex-wrap justify-center" 
                    />
                  </div>
                </AsyncData>
              </div>

              <div className="flex flex-col items-center gap-4 
            bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6" 
              data-cy="currentReadsSection">
                <p className="font-display text-gray-900 text-2xl font-semibold">
                  Your current reads
                </p>
                <AsyncData error={currentReadsError} 
                  loading={currentReadsLoading} className="flex-wrap justify-center">
                  {currentReads.length === 0 ? (
                    <p className="font-display text-gray-500 text-sm" data-cy="noCurrentReadsMsg">
                      You don't have any current reads yet.
                    </p>
                  ) : (
                    <div data-cy="currentReadsList">
                      <BookList books={currentReads} maxAmount={3} />
                    </div>
                  )}
                </AsyncData>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}