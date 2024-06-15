import React from 'react';
import Slider from 'react-slick';
import ActorImage from './actorsImage';
import '../css/ActorCarousel.css';

interface ActorCarouselProps {
  cast: string[];
}

const ActorCarousel: React.FC<ActorCarouselProps> = ({ cast }) => {
  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0
  };

  return (
    <div className="actor-carousel">
      <Slider {...settings}>
        {cast.map((actor, index) => (
          <div key={index} className="actor-slide">
            <ActorImage actorName={actor} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ActorCarousel;
