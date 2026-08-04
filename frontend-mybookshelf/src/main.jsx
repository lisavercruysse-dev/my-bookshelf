import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import NotFound from './pages/NotFound.jsx';
import { AuthProvider } from './contexts/Auth.context.jsx';
import Login from './pages/Login.jsx';
import { StrictMode } from 'react';
import Layout from './pages/Layout.jsx';
import Discover from './pages/Discover.jsx';
import BookDetails from './components/books/BookDetails.jsx';
import YourShelf from './pages/YourShelf.jsx';

const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      { path: '/', Component: App },
      { path: '/discover', Component: Discover},
      { path: '/books/:isbn', Component: BookDetails},
      { path: 'login', Component: Login },
      { path: '*', Component: NotFound },
      { path: '/yourShelf', Component: YourShelf},
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>,

);
