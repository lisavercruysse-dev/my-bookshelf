import Book from '../components/Book';
import BOOK_DATA from '../api/mock_data';

export default function Overview(){
  const book = BOOK_DATA[0];
  return (
    <>
      <div>
        <div className="bg-emerald-900 p-3 text-emerald-50 font-serif">
          topbar
        </div>
        <h1 className="text-5xl text-emerald-900 font-bold font font-serif p-4">My Bookshelf</h1> 
        <button className="bg-emerald-900 p-3 text-emerald-50 font-serif rounded-lg">Reviews</button>
        <button className="bg-emerald-900 p-3 text-emerald-50 font-serif rounded-lg">Discover</button>
        <button className="bg-emerald-900 p-3 text-emerald-50 font-serif rounded-lg">My Books</button>
        <div>
          <Book
            isbn={book.isbn}
            title={book.title}
            genre={book.genre}
            description={book.description}
            amountPages={book.amountPages}
            author={book.author}
          />
        </div>
      </div>
    </>
  );
}