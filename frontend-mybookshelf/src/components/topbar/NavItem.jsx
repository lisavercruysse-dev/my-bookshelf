import { NavLink } from 'react-router';

export default function NavItem({title, icon, url}) {
  return (
    <NavLink to={url} className='flex flex-row items-center gap-2 font-semibold aria-[current=page]:bg-[#F3F6EE] 
      aria-[current=page]:text-main px-4 py-2 border-1 rounded-xl'>
      {icon}
      {title}
    </NavLink>
  );
}