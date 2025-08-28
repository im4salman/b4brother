import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clients } from '../export';
import { slideUpVariants, zoomInVariants } from './animation';
import apiClient from '../utils/apiClient';
import FeedbackForm from '../components/FeedbackForm';
import {
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft,
  FaQuoteRight,
  FaPlay,
  FaPause,
} from 'react-icons/fa6';
import { AiFillStar } from 'react-icons/ai';

const avatarColors = [
  'bg-gradient-to-br from-primary-400 to-primary-600',
  'bg-gradient-to-br from-green-400 to-green-600',
  'bg-gradient-to-br from-blue-400 to-blue-600',
  'bg-gradient-to-br from-purple-400 to-purple-600',
  'bg-gradient-to-br from-pink-400 to-pink-600',
];

const Testimonials = () => {
  const [idx, setIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [allTestimonials, setAllTestimonials] = useState(clients);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const len = allTestimonials.length;

  // Load stored testimonials and API feedback
  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      // Load from localStorage
      const stored = JSON.parse(localStorage.getItem('b4-testimonials') || '[]');

      // Load from API
      const apiFeedback = await apiClient.getAllFeedback();

      // Convert API feedback to testimonial format
      const apiTestimonials = apiFeedback.map(feedback => ({
        name: feedback.name,
        about: feedback.feedback,
        post: feedback.designation,
        rating: feedback.rating
      }));

      // Combine all testimonials
      const combinedTestimonials = [...clients, ...stored, ...apiTestimonials];
      setAllTestimonials(combinedTestimonials);
    } catch (error) {
      console.error('Error loading testimonials:', error);
      // Fallback to local data only
      const stored = JSON.parse(localStorage.getItem('b4-testimonials') || '[]');
      setAllTestimonials([...clients, ...stored]);
    }
  };

  const next = useCallback(() => setIdx((i) => (i + 1) % len), [len]);
  const prev = useCallback(() => setIdx((i) => (i - 1 + len) % len), [len]);

  // Auto-advance functionality
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isPlaying, next]);

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

  // Touch gestures for mobile
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      next();
    } else if (distance < -minSwipeDistance) {
      prev();
    }
  };

  const goTo = (index) => setIdx(index);
  const togglePlayPause = () => setIsPlaying(!isPlaying);

  const client = allTestimonials[idx];
  const stars = client.rating ?? 5;
  const initials = client.name
    .split(' ')
    .map((w) => w[0])
    .join('');
  const avatarBg = avatarColors[idx % avatarColors.length];

  return (
    <section 
      id="clients" 
      className="relative bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-700 py-20 md:py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-500/10 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent-500/10 rounded-full blur-xl" />
        <FaQuoteLeft className="absolute top-12 left-12 text-primary-500/20 text-8xl rotate-12" />
        <FaQuoteRight className="absolute bottom-12 right-12 text-primary-500/20 text-8xl -rotate-12" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={slideUpVariants}
          className="text-center mb-16"
        >
          <span className="text-primary-400 uppercase text-sm md:text-base tracking-wider font-medium mb-4 block">
            Client Reviews
          </span>
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold font-montserrat mb-6">
            What Our Clients Say
          </h2>
          <motion.div
            variants={zoomInVariants}
            className="w-24 h-1 bg-primary-500 mx-auto rounded-full mb-6"
          />
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Don't just take our word for it. Here's what our satisfied clients have to say
            about their experience working with B4 Brothers Infratech PVT LTD.
          </p>
          <p className="text-primary-400 text-xl font-bold italic mt-4">
            "Believe in best builds bold"
          </p>
        </motion.div>

        {/* Testimonials Stats */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={slideUpVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { number: '40+', label: 'Happy Clients' },
            { number: '4.9', label: 'Average Rating' },
            { number: '98%', label: 'Satisfaction Rate' },
            { number: '40+', label: 'Projects Completed' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary-500 mb-1">{stat.number}</div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Main Testimonial Slider */}
        <div className="relative max-w-4xl mx-auto">
          <div
            className="relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            role="region"
            aria-label="Client testimonials"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={client.name}
                initial={{ opacity: 0, x: 100, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.9 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="relative"
              >
                <div className="bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl border border-white/20">
                  {/* Quote Icon */}
                  <FaQuoteLeft className="text-primary-500 text-4xl md:text-5xl mb-6" />

                  {/* Testimonial Text */}
                  <blockquote className="text-white text-lg md:text-xl leading-relaxed mb-8 font-light italic">
                    "{client.about}"
                  </blockquote>

                  {/* Star Rating */}
                  <div className="flex justify-center mb-8">
                    <div className="flex space-x-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <AiFillStar
                          key={i}
                          className={`text-2xl ${
                            i < stars ? 'text-primary-500' : 'text-gray-500'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Client Info */}
                  <div className="flex items-center justify-center space-x-6">
                    <div
                      className={`w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-white text-xl md:text-2xl font-bold rounded-full shadow-glow ${avatarBg}`}
                    >
                      {initials}
                    </div>
                    <div className="text-center">
                      <h3 className="text-white text-xl md:text-2xl font-semibold font-montserrat">
                        {client.name}
                      </h3>
                      <p className="text-primary-400 uppercase text-sm md:text-base tracking-wider font-medium">
                        {client.post}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Previous Button */}
            <button
              onClick={prev}
              className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary-200"
              aria-label="Previous testimonial"
            >
              <FaChevronLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlayPause}
              className="bg-primary-500 hover:bg-primary-600 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary-200"
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isPlaying ? (
                <FaPause className="w-5 h-5" />
              ) : (
                <FaPlay className="w-5 h-5 ml-1" />
              )}
            </button>

            {/* Next Button */}
            <button
              onClick={next}
              className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary-200"
              aria-label="Next testimonial"
            >
              <FaChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {clients.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                  i === idx
                    ? 'bg-primary-500 scale-125 shadow-glow'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          {isPlaying && (
            <div className="mt-6 w-full bg-white/20 rounded-full h-1 overflow-hidden">
              <motion.div
                className="h-full bg-primary-500 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 6, ease: 'linear' }}
                key={idx}
              />
            </div>
          )}
        </div>

        {/* Call to Action */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={slideUpVariants}
          className="text-center mt-20"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20">
            <h3 className="text-white text-2xl md:text-3xl font-bold mb-4">
              Join Our Growing List of Satisfied Clients
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Experience the same level of quality, professionalism, and dedication 
              that has earned us these outstanding reviews.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-medium hover:shadow-glow transform hover:-translate-y-1 inline-flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Start Your Project
              </a>
              <a
                href="https://wa.me/919733221114"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-secondary-800 font-semibold px-8 py-4 rounded-lg transition-all duration-300 inline-flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-2.462-.996-4.779-2.811-6.598-1.815-1.82-4.128-2.821-6.588-2.822-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.26-.853zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
