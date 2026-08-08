import { useForm, FormProvider } from 'react-hook-form';
import { FaStar } from 'react-icons/fa6';
import TipTap from '../tiptap/TipTap';

const validationRules = {
  stars: {
    required: 'Rating is required',
    validate: (value) => {
      if (!value || value < 1 || value > 5) {
        return 'Please select a rating between 1 and 5';
      }
      return true;
    },
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
  stars: 0,
  body: '',
};

export default function ReviewForm({
  isbn,
  review = EMPTY_REVIEW,
  saveReview,
  onClose,
  book,
}) {
  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      stars: review?.stars ?? 0,
      body: review?.body ?? '',
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

  const onSubmit = async (values) => {
    await saveReview(
      {
        isbn,
        bookData: {
          title: book?.volumeInfo?.title,
          author: book?.volumeInfo?.authors?.join(', '),
          description: book?.volumeInfo?.description || 'No Description',
          pageCount: book?.volumeInfo?.pageCount,
          genre: book?.volumeInfo?.categories?.[0] ?? 'Uncategorized',
          imageLink: book?.volumeInfo?.imageLinks?.thumbnail ?? '',
        },
        stars: values.stars,
        body: values.body,
      },
      {
        throwOnError: false,
        onSuccess: () => onClose?.(),
      },
    );
  };

  return (
    <FormProvider {...methods}>
      <p className='font-display justify-self-center text-2xl pb-10'>
        {review?.id ? 'Edit your review' : 'Write a review'}
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-3 items-center'
      >
        <div className='flex flex-col w-full gap-1'>
          <p className='justify-self-start font-display text-gray-900'>
            Rating
          </p>

          <input
            type='hidden'
            {...register('stars', validationRules.stars)}
          />

          <div className='flex gap-1'>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                type='button'
                key={n}
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
            <p className='text-red-500 text-sm mt-1'>
              {errors.stars.message}
            </p>
          )}
        </div>

        <div className='flex flex-col w-full gap-1'>
          <p className='justify-self-start font-display text-gray-900'>
            Your review
          </p>

          <input type='hidden' {...register('body', validationRules.body)} />

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

          {errors.body && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.body.message}
            </p>
          )}
        </div>

        <button
          type='submit'
          className='primary mt-5'
          disabled={isSubmitting}
        >
          {review?.id ? 'Save review' : 'Confirm'}
        </button>
      </form>
    </FormProvider>
  );
}