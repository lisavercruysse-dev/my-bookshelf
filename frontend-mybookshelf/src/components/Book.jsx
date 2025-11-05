import { useState } from 'react';
import altBook from '../assets/altBook.jpg';

export default function Book (props) {

  const { isbn, title, genre, description, amountPages, author, img} = props;
  const [isMoreInfo, setIsMoreInfo] = useState(false);
  const [imgUrl, setImgUrl] = useState(img || altBook);
  
  const toggleInfo = () => {
    setIsMoreInfo(!isMoreInfo);
  };

  return (
    <div className="flex flex-col p-5 m-2 items-center w-xl">
      <h4 className="text-center">
        {title}
      </h4>
      <p className="italic">
        {author}
      </p>
      <img
        src={imgUrl}
        alt="book cover"
        onError={() => setImgUrl(altBook)}
        className="w-48 rounded-lg border shadow-xl shadow-"
      />
      <p>
        {amountPages}
      </p>
      <div className='items-center flex flex-col'>
        <button className="border rounded-lg pl-3 pr-3 pt-1 pb-1 m-3" 
          onClick={toggleInfo}>{isMoreInfo ? 'less' : 'more'}</button>
        <div className={`${isMoreInfo ? 'block' : 'hidden'} flex flex-col border rounded-2xl p-5`}>
          <p className='p-2'>
            ISBN: {isbn}
          </p>
          <p className='p-2'>
            genre: {genre}
          </p>
          <p className='p-2 w-lg text-balance '>
            description: {description}
          </p> 
        </div> 
      </div>
    </div>
  );
}