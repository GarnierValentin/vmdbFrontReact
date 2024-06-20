import React, { useState, useEffect, useCallback } from 'react';
import { Movie } from './types';
import { Link } from 'react-router-dom';

import '../css/SearchInput.css';
import pictureNotFound from '../images/pictureNotFound.jpg';

type SearchInputProps = {
    handleBlurSearch: () => void;
};

const SearchInput: React.FC<SearchInputProps> = ({ handleBlurSearch }) => {
    const [search, setSearch] = useState('');
    const [movieData, setMovieData] = useState<Movie[]>([]);
    const [listOpen, setListOpen] = useState(false);

    const handleOnFocus = () => {
        setListOpen(true);
    };

    const handleBlur = () => {
        setListOpen(false);
        handleBlurSearch();
    };

    const handleType = useCallback(async (input: string) => {
        try {
            const response = await fetch(`http://localhost:4040/movie/?title=${encodeURIComponent(input.trim())}`);
            const data = await response.json();
            setMovieData(data.data);
        } catch (error) {
            console.error('Error fetching movie data:', error);
        }
    }, []);

    useEffect(() => {
        if (search.trim()) {
            handleType(search);
        } else {
            setMovieData([]);
        }
    }, [search, handleType]);

    useEffect(() => {
        console.log('Movie data:', movieData);
    }, [movieData]);

    return (
        <div>
            <input
                type="text"
                value={search}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)}
                placeholder="Rechercher dans VMDb"
                onFocus={handleOnFocus}
                onBlur={handleBlur}
                id="inputSearch"
            />

            {listOpen && (
                <ul>
                    {movieData.map((movie, index) => (
                        <Link to={`/movie/${movie._id}`} key={index}>
                            <li className="searched-movie">
                                <img
                                    src={movie.poster ? movie.poster : pictureNotFound}
                                    alt={movie.title}
                                />
                                <div className="movie-details">
                                    <h2>{movie.title}</h2>
                                    <p>Année : {movie.year}</p>
                                    <p>Acteurs principaux : {movie.cast.join(', ')}</p>
                                </div>
                            </li>
                        </Link>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchInput;
