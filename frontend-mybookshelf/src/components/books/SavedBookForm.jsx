import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';

const EMPTY_SAVEDBOOK = {
  isbn: '',
  userId: '',
  status: '',
  pagesRead: '',
  favorite: '',
  dateStarted: '',
  dateEnded: '',
};

const validationRules = {
  userId: {
    required: 'User is required',
    min: {
      value: 1,
      message: 'UserId must be minimum 1',
    },
  },
  status: {
    required: 'A reading status is required',
  },
  pagesRead: {
    required: 'Read pages must be at least 0',
    min: {
      value: 0,
      message: 'Read pages must be at least 0',
    },
  },
};

export default function SavedBookForm ({statuses = [], savedBook, book, saveBook}) {
  const currentSavedBook = savedBook||EMPTY_SAVEDBOOK;
  const navigate = useNavigate();
  const {register, handleSubmit, formState: {errors, isValid}} = useForm({
    mode: 'onBlur',
    defaultValues: {
      isbn: book?.isbn,
      userId: savedBook?.userId,
      statusId: savedBook?.statusId,
      pagesRead: savedBook?.pagesRead,
      favorite: savedBook?.favorite,
      dateStarted: savedBook?.dateStarted,
      dateEnded: savedBook?.dateEnded,
    },
  });

  const onSubmit = async (values) => {
    if (!isValid || !book?.isbn) {
      return;
    };
    await saveBook({
      id: currentSavedBook?.id,
      isbn: book?.isbn,
      userId: 1,
      ...values,
    }, {
      throwOnError: false,
      onSuccess: () => {
        navigate('/myBooks');
      },
    },

    );
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='border rounded-lg max-w-150 p-5 flex flex-col 
    gap-3 m-3 items-center w-250'>
        <h5 className='text-center text-emerald-900'>{book?.title}</h5>
        <div className='flex flex-col gap-1 items-center'>
          <label>Status</label>
          <select 
            {...register('statusId', validationRules.status)}
            id="statusId" 
            name="statusId"
            required
            className='rounded-lg border p-2'> 
            <option value='' disabled>
              -- Select status---
            </option>
            {statuses.map(({id, name}) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
          {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}   
        </div>
        <div className='flex flex-col gap-1 items-center'>
          <label htmlFor="userId">UserId</label>
          <input className='border rounded-lg p-2'
            {...register('userId', validationRules.userId)}
            id="userId" name="userId" type="number" placeholder="userId" required />
          {errors.userId && <p className="text-red-500 text-sm mt-1">{errors.userId.message}</p>}
        </div>
        <div className='flex flex-col gap-1 items-center'>
          <label>
            Pages Read
          </label> 
          <input
            placeholder='0'
            defaultValue={0}
            className='border rounded-lg p-2'
            id='pagesRead'
            name="pagesRead"
            type="number"
            {...register('pagesRead', {
              required: 'Read pages must be at least 0',
              min: { value: 0, message: 'Read pages must be at least 0' },
              max: {
                value: book?.amountPages,
                message: `Cannot exceed total pages (${book?.amountPages || 0})`,
              },
            })}
          />
          {errors.pagesRead && <p className="text-red-500 text-sm mt-1">{errors.pagesRead.message}</p>}   
        </div>
        <div className='flex flex-col gap-1 items-center'>
          <label>Favorite</label>
          <input className='border rounded-lg p-2' 
            id="favorite" name='favorite' type="checkbox" {...register('favorite')}/>
        </div>
        <div className='flex flex-col gap-1 items-center'>
          <label>start date</label>
          <input className='border rounded-lg p-2' 
            id='dateStarted' name="dateStarted" type="date" {...register('dateStarted')}/>
        </div>
        <div className='flex flex-col gap-1 items-center'>
          <label>end date</label>
          <input className='border rounded-lg p-2' 
            id="dateEnded" name="dateEnded" type="date" {...register('dateEnded')}/>
        </div>
        <div>
          <button type='submit' className='border rounded-lg pl-3 pr-3 pt-2 pb-2 mt-3
        hover:cursor-pointer'>
            {currentSavedBook?.id ? 'Save changes' : 'Save book'}
          </button>
        </div>
      </form>
    </>

  );
}