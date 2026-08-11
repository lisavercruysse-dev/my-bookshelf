import { useForm, FormProvider } from 'react-hook-form';
import { FaStar, FaThumbsUp, FaThumbsDown } from 'react-icons/fa6';
import TipTap from '../tiptap/TipTap';

const validationRules = {
  title: {
    required: 'Title is required',
    maxLength: {
      value: 255,
      message: 'Title must be under 255 characters',
    },
  },
  stars: {
    required: 'Rating is required',
    validate: (value) => {
      if (!value || value < 1 || value > 5) {
        return 'Please select a rating between 1 and 5';
      }
      return true;
    },
  },
  recommended: {
    required: 'Please indicate whether you recommend this book',
  },
  body: {
    required: 'Review text is required',
    validate: (value) => {
      if (!value || value === '<p></p>') {
        return 'Review text is required';
      }
      return true;
    },
  },
};

const EMPTY_REVIEW = {
  id: undefined,
  title: '',
  stars: 0,
  body: '',
  recommended: undefined,
};

export default function ReviewForm({
  isbn,
  review = EMPTY_REVIEW,
  saveReview,
  onClose,
}) {
  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      title: review?.title ?? '',
      stars: review?.stars ?? 0,
      body: review?.body ?? '',
      recommended:
    review?.recommended === true
      ? 'true'
      : review?.recommended === false
        ? 'false'
        : undefined,
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = methods;

  const stars = watch('stars');
  const recommended = watch('recommended');

  const onSubmit = async (values) => {
    await saveReview(
      {
        id: review?.id,
        isbn,
        title: values.title,
        stars: values.stars,
        body: values.body,
        recommended: values.recommended === 'true',
      },
      { throwOnError: false, onSuccess: () => onClose?.() },
    );
  };

  return (
    <FormProvider {...methods}>
      <p className='font-display justify-self-center text-2xl pb-10' data-cy="reviewFormTitle">
        {review?.id ? 'Edit your review' : 'Write a review'}
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        data-cy="reviewForm"
        className='flex flex-col gap-3 items-center'
      >
        <div className='flex flex-col w-full gap-1'>
          <p className='justify-self-start font-display text-gray-900'>
            Title
          </p>

          <input
            type='text'
            placeholder='Sum up your review'
            data-cy="reviewTitleInput"
            {...register('title', validationRules.title)}
            className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm
            font-display focus:outline-none focus:border-main'
          />

          {errors.title && (
            <p className='text-red-500 text-sm mt-1' data-cy="reviewTitleError">
              {errors.title.message}
            </p>
          )}
        </div>

        <div className='flex flex-col w-full gap-1'>
          <p className='justify-self-start font-display text-gray-900'>
            Do you recommend this book?
          </p>

          <div className='flex gap-2'>
            <label
              data-cy="recommendedYesLabel"
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border
              text-sm font-display font-semibold px-3 py-2 cursor-pointer transition-colors ${
    recommended === 'true'
      ? 'bg-green-50 border-green-200 text-green-600'
      : 'border-gray-200 text-gray-400 hover:bg-gray-50'
    }`}
            >
              <input
                type='radio'
                value='true'
                data-cy="recommendedYesInput"
                {...register('recommended', validationRules.recommended)}
                className='sr-only'
              />
              <FaThumbsUp size={12} />
              Recommended
            </label>

            <label
              data-cy="recommendedNoLabel"
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border
              text-sm font-display font-semibold px-3 py-2 cursor-pointer transition-colors ${
    recommended === 'false'
      ? 'bg-red-50 border-red-200 text-red-500'
      : 'border-gray-200 text-gray-400 hover:bg-gray-50'
    }`}
            >
              <input
                type='radio'
                value='false'
                data-cy="recommendedNoInput"
                {...register('recommended', validationRules.recommended)}
                className='sr-only'
              />
              <FaThumbsDown size={12} />
              Not recommended
            </label>
          </div>

          {errors.recommended && (
            <p className='text-red-500 text-sm mt-1' data-cy="recommendedError">
              {errors.recommended.message}
            </p>
          )}
        </div>

        <div className='flex flex-col w-full gap-1'>
          <p className='justify-self-start font-display text-gray-900'>
            Rating
          </p>

          <input
            type='hidden'
            {...register('stars', validationRules.stars)}
          />

          <div className='flex gap-1' data-cy="starRatingInput">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                type='button'
                key={n}
                data-cy={`starBtn-${n}`}
                onClick={() =>
                  setValue('stars', n, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                aria-label={`${n} star`}
              >
                <FaStar
                  className={
                    n <= (stars || 0)
                      ? 'text-[#E4B65F]'
                      : 'text-gray-200'
                  }
                  size={20}
                />
              </button>
            ))}
          </div>

          {errors.stars && (
            <p className='text-red-500 text-sm mt-1' data-cy="starsError">
              {errors.stars.message}
            </p>
          )}
        </div>

        <div className='flex flex-col w-full gap-1'>
          <p className='justify-self-start font-display text-gray-900'>
            Your review
          </p>

          <input type='hidden' {...register('body', validationRules.body)} />

          <div data-cy="reviewBodyInput">
            <TipTap
              initialContent={review?.body}
              onEditorReady={(editorInstance) => {
                editorInstance.on('update', () => {
                  setValue('body', editorInstance.getHTML(), {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                });
              }}
            />
          </div>

          {errors.body && (
            <p className='text-red-500 text-sm mt-1' data-cy="reviewBodyError">
              {errors.body.message}
            </p>
          )}
        </div>

        <button
          type='submit'
          className='primary mt-5'
          data-cy="reviewSubmitBtn"
          disabled={isSubmitting}
        >
          {review?.id ? 'Save review' : 'Confirm'}
        </button>
      </form>
    </FormProvider>
  );
}