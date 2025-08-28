import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaUser, FaBriefcase, FaComment, FaPaperPlane } from 'react-icons/fa';
import apiClient from '../utils/apiClient';

const FeedbackForm = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        designation: '',
        feedback: '',
        rating: 5
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRatingChange = (rating) => {
        setFormData({
            ...formData,
            rating
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const result = await apiClient.submitForm('feedback', formData);

            setIsSubmitting(false);

            if (result.success) {
                setSubmitted(true);
                setTimeout(() => {
                    setSubmitted(false);
                    setFormData({
                        name: '',
                        designation: '',
                        feedback: '',
                        rating: 5
                    });
                    onClose();
                }, 2000);
            } else {
                console.error('Feedback submission failed:', result.error);

                // Store locally as fallback
                const feedbackData = {
                    id: Date.now().toString(36) + Math.random().toString(36).substr(2),
                    ...formData,
                    timestamp: new Date().toISOString(),
                    fromLocalStorage: true
                };

                const existingFeedback = JSON.parse(localStorage.getItem('b4-testimonials') || '[]');
                existingFeedback.push({
                    id: feedbackData.id,
                    name: formData.name,
                    about: formData.feedback,
                    post: formData.designation,
                    rating: formData.rating,
                    createdAt: feedbackData.timestamp
                });
                localStorage.setItem('b4-testimonials', JSON.stringify(existingFeedback));

                alert('Your feedback has been saved locally! We will sync it with our servers when they are available.');
                setSubmitted(true);
                setTimeout(() => {
                    setSubmitted(false);
                    setFormData({
                        name: '',
                        designation: '',
                        feedback: '',
                        rating: 5
                    });
                    onClose();
                }, 2000);
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
            setIsSubmitting(false);

            // Emergency fallback - save to localStorage
            const feedbackData = {
                id: Date.now().toString(36) + Math.random().toString(36).substr(2),
                ...formData,
                timestamp: new Date().toISOString(),
                fromLocalStorage: true
            };

            try {
                const existingFeedback = JSON.parse(localStorage.getItem('b4-testimonials') || '[]');
                existingFeedback.push({
                    id: feedbackData.id,
                    name: formData.name,
                    about: formData.feedback,
                    post: formData.designation,
                    rating: formData.rating,
                    createdAt: feedbackData.timestamp
                });
                localStorage.setItem('b4-testimonials', JSON.stringify(existingFeedback));

                alert('Server is temporarily unavailable, but your feedback has been saved locally! We will sync it when the server is back online.');
                setSubmitted(true);
                setTimeout(() => {
                    setSubmitted(false);
                    setFormData({
                        name: '',
                        designation: '',
                        feedback: '',
                        rating: 5
                    });
                    onClose();
                }, 2000);
            } catch (localError) {
                console.error('Failed to save locally:', localError);
                alert('Failed to submit feedback. Please try again later or contact us directly.');
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white p-6 rounded-t-2xl">
                    <h2 className="text-2xl font-bold mb-2">Share Your Experience</h2>
                    <p className="opacity-90">Help us improve by sharing your feedback</p>
                </div>

                {/* Content */}
                <div className="p-6">
                    {submitted ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-8"
                        >
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Thank You!</h3>
                            <p className="text-gray-600">Your feedback has been submitted successfully.</p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Field */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    <FaUser className="inline w-4 h-4 mr-2" />
                                    Your Name *
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

                            {/* Designation Field */}
                            <div>
                                <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-2">
                                    <FaBriefcase className="inline w-4 h-4 mr-2" />
                                    Your Role/Position
                                </label>
                                <input
                                    type="text"
                                    id="designation"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-300"
                                    placeholder="e.g., Homeowner, Business Owner, etc."
                                />
                            </div>

                            {/* Rating Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Rating *
                                </label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => handleRatingChange(star)}
                                            className={`text-3xl transition-colors duration-200 ${
                                                star <= formData.rating
                                                    ? 'text-yellow-400 hover:text-yellow-500'
                                                    : 'text-gray-300 hover:text-yellow-300'
                                            }`}
                                        >
                                            <FaStar />
                                        </button>
                                    ))}
                                    <span className="ml-3 text-sm text-gray-600 self-center">
                                        {formData.rating} star{formData.rating !== 1 ? 's' : ''}
                                    </span>
                                </div>
                            </div>

                            {/* Feedback Field */}
                            <div>
                                <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                                    <FaComment className="inline w-4 h-4 mr-2" />
                                    Your Feedback *
                                </label>
                                <textarea
                                    id="feedback"
                                    name="feedback"
                                    value={formData.feedback}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-300 resize-none"
                                    placeholder="Share your experience working with B4 Brothers Infratech..."
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <FaPaperPlane className="w-4 h-4 mr-2" />
                                            Submit Feedback
                                        </>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default FeedbackForm;
