import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useAuth } from '../contexts/auth';

export default function OAuthCallback () {
  const [searchParams] = useSearchParams();
  const { setSession } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      setSession(token);
    }
    navigate('/', { replace: true });
  }, [searchParams, setSession, navigate]);

  return (
    <p>Signing you in…</p>
  );
};