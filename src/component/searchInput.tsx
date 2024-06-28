import React, { useState, useEffect, useCallback, useRef } from 'react';
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
    const inputRef = useRef<HTMLInputElement>(null);

    const apiBaseUrl = window.location.hostname === 'localhost'
        ? 'http://localhost:4040'
        : 'https://api.valentin-garnier.fr:4040';

    const handleOnFocus = () => {
        setListOpen(true);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setListOpen(false);
            handleBlurSearch();
        }, 100);
    };

    const handleType = useCallback(async (input: string) => {
        try {
            const response = await fetch(`${apiBaseUrl}/movie/?title=${encodeURIComponent(input.trim())}`);
            const data = await response.json();
            setMovieData(data.data);
        } catch (error) {
            console.error('Error fetching movie data:', error);
        }
    }, [apiBaseUrl]);

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

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

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
                ref={inputRef}
                autoComplete='off'
                spellCheck='false'
            />

            {listOpen && (
                <ul>
                    {movieData.map((movie, index) => (
                        <Link to={`/movie/${movie._id}`} key={index}>
                            <li className="searched-movie">
                                <img
                                    src={movie.poster ? movie.poster : pictureNotFound}
                                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = pictureNotFound;
                                    }}
                                    alt={movie.title}
                                />
                                <div className="movie-details">
                                    <h2>{movie.title}</h2>
                                    <p>Année : {movie.year}</p>
                                    <p>Acteurs principaux : {movie.cast ? movie.cast.join(', ') : 'Information non disponible'}</p>
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
