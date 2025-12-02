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
      console.log('Failed');
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
        console.log('Review added');
      },
    });
  };

  return (
  
    <form onSubmit={handleSubmit(onSubmit)}>

      <div>
        <label htmlFor="userId">UserId</label>
        <input 
          {...register('userId', validationRules.userId)}
          id="userId" name="userId" type="number" placeholder="userId" required />
        {errors.userId && <p className="text-red-500 text-sm mt-1">{errors.userId.message}</p>}
      </div>

      <div>
        <label htmlFor="body">Body</label>
        <input 
          {...register('body')}
          id="body" name="body" type="text" placeholder="Your thoughts on the book..." required />
      </div>

      <div>
        <label htmlFor="stars">Stars</label>
        <input 
          {...register('stars', validationRules.stars)}
          id="stars" name="stars" type="number" placeholder="Your rating" required />
        {errors.stars && <p className="text-red-500 text-sm mt-1">{errors.stars.message}</p>}
      </div>

      <div>
        <label htmlFor="title">Title</label>
        <input 
          {...register('title', validationRules.title)}
          id="title" name="title" type="text" />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <button type="submit">
          {currentReview?.id ? 'save review' : 'Add review'}
        </button>
      </div>
    </form>
  );
}

