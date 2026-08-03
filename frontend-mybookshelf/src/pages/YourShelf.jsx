import useSWR from 'swr';
import { getData } from '../api';
import Shelf from '../components/shelves/Shelf';
import AsyncData from '../components/asyncData/AsyncData';

export default function YourShelf() {
  const {
    data: shelves,
    error,
    isLoading,
  } = useSWR('shelves', getData);

  return (
    <div className='flex flex-col gap-2 px-10 py-8 max-w-6xl mx-auto'>
      <p className='font-display text-main font-bold text-4xl tracking-tight'>Your shelves</p>
      <p className='font-display text-gray-400 text-sm mb-4'>
        {shelves?.length ?? 0} shelf{shelves?.length === 1 ? '' : 's'}
      </p>
      <AsyncData error={error} loading={isLoading}>
        <div className='flex flex-col divide-y divide-gray-100'>
          {shelves?.map((shelf) => (
            <Shelf key={shelf.id} shelfId={shelf.id} title={shelf.title} />
          ))}
        </div>
      </AsyncData>
    </div>
  );
}