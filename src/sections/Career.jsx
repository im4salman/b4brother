import React from 'react';
import { motion } from 'framer-motion';
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
    FaHardHat
} from 'react-icons/fa';

const Career = () => {
    const coreValues = [
        {
            icon: <FaAward className="w-6 h-6" />,
            title: "Quality & Precision",
            description: "Every detail matters in delivering exceptional construction standards"
        },
        {
            icon: <FaShieldAlt className="w-6 h-6" />,
            title: "Safety First",
            description: "Prioritizing the wellbeing of our team and clients above all"
        },
        {
            icon: <FaHeart className="w-6 h-6" />,
            title: "Client Satisfaction",
            description: "Going beyond expectations to ensure complete client happiness"
        },
        {
            icon: <FaHandshake className="w-6 h-6" />,
            title: "Transparent Communication",
            description: "Open, honest dialogue throughout every project phase"
        },
        {
            icon: <FaLeaf className="w-6 h-6" />,
            title: "Sustainable Practices",
            description: "Building responsibly for future generations"
        }
    ];

    const whyChooseUs = [
        "On-Time Delivery",
        "Transparent Costing", 
        "Skilled & Certified Team",
        "Modern Equipment",
        "Warranty & After-Support",
        "100+ Happy Clients"
    ];

    const services = [
        {
            icon: <FaHome className="w-8 h-8" />,
            title: "Residential Construction",
            description: "From luxury villas to affordable housing, we design and build homes that last for generations."
        },
        {
            icon: <FaBuilding className="w-8 h-8" />,
            title: "Commercial Projects",
            description: "Warehouses, office buildings, showrooms, retail spaces—built for function and elegance."
        },
        {
            icon: <FaWrench className="w-8 h-8" />,
            title: "Renovation & Remodeling",
            description: "Transform your space with expert renovation, remodeling, and structural upgrades."
        },
        {
            icon: <FaPaintRoller className="w-8 h-8" />,
            title: "Interior Fit-Out",
            description: "Complete interior solutions including electrical, plumbing, flooring, and finishing."
        },
        {
            icon: <FaKey className="w-8 h-8" />,
            title: "Turnkey Projects",
            description: "We handle everything from design to handover—ready-to-move-in solutions for your convenience."
        },
        {
            icon: <FaHardHat className="w-8 h-8" />,
            title: "Civil & Structural Engineering",
            description: "From foundation to roof, we ensure your building is structurally sound and code-compliant."
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
        <section id="career" className="py-20 bg-gradient-to-br from-gray-50 via-white to-primary-50">
            <div className="container mx-auto px-4 lg:px-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="max-w-6xl mx-auto"
                >
                    {/* Header with Tagline */}
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                            <FaUsers className="w-4 h-4" />
                            Join Our Team
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-secondary-800 mb-4">
                            Careers at B4 Brothers
                        </h1>
                        <h2 className="text-xl md:text-2xl font-semibold text-gray-600 uppercase tracking-wider mb-6">
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

                    {/* Who We Are Section */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <div className="bg-white rounded-2xl shadow-soft p-8 md:p-12">
                            <h2 className="text-3xl font-bold font-montserrat text-secondary-800 mb-6 text-center">
                                Who We Are
                            </h2>
                            <p className="text-lg text-secondary-600 leading-relaxed text-center max-w-4xl mx-auto">
                                B4 Brothers Infratech PVT LTD is a trusted construction company with over <strong className="text-primary-600">5+ years of experience</strong> in delivering
                                residential, commercial, and infrastructure projects. Our team of engineers, architects, and skilled laborers
                                work together to bring your vision to life with precision and dedication.
                            </p>
                        </div>
                    </motion.div>

                    {/* Mission Section */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl shadow-medium p-8 md:p-12 text-white">
                            <h2 className="text-3xl font-bold font-montserrat mb-6 text-center">
                                Our Mission
                            </h2>
                            <p className="text-xl leading-relaxed text-center max-w-4xl mx-auto">
                                To deliver high-quality construction solutions that exceed client expectations while ensuring 
                                on-time delivery and cost efficiency.
                            </p>
                        </div>
                    </motion.div>

                    {/* Core Values Section */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <h2 className="text-3xl font-bold font-montserrat text-secondary-800 mb-12 text-center">
                            Our Core Values
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {coreValues.map((value, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 p-6 text-center group hover:scale-105"
                                >
                                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-500 transition-colors duration-300">
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

                    {/* Why Choose Us Section */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <div className="bg-secondary-800 rounded-2xl shadow-medium p-8 md:p-12 text-white">
                            <h2 className="text-3xl font-bold font-montserrat mb-8 text-center">
                                Why Choose Us?
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {whyChooseUs.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        className="flex items-center gap-3 bg-white/10 rounded-lg p-4 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                                    >
                                        <FaCheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                                        <span className="font-medium">{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Services Section */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <h2 className="text-3xl font-bold font-montserrat text-secondary-800 mb-12 text-center">
                            Our Services
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 p-8 text-center group hover:scale-105"
                                >
                                    <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:from-primary-500 group-hover:to-accent-500 transition-all duration-300">
                                        <div className="text-primary-500 group-hover:text-white transition-colors duration-300">
                                            {service.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-semibold text-secondary-800 mb-4 font-montserrat">
                                        {service.title}
                                    </h3>
                                    <p className="text-secondary-600 leading-relaxed">
                                        {service.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Join Our Team CTA */}
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
                                <button
                                    onClick={() => window.open('/career', '_blank')}
                                    className="btn-primary inline-flex items-center gap-2 shadow-medium hover:shadow-glow"
                                >
                                    <FaUsers className="w-4 h-4" />
                                    View Career Opportunities
                                </button>
                                <a
                                    href="https://wa.me/919733221114?text=Hi%2C%20I%20am%20interested%20in%20career%20opportunities%20at%20B4%20Brothers%20Infratech%20PVT%20LTD."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-secondary inline-flex items-center gap-2"
                                >
                                    <FaHandshake className="w-4 h-4" />
                                    Contact via WhatsApp
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Career;
