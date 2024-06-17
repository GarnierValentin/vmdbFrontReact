import React, { useState } from 'react';

const SearchInput: React.FC = () => {
    const [search, setSearch] = useState('');

    const handleKeyDown = async (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            const response = await fetch(`/movie/${search}`);
            const data = await response.json();
        }
    };

    return (
        <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Rechercher dans VMDb"
        />
    );
};

export default SearchInput;