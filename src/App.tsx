import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './component/navBar';
import BestChoice from './component/bestChoice';
import MovieDetails from './component/movieDetails';
import FavoriteMovie from './component/favoriteMovie';

import './css/App.css';

function App() {
  const [user, setUser] = useState({ email: '', password: '' });


  const handleSetUser = (email: string, password: string) => {
    setUser({ email, password });
  }

  return (
    <Router basename='/vmdbFrontReact'>
      <div className="App">
        <NavBar user={user} handleSetUser={handleSetUser}/>
        <FavoriteMovie />
        <Routes>
          <Route path="/" element={<BestChoice />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
