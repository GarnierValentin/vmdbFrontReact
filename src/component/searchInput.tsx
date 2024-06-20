import React, { useState, useEffect } from 'react';
import { Movie } from './types';


type SearchInputProps = {
  handleBlurSearch: () => void;
};

const SearchInput: React.FC<SearchInputProps> = ({ handleBlurSearch }) => {
    const [search, setSearch] = useState('');
    const [movieData, setMovieData] = useState<Movie[]>([]);
    const [typingTimeout, setTypingTimeout] = useState(0);
    const [listOpen, setListOpen] = useState(false);

    const handleOnFocus = () => {
        setListOpen(true);
    };

    const handleBlur = () => {
        setListOpen(false);
        handleBlurSearch();
    };

    useEffect(() => {
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        setTypingTimeout(window.setTimeout(() => {
            if (search) {
                handleType();
            }
        }, 1000));
        document.getElementById('inputSearch')?.focus();
    }, [search])

    const handleType = async () => {
        const response = await fetch(`http://localhost:4040/movie/?title=${encodeURIComponent(search.trim())}`);
        const data = await response.json();
        setMovieData(data.data);
        console.log(data, search);
    }



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

            {listOpen && <ul>
                {movieData.map((movie, index) => (
                    <li key={index}>
                        <h2>{movie.title}</h2>
                        <p>Année : {movie.year}</p>
                        <p>Acteurs principaux : {movie.cast}</p>
                    </li>
                ))}
            </ul>}
        </div>
    );
};

export default SearchInput;