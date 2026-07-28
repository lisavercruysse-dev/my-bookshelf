import Book from './Book';

export default function BookList({ books, maxAmount }) {
  const visibleBooks = typeof maxAmount === 'number' ? books.slice(0, maxAmount) : books;

  return (
    <div className='flex flex-row gap-4 pb-2 items-center'>
      {visibleBooks.map((b) => (
        <Book
          key={b.id}
          title={b.title}
          author={b.author}
          imageLink={b.imageLink}
        />
      ))}
    </div>
  );
}
