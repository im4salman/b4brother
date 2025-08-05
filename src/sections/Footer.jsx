import React from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { slideUpVariants } from './animation';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const services = [
    { name: 'Building Construction', href: '#services' },
    { name: 'Renovation Services', href: '#services' },
    { name: 'Design & Planning', href: '#services' },
    { name: 'Interior Design', href: '#services' },
    { name: 'Commercial Projects', href: '#services' },
    { name: 'Emergency Repairs', href: '#contact' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
    { name: 'Cookie Policy', href: '/cookie-policy' },
    { name: 'Sitemap', href: '/sitemap.xml' },
  ];

  const socialLinks = [
    { icon: FaFacebook, href: 'https://facebook.com/b4brothers', label: 'Facebook', color: 'hover:text-blue-500' },
    { icon: FaInstagram, href: 'https://instagram.com/b4brothers', label: 'Instagram', color: 'hover:text-pink-500' },
    { icon: FaLinkedin, href: 'https://linkedin.com/company/b4brothers', label: 'LinkedIn', color: 'hover:text-blue-600' },
    { icon: FaTwitter, href: 'https://twitter.com/b4brothers', label: 'Twitter', color: 'hover:text-blue-400' },
  ];

  const certifications = [
    'Licensed Building Contractor',
    'OSHA Safety Certified',
    'Green Building Certified',
    'ISO 9001:2015 Quality Management'
  ];

  return (
    <footer className="bg-secondary-800 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          {/* Company Information */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={slideUpVariants}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-bold font-montserrat mb-2">
                B4 <span className="text-primary-500">Brothers</span>
              </h3>
              <h4 className="text-lg font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Infratech PVT LTD
              </h4>
              <p className="text-xl font-bold italic text-primary-400 mb-4">
                "Believe in best builds bold"
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                Building excellence for over 5 years. We are your trusted partner in construction,
                renovation, and design services across West Bengal.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FaPhone className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <a 
                  href="tel:+919733221114" 
                  className="text-gray-300 hover:text-primary-500 transition-colors duration-300"
                  aria-label="Call us"
                >
                  +91 97332 21114
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <a 
                  href="mailto:info@b4brothers.com" 
                  className="text-gray-300 hover:text-primary-500 transition-colors duration-300"
                  aria-label="Email us"
                >
                  info@b4brothers.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="w-5 h-5 text-primary-500 flex-shrink-0 mt-1" />
                <span className="text-gray-300">
                  West Bengal, India<br />
                  <span className="text-sm text-gray-400">Serving across the region</span>
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-gray-300 ${social.color} transition-all duration-300 hover:scale-110`}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={slideUpVariants}
            className="space-y-6"
          >
            <h4 className="text-lg font-semibold text-primary-500 mb-4">Quick Links</h4>
            <nav>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-primary-500 transition-colors duration-300 flex items-center group"
                    >
                      <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Business Hours */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-primary-500 mb-4">Business Hours</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Mon - Fri</span>
                  <span className="text-gray-300">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Saturday</span>
                  <span className="text-gray-300">9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Sunday</span>
                  <span className="text-gray-300">Emergency Only</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={slideUpVariants}
            className="space-y-6"
          >
            <h4 className="text-lg font-semibold text-primary-500 mb-4">Our Services</h4>
            <nav>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <a
                      href={service.href}
                      className="text-gray-300 hover:text-primary-500 transition-colors duration-300 flex items-center group"
                    >
                      <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Certifications */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-primary-500 mb-4">Certifications</h4>
              <ul className="space-y-2 text-sm">
                {certifications.map((cert, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Newsletter & CTA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={slideUpVariants}
            className="space-y-6"
          >
            <h4 className="text-lg font-semibold text-primary-500 mb-4">Get Free Quote</h4>
            <p className="text-gray-300 text-sm mb-6">
              Ready to start your construction project? Contact us today for a free consultation and detailed quote.
            </p>

            {/* Quick Contact CTAs */}
            <div className="space-y-4">
              <a
                href="https://wa.me/919733221114"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                <FaWhatsapp className="w-5 h-5 mr-2" />
                WhatsApp Quote
              </a>
              <a
                href="tel:+919733221114"
                className="flex items-center justify-center w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                <FaPhone className="w-5 h-5 mr-2" />
                Call Now
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-500 mb-1">5+</div>
                <div className="text-xs text-gray-400 uppercase">Years Experience</div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4 text-center">
                <div>
                  <div className="text-lg font-bold text-primary-500">200+</div>
                  <div className="text-xs text-gray-400">Projects</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-primary-500">98%</div>
                  <div className="text-xs text-gray-400">Satisfied</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 bg-secondary-900">
        <div className="container mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              <p>
                © {currentYear} B4 Brothers Infratech PVT LTD. All rights reserved. |
                <span className="ml-1">Licensed Building Contractor</span>
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-primary-500 transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-4 pt-4 border-t border-gray-800 text-center">
            <p className="text-xs text-gray-500">
              B4 Brothers Infratech PVT LTD is a licensed and insured construction company serving West Bengal and surrounding areas.
              All work is guaranteed and complies with local building codes and regulations.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
