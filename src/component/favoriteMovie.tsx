import React, { useEffect, useState } from 'react';
import MovieCard from './movieCard';
import { Movie } from './types';
import { Swiper, SwiperSlide } from 'swiper/react';

import '../../node_modules/swiper/swiper-bundle.css';
import '../css/FavoriteMovie.css';

const FavoriteMovie: React.FC = () => {
    const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const apiBaseUrl = window.location.hostname === 'localhost'
        ? 'http://localhost:4040'
        : 'https://api.valentin-garnier.fr:4040';

    useEffect(() => {
        fetch(`${apiBaseUrl}/favorite`)
            .then(response => response.json())
            .then(data => {
                setFavoriteMovies(data.data);
                setLoading(false);
            });
    }, [apiBaseUrl]);

    return (
        <div className="favorite-movie">
            <h1>Film favoris</h1>
            <p>Vos films favoris</p>
                {loading ? (
                    <div className="fakemovie-card">
                    
                  </div>
                ) : favoriteMovies.length === 0 ? (
                    <div className="empty-placeholder">
                        Aucun film favori pour le moment. Ajoutez vos films préférés ici!
                    </div>
                ) : (
                    <Swiper
                        slidesPerView={'auto'}
                        spaceBetween={20}
                        pagination={{ clickable: true }}
                        className="movie-container"
                    >
                        {favoriteMovies.map((movie, index) => (
                            <SwiperSlide key={index}>
                                <MovieCard movie={movie} index={index} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
        </div>
    )
};

export default FavoriteMovie;