import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './component/navBar';
import BestChoice from './component/bestChoice';

import './css/App.css';

function App() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState(null);

  const fetchMovies = () => {
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
    <Router>
      <div className="App">
        <NavBar search={search} setSearch={setSearch} fetchMovies={fetchMovies} />
        <BestChoice />
      </div>
    </Router>
  );
}

export default App;
