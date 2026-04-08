import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const slides = [
  { image: "/IMAGES/Happy-Mood.jpg", title: "Track Your Happiness", subtitle: "Log your best moments and celebrate every win." },
  { image: "/IMAGES/Crying-Mood.jpg", title: "Acknowledge Your Lows", subtitle: "It's okay not to be okay. We're here for you." },
  { image: "/IMAGES/Sad-Mood.jpg", title: "Understand Your Emotions", subtitle: "Gain insights into patterns that affect your mood." },
  { image: "/IMAGES/Relaxed-Mood.jpg", title: "Find Your Balance", subtitle: "Build routines that bring calm and clarity." },
];

const Carousel = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const touchStartX = useRef(null);
  const MIN_SWIPE = 50;
  const autoRef = useRef(null);

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Auto-advance every 4 seconds
  const startAuto = () => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setCurrentIndex((i) => (i === slides.length - 1 ? 0 : i + 1));
    }, 4000);
  };

  useEffect(() => {
    startAuto();
    return () => clearInterval(autoRef.current);
  }, []);

  const gotoNext = () => {
    setCurrentIndex((i) => (i === slides.length - 1 ? 0 : i + 1));
    startAuto();
  };

  const gotoPrev = () => {
    setCurrentIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
    startAuto();
  };

  // Mobile swipe
  const handleTouchStart = (e) => { touchStartX.current = e.changedTouches[0].clientX; };
  const handleTouchEnd = (e) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) >= MIN_SWIPE) { delta > 0 ? gotoNext() : gotoPrev(); }
  };

  const isLastSlide = currentIndex === slides.length - 1;
  const { image, title, subtitle } = slides[currentIndex];

  return (
    <div
      className="relative w-full h-screen bg-center bg-cover bg-no-repeat transition-all duration-700 select-none"
      style={{ backgroundImage: `url(${image})` }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35 pointer-events-none" />

      {/* Slide text */}
      <div className="absolute top-1/3 left-0 w-full flex justify-center z-10 px-4 pointer-events-none">
        <div className="w-full max-w-2xl px-4 sm:px-8 text-white">
          <h2 className="text-3xl sm:text-5xl font-bold drop-shadow-lg">{title}</h2>
          <p className="mt-3 text-base sm:text-xl drop-shadow">{subtitle}</p>
          {/* Mobile hint on first slide only */}
          {currentIndex === 0 && (
            <p className="mt-6 text-white/60 text-sm sm:hidden">Swipe to explore →</p>
          )}
        </div>
      </div>

      {/* Dot indicators — both mobile & desktop */}
      <div className="absolute bottom-24 left-0 w-full flex justify-center gap-3 z-10 pointer-events-none">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`block rounded-full transition-all duration-400 ${
              i === currentIndex
                ? 'w-6 h-2.5 bg-white'          // active: pill shape
                : 'w-2.5 h-2.5 bg-white/45'     // inactive: small circle
            }`}
          />
        ))}
      </div>

      {/* Desktop: Prev / Next arrow buttons */}
      {isDesktop && (
        <>
          <button
            onClick={gotoPrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-black/65 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <FiChevronLeft size={26} />
          </button>
          <button
            onClick={gotoNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-black/65 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 backdrop-blur-sm"
            aria-label="Next slide"
          >
            <FiChevronRight size={26} />
          </button>
        </>
      )}

      {/* Get Started button on last slide */}
      {isLastSlide ? (
        <div className="absolute bottom-8 left-0 w-full flex justify-center z-20 px-4">
          <button
            onClick={() => navigate('/signin')}
            className="px-10 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors shadow-lg text-lg"
          >
            Get Started
          </button>
        </div>
      ) : (
        /* Desktop: subtle "click next" hint */
        isDesktop && (
          <div className="absolute bottom-8 left-0 w-full flex justify-center z-10 pointer-events-none">
            <p className="text-white/50 text-sm">Use arrows or wait for auto-advance</p>
          </div>
        )
      )}
    </div>
  );
};

export default Carousel;
