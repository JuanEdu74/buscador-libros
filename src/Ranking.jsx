import BookItem from './components/BookItem';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Ranking() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchRanking = async () => {
      const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=bestsellers');
      const data = await response.json();
      setBooks(data.items || []);
    };
    fetchRanking();
  }, []);

  return (
    <div className="container">
      <h1>🏆 Libros Más Leídos</h1>
      <Link to="/" className="ranking-link">← Volver al buscador</Link>

      <div className="book-list">
        {books.length === 0 && <p>Cargando ranking...</p>}
        {books.map((book) => (
          <BookItem key={book.id} book={book.volumeInfo} />
        ))}
      </div>
    </div>
  );
}

export default Ranking;
