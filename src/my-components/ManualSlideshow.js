import React, { useState } from 'react';

function ManualSlideshow({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div id="manualCarousel" className="carousel slide">
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#manualCarousel"
            data-bs-slide-to={index}
            className={index === currentIndex ? 'active' : ''}
            aria-current={index === currentIndex ? 'true' : 'false'}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div key={index} className={`carousel-item ${index === currentIndex ? 'active' : ''}`}>
            <img src={image.src} className="d-block w-100 img-fluid" alt={`Slide ${index + 1}`} />
            <h6 className="text-center bg-dark-subtle mb-0 py-1">{image.caption}</h6>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#manualCarousel" data-bs-slide="prev" onClick={goToPrevious}>
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#manualCarousel" data-bs-slide="next" onClick={goToNext}>
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default ManualSlideshow;
