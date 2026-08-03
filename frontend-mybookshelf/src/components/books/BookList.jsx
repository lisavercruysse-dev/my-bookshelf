import Book from './Book';

export default function BookList({ books, maxAmount }) {
  const visibleBooks = typeof maxAmount === 'number' ? books.slice(0, maxAmount) : books;

  const mapAuthors = (book) => {
    return book.volumeInfo.authors?.join(', ') ?? 'Unknown author';
  };

  const getISBN = (volumeInfo) => {
    const identifiers = volumeInfo.industryIdentifiers || [];
    const isbn13 = identifiers.find((id) => id.type === 'ISBN_13');
    const isbn10 = identifiers.find((id) => id.type === 'ISBN_10');
    return (isbn13 || isbn10)?.identifier ?? null;
  };

  return (
    <div className='flex flex-row gap-10 pb-2 items-center'>
      {visibleBooks.map((b) => (
        <Book
          key={b.id}
          id={b.id}
          isbn={b.isbn || getISBN(b.volumeInfo)}
          title={b.title || b.volumeInfo.title}
          author={b.author || mapAuthors(b)}
          imageLink={b.imageLink || b.volumeInfo?.imageLinks?.thumbnail || null}
        />
      ))}
    </div>
  );
}