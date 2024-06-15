import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Movie } from './types';
import Modal from 'react-modal';
import YouTube from 'react-youtube';
import ActorImage from './actorsImage';
import ActorCarousel from './actorsCarousel';

import '../css/movieDetails.css';

const YOUTUBE_API_KEY = 'AIzaSyDpN8j4ONRKY12LFC-ksN-SiiMinSG2Okw'; 

Modal.setAppElement('#root');

const MovieDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [youtubeVideoId, setYoutubeVideoId] = useState<string | null>(null);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    useEffect(() => {
        fetch(`http://localhost:4040/movie/${id}`)
            .then(response => response.json())
            .then(data => setMovie(data.data))
            .catch(error => console.error(error));
    }, [id]);

    const searchTrailer = (movieTitle: string) => {
        fetch(`https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&q=${encodeURIComponent(`${movieTitle} bande annonce VO`)}&part=snippet&type=video&maxResults=1`)
            .then(response => response.json())
            .then(data => {
                if (data.items.length > 0) {
                    const videoId = data.items[0].id.videoId;
                    setYoutubeVideoId(videoId);
                    openModal();
                } else {
                    console.log('Aucune vidéo trouvée pour cette recherche.');
                }
            })
            .catch(error => console.error('Erreur lors de la recherche de la bande-annonce sur YouTube:', error));
    };

    if (!movie) {
        return <div>Loading...</div>;
    }

    const youtubeOpts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 1,
        },
    };

    return (
        <div>
            <header className="header-container">
                <div className="topImg">
                    <h1>{movie.title}</h1>
                    <span className="detailsHeader">
                        {movie.year} . {movie.countries && movie.countries.length > 0 ? movie.countries[0] : "Non disponible"}
                    </span>
                </div>
                <div className="img-container">
                    <img src={movie.poster} alt={movie.title} />
                    <div className="play-banner" onClick={() => searchTrailer(movie.title)}>
                        <svg className="play-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path d="M2.533 2.53l18.437 10.035-18.437 10.04v-20.075z" />
                        </svg>
                    </div>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Trailer Modal"
                    className="modal"
                    overlayClassName="overlay"
                >
                    <div className="modal-header">
                        <span className="close-icon" onClick={closeModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </span>
                        <span className="close-text" onClick={closeModal}>
                            Fermer
                        </span>
                    </div>
                    {youtubeVideoId && (
                        <div className="video-container">
                            <YouTube videoId={youtubeVideoId} opts={youtubeOpts} />
                        </div>
                    )}
                </Modal>
                <div className="bottomImg">
                    <span className="movieGenre">
                        {movie.genres.map((genre, index) => (
                            <span key={index}>
                                {genre}
                            </span>
                        ))}
                    </span>
                    <span>{movie.plot}</span>
                    <span className="rating">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="svgYellow">
                            <path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path>
                        </svg>
                        {movie.imdb.rating}
                        <span className="afterRating">/10</span>
                    </span>
                    <span className="label">
                        Réalisation
                        <span className="labelItems">{movie.directors && movie.directors.length > 0 ? movie.directors[0] : "Non disponible"}</span>
                    </span>
                    <span className="label">
                        Scénario
                        <span className="labelItems">{movie.writers && movie.writers.length > 0 ? movie.writers.join(' . ') : "Non disponible"}</span>
                    </span>
                </div>
            </header>
            <main>
                <div className="awards">
                    <span className="metacritic-score">
                        Note de metacritic : {movie.metacritic && movie.metacritic > 0 ? movie.metacritic : "Non disponible"}
                    </span>
                    <span className="awards-details">
                        {movie.awards.wins && movie.awards.wins ? movie.awards.wins : "0"} victoires et {movie.awards.nominations && movie.awards.nominations ? movie.awards.nominations : "0"} nominations au total
                    </span>
                </div>
                <div className="mainActors">
                    <h2>Rôles principaux</h2>
                    <ActorCarousel cast={movie.cast} />
                </div>
            </main>
        </div>
    );
};

export default MovieDetails;
