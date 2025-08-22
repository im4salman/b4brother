// Mobile performance optimization utilities

// Device detection
export const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

export const isLowPowerMode = () => {
  // Check for reduced motion preference
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Performance optimizations
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Image optimization for mobile
export const getOptimizedImageSrc = (src, options = {}) => {
  const { width = 800, quality = 80, format = 'webp' } = options;
  
  // If mobile device, use smaller images
  const isMobile = isMobileDevice();
  const optimalWidth = isMobile ? Math.min(width, 600) : width;
  
  // Return optimized URL (in production, you'd have image optimization service)
  return src; // For now, return original
};

// Lazy loading with intersection observer
export const createIntersectionObserver = (callback, options = {}) => {
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '50px',
    ...options
  };
  
  return new IntersectionObserver(callback, defaultOptions);
};

// Preload critical resources
export const preloadCriticalResources = () => {
  const criticalImages = [
    '/assets/b4-brothers-logo-big-unique.svg',
    '/assets/carousel1.png'
  ];
  
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

// Optimize animations for mobile
export const getAnimationConfig = () => {
  const isMobile = isMobileDevice();
  const isLowPower = isLowPowerMode();
  
  if (isLowPower || isMobile) {
    return {
      duration: 0.3,
      ease: 'easeOut',
      reduce: true
    };
  }
  
  return {
    duration: 0.8,
    ease: 'easeInOut',
    reduce: false
  };
};

// Service worker registration for better caching
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};

// Memory management for mobile
export const cleanupResources = () => {
  // Remove unused event listeners
  // Clear timeouts and intervals
  // Release object references
};

// Network-aware loading
export const getConnectionInfo = () => {
  if ('connection' in navigator) {
    const connection = navigator.connection;
    return {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      saveData: connection.saveData
    };
  }
  return null;
};

export const shouldReduceData = () => {
  const connection = getConnectionInfo();
  return connection?.saveData || connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g';
};

// Viewport utilities
export const getViewportSize = () => {
  return {
    width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
    height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  };
};

export const isMobileViewport = () => {
  const { width } = getViewportSize();
  return width < 768;
};

// Touch event handling optimization
export const addTouchOptimizations = () => {
  // Passive event listeners for better scroll performance
  const passiveOptions = { passive: true };
  
  document.addEventListener('touchstart', () => {}, passiveOptions);
  document.addEventListener('touchmove', () => {}, passiveOptions);
  document.addEventListener('wheel', () => {}, passiveOptions);
};

export default {
  isMobileDevice,
  isTouchDevice,
  isLowPowerMode,
  debounce,
  throttle,
  getOptimizedImageSrc,
  createIntersectionObserver,
  preloadCriticalResources,
  getAnimationConfig,
  registerServiceWorker,
  cleanupResources,
  getConnectionInfo,
  shouldReduceData,
  getViewportSize,
  isMobileViewport,
  addTouchOptimizations
};
