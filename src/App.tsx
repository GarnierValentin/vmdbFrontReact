import React, { useEffect, useState } from 'react';
import MovieCard from './component/movie';

function App() {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState('');

  const fetchMovies = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (search) {
      fetch(`http://localhost:4040/movie?title=${encodeURIComponent(search)}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setData(data.data);
    });
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={fetchMovies}>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search for a movie"
          />
          <button type="submit">Search</button>
        </form>
        <MovieCard movie={data} />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;