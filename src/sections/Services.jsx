import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { slideUpVariants, zoomInVariants } from './animation';
import { allservices } from '../export';
import ServiceModal from '../components/ServiceModal';
import LazyImage from '../components/LazyImage';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  // Handle keyboard navigation
  const handleKeyDown = (event, service) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openModal(service);
    }
  };

  return (
    <section id="services" className="w-full bg-gradient-to-b from-gray-50 to-white py-20 md:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={slideUpVariants}
          className="text-center mb-16"
        >
          {/* Section Header */}
          <motion.div variants={slideUpVariants} className="mb-8">
            <span className="text-accent mb-4 block">Our Expertise</span>
            <h2 className="heading-secondary mb-6">
              Professional Construction Services
            </h2>
            <motion.div 
              variants={zoomInVariants} 
              className="w-24 h-1 bg-primary-500 mx-auto rounded-full mb-6"
            />
            <p className="text-body max-w-3xl mx-auto mb-4">
              We deliver comprehensive construction solutions with over 5 years of experience,
              ensuring quality, safety, and reliability in every project we undertake.
            </p>
            <p className="text-primary-500 text-xl font-bold italic">
              "Believe in best builds"
            </p>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            variants={slideUpVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-500 mb-2">200+</div>
              <div className="text-sm text-secondary-600 uppercase tracking-wide">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-500 mb-2">5+</div>
              <div className="text-sm text-secondary-600 uppercase tracking-wide">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-500 mb-2">98%</div>
              <div className="text-sm text-secondary-600 uppercase tracking-wide">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-500 mb-2">24/7</div>
              <div className="text-sm text-secondary-600 uppercase tracking-wide">Customer Support</div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Services Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={zoomInVariants}
          className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8"
        >
          {allservices.map((service, index) => (
            <motion.div
              key={service.id}
              variants={zoomInVariants}
              custom={index}
              className="group"
            >
              <div
                className="card-interactive p-8 h-full cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary-200"
                onClick={() => openModal(service)}
                onKeyDown={(e) => handleKeyDown(e, service)}
                tabIndex={0}
                role="button"
                aria-label={`Learn more about ${service.title}`}
              >
                {/* Service Icon */}
                <div className="mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl p-4 mb-4 shadow-medium group-hover:shadow-glow transition-all duration-300">
                    <img
                      src={service.icon}
                      alt={`${service.title} icon`}
                      className="w-full h-full object-contain filter brightness-0 invert"
                    />
                  </div>
                </div>

                {/* Service Content */}
                <div className="flex-1">
                  <h3 className="heading-tertiary text-xl mb-4 group-hover:text-primary-500 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-body text-base mb-6 line-clamp-3">
                    {service.about}
                  </p>

                  {/* Service Stats Preview */}
                  {service.stats && (
                    <div className="grid grid-cols-3 gap-4 mb-6 pt-4 border-t border-gray-100">
                      {service.stats.slice(0, 3).map((stat, statIndex) => (
                        <div key={statIndex} className="text-center">
                          <div className="text-lg font-bold text-primary-500">{stat.value}{stat.label.includes('%') ? '%' : '+'}</div>
                          <div className="text-xs text-secondary-500 leading-tight">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Learn More Button */}
                  <div className="flex items-center text-primary-500 font-medium group-hover:text-primary-600 transition-colors duration-300">
                    <span>Learn More</span>
                    <svg 
                      className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={slideUpVariants}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-3xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Get a free consultation and detailed quote for your construction project. 
              Our experts are ready to bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/919733221114"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary-500 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-medium hover:shadow-hard transform hover:-translate-y-1 inline-flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-2.462-.996-4.779-2.811-6.598-1.815-1.82-4.128-2.821-6.588-2.822-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.26-.853zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
                </svg>
                Get Free Quote on WhatsApp
              </a>
              <a
                href="tel:+919733221114"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-500 font-semibold px-8 py-4 rounded-lg transition-all duration-300 inline-flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call: +91 97332 21114
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Service Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <ServiceModal 
            service={selectedService} 
            onClose={closeModal} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;
