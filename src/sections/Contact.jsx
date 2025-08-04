import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { slideUpVariants, zoomInVariants } from './animation';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaClock } from 'react-icons/fa';
import { FaShieldHalved as FaShield } from 'react-icons/fa6';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    budget: '',
    timeline: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
          budget: '',
          timeline: ''
        });
      }, 3000);
    }, 1500);
  };

  const services = [
    'Building Construction',
    'Renovation Services',
    'Design & Planning',
    'Interior Design',
    'Commercial Construction',
    'Other'
  ];

  const budgetRanges = [
    'Under ₹5 Lakhs',
    '₹5-15 Lakhs',
    '₹15-50 Lakhs',
    '₹50 Lakhs - 1 Crore',
    'Above ₹1 Crore',
    'Flexible'
  ];

  const timelineOptions = [
    'ASAP',
    '1-3 Months',
    '3-6 Months',
    '6-12 Months',
    '1+ Years',
    'Flexible'
  ];

  const contactInfo = [
    {
      icon: FaPhone,
      title: 'Phone',
      value: '+91 97332 21114',
      link: 'tel:+919733221114',
      description: 'Call us anytime 24/7'
    },
    {
      icon: FaWhatsapp,
      title: 'WhatsApp',
      value: '+91 97332 21114',
      link: 'https://wa.me/919733221114',
      description: 'Quick response guaranteed'
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      value: 'info@b4brothersinfratech.com',
      link: 'mailto:info@b4brothersinfratech.com',
      description: 'Get detailed quotes'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Location',
      value: 'West Bengal, India',
      link: '#',
      description: 'Serving across the region'
    }
  ];

  const trustIndicators = [
    {
      icon: FaShield,
      title: 'Licensed & Insured',
      description: 'Fully licensed contractors with comprehensive insurance coverage'
    },
    {
      icon: FaClock,
      title: '24/7 Support',
      description: 'Round-the-clock customer support throughout your project'
    },
    {
      icon: FaPhone,
      title: 'Free Consultation',
      description: 'Complimentary project assessment and detailed quotes'
    }
  ];

  return (
    <section id="contact" className="w-full bg-gradient-to-b from-gray-50 to-white py-20 md:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={slideUpVariants}
          className="text-center mb-16"
        >
          <span className="text-accent mb-4 block">Get In Touch</span>
          <h2 className="heading-secondary mb-6">
            Ready to Build Your Dream?
          </h2>
          <motion.div
            variants={zoomInVariants}
            className="w-24 h-1 bg-primary-500 mx-auto rounded-full mb-6"
          />
          <p className="text-body max-w-3xl mx-auto mb-4">
            Contact us today for a free consultation and detailed quote. Our expert team is ready
            to discuss your project and bring your vision to life with quality and precision.
          </p>
          <p className="text-primary-500 text-xl font-bold italic">
            "Believe in best builds"
          </p>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={slideUpVariants}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {trustIndicators.map((indicator, index) => (
            <motion.div
              key={index}
              variants={zoomInVariants}
              className="text-center p-6 bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <indicator.icon className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="font-semibold text-lg text-secondary-800 mb-2">{indicator.title}</h3>
              <p className="text-secondary-600 text-sm">{indicator.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={slideUpVariants}
          >
            <div className="bg-white rounded-3xl shadow-medium p-8 md:p-10">
              <h3 className="heading-tertiary mb-2">Get Your Free Quote</h3>
              <p className="text-body mb-8">
                Fill out the form below and we'll get back to you within 24 hours with a detailed quote.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-secondary-800 mb-2">Thank You!</h4>
                  <p className="text-secondary-600">
                    We've received your message and will contact you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-300"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-300"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-secondary-700 mb-2">
                        Service Required *
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-300"
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option key={service} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-secondary-700 mb-2">
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-300"
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-secondary-700 mb-2">
                      Project Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-300"
                    >
                      <option value="">Select timeline</option>
                      {timelineOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-2">
                      Project Description *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-300 resize-none"
                      placeholder="Please describe your project requirements, location, and any specific details..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaWhatsapp className="w-5 h-5 mr-2" />
                        Get Free Quote
                      </>
                    )}
                  </button>

                  <p className="text-xs text-secondary-500 text-center">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={slideUpVariants}
            className="space-y-8"
          >
            <div>
              <h3 className="heading-tertiary mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    variants={zoomInVariants}
                    className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-500 transition-colors duration-300">
                      <info.icon className="w-6 h-6 text-primary-500 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-secondary-800 mb-1">{info.title}</h4>
                      <a
                        href={info.link}
                        className="text-primary-500 font-medium hover:text-primary-600 transition-colors duration-300"
                        target={info.link.startsWith('http') ? '_blank' : '_self'}
                        rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                      >
                        {info.value}
                      </a>
                      <p className="text-secondary-600 text-sm mt-1">{info.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-3xl p-8 text-white">
              <h4 className="text-xl font-bold mb-4">Need Immediate Assistance?</h4>
              <p className="mb-6 opacity-90">
                For urgent inquiries or immediate consultation, reach us directly:
              </p>
              <div className="space-y-4">
                <a
                  href="https://wa.me/919733221114"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300"
                >
                  <FaWhatsapp className="w-5 h-5 mr-3" />
                  WhatsApp Us Now
                </a>
                <a
                  href="tel:+919733221114"
                  className="flex items-center justify-center w-full bg-white/10 border-2 border-white/30 hover:bg-white/20 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300"
                >
                  <FaPhone className="w-5 h-5 mr-3" />
                  Call: +91 97332 21114
                </a>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <h4 className="font-semibold text-secondary-800 mb-4 flex items-center">
                <FaClock className="w-5 h-5 mr-2 text-primary-500" />
                Business Hours
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-secondary-600">Monday - Friday</span>
                  <span className="font-medium text-secondary-800">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Saturday</span>
                  <span className="font-medium text-secondary-800">9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Sunday</span>
                  <span className="font-medium text-secondary-800">Emergency Only</span>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-secondary-500">
                    24/7 emergency support available for ongoing projects
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
