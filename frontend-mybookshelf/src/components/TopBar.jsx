import { Link } from 'react-router';

export default function TopBar(){
  return(
    <div className="bg-emerald-900 text-emerald-50 p-2 mb-6 flex gap-5">
      <Link to='/'>
        Overview
      </Link>
      <Link to='/discover'>
        Discover
      </Link>
      <Link to='/myReviews'>
        Reviews
      </Link>
      <Link to='/myBooks'>
        My Books
      </Link> 
    </div>
  ); 
}