import React from 'react';
import { motion } from 'framer-motion';
import { slideUpVariants, zoomInVariants } from './animation';

const Portfolio = () => {

  return (
    <section id="projects" className="w-full bg-white py-20 md:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={slideUpVariants}
          className="text-center mb-16"
        >
          <motion.div variants={slideUpVariants}>
            <span className="text-accent mb-4 block">Our Work</span>
            <h2 className="heading-secondary mb-6">
              Featured Projects Portfolio
            </h2>
            <motion.div
              variants={zoomInVariants}
              className="w-24 h-1 bg-primary-500 mx-auto rounded-full mb-6"
            />
            <p className="text-body max-w-3xl mx-auto mb-4">
              Explore our diverse portfolio of successful construction projects, from residential homes
              to commercial buildings, each showcasing our commitment to quality and innovation.
            </p>
            <p className="text-primary-500 text-xl font-bold italic">
              "Believe in best builds bold"
            </p>
          </motion.div>
        </motion.div>

        {/* Project Statistics */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={slideUpVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 p-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-500 mb-2">40</div>
            <div className="text-sm text-secondary-600 uppercase tracking-wide">Projects Delivered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-500 mb-2">5M</div>
            <div className="text-sm text-secondary-600 uppercase tracking-wide">Sq Ft Built</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-500 mb-2">0</div>
            <div className="text-sm text-secondary-600 uppercase tracking-wide">Safety Incidents</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-500 mb-2">100%</div>
            <div className="text-sm text-secondary-600 uppercase tracking-wide">On-Time Delivery</div>
          </div>
        </motion.div>


        {/* Call to Action */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={slideUpVariants}
          className="text-center mt-20"
        >
          <div className="bg-secondary-800 rounded-3xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Your Dream Project Awaits
            </h3>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Ready to see your vision come to life? Let's discuss your project requirements 
              and create something extraordinary together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-medium hover:shadow-hard transform hover:-translate-y-1 inline-flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Start Your Project
              </a>
              <a
                href="#services"
                className="bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 inline-flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                View Our Services
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
