import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchInput from './searchInput';
import AuthForm from './authForm';
import LogoImage from '../images/imdblogo.png';

import '../css/NavBar.css';

function NavBar({ search, setSearch, fetchMovies, user, handleSetUser }: { search: string, setSearch: (search: string) => void, fetchMovies: () => void, user: { email: string, password: string }, handleSetUser: (email: string, password: string) => void }) {
    const [searchOpen, setSearchOpen] = useState(false);
    const [authOpen, setAuthOpen] = useState(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    const handleOnFocusSearch = () => {
        setSearchOpen(true);
    }

    const handleBlurSearch = () => {
        setSearchOpen(false);
    }

    const handleOnFocusAuth = () => {
        setAuthOpen(true);
    }

    const closeAuthModal = () => {
        setAuthOpen(false);
    }

    useEffect(() => {
        const updateDeviceType = () => {
            setIsMobile(window.innerWidth <= 800);
        }
        updateDeviceType();
        window.addEventListener('resize', updateDeviceType);

        return () => window.removeEventListener('resize', updateDeviceType);
    }, [isMobile]);

    return (
        <>
            <nav className="navbar">
                {!searchOpen &&
                    <div className="navbar">
                        {/* <button className="hamburger">
                        <svg xmlns="http://www.w3.org/2000/svg" className="ipc-icon ipc-icon--menu ipc-responsive-button__icon" viewBox="0 0 24 24" fill="currentColor" role="presentation">
                            <path fill="none" d="M0 0h24v24H0V0z"></path>
                            <path fill="white" d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z"></path>
                        </svg>
                    </button> */}
                        <Link to="/" className="logo">
                            <img src={LogoImage} alt="Logo" />
                        </Link>
                        {isMobile ? (
                            <div className="nav-items-mobile">
                                <button className="search-icon" onClick={handleOnFocusSearch}>
                                    <svg xmlns="http://www.w3.org/2000/svg">
                                        <path fill="none" d="M0 0h24v24H0V0z"></path>
                                        <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                                    </svg>
                                </button>
                            </div>
                        ) : (
                            <div className="nav-items-desktop">
                                <SearchInput handleBlurSearch={handleBlurSearch} />
                                <svg xmlns="http://www.w3.org/2000/svg">
                                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                                    <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                                </svg>
                            </div>
                        )
                        }
                        <button className="login" onClick={handleOnFocusAuth}>Se connecter</button>
                        <button className="useAppli">Utiliser l'appli</button>
                    </div>
                }
                {searchOpen &&
                    <div className="search-container">
                        <SearchInput handleBlurSearch={handleBlurSearch} />
                    </div>}
            </nav>
            {authOpen &&
                <div className="modal-content">
                    <AuthForm isOpen={authOpen} onClose={closeAuthModal} handleSetUser={handleSetUser}/>
                </div>}

        </>
    );
}

export default NavBar;