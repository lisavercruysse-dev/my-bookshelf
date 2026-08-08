import Book from './Book';

const getISBN = (volumeInfo) => {
  const identifiers = volumeInfo?.industryIdentifiers || [];
  const isbn13 = identifiers.find((id) => id.type === 'ISBN_13');
  const isbn10 = identifiers.find((id) => id.type === 'ISBN_10');
  return (isbn13 || isbn10)?.identifier ?? null;
};

export default function BookList({
  books,
  maxAmount,
  className = '',
  containerRef,
  onDelete,
  hasDeleteBtns = false,
}) {
  const visibleBooks =
    typeof maxAmount === 'number' ? books.slice(0, maxAmount) : books;

  const mapAuthors = (book) => {
    return book.volumeInfo?.authors?.join(', ') ?? 'Unknown author';
  };

  return (
    <div
      ref={containerRef}
      className={`flex flex-row gap-5 items-center pb-2 ${className}`}
    >
      {visibleBooks.map((b) => (
        <Book
          key={b.id ?? b.isbn}
          id={b.id}
          isbn={b.isbn || getISBN(b.volumeInfo)}
          title={b.title || b.volumeInfo?.title}
          author={b.author || mapAuthors(b)}
          imageLink={b.imageLink || b.volumeInfo?.imageLinks?.thumbnail || null}
          onDelete={onDelete}
          hasDeleteBtn={hasDeleteBtns}
        />
      ))}
    </div>
  );
}