import { Link } from 'react-router';

export default function TopBar(){
  return(
    <div className="bg-emerald-900 text-emerald-50 p-2">
      <Link to='/'>
        Overview
      </Link>
    </div>
  ); 
}