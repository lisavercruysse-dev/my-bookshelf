import { useFormContext } from 'react-hook-form';

const LabelInput  = ({
  label,
  name,
  placeholder,
  type,
  validationRules,
  ...rest
}) => {
  const {
    register,
    formState: { errors , isSubmitting},
  } = useFormContext();
  
  const hasError = name in errors;

  return (
    <div className='mb-3'>
      <label htmlFor={name} className="block font-medium dark:text-white font-display 
      text-main text-lg mb-2">
        {label}
      </label>
      <input
        {...register(name, validationRules)}
        id={name}
        name={name}
        type={type}
        disabled={isSubmitting}
        className='rounded-xl px-3 bg-white p-1
         text-gray-900 placeholder:text-gray-400 outline-1 outline-[#495C32]
         dark:bg-gray-800 dark:text-white font-display min-w-80'
        placeholder={placeholder}
        {...rest}
      />
      {hasError && <p className="text-red-500 text-sm mt-1" data-cy="label_input_error">{errors[name].message}</p> }
    </div>);
};

export default LabelInput;