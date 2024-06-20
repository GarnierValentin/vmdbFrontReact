import React, { useState, useEffect } from 'react';

const SearchInput: React.FC = () => {
    const [search, setSearch] = useState('');
    const [movieData, setMovieData] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            if (search) {
                const response = await fetch(`/movie/${encodeURIComponent(search)}`);
                const data = await response.json();
                setMovieData(data);
                console.log(data);
                
            }
        };

        fetchMovie();
    }, [search]);

    return (
        <div>
            <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Rechercher dans VMDb"
            />
            {/* {movieData && <div>{JSON.stringify(movieData)}</div>} Affichez les données */}
        </div>
    );
};

export default SearchInput;