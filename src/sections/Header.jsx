import React, { useState, useEffect } from 'react';
import { FaBars, FaXmark, FaPhone, FaWhatsapp } from 'react-icons/fa6';
import { Link } from 'react-scroll';
import Modal from './Modal';
import logoIcon from '../assets/b4-brothers-logo-simple-icon.svg';
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
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 bg-white/95 backdrop-blur-lg border-b border-gray-100 ${
                    isScrolled
                        ? 'shadow-hard py-1.5'
                        : 'shadow-medium py-2.5'
                }`}
                role="banner"
            >
                <div className="container mx-auto px-4 lg:px-8">
                    <nav 
                        className="flex justify-between items-center"
                        role="navigation"
                        aria-label="Main navigation"
                    >
                        {/* Logo */}
                        <Link
                            to="home"
                            smooth={true}
                            duration={500}
                            className="cursor-pointer group flex items-center gap-3"
                            aria-label="B4Brothers homepage"
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    src={logoIcon}
                                    alt="B4Brothers Logo"
                                    className={`transition-all duration-500 flex-shrink-0 ${
                                        isScrolled ? 'h-10 w-10' : 'h-12 w-12'
                                    }`}
                                />
                                <div className="flex flex-col">
                                    <div className={`font-montserrat font-bold text-secondary-800 transition-all duration-500 ${
                                        isScrolled ? 'text-lg' : 'text-xl'
                                    }`}>
                                        B4Brothers
                                    </div>
                                    <div className={`font-inter font-medium text-primary-600 transition-all duration-500 ${
                                        isScrolled ? 'text-xs' : 'text-sm'
                                    }`}>
                                        Believe in best builds bold
                                    </div>
                                </div>
                            </div>
                        </Link>

                        {/* Desktop Navigation & CTA Buttons - Right Side */}
                        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
                            {/* Navigation Menu */}
                            <ul className="flex gap-6 xl:gap-8 items-center" role="menubar">
                                {navItem.map((item, index) => (
                                    <li key={index} role="none">
                                        {item.isExternal ? (
                                            <button
                                                onClick={() => handleNavigation(item.path)}
                                                className="nav-link text-secondary-700 hover:text-primary-500 font-inter font-medium uppercase tracking-wide text-sm transition-all duration-300 cursor-pointer relative group py-2 px-3 rounded-lg hover:bg-primary-50"
                                                role="menuitem"
                                                tabIndex={0}
                                            >
                                                {item.link}
                                                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                                            </button>
                                        ) : (
                                            <Link
                                                to={item.path}
                                                className="nav-link text-secondary-700 hover:text-primary-500 font-inter font-medium uppercase tracking-wide text-sm transition-all duration-300 cursor-pointer relative group py-2 px-3 rounded-lg hover:bg-primary-50"
                                                spy={true}
                                                smooth={true}
                                                offset={-100}
                                                duration={500}
                                                activeClass="text-primary-500 bg-primary-50"
                                                role="menuitem"
                                                tabIndex={0}
                                            >
                                                {item.link}
                                                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>

                            {/* Divider */}
                            <div className="w-px h-6 bg-gray-200"></div>

                            {/* CTA Buttons */}
                            <div className="flex items-center gap-2 xl:gap-3">
                                <a
                                    href="tel:+919733221114"
                                    onClick={() => trackClick('Phone Call', 'Header Desktop')}
                                    className="flex items-center gap-2 text-secondary-600 hover:text-primary-500 font-medium transition-all duration-300 py-2 px-2 rounded-lg hover:bg-gray-50"
                                    aria-label="Call us at +91 97332 21114"
                                >
                                    <div className="w-7 h-7 bg-primary-100 rounded-full flex items-center justify-center">
                                        <FaPhone className="w-3 h-3 text-primary-500" />
                                    </div>
                                    <div className="hidden xl:block">
                                        <div className="text-xs text-secondary-500 uppercase tracking-wide">Call</div>
                                        <div className="text-xs font-semibold">+91 97332 21114</div>
                                    </div>
                                </a>

                                <button
                                    onClick={() => {
                                        trackClick('Free Quote Button', 'Header Desktop');
                                        openModal();
                                    }}
                                    className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md text-sm flex items-center gap-2"
                                    aria-label="Get free quote"
                                >
                                    <FaWhatsapp className="w-4 h-4" />
                                    <span className="hidden xl:inline">Free Quote</span>
                                    <span className="xl:hidden">Quote</span>
                                </button>
                            </div>
                        </div>

                        {/* Mobile & Tablet Actions */}
                        <div className="lg:hidden flex items-center gap-2 sm:gap-3">
                            {/* Quick Call Button */}
                            <a
                                href="tel:+919733221114"
                                onClick={() => trackClick('Phone Call', 'Header Mobile')}
                                className="w-10 h-10 bg-primary-100 hover:bg-primary-500 rounded-full flex items-center justify-center transition-all duration-300 group"
                                aria-label="Call us"
                            >
                                <FaPhone className="w-4 h-4 text-primary-500 group-hover:text-white transition-colors duration-300" />
                            </a>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={toggleMenu}
                                className="w-10 h-10 bg-secondary-100 hover:bg-primary-500 text-secondary-800 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300 focus:bg-primary-50"
                                aria-label="Toggle navigation menu"
                                aria-expanded={isMenuOpen}
                                aria-controls="mobile-menu"
                            >
                                {isMenuOpen ? <FaXmark className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
                            </button>
                        </div>
                    </nav>
                </div>

                {/* Mobile Menu */}
                <div
                    id="mobile-menu"
                    className={`lg:hidden transition-all duration-500 overflow-hidden bg-white/95 backdrop-blur-lg border-t border-gray-200 ${
                        isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                    }`}
                    aria-hidden={!isMenuOpen}
                >
                    <div className="container mx-auto px-4 py-6">
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
