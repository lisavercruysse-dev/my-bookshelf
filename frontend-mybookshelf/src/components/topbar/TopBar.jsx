import { HiOutlineHome } from 'react-icons/hi';
import NavItem from './NavItem';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { LuNotebookPen } from 'react-icons/lu';
import { PiBooks } from 'react-icons/pi';
import { FaUser } from 'react-icons/fa6';
import { useAuth } from '../../contexts/auth';
import { NavLink } from 'react-router';

export default function TopBar(){
  const {user, isAuthed, ready} = useAuth();
  console.log(user);
  return(
    <div className='flex flex-row bg-main text-white p-2 mb-6 justify-between items-center font-display'>
      <div className="flex gap-5">
        <NavItem title='Home' icon={<HiOutlineHome size={20}/>} url='/'/>
        <NavItem title='Explore' url='/discover' icon={<FaMagnifyingGlass size={18}/>}/>
        <NavItem title='Reviews' url='/myReviews' icon={<LuNotebookPen size={20}/>}/>
        <NavItem title='My Shelf' url='/myBooks' icon={<PiBooks size={20}/>}/>
      </div>
      <div className='flex items-center gap-2'>
        {ready && isAuthed && user ? (
          <p>{user.userName}</p>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
        <div className='border p-1 rounded-4xl'>
          <FaUser size={20}/>
        </div>
      </div>
    </div>

  ); 
}