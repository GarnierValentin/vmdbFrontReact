import React, { useEffect, useState } from 'react';
import MovieCard from './movieCard';
import { Movie } from './types';
import { Swiper, SwiperSlide } from 'swiper/react';

import '../../node_modules/swiper/swiper-bundle.css';
import '../css/FavoriteMovie.css';

type FavoriteMovieProps = {
    user: { email: string; sessionToken: string };
    refresh: boolean;
    setRefresh: (refresh: boolean) => void;

};

const FavoriteMovie: React.FC<FavoriteMovieProps> = ({ user, refresh, setRefresh }) => {
    const [favoriteMoviesId, setFavoriteMoviesId] = useState<string[]>([]);
    const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [fakeMovieCount, setFakeMovieCount] = useState<number>(10);

    const apiBaseUrl = window.location.hostname === 'localhost'
        ? 'http://localhost:4040'
        : 'https://api.valentin-garnier.fr:4040';

    const updateFakeMovieCount = () => {
        const cardWidth = 195;
        const width = window.innerWidth;
        const count = Math.floor(width / cardWidth);
        setFakeMovieCount(count);
    };

    useEffect(() => {
        updateFakeMovieCount();
        window.addEventListener('resize', updateFakeMovieCount);
        return () => {
            window.removeEventListener('resize', updateFakeMovieCount);
        };
    }, []);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch(`${apiBaseUrl}/favorites?email=${user.email}&sessionToken=${user.sessionToken}`);
                const data = await response.json();
                setFavoriteMoviesId(data.data || []);
            } catch (error) {
                console.error('Error fetching favorite movies:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFavorites();
    }, [user, refresh]);

    useEffect(() => {
        const fetchFavoriteMovies = async () => {
            try {
                const promises = favoriteMoviesId.map(async (id) => {
                    const response = await fetch(`${apiBaseUrl}/movie/${id}`);
                    const data = await response.json();
                    return data.data;
                });
                const movies = await Promise.all(promises);
                setFavoriteMovies(movies);
                
            } catch (error) {
                console.error('Error fetching favorite movies:', error);
            }
        };
        fetchFavoriteMovies();
    }, [favoriteMoviesId]);

    return (
        <div className="favorite-movie">
            <h1>Film favoris</h1>
            <p>Vos films favoris</p>
            {loading ? (
                <div className="fakemovie-container">
                    {Array.from({ length: fakeMovieCount }).map((_, index) => (
                        <div className="fakemovie-card" key={index}>
                            <div className="fakemovie-card-img"></div>
                            <div className="fakemovie-card-title"></div>
                            <div className="fakemovie-card-button"></div>
                        </div>
                    ))}
                </div>
            ) : favoriteMoviesId.length === 0 ? (
                <div className="empty-container">
                    <div className="empty-card">
                        <div className="empty-card-top">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 563.55 585.78">
                                <defs>
                                    <linearGradient id="a">
                                        <stop offset="0" stopColor="#939393" />
                                        <stop offset="1" stopColor="#d9d9d9" />
                                    </linearGradient>
                                    <linearGradient id="b">
                                        <stop offset="0" stopColor="#fdfdfd" />
                                        <stop offset=".5" stopColor="#e8e8e8" />
                                        <stop offset="1" stopColor="#d4d4d4" />
                                    </linearGradient>
                                </defs>
                                <g transform="translate(645.40 691.11)">
                                    <rect width="543" height="90.28" x="-491.13" y="-702.03" fill="url(#b)" rx="15.48" ry="14.86" transform="rotate(-12.26)" />
                                    <rect width="517.84" height="372.31" x="-610.70" y="-480.14" fill="#1b1b1b" stroke="#3b3b3b" strokeWidth="5.01" rx="15.52" ry="15.20" />
                                    <rect width="540.49" height="80.58" x="80.99" y="-493.63" fill="#e0e0e0" rx="15.52" ry="14.15" transform="scale(-1,1)" />
                                    <path fillRule="evenodd" d="m-155.87-494.07 52.78 88.75-66.31-2.39-51.88-84.51 65.41-1.84zm-127.28.37 50.67 87.26-65.86-.27-50.22-85.17 65.41-1.82zm-133.39 2.89 50.44 84.34-65.86-.26-49.99-82.30 65.41-1.79z" />
                                    <path d="M-576.94-484.75c-2.53 2.84-4.15 6.19-4.12 10.36v43.83l15.85 24.64 65.33-.45-50.16-78.38-26.92.00z" />
                                    <path fillRule="evenodd" d="m-546.72-595.66-32.98 91.39 64.01-17.88 32.98-87.42-64.01 13.91zm126.08-28.24-35.88 99.65 64.01-16.27 35.88-97.62-64.01 14.24zm130.93-30.85-34.92 101.53 64.01-16.24 34.92-99.50-64.01 14.21z" />
                                    <path d="M-119.42-689.56c3.31 2.35 5.79 5.47 6.76 9.87l9.53 39.83-15.59 41.91-73.83 18.47 33.95-101.01 39.17-9.07z" />
                                    <rect width="540.49" height="84.45" x="81.02" y="-494.97" fill="none" stroke="#2b2b2b" strokeWidth="4.95" rx="15.52" ry="14.83" transform="scale(-1,1)" />
                                    <rect width="543" height="90.28" x="-493.19" y="-700.42" fill="none" stroke="#2e2e2e" strokeWidth="4.95" rx="15.48" ry="14.86" transform="rotate(-12.26)" />
                                    <path fill="url(#a)" fillRule="evenodd" stroke="#1b1b1b" strokeWidth="3.61" d="M-595.70-553.85v101.01c0 6.02 5.33 11.58 11.64 12.05h107.17c11.73 0 17.30-16.37 8.24-25.02l-84.38-94.53c-13.09-18.07-42.67-9.27-42.67 6.49z" />
                                </g>
                            </svg>

                        </div>
                        <div className="empty-card-bottom">Liste de favoris vide</div>
                    </div>
                </div>
            ) : (
                favoriteMovies.length > 0 &&
                <Swiper
                    slidesPerView={'auto'}
                    spaceBetween={10}
                    pagination={{ clickable: true }}
                    className="movie-container"
                >
                    {favoriteMovies.map((movie, index) => (
                        <SwiperSlide key={index}>
                            <MovieCard movie={movie} index={index} user={user} refresh={refresh} setRefresh={setRefresh} isFavorite={true} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )
            }
        </div>
    )
};

export default FavoriteMovie;
