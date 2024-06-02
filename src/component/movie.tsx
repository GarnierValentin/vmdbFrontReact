import React from 'react';

interface Movie {
  _id: string;
  plot: string;
  genres: string[];
  runtime: number;
  cast: string[];
  num_mflix_comments: number;
  poster: string;
  title: string;
  fullplot: string;
  countries: string[];
  released: string;
  directors: string[];
  writers: string[];
  awards: {
    wins: number;
    nominations: number;
    text: string;
  };
  lastupdated: string;
  year: number;
  imdb: {
    rating: number;
    votes: number;
    id: number;
  };
  type: string;
  tomatoes: {
    viewer: {
      rating: number;
      numReviews: number;
    };
    lastUpdated: string;
  };
}

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
      <h2>{movie.title}</h2>
      <p>{movie.plot}</p>
      {/* Add more movie details as needed */}
    </div>
  );
};

export default MovieCard;