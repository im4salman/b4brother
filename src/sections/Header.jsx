import React, { useState, useEffect } from 'react';
import { FaBars, FaXmark, FaPhone, FaWhatsapp } from 'react-icons/fa6';
import { Link } from 'react-scroll';
import Modal from './Modal';
import logoIcon from '../assets/b4-logo-bold.svg';
import '../components/LogoStyles.css';
import { useAnalytics } from '../contexts/AnalyticsContext';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { trackClick, trackWhatsAppRedirect } = useAnalytics();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const navItem = [
        { link: 'Home', path: 'home', isExternal: false },
        { link: 'About', path: 'about', isExternal: false },
        { link: 'Services', path: 'services', isExternal: false },
        { link: 'Projects', path: 'projects', isExternal: false },
        { link: 'Careers', path: '/career', isExternal: true },
        { link: 'Contact', path: 'contact', isExternal: false },
    ];

    const handleNavigation = (path) => {
        window.history.pushState(null, '', path);
        window.dispatchEvent(new PopStateEvent('popstate'));
        setIsMenuOpen(false);
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
                    isScrolled
                        ? 'bg-white/98 backdrop-blur-xl border-b border-gray-100/30 shadow-lg py-4'
                        : 'bg-white/95 backdrop-blur-lg border-b border-white/20 shadow-sm py-5'
                }`}
                role="banner"
            >
                <div className="container mx-auto px-6 lg:px-12 xl:px-16">
                    <nav
                        className="flex justify-between items-center h-16"
                        role="navigation"
                        aria-label="Main navigation"
                    >
                        {/* Premium Logo Section */}
                        <Link
                            to="home"
                            smooth={true}
                            duration={500}
                            className="cursor-pointer group flex items-center gap-4 hover:opacity-90 transition-all duration-300"
                            aria-label="B4Brothers homepage"
                        >
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className={`transition-all duration-700 ${isScrolled ? 'p-2' : 'p-2.5'} bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl border border-primary-100/50`}>
                                        <img
                                            src={logoIcon}
                                            alt="B4Brothers Logo"
                                            className={`transition-all duration-700 flex-shrink-0 ${
                                                isScrolled ? 'h-8 w-8' : 'h-9 w-9'
                                            }`}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <div className={`font-space font-bold text-secondary-900 transition-all duration-700 tracking-tight leading-none ${
                                        isScrolled ? 'text-xl' : 'text-2xl'
                                    }`}>
                                        <span className="text-primary-600">B4</span><span className="text-secondary-800">Brothers</span>
                                    </div>
                                    <div className={`font-inter font-medium text-secondary-600 transition-all duration-700 tracking-wide leading-tight mt-0.5 ${
                                        isScrolled ? 'text-xs' : 'text-sm'
                                    }`}>
                                        Believe in best builds bold
                                    </div>
                                </div>
                            </div>
                        </Link>

                        {/* Premium Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-8 xl:gap-12">
                            {/* Navigation Menu */}
                            <ul className="flex items-center gap-8 xl:gap-10" role="menubar">
                                {navItem.map((item, index) => (
                                    <li key={index} role="none">
                                        {item.isExternal ? (
                                            <button
                                                onClick={() => handleNavigation(item.path)}
                                                className="nav-link relative text-secondary-700 hover:text-primary-600 font-inter font-semibold text-sm transition-all duration-400 cursor-pointer group py-3 px-5 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 border border-transparent hover:border-primary-100"
                                                role="menuitem"
                                                tabIndex={0}
                                            >
                                                <span className="relative z-10">{item.link}</span>
                                                <span className="absolute bottom-2 left-5 right-5 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 rounded-full" />
                                            </button>
                                        ) : (
                                            <Link
                                                to={item.path}
                                                className="nav-link relative text-secondary-700 hover:text-primary-600 font-inter font-semibold text-sm transition-all duration-400 cursor-pointer group py-3 px-5 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 border border-transparent hover:border-primary-100"
                                                spy={true}
                                                smooth={true}
                                                offset={-100}
                                                duration={500}
                                                activeClass="text-primary-600 bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200"
                                                role="menuitem"
                                                tabIndex={0}
                                            >
                                                <span className="relative z-10">{item.link}</span>
                                                <span className="absolute bottom-2 left-5 right-5 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 rounded-full" />
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>

                            {/* Elegant Divider */}
                            <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>

                            {/* Premium CTA Section */}
                            <div className="flex items-center gap-4">
                                {/* Premium Phone Button */}
                                <a
                                    href="tel:+919733221114"
                                    onClick={() => trackClick('Phone Call', 'Header Desktop')}
                                    className="group flex items-center gap-3 text-secondary-700 hover:text-primary-600 font-medium transition-all duration-400 py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-primary-50 border border-transparent hover:border-gray-200"
                                    aria-label="Call us at +91 97332 21114"
                                >
                                    <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-accent-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-primary-200/50">
                                        <FaPhone className="w-4 h-4 text-primary-600" />
                                    </div>
                                    <div className="hidden xl:block">
                                        <div className="text-xs text-secondary-500 uppercase tracking-wider font-medium">Call Now</div>
                                        <div className="text-sm font-bold text-secondary-800">+91 97332 21114</div>
                                    </div>
                                </a>

                                {/* Premium Quote Button */}
                                <button
                                    onClick={() => {
                                        trackClick('Free Quote Button', 'Header Desktop');
                                        openModal();
                                    }}
                                    className="group relative bg-gradient-to-r from-primary-500 via-primary-600 to-accent-500 hover:from-accent-500 hover:via-primary-600 hover:to-primary-500 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-500 shadow-lg hover:shadow-2xl text-sm flex items-center gap-3 transform hover:scale-105 overflow-hidden border border-primary-400/20"
                                    aria-label="Get premium construction quote"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-primary-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <FaWhatsapp className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                                    <span className="hidden xl:inline relative z-10 tracking-wide">Free Quote</span>
                                    <span className="xl:hidden relative z-10">Quote</span>
                                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                                </button>
                            </div>
                        </div>

                        {/* Premium Mobile Actions */}
                        <div className="lg:hidden flex items-center gap-3">
                            {/* Premium Mobile Call Button */}
                            <a
                                href="tel:+919733221114"
                                onClick={() => trackClick('Phone Call', 'Header Mobile')}
                                className="w-12 h-12 bg-gradient-to-br from-primary-100 to-accent-100 hover:from-primary-500 hover:to-accent-500 rounded-2xl flex items-center justify-center transition-all duration-400 group border border-primary-200/50 shadow-sm hover:shadow-lg"
                                aria-label="Call us"
                            >
                                <FaPhone className="w-4 h-4 text-primary-600 group-hover:text-white transition-colors duration-300" />
                            </a>

                            {/* Premium Mobile Menu Button */}
                            <button
                                onClick={toggleMenu}
                                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-400 border shadow-sm hover:shadow-lg ${
                                    isMenuOpen
                                        ? 'bg-gradient-to-br from-accent-500 to-primary-500 text-white border-accent-400'
                                        : 'bg-gradient-to-br from-secondary-100 to-gray-100 hover:from-primary-500 hover:to-accent-500 text-secondary-700 hover:text-white border-gray-200'
                                }`}
                                aria-label="Toggle navigation menu"
                                aria-expanded={isMenuOpen}
                                aria-controls="mobile-menu"
                            >
                                {isMenuOpen ? <FaXmark className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
                            </button>
                        </div>
                    </nav>
                </div>

                {/* Premium Mobile Menu */}
                <div
                    id="mobile-menu"
                    className={`lg:hidden transition-all duration-700 overflow-hidden bg-white/98 backdrop-blur-xl border-t border-gray-100/50 shadow-xl ${
                        isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                    }`}
                    aria-hidden={!isMenuOpen}
                >
                    <div className="container mx-auto px-6 py-8">
                        <ul className="flex flex-col gap-2 mb-6" role="menu">
                            {navItem.map((item, index) => (
                                <li key={index} role="none">
                                    {item.isExternal ? (
                                        <button
                                            onClick={() => handleNavigation(item.path)}
                                            className="block w-full text-left text-secondary-700 hover:text-primary-500 hover:bg-primary-50 font-medium text-lg py-4 px-4 rounded-xl transition-all duration-300 border-l-4 border-transparent hover:border-primary-500"
                                            role="menuitem"
                                            tabIndex={isMenuOpen ? 0 : -1}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span>{item.link}</span>
                                                <svg className="w-5 h-5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </button>
                                    ) : (
                                        <Link
                                            to={item.path}
                                            className="block text-secondary-700 hover:text-primary-500 hover:bg-primary-50 font-medium text-lg py-4 px-4 rounded-xl transition-all duration-300 border-l-4 border-transparent hover:border-primary-500"
                                            spy={true}
                                            smooth={true}
                                            offset={-100}
                                            duration={500}
                                            onClick={closeMenu}
                                            role="menuitem"
                                            tabIndex={isMenuOpen ? 0 : -1}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span>{item.link}</span>
                                                <svg className="w-5 h-5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>

                        {/* Mobile Contact Section */}
                        <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-4 space-y-4">
                            <div className="text-center">
                                <h3 className="font-semibold text-secondary-800 mb-1">Ready to Build?</h3>
                                <p className="text-sm text-secondary-600">Get your free quote today</p>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3">
                                <a
                                    href="tel:+919733221114"
                                    onClick={() => trackClick('Phone Call', 'Mobile Menu')}
                                    className="flex flex-col items-center gap-2 bg-white text-secondary-700 hover:text-primary-500 font-medium py-3 px-4 rounded-xl hover:bg-gray-50 transition-all duration-300 border border-gray-200"
                                    tabIndex={isMenuOpen ? 0 : -1}
                                    aria-label="Call us at +91 97332 21114"
                                >
                                    <FaPhone className="w-5 h-5" />
                                    <span className="text-sm">Call Now</span>
                                </a>
                                <button
                                    onClick={() => {
                                        trackClick('Free Quote Button', 'Mobile Menu');
                                        closeMenu();
                                        openModal();
                                    }}
                                    className="flex flex-col items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 shadow-medium"
                                    tabIndex={isMenuOpen ? 0 : -1}
                                    aria-label="Get free quote"
                                >
                                    <FaWhatsapp className="w-5 h-5" />
                                    <span className="text-sm">Get Quote</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile menu backdrop */}
                {isMenuOpen && (
                    <div 
                        className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1]"
                        onClick={closeMenu}
                        aria-hidden="true"
                    />
                )}
            </header>

            {/* Sticky WhatsApp CTA for Mobile */}
            <div className="lg:hidden fixed bottom-6 right-6 z-40">
                <a
                    href="https://wa.me/919733221114"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                        trackClick('WhatsApp Float Button', 'Sticky Button');
                        trackWhatsAppRedirect('Hi, I am interested in your construction services. Please share more details.');
                    }}
                    className="whatsapp-float bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-hard hover:shadow-glow-strong transition-all duration-300 transform hover:scale-110"
                    aria-label="Contact us on WhatsApp"
                >
                    <FaWhatsapp className="w-6 h-6" />
                </a>
            </div>

            {/* Contact Modal */}
            {isModalOpen && (
                <Modal 
                    isOpen={isModalOpen} 
                    onClose={closeModal} 
                />
            )}
        </>
    );
};

export default Header;
