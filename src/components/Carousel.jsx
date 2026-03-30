import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Carousel = () => {

  const navigate = useNavigate(); 

  const images = [
    "/IMAGES/Happy-Mood.jpg",
    "/IMAGES/Crying-Mood.jpg",
    "/IMAGES/Sad-Mood.jpg",
    "/IMAGES/Relaxed-Mood.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const gotoPrevious = () => {
    setCurrentIndex((currentIndex) => (currentIndex === 0 ? images.length - 1 : currentIndex - 1));
  };

  const gotoNext = () => {
    setCurrentIndex((currentIndex) => (currentIndex === images.length - 1 ? 0 : currentIndex + 1));
  };

  // Check if we are on the very last slide
  const isLastSlide = currentIndex === images.length - 1;

  return (
    <div 
      className="relative w-full h-screen bg-center bg-cover bg-no-repeat transition-all duration-500" 
      style={{ backgroundImage: `url(${images[currentIndex]})` }}
    >
      <div className="absolute bottom-10 left-0 w-full px-4 sm:px-12 flex justify-between">
        
        <button 
          onClick={gotoPrevious}
          className="px-4 py-2 bg-black/50 text-white rounded-md hover:bg-black/75 transition-colors"
        >
          Previous
        </button>

        {isLastSlide ? (
          <button 
            onClick={() => navigate('/signin')} // This will now work perfectly!
            className="px-6 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors"
          >
            Get Started
          </button>
        ) : (
          <button 
            onClick={gotoNext}
            className="px-4 py-2 bg-black/50 text-white rounded-md hover:bg-black/75 transition-colors"
          >
            Next
          </button>
        )}

      </div>
    </div>
  );
};

export default Carousel;