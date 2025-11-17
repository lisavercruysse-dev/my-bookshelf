import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, Navigate } from 'react-router';
import { RouterProvider } from 'react-router-dom';
import NotFound from './pages/NotFound.jsx';
import Discover from './pages/Discover.jsx';
import MyReviews from './pages/MyReviews.jsx';
import MyBooks from './pages/MyBooks.jsx';
import BookInfo from './pages/BookInfo.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
  },
  { path: '*', Component: NotFound},
  { path: 'discover', Component: Discover},
  { path: 'myReviews', Component: MyReviews},
  { path: 'myBooks', Component: MyBooks},
  { path: 'Discover/bookInfo', element: <Navigate to='/bookInfo'/>},
  { path: 'bookInfo/:isbn', Component: BookInfo},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
);
