import Review from '../components/reviews/Review';
import ReviewForm from '../components/reviews/ReviewForm';
import Modal from '../components/general/Modal';
import fallbackImage from '../assets/altBook.jpg';
import { Link } from 'react-router';
import { FaStar } from 'react-icons/fa6';
import { getData, save } from '../api';
import AsyncData from '../components/asyncData/AsyncData';
import useSWR from 'swr';
import { useAuth } from '../contexts/auth';
import { useState } from 'react';
import useSWRMutation from 'swr/mutation';

export default function Reviews() {
  const { user } = useAuth();
  const [editingReview, setEditingReview] = useState(null);

  const {
    data: reviews,
    error,
    isLoading,
  } = useSWR('reviews', getData);

  const { trigger: submitReview, error: reviewSaveError } = useSWRMutation(
    'reviews',
    save,
  );

  const averageRating =
    reviews?.length > 0
      ? (reviews?.reduce((sum, r) => sum + r?.stars, 0) / reviews.length).toFixed(1)
      : null;

  return (
    <div className='flex flex-col gap-8 px-10 py-8 max-w-6xl mx-auto'>
      <div className='flex items-end justify-between border-b border-black/5 pb-5'>
        <p className='font-display text-main font-bold text-4xl tracking-tight'>
          Your reviews
        </p>

        {averageRating && (
          <div className='flex items-center gap-2 bg-[#F3F6EE] rounded-full px-4 py-2'>
            <div className='font-display text-sm text-gray-500'>Average rating</div>
            <div className='flex items-center gap-1 font-display font-bold text-main'>
              <FaStar className='text-[#E4B65F]' size={14} />
              {averageRating}
            </div>
          </div>
        )}
      </div>

      <div className='flex flex-col gap-6'>
        <AsyncData loading={isLoading} error={error}>
          {reviews?.map((r) => (
            <div key={r.id} className='flex gap-6 items-stretch'>
              {            console.log(r)
              }
              <Link to={`/books/${r.book.isbn}`} className='shrink-0 group'>
                <img
                  src={r.book.imageLink || fallbackImage}
                  alt={r.book.title}
                  className='w-24 h-36 object-cover rounded-xl shadow-sm 
                transition-transform duration-200 group-hover:scale-[1.03] group-hover:shadow-md'
                />
              </Link>

              <Review
                userName={user?.userName}
                rating={r.stars}
                date={r.date}
                isOwner={r.userId === user?.id}
                onEdit={() => setEditingReview(r)}
                body={r.body}
                title={r.title}
                recommended={r.recommended}
              />
            </div>
          ))}
        </AsyncData>
      </div>

      <Modal isOpen={!!editingReview} onClose={() => setEditingReview(null)}>
        <AsyncData error={reviewSaveError}>
          {editingReview && (
            <ReviewForm
              isbn={editingReview.book.isbn}
              review={editingReview}
              saveReview={submitReview}
              onClose={() => setEditingReview(null)}
            />
          )}
        </AsyncData>
      </Modal>
    </div>
  );
}