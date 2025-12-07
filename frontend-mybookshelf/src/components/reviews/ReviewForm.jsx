import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

const validationRules = {
  userId: {
    required: 'User is required',
    min: {
      value: 1,
      message: 'UserId must be minimum 1',
    },
  },
  stars: {
    required: 'A review must have a rating',
    min: {
      value: 1,
      message: 'A review must have a minimum rating of 1',
    },
    max: {
      value: 5,
      message: 'A review cannot have a rating higher than 5',
    },
  },
  title: {
    required: 'A review must have a name',
  },
};

const EMPTY_REVIEW = {
  isbn: '',
  userId: '',
  body: '',
  stars: '',
  title: '',
};

export default function ReviewForm({ book, saveReview, review }) {
  const navigate = useNavigate();
  const currentReview = review || EMPTY_REVIEW;
  const {register, handleSubmit, formState: {errors, isValid}} = useForm({
    mode: 'onBlur',
    defaultValues: {
      isbn: book?.isbn,
      userId: review?.userId,
      body: review?.body,
      stars: review?.stars,
      title: review?.title,
    },
  });

  const onSubmit = async (values) => {
    if (!isValid || !book.isbn) {
      return;
    };

    await saveReview({
      id: currentReview?.id,
      isbn: book?.isbn,
      ...values,
    }, {
      throwOnError: false,
      onSuccess: () => {
        navigate('/myReviews');
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='border rounded-lg max-w-150 p-5 flex flex-col 
    gap-3 m-3 items-center'>

      <div className='flex flex-col gap-1 items-center'>
        <label htmlFor="title">Title</label>
        <input className='border rounded-lg p-2'
          {...register('title', validationRules.title)}
          id="title" name="title" type="text" />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>

      <div className='flex flex-col gap-1 items-center'>
        <label htmlFor="userId">UserId</label>
        <input className='border rounded-lg p-2'
          {...register('userId', validationRules.userId)}
          id="userId" name="userId" type="number" placeholder="userId" required />
        {errors.userId && <p className="text-red-500 text-sm mt-1">{errors.userId.message}</p>}
      </div>

      <div className='flex flex-col gap-1 items-center'>
        <label htmlFor="body">Body</label>
        <input className='border rounded-lg p-2'
          {...register('body')}
          id="body" name="body" type="text" placeholder="Your thoughts on the book..." required />
      </div>

      <div className='flex flex-col gap-1 items-center'>
        <label htmlFor="stars">Stars</label>
        <input className='border rounded-lg p-2'
          {...register('stars', validationRules.stars)}
          id="stars" name="stars" type="number" placeholder="Your rating" required />
        {errors.stars && <p className="text-red-500 text-sm mt-1">{errors.stars.message}</p>}
      </div>

      <div className='flex flex-col gap-1 items-center'>
        <button type="submit" className='border rounded-lg pl-3 pr-3 pt-2 pb-2 mt-3
        hover:cursor-pointer'>
          {currentReview?.id ? 'save review' : 'Add review'}
        </button>
      </div>
    </form>
  );
}

