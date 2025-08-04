import { useState, useEffect, useCallback } from "react";
import LazyImage from "./LazyImage";

const Carousel = ({ mediaItems = [], autoPlay = true }) => {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const total = mediaItems.length;

  const goTo = useCallback((index) => {
    setCurrent((index + total) % total);
  }, [total]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        prev();
      } else if (event.key === 'ArrowRight') {
        next();
      } else if (event.key === ' ') {
        event.preventDefault();
        setIsPlaying(!isPlaying);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prev, next, isPlaying]);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || mediaItems.length === 0) return;

    const currentItem = mediaItems[current];
    const duration = currentItem.type === "video" ? 12000 : 5000;

    const timer = setTimeout(next, duration);
    return () => clearTimeout(timer);
  }, [current, isPlaying, mediaItems, next]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (mediaItems.length === 0) {
    return (
      <div className="w-full h-[calc(100vh-72px)] mt-[72px] bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">No media items to display</p>
      </div>
    );
  }

  return (
    <div 
      className="relative w-full h-[calc(100vh-72px)] overflow-hidden mt-[72px]"
      role="region"
      aria-label="Featured projects carousel"
    >
      {/* Media Items */}
      {mediaItems.map((item, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          aria-hidden={index !== current}
        >
          {item.type === "image" ? (
            <>
              <LazyImage
                src={item.src}
                alt={item.alt || `Carousel image ${index + 1}`}
                className="w-full h-full"
                placeholder="bg-gray-200 animate-pulse"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
            </>
          ) : (
            <>
              <video
                src={item.src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                aria-label={item.alt || "Construction project video"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
            </>
          )}

          {/* Hero Content - Only on first slide */}
          {index === current && index === 0 && (
            <div className="absolute inset-0 flex items-center justify-start px-6 lg:px-32 z-30">
              <div className="glass bg-black/70 backdrop-blur-sm p-6 md:p-8 rounded-2xl w-full max-w-5xl animate-slide-up">
                <h1 className="text-accent mb-2">Welcome to</h1>
                <h1 className="heading-primary text-white mb-2">B4 Brothers</h1>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-300 uppercase tracking-wider mb-4">
                  Infratech PVT LTD
                </h2>
                <div className="w-[120px] h-[6px] bg-primary-500 mb-4 rounded-full" />
                <p className="text-primary-400 text-2xl md:text-3xl font-bold mb-6 tracking-wide">
                  "Believe in best builds"
                </p>
                <p className="text-white text-xl md:text-2xl italic mb-6 font-light">
                  Your Trusted Partner in Construction for Over 5+ Years
                </p>
                <p className="text-white/90 mb-4 text-lg leading-relaxed">
                  With a wealth of experience in the construction industry, we lead the way in delivering 
                  quality, safety, and reliability with guaranteed results.
                </p>
                <p className="text-white/90 mb-8 text-lg leading-relaxed">
                  Explore our extensive portfolio and discover why we are the go-to builders for 
                  projects across the region.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#about"
                    className="btn-primary inline-flex items-center justify-center group"
                    aria-label="Learn more about B4 Brothers Infratech PVT LTD"
                  >
                    Learn More About Us
                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                  <a
                    href="tel:+919733221114"
                    className="btn-outline inline-flex items-center justify-center"
                    aria-label="Call us for free consultation"
                  >
                    📞 Call Now: +91 97332 21114
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Overlay Text for other slides */}
          {index === current && item.overlayText && index !== 0 && (
            <div className="absolute bottom-8 right-6 md:right-10 z-30 text-right max-w-[90%] sm:max-w-md">
              <h2 className="text-white text-xl md:text-2xl font-semibold mb-4 animate-slide-up font-montserrat">
                {item.overlayText}
              </h2>
              <a
                href="https://wa.me/919733221114"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center group"
                aria-label="Request consultation via WhatsApp"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-2.462-.996-4.779-2.811-6.598-1.815-1.82-4.128-2.821-6.588-2.822-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.26-.853zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
                </svg>
                Request Consultation
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}
        </div>
      ))}

      {/* Navigation Controls */}
      <div className="absolute inset-0 flex items-center justify-between px-6 z-30 pointer-events-none">
        <button
          onClick={prev}
          className="pointer-events-auto bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-3 md:p-4 transition-all duration-300 transform hover:scale-110 group"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6 text-white transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          className="pointer-events-auto bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-3 md:p-4 transition-all duration-300 transform hover:scale-110 group"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6 text-white transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={togglePlayPause}
        className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-3 transition-all duration-300 z-30"
        aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
      >
        {isPlaying ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 w-full flex justify-center gap-3 z-30">
        {mediaItems.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === current 
                ? "bg-primary-500 shadow-glow scale-125" 
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-30">
        <div 
          className="h-full bg-primary-500 transition-all duration-300"
          style={{ 
            width: `${((current + 1) / total) * 100}%` 
          }}
        />
      </div>
    </div>
  );
};

export default Carousel;
