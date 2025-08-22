import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

const HeroSlider = ({ mediaItems = [] }) => {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || mediaItems.length === 0) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % mediaItems.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [current, isPlaying, mediaItems.length]);

  const goTo = (index) => {
    setCurrent(index);
  };

  const next = () => {
    setCurrent((prev) => (prev + 1) % mediaItems.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  if (mediaItems.length === 0) {
    return (
      <div className="w-full h-screen pt-20 bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">No media items to display</p>
      </div>
    );
  }

  return (
    <section className="relative w-full overflow-hidden" style={{ height: 'calc(100vh - 80px)' }}>
      {/* Media Items */}
      {mediaItems.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {item.type === 'image' ? (
            <img
              src={item.src}
              alt={item.alt || `Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              src={item.src}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          )}
          
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* Hero Content - Only on first slide */}
      {current === 0 && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center text-white px-6 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Believe in Best Builds <span className="text-primary-400">BOLD</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              B4Brothers - Premier Construction Excellence
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Get Free Quote
              </a>
              <a
                href="tel:+919733221114"
                className="border-2 border-white text-white hover:bg-white hover:text-black font-semibold py-4 px-8 rounded-lg transition-all duration-300"
              >
                Call Now: +91 97332 21114
              </a>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                <span>Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                <span>5+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                <span>40+ Projects Completed</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Simple overlay text for other slides */}
      {current !== 0 && mediaItems[current]?.overlayText && (
        <div className="absolute bottom-8 left-8 z-20">
          <h2 className="text-white text-2xl md:text-3xl font-bold">
            {mediaItems[current].overlayText}
          </h2>
        </div>
      )}

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="w-5 h-5" />
      </button>
      
      <button
        onClick={next}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300"
        aria-label="Next slide"
      >
        <FaChevronRight className="w-5 h-5" />
      </button>

      {/* Play/Pause button */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute top-4 right-4 z-30 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300"
        aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
      >
        {isPlaying ? '⏸️' : '▶️'}
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
        {mediaItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current
                ? 'bg-primary-500 scale-125'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20 z-30">
        <div 
          className="h-full bg-primary-500 transition-all duration-300"
          style={{ width: `${((current + 1) / mediaItems.length) * 100}%` }}
        />
      </div>
    </section>
  );
};

export default HeroSlider;
