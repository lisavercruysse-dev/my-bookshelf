export default function Book (props) {

  const { isbn, title, genre, description, amountPages, author} = props;

  return (
    <div>
      ISBN: {isbn}, title: {title}, genre: {genre}, description: {description}, 
      amount of pages: {amountPages}, author: {author}
    </div>
  );
}