import { Outlet } from 'react-router';
import TopBar from '../components/topbar/TopBar';

export default function Layout() {
  return (
    <div className='container-xl'>
      <TopBar />
      <div className='p-4'>
        <Outlet />
      </div>
    </div>
  );
}