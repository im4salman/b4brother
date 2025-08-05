import React, { useState, useRef, useEffect } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy',
  sizes = '100vw',
  placeholder = 'bg-gray-200 animate-pulse',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  // Convert image path to WebP if available
  const getOptimizedSrc = (originalSrc) => {
    if (!originalSrc) return originalSrc;
    
    // For production, you might want to serve WebP versions
    const webpSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    return { webp: webpSrc, original: originalSrc };
  };

  const sources = getOptimizedSrc(src);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  // Intersection Observer for lazy loading enhancement
  useEffect(() => {
    if (!imgRef.current || loading !== 'lazy') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Image is in viewport, start loading
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [loading]);

  if (hasError) {
    return (
      <div 
        className={`${className} ${placeholder} flex items-center justify-center`}
        {...props}
      >
        <div className="text-gray-400 text-center">
          <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm">Image not available</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={imgRef}>
      {/* Placeholder while loading */}
      {!isLoaded && (
        <div className={`absolute inset-0 ${placeholder}`} />
      )}
      
      {/* Optimized image with WebP support */}
      <picture>
        {sources.webp && (
          <source srcSet={sources.webp} type="image/webp" sizes={sizes} />
        )}
        <img
          src={sources.original || src}
          alt={alt}
          loading={loading}
          sizes={sizes}
          onLoad={handleLoad}
          onError={handleError}
          className={`${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 w-full h-full object-cover`}
          {...props}
        />
      </picture>
    </div>
  );
};

export default OptimizedImage;
