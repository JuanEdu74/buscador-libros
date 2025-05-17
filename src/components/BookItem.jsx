function BookItem({ book }) {
    return (
      <div className="book-card">
        <img
          src={book.imageLinks?.thumbnail || 'https://via.placeholder.com/128x193?text=Sin+Imagen'}
          alt={book.title}
        />
        <div className="book-info">
          <h3>{book.title}</h3>
          <p>{book.authors?.join(', ')}</p>
          <a href={book.infoLink} target="_blank" rel="noopener noreferrer">Ver más</a>
        </div>
      </div>
    );
  }
  
  export default BookItem;
  