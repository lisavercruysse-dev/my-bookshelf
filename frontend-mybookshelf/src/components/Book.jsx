import { useState } from 'react';
import altBook from '../assets/altBook.jpg';
import { Link } from 'react-router';

export default function Book (props) {

  const {title, amountPages, author, img} = props;
  const [imgUrl, setImgUrl] = useState(img || altBook);

  return (
    <div className="flex flex-col p-5 m-2 items-center min-w-90 text-emerald-50 max-w-90
    border-2 rounded-xl shadow-lg shadow-emerald-950 bg-emerald-900 border-emerald-50">
      <h4 className="text-center truncate max-w-60 ">
        {title}
      </h4>
      <p className="italic truncate max-w-60  p-2">
        {author}
      </p>
      <img
        src={imgUrl}
        alt="book cover"
        onError={() => setImgUrl(altBook)}
        className="w-48 rounded-lg border border-emerald-50"
      />
      <p className='mt-2 italic'>
        Pages: {amountPages}
      </p>
      <div className='items-center flex gap-3 mt-4 mb-2'>
        <Link to='bookInfo'><button className="border rounded-lg pl-3 pr-3 pt-1 pb-1 bg-emerald-900 
         hover:bg-emerald-950 hover:cursor-pointer w-20" 
        >More</button></Link>
        <button className="border rounded-lg pl-3 pr-3 pt-1 pb-1 bg-emerald-900 
         hover:bg-emerald-950 hover:cursor-pointer w-20" 
        >save</button>
      </div>
    </div>
  );
}