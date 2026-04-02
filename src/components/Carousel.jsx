import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const slides = [
  {
    image: "/IMAGES/Happy-Mood.jpg",
    title: "Track Your Happiness",
    subtitle: "Log your best moments and celebrate every win.",
  },
  {
    image: "/IMAGES/Crying-Mood.jpg",
    title: "Acknowledge Your Lows",
    subtitle: "It's okay not to be okay. We're here for you.",
  },
  {
    image: "/IMAGES/Sad-Mood.jpg",
    title: "Understand Your Emotions",
    subtitle: "Gain insights into patterns that affect your mood.",
  },
  {
    image: "/IMAGES/Relaxed-Mood.jpg",
    title: "Find Your Balance",
    subtitle: "Build routines that bring calm and clarity.",
  },
];

const Carousel = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const gotoPrevious = () => {
    setCurrentIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  };

  const gotoNext = () => {
    setCurrentIndex((i) => (i === slides.length - 1 ? 0 : i + 1));
  };

  const isLastSlide = currentIndex === slides.length - 1;
  const { image, title, subtitle } = slides[currentIndex];

  return (
    <div
      className="relative w-full h-screen bg-center bg-cover bg-no-repeat transition-all duration-500"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Slide text — max-width capped and centered on desktop */}
      <div className="absolute top-1/3 left-0 w-full flex justify-center z-10 px-4">
        <div className="w-full max-w-2xl px-4 sm:px-8 text-white">
          <h2 className="text-3xl sm:text-5xl font-bold drop-shadow-lg">{title}</h2>
          <p className="mt-3 text-base sm:text-xl drop-shadow">{subtitle}</p>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-24 left-0 w-full flex justify-center gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === currentIndex ? 'bg-white scale-125' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Nav buttons — also max-width capped to match text column on desktop */}
      <div className="absolute bottom-10 left-0 w-full flex justify-center z-10 px-4">
        <div className="w-full max-w-2xl flex justify-between">
          <button
            onClick={gotoPrevious}
            className="px-5 py-2.5 bg-black/50 text-white rounded-full hover:bg-black/75 transition-colors font-medium"
          >
            Previous
          </button>

          {isLastSlide ? (
            <button
              onClick={() => navigate('/signin')}
              className="px-7 py-2.5 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors"
            >
              Get Started
            </button>
          ) : (
            <button
              onClick={gotoNext}
              className="px-5 py-2.5 bg-black/50 text-white rounded-full hover:bg-black/75 transition-colors font-medium"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
