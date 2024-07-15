import React, { useEffect, useState } from 'react';
import MovieCard from './movieCard';
import { Movie } from './types';
import { Swiper, SwiperSlide } from 'swiper/react';

import '../../node_modules/swiper/swiper-bundle.css';

type MovieByGenreProps = {
    user: { email: string; sessionToken: string };
    refresh: boolean;
    setRefresh: (refresh: boolean) => void;
};

const MovieByGenre: React.FC<MovieByGenreProps> = ({ user, refresh, setRefresh }) => {
    const [moviesByGenre, setMoviesByGenre] = useState<Movie[]>([]);
    const [genre, setGenre] = useState('' as string);

    const genres = ['Animation', 'Short', 'Comedy', 'Drama', 'Western', 'Romance', 'Action', 'Thriller', 'Adventure', 'Fantasy', 'Family', 'Biography', 'History', 'Musical', 'Documentary', 'Horror', 'War', 'Crime', 'Film-No.ir', 'Mystery', 'Sport', 'Sci-Fi', 'Music'];

    const apiBaseUrl = window.location.hostname === 'localhost'
        ? 'http://localhost:4040'
        : 'https://api.valentin-garnier.fr:4040';

    useEffect(() => {
        setGenre(genres[Math.floor(Math.random() * genres.length)]);
    }, []);

    useEffect(() => {
        if (genre) {
            fetch(`${apiBaseUrl}/movies-by-genre/${genre}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => setMoviesByGenre(data.data))
                .catch(error => console.error('Error fetching movies by genre:', error));
        }
    }, [apiBaseUrl, genre]);

    return (
        <div className="bestChoice">
            <h1>Genre : {genre}, les meilleurs !</h1>
            <p>Les meilleurs films dans le genre {genre}</p>
            <Swiper
                slidesPerView={'auto'}
                spaceBetween={10}
                pagination={{ clickable: true }}
                className="movie-container"
            >
                {moviesByGenre.map((movie, index) => (
                    <SwiperSlide key={index}>
                        <MovieCard movie={movie} index={index} isFavorite={false} user={user} refresh={refresh} setRefresh={setRefresh} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );


};

export default MovieByGenre;