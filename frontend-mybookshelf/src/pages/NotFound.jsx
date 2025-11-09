import { useLocation } from 'react-router';

export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <div>
      <h1>Page not found</h1>
      <p>Something went wront on the page with {pathname} as url, please try something else.</p>
    </div>
  );
}