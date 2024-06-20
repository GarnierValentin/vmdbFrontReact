import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import ActorImage from './actorsImage';
import '../css/ActorCarousel.css';

interface ActorCarouselProps {
  cast: string[];
}

const ActorCarousel: React.FC<ActorCarouselProps> = ({ cast }) => {

  const [actorCast, setActorCast] = useState<string[]>([]);

  useEffect(() => {
    setActorCast(cast);
  });
  
  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0
  };

  return (
    <div className="actor-carousel">
      {cast.length >= 3 ? (
        <Slider {...settings}>
          {actorCast.map((actor, index) => (
            <div key={index} className="actor-slide">
              <ActorImage actorName={actor} />
            </div>
          ))}
        </Slider>
      ) : (
        actorCast.map((actor, index) => (
          <div key={index} className="actor-slide">
            <ActorImage actorName={actor} />
          </div>
        ))
      )}
    </div>
  );
};

export default ActorCarousel;