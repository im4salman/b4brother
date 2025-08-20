import React from 'react';
import { motion } from 'framer-motion';
import { slideUpVariants, zoomInVariants } from './animation';

const About = () => {
    return (
        <section id='about' className='w-full bg-gradient-to-b from-white via-gray-50/50 to-white py-24 md:py-32'>
            <div className='container mx-auto px-6 lg:px-8'>
                {/* Section Header */}
                <motion.div
                    initial='hidden'
                    whileInView='visible'
                    variants={slideUpVariants}
                    className='text-center mb-20'
                >
                    <div className="inline-flex items-center space-x-3 bg-primary-50 rounded-full px-6 py-2 mb-6">
                        <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                        <span className="text-primary-700 text-sm font-medium tracking-wide">About Excellence</span>
                    </div>
                    <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-secondary-900 mb-6 leading-tight'>
                        Crafting <span className="text-primary-600">Architectural</span> Excellence
                    </h2>
                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent mx-auto mb-8"></div>
                </motion.div>

                <div className='grid lg:grid-cols-12 gap-8 lg:gap-16 items-center'>
                    <motion.div
                        initial='hidden'
                        whileInView='visible'
                        variants={slideUpVariants}
                        className='lg:col-span-7 space-y-8 lg:space-y-12'
                    >
                        {/* Main Content */}
                        <div className='space-y-8'>
                            <motion.div variants={slideUpVariants} className='space-y-6'>
                                <h3 className='text-2xl md:text-3xl font-bold text-secondary-900 font-space'>
                                    Building Dreams with <span className="text-primary-600">Bold Vision</span>
                                </h3>
                                <p className='text-lg text-secondary-700 leading-relaxed font-inter'>
                                    At B4Brothers, we transform architectural visions into extraordinary realities. 
                                    With over 5 years of dedicated craftsmanship, we've established ourselves as 
                                    leaders in premium construction and design excellence.
                                </p>
                            </motion.div>

                            <motion.div variants={slideUpVariants} className='space-y-6'>
                                <p className='text-secondary-600 leading-relaxed'>
                                    Our commitment to "Believe in best builds bold" isn't just a tagline—it's our 
                                    philosophy. Every project represents our dedication to innovation, quality, and 
                                    the bold pursuit of architectural perfection.
                                </p>
                            </motion.div>

                            {/* Key Features */}
                            <motion.div variants={slideUpVariants} className='grid md:grid-cols-2 gap-6'>
                                {[
                                    { title: 'Innovative Design', desc: 'Cutting-edge architectural solutions' },
                                    { title: 'Quality Craftsmanship', desc: 'Meticulous attention to every detail' },
                                    { title: 'Timely Delivery', desc: 'Projects completed on schedule' },
                                    { title: 'Licensed & Insured', desc: 'Fully compliant and protected' }
                                ].map((feature, idx) => (
                                    <div key={idx} className='bg-white rounded-2xl p-6 shadow-soft border border-gray-100 hover:shadow-medium transition-all duration-300'>
                                        <h4 className='font-semibold text-secondary-900 mb-2'>{feature.title}</h4>
                                        <p className='text-sm text-secondary-600'>{feature.desc}</p>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Column - Premium Stats & CTA */}
                    <motion.div
                        initial='hidden'
                        whileInView='visible'
                        variants={slideUpVariants}
                        className='lg:col-span-5 space-y-8'
                    >
                        {/* Premium Stats Card */}
                        <div className='bg-gradient-to-br from-secondary-900 to-secondary-800 rounded-3xl p-8 text-white shadow-hard'>
                            <h4 className='text-xl font-bold mb-6 font-space'>Excellence in Numbers</h4>
                            <div className='grid grid-cols-2 gap-6'>
                                <div className='text-center'>
                                    <div className='text-3xl font-bold text-primary-400 mb-2'>150+</div>
                                    <div className='text-sm text-gray-300'>Projects Delivered</div>
                                </div>
                                <div className='text-center'>
                                    <div className='text-3xl font-bold text-accent-400 mb-2'>4.9★</div>
                                    <div className='text-sm text-gray-300'>Client Rating</div>
                                </div>
                                <div className='text-center'>
                                    <div className='text-3xl font-bold text-primary-400 mb-2'>5+</div>
                                    <div className='text-sm text-gray-300'>Years Experience</div>
                                </div>
                                <div className='text-center'>
                                    <div className='text-3xl font-bold text-accent-400 mb-2'>100%</div>
                                    <div className='text-sm text-gray-300'>Quality Assured</div>
                                </div>
                            </div>
                        </div>

                        {/* Premium CTA */}
                        <div className='space-y-6'>
                            <h4 className='text-xl font-bold text-secondary-900 font-space'>Ready to Build Bold?</h4>
                            <p className='text-secondary-600 leading-relaxed'>
                                Join 150+ satisfied clients who trusted us with their construction dreams. 
                                Let's create something extraordinary together.
                            </p>
                            <div className='space-y-4'>
                                <motion.a
                                    variants={zoomInVariants}
                                    href="#contact"
                                    className='block w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:scale-105'
                                >
                                    Start Your Project
                                </motion.a>
                                <motion.a
                                    variants={zoomInVariants}
                                    href="#projects"
                                    className='block w-full border-2 border-secondary-200 hover:border-primary-500 text-secondary-700 hover:text-primary-600 font-semibold py-4 px-6 rounded-xl transition-all duration-300 text-center'
                                >
                                    View Our Portfolio
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
