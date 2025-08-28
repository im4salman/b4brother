// src/components/Modal.jsx

import React, { useEffect, useState } from 'react';
import { useAnalytics } from '../contexts/AnalyticsContext';
import apiClient from '../utils/apiClient';

const whatsappNumber = '919733221114'; 
// e.g. '919876543210' for +91 9876543210

const Modal = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    query: '',
  });
  const { trackFormSubmission, trackWhatsAppRedirect, trackClick } = useAnalytics();

  useEffect(() => {
    if (isOpen) setIsVisible(true);
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // match transition duration
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, phone, email, query } = formData;

    try {
      // Track form submission
      trackFormSubmission('contact_enquiry', formData);

      // Create WhatsApp message
      const whatsappMessage = `*New Enquiry*

*Name*: ${name}
*Phone*: ${phone}
*Email*: ${email}
*Query*: ${query}`;

      // Submit to API and WhatsApp
      const result = await apiClient.submitFormWithWhatsApp('reach_us', formData, whatsappMessage);

      if (result.success) {
        // Track WhatsApp redirect
        trackWhatsAppRedirect(whatsappMessage, formData);

        handleClose();

        // Show success message
        alert(result.apiSubmitted
          ? 'Thank you for your enquiry! Your message has been submitted successfully and you will be redirected to WhatsApp.'
          : 'Thank you for your enquiry! Your message has been stored and you will be redirected to WhatsApp. We will process it soon.');
      } else {
        alert('Failed to submit enquiry: ' + result.error);
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert('Failed to submit enquiry. Please try again or contact us directly.');
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      <div
        className={`bg-white w-[90%] md:w-[500px] rounded-md shadow-lg overflow-hidden transform transition-transform duration-300 ${
          isVisible ? 'scale-100' : 'scale-95'
        }`}
      >
        {/* Mac-style top bar */}
        <div className="flex items-center gap-2 bg-gray-200 px-4 py-2 border-b border-gray-300">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
        </div>

        <div className="relative p-6">
          <h2 className="text-xl font-bold mb-4">Reach Us</h2>
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Name"
              className="w-full border px-3 py-2 rounded"
              required
            />
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="tel"
              placeholder="Phone"
              className="w-full border px-3 py-2 rounded"
              required
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Email"
              className="w-full border px-3 py-2 rounded"
              required
            />
            <textarea
              name="query"
              value={formData.query}
              onChange={handleChange}
              placeholder="Your Query"
              rows="3"
              className="w-full border px-3 py-2 rounded"
              required
            ></textarea>
            <button
              type="submit"
              onClick={() => trackClick('Contact Form Submit', 'Contact Modal')}
              className="w-full bg-yellow-500 hover:bg-black hover:text-white font-semibold py-2 px-4 rounded transition-colors"
            >
              Submit
            </button>
          </form>

          <button
            className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
            onClick={handleClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
