// src/pages/Login.jsx
import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { FormProvider, useForm } from 'react-hook-form';
import LabelInput from '../components/LabelInput';
import { useAuth } from '../contexts/auth';
import Error from '../components/asyncData/Error';
import { Link } from 'react-router';

const validationRules = {
  email: {
    required: 'Email is required',
  },
  password: {
    required: 'Password is required',
  },
};

export default function Login() {
  const { error, loading, login } = useAuth();
  const navigate = useNavigate();
  const { search } = useLocation();

  const methods = useForm({
    defaultValues: {
      email: 'bob@example.com',
      password: '12345678',
    },
  });
  const { handleSubmit } = methods;

  const handleLogin = useCallback(
    async ({ email, password }) => {
      const loggedIn = await login(email, password);

      if (loggedIn) {
        const params = new URLSearchParams(search);
        navigate({
          pathname: params.get('redirect') || '/',
          replace: true,
        });
      }
    },
    [login, navigate, search],
  );

  return (
    <FormProvider {...methods}>
      <div className='min-h-screen w-full flex flex-col items-center justify-center gap-10 self-center'>
        <form
          className='flex flex-col items-center w-full gap-5'
          onSubmit={handleSubmit(handleLogin)}
        >
          <p className='text-5xl text-main font-bold font-display'>Sign in</p>
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
            label='password'
            type='password'
            placeholder='password'
            name='password'
            validationRules={validationRules.password}
            data-cy='password_input'
          />
          <div className='flex flex-row gap-5'>
            <button
              type='submit'
              className='primary'
              disabled={loading}
              data-cy='submit_btn'
            >
              Sign in
            </button>
          </div>

          {/* divider */}
          <div className='flex items-center w-full max-w-xs gap-3 mt-2'>
            <div className='flex-1 h-px bg-gray-300' />
            <span className='text-xs uppercase tracking-wide text-gray-400'>
              or
            </span>
            <div className='flex-1 h-px bg-gray-300' />
          </div>

          <a
            href={`${import.meta.env.VITE_API_URL}/sessions/google`}
            className='w-full max-w-xs'
          >
            <button
              type='button'
              disabled={loading}
              className='w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm 
              font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 
              disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Sign in with Google
            </button>
          </a>
        </form>

        <div className='flex flex-col items-center gap-5'>
          <p className='font-display text-main text-lg'>No account yet?</p>
          <Link to='/register'>
            <button type='button' className='primary' disabled={loading}>
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </FormProvider>
  );
}