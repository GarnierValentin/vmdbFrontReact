import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import MovieCard from './movie';
import { Movie } from './types';

import '../css/BestChoice.css'

const BestChoice: React.FC = () => {
    const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);

    useEffect(() => {
        fetch('http://localhost:4040/top-rated')
            .then(response => response.json())
            .then(data => setTopRatedMovies(data.data));
    }, []);

    return (
        <div className="bestChoice">
            <h1>Meilleurs choix</h1>
            <p>Séries et films rien que pour vous</p>
            <div className="carousel-wrapper">
                <Carousel infiniteLoop showThumbs={false} 
                        showStatus={false}
                        centerMode={true}
                        centerSlidePercentage={33.33}
                        className="custom-carousel">
                    {topRatedMovies.map((movie, index) => (
                        <div key={index}>
                            <MovieCard movie={movie} />
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default BestChoice;
