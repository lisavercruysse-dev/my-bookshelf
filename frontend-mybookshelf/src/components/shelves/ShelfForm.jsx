import { useForm, FormProvider } from 'react-hook-form';
import LabelInput from '../LabelInput';

const validationRules = {
  title: {
    required: 'Title is required',
  },
};

const EMPTY_SHELF = {
  id: undefined,
  title: '',
  description: '',
};

export default function ShelfForm({ shelf = EMPTY_SHELF, saveShelf, onDone }) {
  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      title: shelf?.title,
      description: shelf?.description,
    },
  });
  const { handleSubmit, formState: { isValid, isSubmitting } } = methods;

  const onSubmit = async (values) => {
    if (!isValid) return;

    await saveShelf({
      id: shelf?.id,
      ...values,
    }, {
      throwOnError: false,
      onSuccess: () => onDone(),
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full max-w-sm flex-col items-center gap-4">
        <LabelInput
          label="Title"
          name="title"
          placeholder="title"
          type="text"
          validationRules={validationRules.title}
          data-cy="title_input"
        />
        <LabelInput
          label="Description"
          name="description"
          placeholder="description"
          type="text"
          data-cy="description_input"
        />
        <div className="flex justify-end">
          <button type="submit" className="primary" disabled={isSubmitting} data-cy="submit_shelf">
            {shelf?.id ? 'Save shelf' : 'Create shelf'}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}