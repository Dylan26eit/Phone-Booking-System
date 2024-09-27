import React, { useEffect, useState } from 'react';

function AutoSlideshow({ images, interval = 3000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(slideInterval);
  }, [images.length, interval]);

  return (
    <div id="autoCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval={interval} data-bs-pause="false">
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div key={index} className={`carousel-item ${index === currentIndex ? 'active' : ''}`}>
            <img src={image.src} className="d-block w-100 img-fluid" alt={`Slide ${index + 1}`} />
            <h6 className="text-center bg-dark-subtle mb-0 py-1">{image.caption}</h6>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AutoSlideshow;
