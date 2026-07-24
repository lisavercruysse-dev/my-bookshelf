import Book from './Book';

export default function BookList({direction, books, maxWidth}) {
  const flexDirection = direction === 'horizontal' ? 'flex-row': 'flex-col';
  return (
    <div className={`flex ${flexDirection} max-w-${maxWidth}`}>
      {books?.map((b) => {
        <Book key={b.id}/>;
      })}
    </div>
  );
}