import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BannerSlider = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Change slide every 5 seconds
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="banner-slider">
      {slides.map((slide, index) => (
        <div 
          key={index} 
          className="banner-slide" 
          style={{ 
            opacity: index === currentSlide ? 1 : 0,
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${slide.backgroundImage})`
          }}
        >
          <div className="banner-content">
            <h2>{slide.title}</h2>
            <p>{slide.description}</p>
            <Link to={slide.linkTo} className="btn">
              {slide.buttonText}
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
};

export default BannerSlider;