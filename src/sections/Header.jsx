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
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
                    isScrolled
                        ? 'bg-white/95 backdrop-blur-lg shadow-lg py-3'
                        : 'bg-white/90 backdrop-blur-md shadow-sm py-4'
                }`}
                role="banner"
            >
                <div className="container mx-auto px-6 lg:px-8">
                    <nav
                        className="flex justify-between items-center"
                        role="navigation"
                        aria-label="Main navigation"
                    >
                        {/* Clean Logo */}
                        <Link
                            to="home"
                            smooth={true}
                            duration={500}
                            className="cursor-pointer group flex items-center gap-4"
                            aria-label="B4Brothers homepage"
                        >
                            <img
                                src={logoIcon}
                                alt="B4Brothers Logo"
                                className={`transition-all duration-500 ${
                                    isScrolled ? 'h-12 w-12' : 'h-14 w-14'
                                }`}
                            />
                            <div className="flex flex-col">
                                <div className={`font-bold text-secondary-900 transition-all duration-500 ${
                                    isScrolled ? 'text-xl' : 'text-2xl'
                                }`}>
                                    <span className="text-primary-600">B4</span>Brothers
                                </div>
                                <div className={`font-medium text-secondary-600 transition-all duration-500 ${
                                    isScrolled ? 'text-xs' : 'text-sm'
                                }`}>
                                    Believe in best builds bold
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
                        <ul className="flex flex-col gap-3 mb-8" role="menu">
                            {navItem.map((item, index) => (
                                <li key={index} role="none">
                                    {item.isExternal ? (
                                        <button
                                            onClick={() => handleNavigation(item.path)}
                                            className="block w-full text-left text-secondary-700 hover:text-primary-600 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 font-semibold text-lg py-5 px-6 rounded-2xl transition-all duration-400 border border-transparent hover:border-primary-200 shadow-sm hover:shadow-md"
                                            role="menuitem"
                                            tabIndex={isMenuOpen ? 0 : -1}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="relative">
                                                    {item.link}
                                                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300 group-hover:w-full"></div>
                                                </span>
                                                <svg className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </button>
                                    ) : (
                                        <Link
                                            to={item.path}
                                            className="group block text-secondary-700 hover:text-primary-600 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 font-semibold text-lg py-5 px-6 rounded-2xl transition-all duration-400 border border-transparent hover:border-primary-200 shadow-sm hover:shadow-md"
                                            spy={true}
                                            smooth={true}
                                            offset={-100}
                                            duration={500}
                                            onClick={closeMenu}
                                            role="menuitem"
                                            tabIndex={isMenuOpen ? 0 : -1}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="relative">
                                                    {item.link}
                                                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300 group-hover:w-full"></div>
                                                </span>
                                                <svg className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>

                        {/* Premium Mobile Contact Section */}
                        <div className="bg-gradient-to-br from-primary-50 via-accent-50 to-primary-50 rounded-3xl p-6 space-y-6 border border-primary-100/50 shadow-lg">
                            <div className="text-center">
                                <h3 className="font-bold text-secondary-900 mb-2 text-lg font-space">Ready to Build Bold?</h3>
                                <p className="text-sm text-secondary-600 leading-relaxed">Transform your vision into reality with our premium construction services</p>
                            </div>

                            <div className="space-y-4">
                                <a
                                    href="tel:+919733221114"
                                    onClick={() => trackClick('Phone Call', 'Mobile Menu')}
                                    className="flex items-center gap-4 bg-white text-secondary-700 hover:text-primary-600 font-semibold py-4 px-6 rounded-2xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-primary-50 transition-all duration-400 border border-gray-200 hover:border-primary-300 shadow-sm hover:shadow-md w-full"
                                    tabIndex={isMenuOpen ? 0 : -1}
                                    aria-label="Call us at +91 97332 21114"
                                >
                                    <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-accent-100 rounded-xl flex items-center justify-center">
                                        <FaPhone className="w-5 h-5 text-primary-600" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <div className="text-sm font-bold">Call Now</div>
                                        <div className="text-xs text-secondary-500">+91 97332 21114</div>
                                    </div>
                                </a>
                                <button
                                    onClick={() => {
                                        trackClick('Free Quote Button', 'Mobile Menu');
                                        closeMenu();
                                        openModal();
                                    }}
                                    className="flex items-center gap-4 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-accent-500 hover:to-primary-500 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-400 shadow-lg hover:shadow-xl w-full transform hover:scale-105"
                                    tabIndex={isMenuOpen ? 0 : -1}
                                    aria-label="Get premium construction quote"
                                >
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                        <FaWhatsapp className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <div className="text-sm font-bold">Get Free Quote</div>
                                        <div className="text-xs opacity-90">Premium consultation</div>
                                    </div>
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
