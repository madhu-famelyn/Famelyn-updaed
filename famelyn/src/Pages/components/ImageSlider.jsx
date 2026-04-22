import React, { useState, useEffect } from 'react';
import IMG1 from '../../assets/IMG_1.JPG.jpeg';
import IMG2 from '../../assets/IMG_2.JPG.jpeg';
import IMG3 from '../../assets/IMG_3.JPG.jpeg';
import IMG4 from '../../assets/IMG_4.JPG.jpeg';
import IMG5 from '../../assets/IMG_5.JPG.jpeg';
import './ImageSlider.css';

export default function ImageSlider() {
  const images = [IMG1, IMG2, IMG3, IMG4, IMG5];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2500); // 2.5 seconds per image

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="image-slider-container">
      <div className="slider-wrapper">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className={`slider-image ${index === currentIndex ? 'active' : ''}`}
          />
        ))}
      </div>

      {/* Image indicators */}
      <div className="slider-indicators">
        {images.map((_, index) => (
          <div
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}
