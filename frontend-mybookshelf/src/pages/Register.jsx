// src/pages/Register.jsx
import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { FormProvider, useForm } from 'react-hook-form';
import LabelInput from '../components/LabelInput';
import { useAuth } from '../contexts/auth';
import Error from '../components/asyncData/Error';

const validationRules = {
  email: {
    required: 'Email is required',
  },
  userName: {
    required: 'Username is required',
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters',
    },
  },
};

export default function Register() {
  const { error, loading, register } = useAuth();
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  });
  const { handleSubmit, reset, watch } = methods;

  const handleCancel = useCallback(() => {
    reset();
    navigate({
      pathname: '/login', replace: true,
    });
  }, [reset, navigate]);

  const handleRegister = useCallback(
    async ({ email, userName, password }) => {
      const registered = await register({
        email,
        userName: userName, 
        password,
      });

      if (registered) {
        navigate({ pathname: '/', replace: true });
      }
    },
    [register, navigate],
  );

  return (
    <FormProvider {...methods}>
      <div className='min-h-screen w-full flex flex-col items-center justify-center gap-40 self-center'>
        <form
          className='flex flex-col items-center w-full gap-5'
          onSubmit={handleSubmit(handleRegister)}
        >
          <p className='text-5xl text-main font-bold font-display'>Sign up</p>
          <Error error={error} />
          <LabelInput
            label='email'
            type='text'
            name='email'
            placeholder='your@email.com'
            validationRules={validationRules.email}
            data-cy='email_input'
          />
          <LabelInput
            label='userName'
            type='text'
            name='userName'
            placeholder='username'
            validationRules={validationRules.userName}
            data-cy='username_input'
          />
          <LabelInput
            label='password'
            type='password'
            name='password'
            placeholder='password'
            validationRules={validationRules.password}
            data-cy='password_input'
          />
          <LabelInput
            label='confirm password'
            type='password'
            name='confirmPassword'
            placeholder='confirm password'
            validationRules={{
              required: 'Please confirm your password',
              validate: (value) =>
                value === watch('password') || 'Passwords do not match',
            }}
            data-cy='confirm_password_input'
          />
          <div className='flex flex-row gap-5'>
            <button
              type='submit'
              className='primary'
              disabled={loading}
              data-cy='submit_btn'
            >
              Sign up
            </button>
            <button
              type='button'
              className='secondary ml-2'
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
        <div className='flex flex-col gap-5'>
          <p className='font-display text-main text-lg'>Already have an account?</p>
          <button
            type='button'
            className='primary'
            onClick={() => navigate('/login')}
          >
            Sign in
          </button>
        </div>
      </div>
    </FormProvider>
  );
}