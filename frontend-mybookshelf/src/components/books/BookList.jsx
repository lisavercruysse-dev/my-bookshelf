import Book from './Book';

export default function BookList({ books, maxAmount }) {
  const visibleBooks = typeof maxAmount === 'number' ? books.slice(0, maxAmount) : books;

  const mapAuthors = (book) => {
    return book.volumeInfo.authors?.join(', ')  ?? 'Unkown author';
  };

  return (
    <div className='flex flex-row gap-10 pb-2 items-center'>
      {visibleBooks.map((b) => (
        <Book
          key={b.id}
          title={b.title || b.volumeInfo.title}
          author={b.author || mapAuthors(b)}
          imageLink={b.imageLink || b.volumeInfo?.imageLinks?.thumbnail || null}
        />
      ))}
    </div>
  );
}
