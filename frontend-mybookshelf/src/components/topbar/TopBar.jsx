import { HiOutlineHome } from 'react-icons/hi';
import NavItem from './NavItem';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { LuNotebookPen } from 'react-icons/lu';
import { PiBooks } from 'react-icons/pi';

export default function TopBar(){
  return(
    <div className="bg-main text-white p-2 mb-6 flex gap-5">
      <NavItem title='Home' icon={<HiOutlineHome />} url='/'/>
      <NavItem title='Explore' url='/discover' icon={<FaMagnifyingGlass />}/>
      <NavItem title='Reviews' url='/myReviews' icon={<LuNotebookPen />}/>
      <NavItem title='My Shelf' url='/myBooks' icon={<PiBooks />}/>
    </div>
  ); 
}