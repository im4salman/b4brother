import React from 'react';

// Generic skeleton component
export const Skeleton = ({ className = '', children }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`}>
    {children}
  </div>
);

// Hero section skeleton
export const HeroSkeleton = () => (
  <div className="h-screen pt-20 md:pt-24 bg-gray-100 flex items-center justify-center">
    <div className="container mx-auto px-6 lg:px-8">
      <div className="grid lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-8">
          <Skeleton className="h-4 w-32" />
          <div className="space-y-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-24 w-full" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-40" />
          </div>
        </div>
        <div className="lg:col-span-5">
          <Skeleton className="h-80 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  </div>
);

// Project card skeleton
export const ProjectCardSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
    <Skeleton className="h-48 w-full" />
    <div className="p-6 space-y-4">
      <Skeleton className="h-6 w-3/4" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  </div>
);

// Service card skeleton
export const ServiceCardSkeleton = () => (
  <div className="bg-white rounded-2xl p-8 shadow-soft">
    <div className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-xl mb-6 animate-pulse" />
    <Skeleton className="h-6 w-3/4 mb-4" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  </div>
);

// Testimonial skeleton
export const TestimonialSkeleton = () => (
  <div className="bg-white rounded-2xl p-8 shadow-soft">
    <div className="flex items-center gap-4 mb-6">
      <Skeleton className="w-16 h-16 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
    <div className="space-y-3">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
    <div className="flex gap-1 mt-4">
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="w-4 h-4" />
      ))}
    </div>
  </div>
);

// Loading spinner
export const LoadingSpinner = ({ size = 'md', color = 'primary' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    primary: 'text-primary-500',
    white: 'text-white',
    gray: 'text-gray-500'
  };

  return (
    <div className="flex items-center justify-center">
      <svg 
        className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`} 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
};

// Full page loading
export const PageLoading = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <LoadingSpinner size="xl" />
      <p className="mt-4 text-gray-600">Loading B4Brothers...</p>
    </div>
  </div>
);

export default {
  Skeleton,
  HeroSkeleton,
  ProjectCardSkeleton,
  ServiceCardSkeleton,
  TestimonialSkeleton,
  LoadingSpinner,
  PageLoading
};
