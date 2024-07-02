import React, { useEffect, useState } from 'react';
import MovieCard from './movieCard';
import { Movie } from './types';
import { Swiper, SwiperSlide } from 'swiper/react';

import '../../node_modules/swiper/swiper-bundle.css';
import '../css/BestChoice.css';

const BestChoice: React.FC = () => {
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);

  const apiBaseUrl = window.location.hostname === 'localhost'
    ? 'http://localhost:4040'
    : 'https://api.valentin-garnier.fr:4040';

  useEffect(() => {
    fetch(`${apiBaseUrl}/top-rated`)
      .then(response => response.json())
      .then(data => setTopRatedMovies(data.data));
  }, [apiBaseUrl]);

  return (
    <div className="bestChoice">
      <h1>Meilleurs choix</h1>
      <p>Séries et films rien que pour vous</p>
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={10}
          pagination={{ clickable: true }}
          className="movie-container"
        >
          {topRatedMovies.map((movie, index) => (
            <SwiperSlide key={index}>
              <MovieCard movie={movie} index={index} isFavorite={false} />
            </SwiperSlide>
          ))}
        </Swiper>
    </div>
  );
};

export default BestChoice;
