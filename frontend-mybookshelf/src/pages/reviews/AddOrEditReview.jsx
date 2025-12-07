import { save, getById } from '../../api';
import useSWR from 'swr';
import ReviewForm from '../../components/reviews/ReviewForm';
import AsyncData from '../../components/AsyncData';
import useSWRMutation from 'swr/mutation';
import { useParams } from 'react-router';
import TopBar from '../../components/TopBar';

export default function AddOrEditReview(){
  const {id, isbn} = useParams();

  const {
    data: review,
    error: reviewError,
    isLoading: reviewLoading,
  } = useSWR( id ? `/reviews/${id}` : null, getById);
  
  const {
    data: book,
    error: bookError,
    isLoading: bookLoading,
  } = useSWR(!review && isbn ? `/books/${isbn}` : null, getById);

  const { trigger: saveReview, error: saveError} = useSWRMutation(
    '/reviews',
    save,
  );

  const bookData = review?.book || book;

  return (
    <diV>
      <TopBar/>
      <div className='flex flex-col items-center'>
      
        <h4 className='p-3'>Add Review</h4>
        <AsyncData error={bookError || saveError || reviewError} loading={bookLoading || reviewLoading}>
          <ReviewForm book={bookData} saveReview={saveReview} review={review}/>
        </AsyncData>  
      </div>
    </diV>
    
  );
}