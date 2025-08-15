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
                                src="https://cdn.builder.io/api/v1/image/assets%2Fef9a0ffcb7c3488eab51bfcf9f12f277%2Fcffcda959e8140e38de8493eb3f93373?format=webp&width=800&backgroundRemoval=true"
                                alt="B4 Brothers Infratech Logo"
                                className={`transition-all duration-500 object-contain ${
                                    isScrolled ? 'h-16 w-auto' : 'h-20 w-auto'
                                }`}
                                style={{
                                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                                    background: 'transparent'
                                }}
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-8">
                            {/* Navigation Menu */}
                            <ul className="flex items-center gap-8" role="menubar">
                                {navItem.map((item, index) => (
                                    <li key={index} role="none">
                                        {item.isExternal ? (
                                            <button
                                                onClick={() => handleNavigation(item.path)}
                                                className="text-secondary-700 hover:text-primary-600 font-medium text-sm transition-colors duration-300 py-2 px-3"
                                                role="menuitem"
                                                tabIndex={0}
                                            >
                                                {item.link}
                                            </button>
                                        ) : (
                                            <Link
                                                to={item.path}
                                                className="text-secondary-700 hover:text-primary-600 font-medium text-sm transition-colors duration-300 py-2 px-3"
                                                spy={true}
                                                smooth={true}
                                                offset={-100}
                                                duration={500}
                                                activeClass="text-primary-600"
                                                role="menuitem"
                                                tabIndex={0}
                                            >
                                                {item.link}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>

                            {/* Simple Quote Button */}
                            <button
                                onClick={() => {
                                    trackClick('Free Quote Button', 'Header Desktop');
                                    openModal();
                                }}
                                className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 text-sm"
                                aria-label="Get free quote"
                            >
                                Free Quote
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden">
                            <button
                                onClick={toggleMenu}
                                className="w-12 h-12 bg-gray-100 hover:bg-gray-200 text-secondary-800 rounded-lg flex items-center justify-center transition-colors duration-300 touch-manipulation"
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
                    className={`lg:hidden transition-all duration-500 overflow-hidden bg-white border-t border-gray-200 ${
                        isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                    }`}
                    aria-hidden={!isMenuOpen}
                >
                    <div className="container mx-auto px-6 py-6">
                        <ul className="flex flex-col gap-2 mb-6" role="menu">
                            {navItem.map((item, index) => (
                                <li key={index} role="none">
                                    {item.isExternal ? (
                                        <button
                                            onClick={() => handleNavigation(item.path)}
                                            className="block w-full text-left text-secondary-700 hover:text-primary-600 hover:bg-gray-50 font-medium text-lg py-4 px-4 rounded-lg transition-colors duration-300 touch-manipulation min-h-[44px]"
                                            role="menuitem"
                                            tabIndex={isMenuOpen ? 0 : -1}
                                        >
                                            {item.link}
                                        </button>
                                    ) : (
                                        <Link
                                            to={item.path}
                                            className="block text-secondary-700 hover:text-primary-600 hover:bg-gray-50 font-medium text-lg py-4 px-4 rounded-lg transition-colors duration-300 touch-manipulation min-h-[44px]"
                                            spy={true}
                                            smooth={true}
                                            offset={-100}
                                            duration={500}
                                            onClick={closeMenu}
                                            role="menuitem"
                                            tabIndex={isMenuOpen ? 0 : -1}
                                        >
                                            {item.link}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>

                        {/* Mobile CTA */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            <button
                                onClick={() => {
                                    trackClick('Free Quote Button', 'Mobile Menu');
                                    closeMenu();
                                    openModal();
                                }}
                                className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300"
                                tabIndex={isMenuOpen ? 0 : -1}
                                aria-label="Get free quote"
                            >
                                Get Free Quote
                            </button>
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
