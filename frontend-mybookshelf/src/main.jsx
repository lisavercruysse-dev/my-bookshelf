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

const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      { path: '/', Component: App },
      { path: 'login', Component: Login },
      { path: '*', Component: NotFound },
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
