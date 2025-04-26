import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CityBackground = ({ cityName, darkMode, children,CurrentCondition }) => {
  const [backgroundUrl, setBackgroundUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      if (!cityName|| !CurrentCondition) return;
      
      //console.log('Fetching image for:', cityName); // Debug log
      setIsLoading(true);
      
      try {
        const response = await axios.get(`/api/background`, {          params: { city: cityName,Forecast: CurrentCondition },
        });

        //console.log('API Response:', response.data); // Debug log

        if (response.data && response.data.image_url) {
          // Pre-load image
          const img = new Image();
          img.onload = () => {
            console.log('Image loaded successfully'); // Debug log
            setBackgroundUrl(response.data.image_url);
            setIsLoading(false);
          };
          img.onerror = (e) => {
            console.error('Error loading image:', e); // Debug log
            setBackgroundUrl(`https://source.unsplash.com/1600x900/?${cityName},city`);
            setIsLoading(false);
          };
          img.src = response.data.image_url;
        }
      } catch (error) {
        console.error('Error fetching background image:', error);
        setBackgroundUrl(`https://source.unsplash.com/1600x900/?${cityName},city`);
        setIsLoading(false);
      }
    };
  
    fetchBackgroundImage();
    
    // Cleanup function
    return () => {
      setBackgroundUrl('');
      setIsLoading(true);
    };
  }, [cityName, CurrentCondition]);
  
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '200px',
        width: '100%',
        overflow: 'hidden',
        borderRadius: 8,
        backgroundColor: darkMode ? '#202020' : '#F3F2F1', // Fallback color
      }}
    >
      {backgroundUrl && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${backgroundUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: darkMode ? 'brightness(0.7)' : 'brightness(0.9)',
            opacity: isLoading ? 0 : 1,
            transition: 'all 0.3s ease'
          }}
        />
      )}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          backgroundColor: darkMode ? 
            'rgba(32, 32, 32, 0.75)' : 
            'rgba(243, 242, 241, 0.75)',
          height: '100%',
          borderRadius: 8,
          padding: 20,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default CityBackground;