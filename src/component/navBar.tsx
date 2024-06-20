import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import SearchInput from './searchInput';

import '../css/NavBar.css';

function NavBar({ search, setSearch, fetchMovies }: { search: string, setSearch: (search: string) => void, fetchMovies: () => void }) {
    const [searchOpen, setSearchOpen] = useState(false);

    const handleOnFocus = () => {
        setSearchOpen(true);
    }

    const handleBlurSearch = () => {
        setSearchOpen(false);
    }

    return (
        <nav className="navbar">
            {!searchOpen &&
                <div className="navbar">
                    <button className="hamburger">
                        <svg xmlns="http://www.w3.org/2000/svg" className="ipc-icon ipc-icon--menu ipc-responsive-button__icon" viewBox="0 0 24 24" fill="currentColor" role="presentation">
                            <path fill="none" d="M0 0h24v24H0V0z"></path>
                            <path fill="white" d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z"></path>
                        </svg>
                    </button>
                    <Link to="/" className="logo">
                        <img src="/imdblogo.png" alt="Logo" />
                    </Link>
                    <div className="nav-items">
                        <button className="search-icon" onClick={handleOnFocus}>
                            <svg xmlns="http://www.w3.org/2000/svg">
                                <path fill="none" d="M0 0h24v24H0V0z"></path>
                                <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                            </svg>
                        </button>
                    </div>
                    <button className="login">Se connecter</button>
                    <button className="useAppli">Utiliser l'appli</button>
                </div>
            }
            {searchOpen && <div className="modal-content">
                <SearchInput handleBlurSearch={handleBlurSearch} />
            </div>}
        </nav>
    );
}

export default NavBar;