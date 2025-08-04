import React from 'react';
import { motion } from 'framer-motion';
import { slideUpVariants, zoomInVariants } from './animation';
import { planning } from '../export';

const Working = () => {
  return (
    <section id="working" className="w-full bg-gradient-to-b from-white to-gray-50 py-20 md:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={slideUpVariants}
          className="text-center mb-20"
        >
          <span className="text-accent mb-4 block">Our Process</span>
          <h2 className="heading-secondary mb-6">
            How We Bring Your Vision to Life
          </h2>
          <motion.div
            variants={zoomInVariants}
            className="w-24 h-1 bg-primary-500 mx-auto rounded-full mb-6"
          />
          <p className="text-body max-w-3xl mx-auto mb-4">
            Our proven 4-step process ensures quality results, transparent communication,
            and timely delivery for every construction project we undertake.
          </p>
          <p className="text-primary-500 text-xl font-bold italic">
            "Believe in best builds"
          </p>
        </motion.div>

        {/* Process Timeline */}
        <div className="relative max-w-6xl mx-auto">
          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            {/* Central Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-1 bg-gradient-to-b from-primary-300 via-primary-500 to-primary-300" />
            
            {/* Process Steps */}
            {planning.map((step, idx) => {
              const isLeft = idx % 2 === 0;
              
              return (
                <motion.div
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  variants={slideUpVariants}
                  custom={idx}
                  className={`relative mb-20 w-full flex ${isLeft ? 'justify-start' : 'justify-end'}`}
                >
                  {/* Step Content */}
                  <div className={`w-5/12 ${isLeft ? 'pr-16' : 'pl-16'}`}>
                    <motion.div
                      variants={zoomInVariants}
                      className={`bg-white rounded-2xl shadow-medium hover:shadow-hard transition-all duration-300 p-8 ${
                        isLeft ? 'text-right' : 'text-left'
                      }`}
                    >
                      {/* Step Number */}
                      <div className={`inline-flex items-center justify-center w-8 h-8 bg-primary-100 text-primary-500 rounded-full text-sm font-bold mb-4 ${
                        isLeft ? 'ml-auto' : 'mr-auto'
                      }`}>
                        {idx + 1}
                      </div>
                      
                      <h3 className="heading-tertiary text-xl mb-3">{step.title}</h3>
                      <p className="text-body text-sm leading-relaxed">{step.about}</p>
                      
                      {/* Additional Details */}
                      <div className="mt-6 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-center">
                          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                            <step.icon className="w-6 h-6 text-primary-500" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Timeline Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-8 w-16 h-16 bg-white border-4 border-primary-500 rounded-full flex items-center justify-center z-10 shadow-medium">
                    <step.icon className="w-8 h-8 text-primary-500" />
                  </div>

                  {/* Connecting Line */}
                  <div className={`absolute top-12 w-16 h-0.5 bg-primary-300 ${
                    isLeft ? 'right-1/2 mr-8' : 'left-1/2 ml-8'
                  }`} />
                </motion.div>
              );
            })}
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 h-full w-1 bg-gradient-to-b from-primary-300 via-primary-500 to-primary-300" />
            
            {planning.map((step, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                variants={slideUpVariants}
                custom={idx}
                className="relative mb-12 pl-20"
              >
                {/* Timeline Node */}
                <div className="absolute left-2 top-6 w-12 h-12 bg-white border-4 border-primary-500 rounded-full flex items-center justify-center z-10 shadow-medium">
                  <step.icon className="w-6 h-6 text-primary-500" />
                </div>

                {/* Step Content */}
                <motion.div
                  variants={zoomInVariants}
                  className="bg-white rounded-2xl shadow-medium hover:shadow-hard transition-all duration-300 p-6"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-6 h-6 bg-primary-100 text-primary-500 rounded-full text-xs font-bold flex items-center justify-center mr-3">
                      {idx + 1}
                    </div>
                    <h3 className="heading-tertiary text-lg">{step.title}</h3>
                  </div>
                  <p className="text-body text-sm leading-relaxed">{step.about}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Process Benefits */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={slideUpVariants}
          className="mt-20 bg-white rounded-3xl shadow-medium p-8 md:p-12"
        >
          <div className="text-center mb-12">
            <h3 className="heading-tertiary mb-4">Why Our Process Works</h3>
            <p className="text-body max-w-2xl mx-auto">
              Our systematic approach ensures every project meets the highest standards 
              of quality, safety, and client satisfaction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '⚡',
                title: 'Fast Delivery',
                description: 'Projects completed 15% faster than industry average'
              },
              {
                icon: '🎯',
                title: 'Quality Assured',
                description: '100% satisfaction guarantee with quality checkpoints'
              },
              {
                icon: '💬',
                title: 'Clear Communication',
                description: 'Regular updates and transparent progress reporting'
              },
              {
                icon: '🛡️',
                title: 'Risk Management',
                description: 'Comprehensive insurance and safety protocols'
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                variants={zoomInVariants}
                custom={index}
                className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors duration-300"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h4 className="font-semibold text-secondary-800 mb-2">{benefit.title}</h4>
                <p className="text-secondary-600 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={slideUpVariants}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-secondary-800 to-secondary-700 rounded-3xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Let's discuss your construction needs and create a customized plan 
              that brings your vision to reality within your timeline and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-medium hover:shadow-hard transform hover:-translate-y-1 inline-flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Get Started Today
              </a>
              <a
                href="https://wa.me/919733221114"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 inline-flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-2.462-.996-4.779-2.811-6.598-1.815-1.82-4.128-2.821-6.588-2.822-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.26-.853zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
                </svg>
                WhatsApp Consultation
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Working;
