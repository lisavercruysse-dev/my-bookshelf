import { useAuth } from '../../contexts/auth';
import { FaStar } from 'react-icons/fa6';

export default function Review() {
  const { user } = useAuth();

  return (
    <div className='bg-[#F3F6EE] p-5 rounded-2xl min-w-50 max-w-130 w-full'>
      <div className='flex gap-5 items-center'>
        <p className='font-display font-bold'>
          {user.userName}
        </p>
        <div className='flex gap-1'>
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className='text-[#E4B65F]' />
          ))}
        </div>
      </div>
      <p className='font-display text-gray-500'>31/07/2026</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
        Saepe praesentium cum nemo tempore ex et facilis, voluptas 
        nesciunt facere fugit recusandae laborum itaque odit inventore
        vel ab cupiditate ipsum nam.
      </p>
    </div>
  );
}