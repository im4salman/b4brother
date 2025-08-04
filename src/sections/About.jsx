import React from 'react';
import { motion } from 'framer-motion';
import { slideUpVariants, zoomInVariants } from './animation';

const About = () => {
    return (
        <section id='about' className='w-full bg-secondary-800 py-20 md:py-32'>
            <div className='container mx-auto px-6 lg:px-8'>
                <div className='flex lg:flex-row flex-col justify-between items-start gap-12 lg:gap-16'>
                    <motion.div
                        initial='hidden'
                        whileInView='visible'
                        variants={slideUpVariants}
                        className='lg:w-[60%] w-full flex flex-col justify-center items-start gap-6'
                    >
                        <motion.span
                            variants={slideUpVariants}
                            className='text-primary-400 uppercase text-sm md:text-base tracking-wider font-medium mb-4 block'
                        >
                            Welcome to
                        </motion.span>
                        <motion.h1
                            variants={slideUpVariants}
                            className='text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase font-montserrat leading-tight'
                        >
                            B4 <span className="text-primary-500">Brothers</span>
                        </motion.h1>
                        <motion.h2
                            variants={slideUpVariants}
                            className='text-lg md:text-xl lg:text-2xl font-semibold text-gray-300 uppercase tracking-wider mb-6'
                        >
                            Infratech PVT LTD
                        </motion.h2>
                        <motion.div
                            variants={zoomInVariants}
                            className='w-24 h-1 bg-primary-500 rounded-full mb-4'
                        />
                        <motion.p
                            variants={slideUpVariants}
                            className='text-2xl md:text-3xl italic text-primary-400 font-bold mb-8'
                        >
                            "Believe in best builds bold"
                        </motion.p>
                        <motion.p
                            variants={slideUpVariants}
                            className='text-xl md:text-2xl text-gray-300 font-light'
                        >
                            Your Trusted Partner in Construction for Over 5+ Years
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial='hidden'
                        whileInView='visible'
                        variants={slideUpVariants}
                        className='lg:w-[40%] w-full flex flex-col justify-center items-start gap-6'
                    >
                        <motion.p
                            variants={slideUpVariants}
                            className='text-gray-300 text-lg leading-relaxed'
                        >
                            With a wealth of experience in the construction industry, B4 Brothers Infratech PVT LTD leads the way in delivering
                            quality, safety, and reliability. Our team of experts is dedicated to providing the highest
                            standards in every project, big or small.
                        </motion.p>
                        <motion.p
                            variants={slideUpVariants}
                            className='text-gray-300 text-lg leading-relaxed'
                        >
                            Explore our extensive portfolio and discover why we are the go-to builders for
                            projects across the region.
                        </motion.p>
                        <motion.a
                            variants={zoomInVariants}
                            href="#services"
                            className='btn-primary inline-flex items-center group mt-4'
                        >
                            Learn More About Us
                            <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
