import React, { useEffect, useState } from 'react';
import MovieCard from './movie';
import { Movie } from './types';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/BestChoice.css';

const BestChoice: React.FC = () => {
    const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);

    useEffect(() => {
        fetch('http://localhost:4040/top-rated')
            .then(response => response.json())
            .then(data => setTopRatedMovies(data.data));
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    return (
        <div className="bestChoice">
            <h1>Meilleurs choix</h1>
            <p>Séries et films rien que pour vous</p>
            <div className="slider-container">
                <Slider {...settings}>
                    {topRatedMovies.map((movie, index) => (
                        <div key={index}>
                            <MovieCard movie={movie} />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default BestChoice;
