import React, { useEffect, useState } from 'react';
import defaultImageUrl from'../images/imageDefault.png';

const ActorImage: React.FC<{ actorName: string }> = ({ actorName }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFound, setImageFound] = useState(true);

  useEffect(() => {
    const fetchActorImage = async () => {
      try {
        const apiKey = '';
        const cseId = '';
        // const apiKey = 'AIzaSyDpN8j4ONRKY12LFC-ksN-SiiMinSG2Okw';
        // const cseId = '5781fbbcf03ef4faa';
        const query = actorName;
        
        const response = await fetch(
          `https://www.googleapis.com/customsearch/v1?searchType=image&num=1&key=${apiKey}&cx=${cseId}&q=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Google Custom Search API response:', data);

        if (data.items && data.items.length > 0) {
          const imageUrl = data.items[0].link;
          setImageUrl(imageUrl);
        } else {
          console.log('No image found for:', actorName);
          setImageFound(false);
        }
      } catch (error) {
        console.error('Error fetching the actor image:', error);
      }
    };
    fetchActorImage();
  }, [actorName]);

  const displayImageUrl = imageUrl ? imageUrl : defaultImageUrl;

  return (
    <div className="actor-container">
      {imageFound ? (
        <img src={displayImageUrl} alt={actorName}/>
      ) : (
        <img src={defaultImageUrl} alt="Default"/>
      )}
      <span>{actorName}</span>
    </div>
  );
};

export default ActorImage;
