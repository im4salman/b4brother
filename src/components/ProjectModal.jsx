import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaMapMarkerAlt, FaCalendarAlt, FaRulerCombined, FaClock, FaRupeeSign, FaCheck } from 'react-icons/fa';
import LazyImage from './LazyImage';

const ProjectModal = ({ project, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!project) return null;

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.1, duration: 0.3 }
    }
  };

  const projectSpecs = [
    { icon: FaMapMarkerAlt, label: 'Location', value: project.location || 'West Bengal, India' },
    { icon: FaRulerCombined, label: 'Area', value: project.area || 'N/A' },
    { icon: FaClock, label: 'Duration', value: project.duration || 'N/A' },
    { icon: FaRupeeSign, label: 'Budget', value: project.budget || 'Contact for quote' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden"
          role="dialog"
          aria-labelledby="modal-title"
          aria-modal="true"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center text-secondary-600 hover:text-secondary-800 transition-all duration-300 shadow-medium hover:shadow-hard transform hover:scale-110"
            aria-label="Close modal"
          >
            <FaTimes className="w-5 h-5" />
          </button>

          <div className="overflow-y-auto max-h-[90vh] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {/* Hero Image */}
            <div className="relative h-64 md:h-80">
              <LazyImage
                src={project.image}
                alt={`${project.title} - ${project.category} project`}
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              {/* Project Badge */}
              <div className="absolute top-6 left-6">
                <span className="bg-primary-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-medium">
                  {project.category}
                </span>
              </div>

              {/* Year Badge */}
              <div className="absolute bottom-6 right-6">
                <div className="bg-white/90 backdrop-blur-sm text-secondary-800 text-lg font-bold px-4 py-2 rounded-full shadow-medium">
                  {project.year}
                </div>
              </div>
            </div>

            {/* Content */}
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="p-6 md:p-8 space-y-8"
            >
              {/* Title and Basic Info */}
              <div>
                <h2 id="modal-title" className="heading-secondary mb-4">
                  {project.title}
                </h2>
                <p className="text-body leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Project Specifications */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="heading-tertiary text-lg mb-4">Project Details</h3>
                  <div className="space-y-4">
                    {projectSpecs.map((spec, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <spec.icon className="w-5 h-5 text-primary-500" />
                        </div>
                        <div>
                          <div className="text-sm text-secondary-500 uppercase tracking-wide">{spec.label}</div>
                          <div className="font-semibold text-secondary-800">{spec.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project Timeline */}
                <div>
                  <h3 className="heading-tertiary text-lg mb-4">Timeline</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-secondary-600">Project Start</span>
                      <span className="font-semibold text-secondary-800">Q1 {project.year}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-secondary-600">Completion</span>
                      <span className="font-semibold text-secondary-800">Q4 {project.year}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-green-600">Status</span>
                      <span className="font-semibold text-green-800">Completed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              {project.features && (
                <div>
                  <h3 className="heading-tertiary text-lg mb-4">Key Features</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {project.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <FaCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-secondary-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights */}
              {project.highlights && (
                <div>
                  <h3 className="heading-tertiary text-lg mb-4">Project Highlights</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {project.highlights.map((highlight, index) => (
                      <div key={index} className="bg-gradient-to-r from-primary-50 to-accent-50 p-4 rounded-lg border-l-4 border-primary-500">
                        <p className="text-secondary-700 font-medium">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl p-6 md:p-8 text-white">
                <h3 className="text-xl md:text-2xl font-bold mb-4">
                  Interested in a Similar Project?
                </h3>
                <p className="mb-6 opacity-90">
                  Get a free consultation and detailed quote for your construction project. 
                  Our expert team is ready to bring your vision to life.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://wa.me/919733221114"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-primary-500 hover:bg-gray-100 font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-medium hover:shadow-hard transform hover:-translate-y-1 inline-flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-2.462-.996-4.779-2.811-6.598-1.815-1.82-4.128-2.821-6.588-2.822-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.26-.853zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
                    </svg>
                    WhatsApp Quote
                  </a>
                  <a
                    href="tel:+919733221114"
                    className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-500 font-semibold px-6 py-3 rounded-lg transition-all duration-300 inline-flex items-center justify-center"
                  >
                    <FaCalendarAlt className="w-5 h-5 mr-2" />
                    Schedule Call
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
