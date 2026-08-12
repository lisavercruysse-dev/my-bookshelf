import { Link, useLocation } from 'react-router';

export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col items-center px-4">
      <div className="flex flex-col items-center gap-8 max-w-2xl w-full pt-20 pb-10">
        <div className="text-center">
          <p className="font-display text-main font-bold text-[100px] leading-none">
            404
          </p>
          <h1 className="font-display text-gray-900 font-semibold text-4xl mt-4">
            Page not found
          </h1>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-lg text-center">
          <p className="font-display text-gray-500 text-sm mb-2">
            We couldn't find:
          </p>
          <p className="font-display text-gray-900 font-medium bg-gray-50 rounded-lg px-4 
          py-3 break-all">
            {pathname}
          </p>
          <p className="font-display text-gray-500 text-sm mt-4">
            Check the URL or head back to the homepage.
          </p>
          <Link to="/" className="inline-block mt-6">
            <button className="primary">
              Back to home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}