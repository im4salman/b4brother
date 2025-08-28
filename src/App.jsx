import './App.css'
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useAnalytics } from './contexts/AnalyticsContext';
import ErrorBoundary from './components/ErrorBoundary';
import ApiTest from './components/ApiTest';
import { useEffect } from 'react';
import { preloadCriticalResources, addTouchOptimizations, registerServiceWorker } from './utils/mobileOptimizations';
import Header from './sections/Header';
import About from './sections/About';
import Services from './sections/Services';
import Portfolio from './sections/Portfolio';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import Working from './sections/Working';
import Testimonials from './sections/Testimonials';
import HeroSlider from './components/HeroSlider';
import constructionVideo from './assets/introvideo.mp4';

import carousel1 from './assets/carousel1.png';
import carousel2 from './assets/carousel2.jpg';
import carousel3 from './assets/carousel3.jpg';
import carousel4 from './assets/carousel4.jpg';
import carousel5 from './assets/carousel5.jpg';

const media = [
  {
    type: 'video',
    src: constructionVideo,
    overlayText: "🏗️ We Build Dreams, Not Just Buildings.",
    alt: "B4 Brothers construction team working on a modern building project"
  },
  {
    type: 'image',
    src: carousel4,
    overlayText: "🏡 Your Vision, Our Foundation.",
    alt: "Beautiful residential villa with modern architecture and landscaping"
  },
  {
    type: 'image',
    src: carousel5,
    overlayText: "🛠️ Precision. Passion. Performance.",
    alt: "Professional construction workers using precision tools on-site"
  },
  {
    type: 'image',
    src: carousel1,
    overlayText: "🔨 Quality That Lasts for Generations.",
    alt: "High-quality commercial building showcasing durable construction"
  },
  {
    type: 'image',
    src: carousel2,
    overlayText: "🌆 Turning Concepts into Concrete Reality.",
    alt: "Urban cityscape showing multiple completed construction projects"
  },
  {
    type: 'image',
    src: carousel3,
    overlayText: "🏢 Building With Integrity and Innovation.",
    alt: "Modern office building featuring innovative architectural design"
  },
];

function App() {
  // Mobile performance optimizations
  useEffect(() => {
    // Preload critical resources
    preloadCriticalResources();

    // Add touch optimizations
    addTouchOptimizations();

    // Register service worker for caching
    registerServiceWorker();

    // Optimize font loading
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = 'https://fonts.googleapis.com';
    document.head.appendChild(link);

    const link2 = document.createElement('link');
    link2.rel = 'preconnect';
    link2.href = 'https://fonts.gstatic.com';
    link2.crossOrigin = '';
    document.head.appendChild(link2);
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
      <div className="min-h-screen">
        <Helmet>
          <title>B4 Brothers Infratech PVT LTD - Premier Building Services | 5+ Years Experience</title>
          <meta name="description" content="B4 Brothers Infratech PVT LTD offers professional building, renovation, and design services. Licensed, insured, and trusted for over 5 years. Free estimates available." />
          <meta name="keywords" content="construction, building, renovation, design, residential, commercial, contractors, licensed builders, infratech" />
          <meta name="author" content="B4 Brothers Infratech PVT LTD" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          
          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content="B4 Brothers Infratech PVT LTD - Premier Building Services" />
          <meta property="og:description" content="Professional construction, renovation, and design services. Licensed, insured, and trusted for over 5 years." />
          <meta property="og:image" content="/assets/carousel1.png" />
          <meta property="og:url" content="https://b4brothers.com" />
          <meta property="og:site_name" content="B4 Brothers Infratech PVT LTD" />
          
          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="B4 Brothers Infratech PVT LTD - Premier Building Services" />
          <meta name="twitter:description" content="Professional construction, renovation, and design services. Licensed, insured, and trusted for over 5 years." />
          <meta name="twitter:image" content="/assets/carousel1.png" />
          
          {/* Additional SEO */}
          <meta name="robots" content="index, follow" />
          <meta name="language" content="English" />
          <meta name="revisit-after" content="7 days" />
          <meta name="distribution" content="global" />
          <meta name="rating" content="general" />
          
          {/* Structured Data */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ConstructionCompany",
              "name": "B4 Brothers Infratech PVT LTD",
              "description": "Premier construction, renovation, and design services with over 5 years of experience",
              "url": "https://b4brothers.com",
              "telephone": "+919733221114",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              },
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "22.5726",
                  "longitude": "88.3639"
                },
                "geoRadius": "100000"
              },
              "services": [
                "Building Construction",
                "Renovation Services", 
                "Design & Planning",
                "Interior Design",
                "Commercial Construction",
                "Residential Construction"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "150"
              }
            })}
          </script>
          
          {/* Preload critical resources */}
          <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" as="style" />
          <link rel="preload" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" as="style" />
        </Helmet>
        
        {/* Skip to content link for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        
        <Header/>
        
        <main id="main-content" role="main">
          <HeroSlider mediaItems={media} />
          <About/>
          <Services/>
          <Portfolio/>
          <Working/>
          <Testimonials/>
          <Contact/>
        </main>
        
        <Footer/>
      </div>
      </HelmetProvider>
    </ErrorBoundary>
  )
}

export default App
