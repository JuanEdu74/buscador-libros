import { useState, useEffect } from 'react';
import BookItem from './components/BookItem';
import './index.css';

function App() {
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState([]);
  const [language, setLanguage] = useState('all');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = async () => {
    if (search.trim() === '') return;

    let url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(search)}`;
    if (language !== 'all') {
      url += `&langRestrict=${language}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    setBooks(data.items || []);
  };

  return (
    <div className="container">
      <h1>📚 Buscador de Libros - SENATI</h1>
      <p className="hora">🕒 Hora local: {currentTime.toLocaleTimeString()}</p>

      <div className="input-group">
        <input
          type="text"
          placeholder="Buscar libros por título o autor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      <div className="book-list">
        {books.length === 0 && <p>No hay resultados.</p>}
        {books.map((book) => (
          <BookItem key={book.id} book={book.volumeInfo} />
        ))}
      </div>
    </div>
  );
}

export default App;
