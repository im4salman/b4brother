import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAnalytics } from '../contexts/AnalyticsContext';
import {
    FaUsers,
    FaAward,
    FaShieldAlt,
    FaHeart,
    FaHandshake,
    FaLeaf,
    FaCheckCircle,
    FaHome,
    FaBuilding,
    FaWrench,
    FaPaintRoller,
    FaKey,
    FaHardHat,
    FaWhatsapp,
    FaPhone,
    FaArrowLeft,
    FaUser,
    FaEnvelope,
    FaBriefcase,
    FaGraduationCap
} from 'react-icons/fa';

const CareerPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        education: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { trackFormSubmission, trackWhatsAppRedirect, trackClick } = useAnalytics();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Track form submission
        trackFormSubmission('career_application', formData);

        // Create WhatsApp message
        const message = `*Career Application - B4 Brothers Infratech PVT LTD*%0A%0A` +
            `*Name:* ${encodeURIComponent(formData.name)}%0A` +
            `*Email:* ${encodeURIComponent(formData.email)}%0A` +
            `*Phone:* ${encodeURIComponent(formData.phone)}%0A` +
            `*Position:* ${encodeURIComponent(formData.position)}%0A` +
            `*Experience:* ${encodeURIComponent(formData.experience)}%0A` +
            `*Education:* ${encodeURIComponent(formData.education)}%0A` +
            `*Message:* ${encodeURIComponent(formData.message)}%0A%0A` +
            `Thank you for considering me for a position at your company.`;

        // Simulate form processing
        setTimeout(() => {
            setIsSubmitting(false);

            // Track WhatsApp redirect
            trackWhatsAppRedirect(message, formData);

            // Open WhatsApp with the message
            window.open(`https://wa.me/919733221114?text=${message}`, '_blank');

            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                position: '',
                experience: '',
                education: '',
                message: ''
            });

            alert('Thank you for your application! You will be redirected to WhatsApp to complete your submission.');
        }, 1500);
    };

    const coreValues = [
        {
            icon: <FaAward className="w-8 h-8" />,
            title: "Quality & Precision",
            description: "Every detail matters in delivering exceptional construction standards"
        },
        {
            icon: <FaShieldAlt className="w-8 h-8" />,
            title: "Safety First",
            description: "Prioritizing the wellbeing of our team and clients above all"
        },
        {
            icon: <FaHeart className="w-8 h-8" />,
            title: "Client Satisfaction",
            description: "Going beyond expectations to ensure complete client happiness"
        },
        {
            icon: <FaHandshake className="w-8 h-8" />,
            title: "Transparent Communication",
            description: "Open, honest dialogue throughout every project phase"
        },
        {
            icon: <FaLeaf className="w-8 h-8" />,
            title: "Sustainable Practices",
            description: "Building responsibly for future generations"
        }
    ];

    const benefits = [
        "Competitive Salary Package",
        "Health Insurance Coverage", 
        "Professional Development Programs",
        "Performance-based Bonuses",
        "Flexible Working Hours",
        "Career Growth Opportunities",
        "Annual Leave Benefits",
        "Training & Certification Support"
    ];

    const openPositions = [
        {
            title: "Civil Engineer",
            experience: "2-5 years",
            location: "West Bengal",
            type: "Full-time"
        },
        {
            title: "Site Supervisor",
            experience: "3-7 years",
            location: "West Bengal",
            type: "Full-time"
        },
        {
            title: "Architect",
            experience: "1-4 years",
            location: "West Bengal",
            type: "Full-time"
        },
        {
            title: "Project Manager",
            experience: "5-10 years",
            location: "West Bengal",
            type: "Full-time"
        },
        {
            title: "Construction Worker",
            experience: "1-3 years",
            location: "West Bengal",
            type: "Full-time"
        },
        {
            title: "Interior Designer",
            experience: "2-6 years",
            location: "West Bengal",
            type: "Full-time"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50">
            {/* Header */}
            <div className="bg-secondary-800 text-white py-4 px-6">
                <div className="container mx-auto flex items-center justify-between">
                    <button
                        onClick={() => {
                            window.history.pushState(null, '', '/');
                            window.dispatchEvent(new PopStateEvent('popstate'));
                        }}
                        className="flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors"
                    >
                        <FaArrowLeft className="w-4 h-4" />
                        Back to Main Site
                    </button>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold">B4 Brothers Infratech PVT LTD</h1>
                        <p className="text-primary-400 font-bold italic">"Believe in best builds bold"</p>
                    </div>
                    <div></div>
                </div>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="py-20"
            >
                <div className="container mx-auto px-4 lg:px-8">
                    {/* Header with Tagline */}
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                            <FaUsers className="w-4 h-4" />
                            Join Our Team
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat text-secondary-800 mb-6">
                            Careers at B4 Brothers
                        </h1>
                        <h2 className="text-xl md:text-2xl font-semibold text-gray-600 uppercase tracking-wider mb-4">
                            Infratech PVT LTD
                        </h2>
                        <div className="text-2xl md:text-3xl font-bold italic text-primary-600 mb-4">
                            "Believe in best builds bold"
                        </div>
                        <p className="text-lg text-secondary-600 max-w-3xl mx-auto leading-relaxed">
                            Join a team that's passionate about creating exceptional structures and lasting relationships. 
                            Build your career with us as we build dreams into reality.
                        </p>
                    </motion.div>

                    {/* Application Form */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-white rounded-2xl shadow-medium p-8 md:p-12">
                                <h2 className="text-3xl font-bold font-montserrat text-secondary-800 mb-8 text-center">
                                    Apply for a Position
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-2">
                                                <FaUser className="inline w-4 h-4 mr-2" />
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
                                            <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                                                <FaEnvelope className="inline w-4 h-4 mr-2" />
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
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 mb-2">
                                                <FaPhone className="inline w-4 h-4 mr-2" />
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
                                        <div>
                                            <label htmlFor="position" className="block text-sm font-medium text-secondary-700 mb-2">
                                                <FaBriefcase className="inline w-4 h-4 mr-2" />
                                                Position Applied For *
                                            </label>
                                            <select
                                                id="position"
                                                name="position"
                                                value={formData.position}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-300"
                                            >
                                                <option value="">Select a position</option>
                                                {openPositions.map((position, index) => (
                                                    <option key={index} value={position.title}>{position.title}</option>
                                                ))}
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="experience" className="block text-sm font-medium text-secondary-700 mb-2">
                                                <FaBriefcase className="inline w-4 h-4 mr-2" />
                                                Years of Experience
                                            </label>
                                            <select
                                                id="experience"
                                                name="experience"
                                                value={formData.experience}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-300"
                                            >
                                                <option value="">Select experience</option>
                                                <option value="0-1 years">0-1 years</option>
                                                <option value="1-3 years">1-3 years</option>
                                                <option value="3-5 years">3-5 years</option>
                                                <option value="5-10 years">5-10 years</option>
                                                <option value="10+ years">10+ years</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="education" className="block text-sm font-medium text-secondary-700 mb-2">
                                                <FaGraduationCap className="inline w-4 h-4 mr-2" />
                                                Education
                                            </label>
                                            <select
                                                id="education"
                                                name="education"
                                                value={formData.education}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-300"
                                            >
                                                <option value="">Select education</option>
                                                <option value="High School">High School</option>
                                                <option value="Diploma">Diploma</option>
                                                <option value="Bachelor's">Bachelor's Degree</option>
                                                <option value="Master's">Master's Degree</option>
                                                <option value="PhD">PhD</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-2">
                                            Cover Letter / Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all duration-300 resize-none"
                                            placeholder="Tell us about yourself, your skills, and why you want to join our team..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed text-lg py-4"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Submitting Application...
                                            </>
                                        ) : (
                                            <>
                                                <FaWhatsapp className="w-5 h-5 mr-2" />
                                                Submit Application via WhatsApp
                                            </>
                                        )}
                                    </button>

                                    <p className="text-xs text-secondary-500 text-center">
                                        Your application will be sent via WhatsApp for immediate processing. We will contact you within 24 hours.
                                    </p>
                                </form>
                            </div>
                        </div>
                    </motion.div>

                    {/* Open Positions */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <h2 className="text-3xl font-bold font-montserrat text-secondary-800 mb-12 text-center">
                            Current Job Openings
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {openPositions.map((position, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 p-6 border border-gray-100"
                                >
                                    <h3 className="text-xl font-semibold text-secondary-800 mb-3">
                                        {position.title}
                                    </h3>
                                    <div className="space-y-2 text-sm text-secondary-600">
                                        <p><strong>Experience:</strong> {position.experience}</p>
                                        <p><strong>Location:</strong> {position.location}</p>
                                        <p><strong>Type:</strong> {position.type}</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            trackClick(`Apply for ${position.title}`, 'Career Page Job Listing');
                                            setFormData({...formData, position: position.title});
                                        }}
                                        className="mt-4 w-full bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg transition-colors"
                                    >
                                        Apply for this Position
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Core Values */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <h2 className="text-3xl font-bold font-montserrat text-secondary-800 mb-12 text-center">
                            Our Core Values
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {coreValues.map((value, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 p-8 text-center group hover:scale-105"
                                >
                                    <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-500 transition-colors duration-300">
                                        <div className="text-primary-500 group-hover:text-white transition-colors duration-300">
                                            {value.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-semibold text-secondary-800 mb-3 font-montserrat">
                                        {value.title}
                                    </h3>
                                    <p className="text-secondary-600 leading-relaxed">
                                        {value.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Benefits */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <div className="bg-secondary-800 rounded-2xl shadow-medium p-8 md:p-12 text-white">
                            <h2 className="text-3xl font-bold font-montserrat mb-8 text-center">
                                Employee Benefits
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {benefits.map((benefit, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        className="flex items-center gap-3 bg-white/10 rounded-lg p-4 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                                    >
                                        <FaCheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                                        <span className="font-medium">{benefit}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Section */}
                    <motion.div variants={itemVariants} className="text-center">
                        <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 md:p-12">
                            <h2 className="text-3xl font-bold font-montserrat text-secondary-800 mb-6">
                                Ready to Build Your Career?
                            </h2>
                            <p className="text-lg text-secondary-600 mb-8 max-w-2xl mx-auto">
                                Join our growing team of construction professionals and be part of projects that shape communities 
                                and create lasting impact.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="https://wa.me/919733221114?text=Hi%2C%20I%20am%20interested%20in%20career%20opportunities%20at%20B4%20Brothers%20Infratech%20PVT%20LTD.%20Please%20share%20more%20details."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => {
                                        trackClick('Apply via WhatsApp', 'Career Page CTA');
                                        trackWhatsAppRedirect('Hi, I am interested in career opportunities at B4 Brothers Infratech PVT LTD. Please share more details.');
                                    }}
                                    className="btn-primary inline-flex items-center gap-2 shadow-medium hover:shadow-glow"
                                >
                                    <FaWhatsapp className="w-5 h-5" />
                                    Apply via WhatsApp
                                </a>
                                <a
                                    href="tel:+919733221114"
                                    onClick={() => trackClick('Call HR', 'Career Page CTA')}
                                    className="btn-secondary inline-flex items-center gap-2"
                                >
                                    <FaPhone className="w-4 h-4" />
                                    Call HR: +91 97332 21114
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default CareerPage;
