import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie } from './types';
import { Link } from 'react-router-dom';
import { addFavorite, removeFavorite } from './api';

type MovieProps = {
  movie: Movie | null;
  index: number;
  user: { email: string; sessionToken: string };
  isFavorite: boolean;
  refresh: boolean;
  setRefresh: (refresh: boolean) => void;
}

const MovieCard: React.FC<MovieProps> = ({
  movie,
  index,
  user,
  isFavorite,
  refresh,
  setRefresh
}) => {
  const [isFaved, setIsFaved] = useState(isFavorite);
  const navigate = useNavigate();
  const handleShowDetails = (_id: string) => {
    navigate(`/movie/${movie?._id}`, {
      state: { user: user, refresh: refresh, setRefresh: setRefresh }
    });
  };

  const apiBaseUrl = window.location.hostname === 'localhost'
    ? 'http://localhost:4040'
    : 'https://api.valentin-garnier.fr:4040';

  if (!movie) {
    return null;
  }

  const handleAddFavorite = async () => {
    await addFavorite(movie._id, user);
    setRefresh(!refresh);
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/favorites?email=${user.email}&sessionToken=${user.sessionToken}`);
        const data = await response.json();
        setIsFaved(data.data.includes(movie._id));
      } catch (error) {
        console.error('Error fetching favorite movies:', error);
      }
    };
    fetchFavorites();
  }, [user, movie, refresh]);

  return (
    <div className="movie-card">
      <img src={movie.poster || 'default_image_url'} alt={movie.title || 'Titre du film'} />
      {!isFavorite && (
        <>
          <div className="svg-container">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="svgYellow">
                <path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path>
              </svg>
              {movie.imdb.rating}
            </span>
            {isFaved ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="85" height="81" className="svgBlue" viewBox="0 0 85 81" role="presentation">
                <path d="M29.4278383,26.4913549 L2.77970363,28.6432143 L2.63541119,28.6580541 C0.066865676,28.979767 -0.941953299,32.2222005 1.05754936,33.9345403 L21.3502824,51.3123553 L15.1650027,77.2797478 L15.1355051,77.4163845 C14.6437005,79.9569202 17.4230421,81.9201545 19.6736611,80.5499671 L42.5,66.6529451 L65.3263389,80.5499671 L65.447392,80.6201968 C67.7156822,81.8722123 70.4448402,79.8400226 69.8349973,77.2797478 L63.6489629,51.3123553 L83.9424506,33.9345403 L84.0504483,33.8378644 C85.9390285,32.0703808 84.8461128,28.855226 82.2202964,28.6432143 L55.571407,26.4913549 L45.2865041,1.85440279 C44.2543406,-0.618134262 40.7456594,-0.618134262 39.7134959,1.85440279 L29.4278383,26.4913549 Z">
                </path>
              </svg>
            ) : (
              <button className="buttonAddFavorite" onClick={handleAddFavorite}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="svgBlueEmpty" viewBox="0 0 24 24" fill="currentColor" role="presentation">
                  <path d="M22.724 8.217l-6.786-.587-2.65-6.22c-.477-1.133-2.103-1.133-2.58 0l-2.65 6.234-6.772.573c-1.234.098-1.739 1.636-.8 2.446l5.146 4.446-1.542 6.598c-.28 1.202 1.023 2.153 2.09 1.51l5.818-3.495 5.819 3.509c1.065.643 2.37-.308 2.089-1.51l-1.542-6.612 5.145-4.446c.94-.81.45-2.348-.785-2.446zm-10.726 8.89l-5.272 3.174 1.402-5.983-4.655-4.026 6.141-.531 2.384-5.634 2.398 5.648 6.14.531-4.654 4.026 1.402 5.983-5.286-3.187z">
                  </path>
                </svg>
              </button>
            )}
          </div>
          <h2>{index + 1} - {movie.title}</h2>
          <button className="buttonShowDetails" onClick={() => handleShowDetails(movie._id)}>
            <span>Voir plus en détail</span>
          </button>
        </>
      )
      }
      {
        isFavorite && (
          <div>
            <h2>{index + 1} - {movie.title}</h2>
            <button className="buttonRemoveFavorite" onClick={() => { removeFavorite(movie._id, user); setRefresh(!refresh) }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 13H2v-2h21v2z" />
              </svg>
              <span>Retirer des favoris</span>
            </button>
            <button className="buttonShowDetails" onClick={() => handleShowDetails(movie._id)}>
              <span>Voir plus en détail</span>
            </button>
          </div>
        )
      }
    </div >
  );
};

export default MovieCard;
