import { HiOutlineHome } from 'react-icons/hi';
import NavItem from './NavItem';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { LuNotebookPen } from 'react-icons/lu';
import { PiBooks } from 'react-icons/pi';
import { FaUser } from 'react-icons/fa6';
import { useAuth } from '../../contexts/auth';
import { NavLink, useNavigate } from 'react-router';
import { useState } from 'react';

export default function TopBar() {
  const { user, isAuthed, ready, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/login');
  };

  return (
    <div className='relative flex flex-row bg-main text-white p-2 mb-4 justify-between items-center font-display'>
      <div className="flex gap-5">
        <NavItem title='Home' icon={<HiOutlineHome size={20}/>} url='/'/>
        <NavItem title='Explore' url='/discover' icon={<FaMagnifyingGlass size={18}/>}/>
        <NavItem title='Reviews' url='/myReviews' icon={<LuNotebookPen size={20}/>}/>
        <NavItem title='My Shelf' url='/myBooks' icon={<PiBooks size={20}/>}/>
      </div>
      <div className='flex items-center gap-2'>
        {ready && isAuthed && user ? (
          <button
            type='button'
            onClick={() => setMenuOpen((open) => !open)}
            className='flex items-center gap-2'
          >
            <span>{user.userName}</span>
            <span className='border p-1 rounded-4xl flex items-center justify-center'>
              <FaUser size={20}/>
            </span>
          </button>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
      {menuOpen && (
        <div className='absolute right-0 top-full mt-2 w-36 rounded-lg border 
        border-white/10 bg-white p-2 text-sm text-main shadow-lg'>
          <button
            type='button'
            onClick={handleLogout}
            className='w-full rounded-md px-2 py-1 text-left hover:bg-main/10'
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}