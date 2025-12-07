import { Link } from 'react-router';
import altBook from '../../assets/altBook.jpg';

export default function Review(props){
  const {id, title, body, stars, date, bookTitle, pages, author, genre, img} = props;

  return (
    <div className="flex flex-col border rounded-lg p-5 gap-3 m-5 shadow-emerald-950 item">
      <div className="flex gap-3">
        <img src={img || altBook} className='rounded-lg w-60 object-contain' />
        <div className="flex flex-col gap-2 flex-1">
          <h4>{bookTitle}</h4>
          <p>{author}</p>
          <p>Genre: {genre}</p>
          <p>pg: {pages}</p>
          <p>{stars}</p>
          <div className="border my-2"></div>
          <div className="flex gap-3">
            <h4>{title}</h4>
            <p>{date.split('T')[0]}</p>
          </div>
          <div className="border my-2"></div>
          <div className="flex-1 w-full">
            {body}
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <Link to={`addOrEditReview/${id}`}>
          <button className="bg-emerald-900 pb-2 pt-2 hover:cursor-pointer
      text-emerald-50 rounded-lg hover:bg-emerald-950 w-30">
            Edit
          </button>
        </Link>
      </div>
     
    </div>

  );
}