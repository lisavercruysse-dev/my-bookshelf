import SavedBookForm from '../../components/books/SavedBookForm';
import { getById, getData } from '../../api';
import useSWR from 'swr';
import AsyncData from '../../components/AsyncData';
import { useParams } from 'react-router';
import useSWRMutation from 'swr/mutation';
import {save} from '../../api/index';
import TopBar from '../../components/TopBar';

export default function AddOrEditSavedBook () {
  const {isbn} = useParams();
  const {data: statuses = [],
    error: statusError,
    isLoading: statusLoading,
  } = useSWR('/statuses', getData);

  const {
    data: book,
    error: bookError,
    isLoading: bookLoading,
  } = useSWR(`/books/${isbn}`, getById);

  const { trigger: saveBook, error: saveError } = useSWRMutation(
    '/users/books',
    save,
  );

  return (
    <>
      <TopBar/>
      <div className='flex flex-col items-center'>
        <h3 className='text-emerald-900'>Save to bookshelf</h3>
        <AsyncData loading={statusLoading || bookLoading} error={statusError || saveError || bookError}>
          <SavedBookForm  statuses={statuses} book={book} saveBook={saveBook}/>
        </AsyncData>
      </div>
    </>
  );
  
}