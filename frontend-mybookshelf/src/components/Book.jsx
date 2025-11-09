import { useState } from 'react';
import altBook from '../assets/altBook.jpg';

export default function Book (props) {

  const {title, amountPages, author, img} = props;
  const [isMoreInfo, setIsMoreInfo] = useState(false);
  const [imgUrl, setImgUrl] = useState(img || altBook);
  
  const toggleInfo = () => {
    setIsMoreInfo(!isMoreInfo);
  };

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
      <p className=''>
        {amountPages}
      </p>
      <div className='items-center flex flex-col '>
        <button className="border rounded-lg pl-3 pr-3 pt-1 pb-1 m-3 bg-emerald-900 
         hover:bg-emerald-950 hover:cursor-pointer" 
        onClick={toggleInfo}>{isMoreInfo ? 'less' : 'more'}</button>
      </div>
    </div>
  );
}