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
        slidesToShow: 6,
        slidesToScroll: 1,
        initialSlide: 0, 
        centerMode: false,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 3,
                infinite: true,
                initialSlide: 0, 
                centerMode: false,
                dots: true
              }
            },
            {
              breakpoint: 900,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 3,
                infinite: true,
                initialSlide: 0, 
                centerMode: false,
                dots: true
              }
            },
            {
              breakpoint: 700,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                initialSlide: 0, 
                centerMode: false,
                dots: true
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                initialSlide: 0, 
                centerMode: false,
                dots: true
              }
            }
        ]
    };    

    return (
        <div className="bestChoice">
            <h1>Meilleurs choix</h1>
            <p>Séries et films rien que pour vous</p>
            <div className="slider-container">
                <Slider {...settings}>
                    {topRatedMovies.map((movie, index) => (
                        <div key={index}>
                            <MovieCard movie={movie} index={index}/>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default BestChoice;
