import SavedBookForm from '../../components/books/SavedBookForm';
import { getById, getData, saveUserBook, updateUserBook } from '../../api';
import useSWR from 'swr';
import AsyncData from '../../components/AsyncData';
import { useParams } from 'react-router';
import useSWRMutation from 'swr/mutation';
import TopBar from '../../components/TopBar';

export default function AddOrEditSavedBook () {
  const {userId, isbn} = useParams();
  const {data: statuses = [],
    error: statusError,
    isLoading: statusLoading,
  } = useSWR('statuses', getData);

  const {
    data: savedBook,
    error: savedBookError,
    isLoading: savedBookLoading,
  } = useSWR( userId ? `/users/${userId}/books/${isbn}` : '', getById);

  const {
    data: book,
    error: bookError,
    isLoading: bookLoading,
  } = useSWR( `/books/${isbn}`, getById );

  const { trigger: saveBook, error: saveError } = useSWRMutation(
    'users/books',
    saveUserBook,
  );

  const { trigger: updateBook, error: updateError } = useSWRMutation(
    `users/${userId}/${isbn}`,
    updateUserBook,
  );

  return (
    <>
      <TopBar/>
      <div className='flex flex-col items-center'>
        <h3 className='text-emerald-900'>Save to bookshelf</h3>
        <AsyncData loading={statusLoading || bookLoading || savedBookLoading} 
          error={statusError || saveError || bookError || savedBookError || updateError}>
          {saveBook && book && (
            <SavedBookForm
              statuses={statuses}
              updateBook={updateBook}
              book={book}
              savedBook={savedBook}
              saveBook={saveBook}
            />
          )}

        </AsyncData>
      </div>
    </>
  );
  
}