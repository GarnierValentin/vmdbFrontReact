import React from 'react';
import { Movie } from './types';

interface MovieProps {
  movie: Movie | null;
}

const MovieCard: React.FC<MovieProps> = ({ movie }) => {
  if (!movie) {
    return null;
  }
  console.log(movie, 'movie');
  return (
    <div>
      <img src={movie.poster || 'default_image_url'} alt={movie.title || 'default alt text'} />
      <p>{movie.imdb.rating}</p>
      <h2>{movie.title}</h2>
    </div>
  );
};

export default MovieCard;
