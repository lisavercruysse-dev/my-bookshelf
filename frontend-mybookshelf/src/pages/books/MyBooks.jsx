import useSWR from 'swr';
import { deleteById, getData } from '../../api';
import AsyncData from '../../components/AsyncData';
import altBook from '../../assets/altBook.jpg';
import TopBar from '../../components/TopBar';
import { Link } from 'react-router';
import useSWRMutation from 'swr/mutation';

export default function MyBooks(){
  const { 
    data: books = [],
    isLoading,
    error,
  } = useSWR(
    'users/1/books',
    getData,
  );

  const {
    trigger: deleteBook, error: deleteError,
  } = useSWRMutation(
    'users/1/books',
    deleteById,
  );

  return (
    <>
      <TopBar />
      <div className='flex flex-col items-center mx-4'>
        <h3 className='pb-3'>My Books</h3>
        <AsyncData loading={isLoading} error={error || deleteError}>
          {
            books.length === 0 ? <p>You don't have any saved books yet</p> :
              books.map((b) => {
                const { isbn, pagesRead, favorite, dateStarted, dateEnded} = b;
                const {title, genre, description, amountPages, author, imageLink} = b.book;
                const status = b.status.name;
                const userId = 1;
                return (
                  <div key={`${b.isbn}-1`}>
                    <div className="flex flex-col border rounded-lg p-5 gap-5 m-5 shadow-emerald-950 w-250">
                      <div className="flex gap-5">
                        <img
                          className="rounded-lg w-60 object-contain"
                          src={imageLink ? imageLink : altBook}
                        />

                        <div className="flex flex-col gap-2 flex-1">
                          <h4 className="text-lg font-semibold">{title}</h4>
                          <p><strong>Author:</strong> {author}</p>
                          <p><strong>Genre:</strong> {genre}</p>
                          <p><strong>Pages:</strong> {amountPages}</p>
                          <p><strong>Status:</strong> {status}</p>

                          <div className="border my-2"></div>

                          <p><strong>Pages Read:</strong> {pagesRead} / {amountPages}</p>
                          <p><strong>Favorite:</strong> {favorite ? 'Yes' : 'No'}</p>
                          <p><strong>Started:</strong> {dateStarted ? dateStarted.split('T')[0] : 'N/A'}</p>
                          <p><strong>Finished:</strong> {dateEnded ? dateEnded.split('T')[0] : 'N/A'}</p>

                          <div className="border my-2"></div>

                          <div className="w-full">
                            <strong>Description:</strong> {description}
                          </div>
                        </div>
                      </div>
                      <div className='flex justify-center mt-5 gap-3'>
                        <Link to={`/addOrEditSavedBook/${userId}/${isbn}`}>
                          <button className="bg-emerald-900 pb-2 pt-2 hover:cursor-pointer
                  text-emerald-50 rounded-lg hover:bg-emerald-950 w-30">
                            Edit
                          </button>
                        </Link>
                        <Link to={`addOrEditReview/${isbn}`}>
                          <button className="bg-emerald-900 pb-2 pt-2 hover:cursor-pointer
                  text-emerald-50 rounded-lg hover:bg-emerald-950 w-30">
                            Review
                          </button>
                        </Link>
                        <button onClick={() => deleteBook(isbn)} className="bg-emerald-900 
                        pb-2 pt-2 hover:cursor-pointer
                      text-emerald-50 rounded-lg hover:bg-emerald-950 w-30">
                          Delete
                        </button>
                      </div>
                    
                    </div>

                  </div>     
                );
              })
          }
        </AsyncData>
      </div>
    </>);
}