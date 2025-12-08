import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, Navigate } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import NotFound from './pages/NotFound.jsx';
import Discover from './pages/Discover.jsx';
import MyReviews from './pages/reviews/MyReviews.jsx';
import MyBooks from './pages/books/MyBooks.jsx';
import BookInfo from './pages/BookInfo.jsx';
import AddOrEditReview from './pages/reviews/AddOrEditReview.jsx';
import AddOrEditSavedBook from './pages/books/AddOrEditSavedBook.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
  },
  { path: 'discover', Component: Discover},
  { path: 'myReviews', Component: MyReviews},
  { path: 'myBooks', Component: MyBooks},
  { path: 'Discover/bookInfo', element: <Navigate to='/bookInfo'/>},
  { path: 'bookInfo/:isbn', Component: BookInfo},
  { path: 'addOrEditReview/:isbn', Component: AddOrEditReview},
  { path: 'myReviews/addOrEditReview/:id', Component: AddOrEditReview},
  { path: 'Discover/addOrEditReview/:isbn', Component: AddOrEditReview},
  { path: '*', Component: NotFound},
  { path: '/bookInfo/:isbn', Component: BookInfo},
  { path: 'addOrEditSavedBook/:isbn', Component: AddOrEditSavedBook},
  { path: '/myBooks/addOrEditSavedBook/:isbn', element: <Navigate to='addOrEditSavedBook/:isbn'/>},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
);
