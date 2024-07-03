import React, { useState } from 'react';
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

const MovieCard: React.FC<MovieProps> = ({ movie, index, user, isFavorite, refresh, setRefresh }) => {

  if (!movie) {
    return null;
  }
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
            <button>
              
            </button>
          </div>
          <h2>{index + 1} - {movie.title}</h2>
          <button className="buttonAddFavorite" onClick={() => { addFavorite(movie._id, user); setRefresh(!refresh) }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="svgAddFavorite" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"></path>
            </svg>
            <span>Ajouter aux favoris</span>
          </button>
          <Link to={`/movie/${movie._id}`}>
            <button className="buttonShowDetails">
              <span>Voir plus en détail</span>
            </button>
          </Link>
        </>
      )}
      {isFavorite && (
        <div>
          <h2>{index + 1} - {movie.title}</h2>
          <button className="buttonRemoveFavorite" onClick={() => { removeFavorite(movie._id, user); setRefresh(!refresh) }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23 13H2v-2h21v2z" />
            </svg>
            <span>Retirer des favoris</span>
          </button>
          <Link to={`/movie/${movie._id}`}>
            <button className="buttonShowDetails">
              <span>Voir plus en détail</span>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
