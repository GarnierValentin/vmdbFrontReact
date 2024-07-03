import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './component/navBar';
import BestChoice from './component/bestChoice';
import MovieDetails from './component/movieDetails';
import FavoriteMovie from './component/favoriteMovie';

import './css/App.css';

function App() {
  const [user, setUser] = useState({ email: '', sessionToken: '' });
  const [refresh, setRefresh] = useState<boolean>(false);

  const handleSetUser = (email: string, sessionToken: string) => {
    setUser({ email, sessionToken });
    document.cookie = `email=${email}`;
    document.cookie = `sessionToken=${sessionToken}`;
  }

  const handleLogout = () => {
    setUser({ email: '', sessionToken: '' });
  }

  useEffect(() => {
    const email = document.cookie.split(';').find((cookie) => cookie.trim().startsWith('email='));
    const sessionToken = document.cookie.split(';').find((cookie) => cookie.trim().startsWith('sessionToken='));
    if (email && sessionToken) {
      setUser({
        email: email.split('=')[1],
        sessionToken: sessionToken.split('=')[1],
      });
    }
  }, []);

  return (
    <Router basename='/vmdbFrontReact'>
      <div className="app">
        <NavBar user={user} handleLogout={handleLogout} handleSetUser={handleSetUser} />
        <Routes>
          <Route path="/" element={<>
            <BestChoice user={user} refresh={refresh} setRefresh={setRefresh} />
            {user.email !== '' && user.sessionToken !== '' &&
              <FavoriteMovie user={user} refresh={refresh} setRefresh={setRefresh} />
            }
          </>} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
