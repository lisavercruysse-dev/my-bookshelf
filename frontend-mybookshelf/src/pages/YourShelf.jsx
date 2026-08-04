import useSWR from 'swr';
import { getData, save } from '../api';
import Shelf from '../components/shelves/Shelf';
import AsyncData from '../components/asyncData/AsyncData';
import { useState } from 'react';
import Modal from '../components/general/modal';
import { useForm, FormProvider } from 'react-hook-form';
import LabelInput from '../components/LabelInput';
import useSWRMutation from 'swr/mutation';

export default function YourShelf() {
  const [modal, setModal] = useState(false);
  const methods = useForm();
  const { handleSubmit, formState:{isValid} } = methods;

  const {
    data: shelves,
    error,
    isLoading,
  } = useSWR('shelves', getData);

  const {
    trigger: saveShelf, error: saveError,
  } = useSWRMutation('shelves', save);

  const onSubmit = async (values) => {
    if (!isValid) return;

    await saveShelf(values, {
      throwOnError: false,
      onSuccess: () => setModal(false),
    });
  };

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
      <button className='primary self-center' onClick={() => setModal(true)}>
        Create New Shelf
      </button>
      <Modal isOpen={modal} onClose={() => setModal(false)}>
        <div className="flex w-full flex-col items-center justify-center">
          <p className='font-display justify-self-center text-2xl pb-5'>Add New Shelf</p>
          <AsyncData error={saveError}>
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex w-full max-w-sm flex-col items-center gap-4"
              >
                <LabelInput
                  label=""
                  name="title"
                  placeholder="title"
                  type="text"
                  validationRules={{ required: 'Title is required' }}
                />
                <button type="submit" className="primary">
                  Create
                </button>
              </form>
            </FormProvider>
          </AsyncData>
        </div>
      </Modal>
    </div>
  );
}