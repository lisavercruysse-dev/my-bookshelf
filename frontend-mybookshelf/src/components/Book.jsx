export default function Book (props) {

  const { isbn, title, genre, description, amountPages, author, img} = props;

  return (
    <div>
      <h4>
        {title}
      </h4>
      <p>
        {author}
      </p>
      <img src={img} alt="book cover"/>
      <p>
        {amountPages}
        <button>more</button>
        ISBN: {isbn}
        genre: {genre}
        description: {description}
      </p>
    </div>
  );
}