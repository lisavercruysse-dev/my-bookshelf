import { useNavigate, useParams } from 'react-router';
import useSWR, { mutate } from 'swr';
import { getBooksById, getById } from '../api';
import AsyncData from '../components/AsyncData';
import TopBar from '../components/TopBar';
import altBook from '../assets/altBook.jpg';
import useSWRMutation from 'swr/mutation';
import {save} from '../api/index';

export default function BookInfo() {
  const { isbn } = useParams();
  const navigate = useNavigate();

  const { data: googleBook, error, isLoading } = useSWR(
    isbn,
    getBooksById,
  );

  const { data: myBook } = useSWR(
    `/books/${isbn}`,
    getById,
    {
      shouldRetryOnError: false,
    },
  );

  const { trigger: saveBook, saveLoading, saveError} = useSWRMutation(
    '/books',
    save,
  );

  const handleSave = async () => {

    const title = googleBook?.title || myBook?.title;
    const genre = googleBook?.categories?.[0] || myBook?.genre;
    const description = googleBook?.description || myBook?.description;
    const amountPages = googleBook?.pageCount || myBook?.amountPages;
    const author = googleBook?.authors?.join(', ') || myBook?.author;
    const imageLink = googleBook?.imageLinks?.thumbnail || myBook?.imageLink || altBook;

    if(myBook === undefined){
      console.log('saving book');
      await saveBook({
        isbn,
        title,
        genre,
        description,
        amountPages,
        author,
        imageLink,
      });
      await mutate(`/books/${isbn}`);
    }
    navigate(`/addOrEditSavedBook/${isbn}`);
  };
  
  return (
    <>
      <TopBar/>
      <AsyncData loading={isLoading || saveLoading} error={error || saveError}>
        <>
          {googleBook  || myBook ? (
            <div className='p-5 flex flex-col gap-5 items-center'>
              <div className='flex gap-3 border rounded-lg p-5 max-w-250'> 
                <div className='flex flex-col items-center'>
                  <img className='w-60 rounded-lg min-w-60 shadow-lg' 
                    src={googleBook?.imageLinks?.thumbnail || myBook?.imageLink || altBook}/> 
                  <p className='italic text-sm'>
                    ISBN: {isbn}
                  </p>
                </div>
                <div className='flex flex-col gap-3'>    
                  <h3>
                    {googleBook?.title || myBook?.title || 'No title'}
                  </h3>
                  <p className='italic'>
                    Author: {googleBook?.authors?.join(', ') || myBook?.author ||'Unknown'} <br/>
                    Genre: {googleBook?.categories?.join(', ') || myBook?.genre || 'Unknown'}
                  </p>  
                  Description:
                  <p className='border p-3 rounded-lg'>
                    {googleBook?.description || myBook?.description || 'No description'}
                  </p>
                  <p className='italic'>
                    Pagecount: {googleBook?.pageCount || myBook?.amountPages || 0}
                  </p>
                </div>   
              </div>
              <button onClick={handleSave} className="border rounded-lg pl-3 pr-3 pt-1 pb-1 bg-emerald-900 
         hover:bg-emerald-950 hover:cursor-pointer w-20 text-emerald-50" 
              >save</button>
              <h3>Reviews</h3>

              {(!myBook?.reviews || myBook.reviews.length === 0) && (
                <p className="italic text-sm text-gray-500">No reviews for this book yet</p>
              )}

              {myBook?.reviews?.map((r) => {
                const {id, userId, body, stars, date, title} = r;

                return (
                  <div key={id} className='flex flex-col gap-3 border rounded-lg p-5 max-w-250'>
                    <div className='border rounded-lg p-3 flex flex-col'>
                      <h5>{title}</h5>
                      <div className='flex gap-3 italic text-sm'>
                        <p>user id: {userId}</p>    
                        <p>{date.split('T')[0]}</p>                    
                      </div>
                      stars: {stars}<br />
                      {body}
                    </div>
                  </div>
                );
              })}

            </div>

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