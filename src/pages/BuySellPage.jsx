import React, { useState, useEffect } from 'react';
import { FaHome, FaBuilding, FaMapMarkerAlt, FaRupeeSign, FaFilter, FaSearch, FaPlus, FaEdit, FaEye, FaPhone, FaWhatsapp, FaCalendar } from 'react-icons/fa';
import { FaLandmark } from 'react-icons/fa6';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import { HelmetProvider, Helmet } from 'react-helmet-async';

const BuySellPage = () => {
  const [activeTab, setActiveTab] = useState('buy');
  const [showPostForm, setShowPostForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock property data - In real app, this would come from an API
  const mockProperties = [
    {
      id: 1,
      type: 'sell',
      category: 'house',
      title: '3BHK Independent House',
      location: 'Kolkata, West Bengal',
      price: 8500000,
      area: '1200 sq ft',
      bedrooms: 3,
      bathrooms: 2,
      description: 'Beautiful independent house with modern amenities, parking space, and garden.',
      images: ['/api/placeholder/400/300'],
      contactName: 'Raj Kumar',
      contactPhone: '+91 98765 43210',
      postedDate: '2024-01-15',
      features: ['Parking', 'Garden', 'Modern Kitchen', 'Security']
    },
    {
      id: 2,
      type: 'buy',
      category: 'plot',
      title: 'Looking for Commercial Plot',
      location: 'Howrah, West Bengal',
      price: 5000000,
      area: '2000 sq ft',
      description: 'Looking to buy a commercial plot for business setup. Preferably near main road.',
      contactName: 'Priya Singh',
      contactPhone: '+91 87654 32109',
      postedDate: '2024-01-20',
      requirements: ['Near Main Road', 'Commercial Zone', 'Clear Title']
    },
    {
      id: 3,
      type: 'sell',
      category: 'building',
      title: '4-Story Commercial Building',
      location: 'Park Street, Kolkata',
      price: 25000000,
      area: '4000 sq ft',
      description: 'Prime commercial building with rental income potential. Fully occupied.',
      images: ['/api/placeholder/400/300'],
      contactName: 'Amit Sharma',
      contactPhone: '+91 76543 21098',
      postedDate: '2024-01-18',
      features: ['Prime Location', 'Rental Income', 'Elevator', 'Parking']
    }
  ];

  const categories = [
    { value: 'all', label: 'All Properties', icon: FaHome },
    { value: 'house', label: 'House', icon: FaHome },
    { value: 'plot', label: 'Plot/Land', icon: FaLandmark },
    { value: 'building', label: 'Building', icon: FaBuilding },
  ];

  const locations = [
    'all',
    'Kolkata, West Bengal',
    'Howrah, West Bengal',
    'Durgapur, West Bengal',
    'Asansol, West Bengal',
    'Siliguri, West Bengal',
    'Raniganj, West Bengal'
  ];

  useEffect(() => {
    filterProperties();
  }, [activeTab, searchQuery, selectedCategory, selectedLocation, priceRange]);

  const filterProperties = () => {
    let filtered = mockProperties.filter(property => property.type === activeTab);

    if (searchQuery) {
      filtered = filtered.filter(property => 
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(property => property.category === selectedCategory);
    }

    if (selectedLocation !== 'all') {
      filtered = filtered.filter(property => property.location === selectedLocation);
    }

    if (priceRange.min) {
      filtered = filtered.filter(property => property.price >= parseInt(priceRange.min));
    }

    if (priceRange.max) {
      filtered = filtered.filter(property => property.price <= parseInt(priceRange.max));
    }

    setProperties(filtered);
  };

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} L`;
    }
    return `₹${price.toLocaleString()}`;
  };

  const PropertyCard = ({ property }) => {
    const CategoryIcon = categories.find(cat => cat.value === property.category)?.icon || FaHome;
    
    return (
      <div className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden">
        {property.images && property.images.length > 0 && (
          <div className="relative h-48 overflow-hidden">
            <img 
              src={property.images[0]} 
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                property.type === 'sell' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-blue-500 text-white'
              }`}>
                {property.type === 'sell' ? 'For Sale' : 'Looking to Buy'}
              </span>
            </div>
            <div className="absolute top-4 right-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                <CategoryIcon className="w-4 h-4 text-primary-600" />
              </div>
            </div>
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-secondary-800 mb-2">{property.title}</h3>
            <div className="text-right">
              <div className="text-xl font-bold text-primary-600">{formatPrice(property.price)}</div>
              {property.area && (
                <div className="text-sm text-secondary-500">{property.area}</div>
              )}
            </div>
          </div>

          <div className="flex items-center text-secondary-600 mb-3">
            <FaMapMarkerAlt className="w-4 h-4 mr-2" />
            <span className="text-sm">{property.location}</span>
          </div>

          <p className="text-secondary-600 text-sm mb-4 line-clamp-3">{property.description}</p>

          {property.features && (
            <div className="flex flex-wrap gap-2 mb-4">
              {property.features.slice(0, 3).map((feature, index) => (
                <span key={index} className="px-2 py-1 bg-primary-50 text-primary-700 rounded-full text-xs">
                  {feature}
                </span>
              ))}
              {property.features.length > 3 && (
                <span className="px-2 py-1 bg-secondary-100 text-secondary-600 rounded-full text-xs">
                  +{property.features.length - 3} more
                </span>
              )}
            </div>
          )}

          {property.requirements && (
            <div className="flex flex-wrap gap-2 mb-4">
              {property.requirements.slice(0, 2).map((req, index) => (
                <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                  {req}
                </span>
              ))}
            </div>
          )}

          <div className="border-t border-secondary-100 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-secondary-600">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3">
                  {property.contactName.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium text-secondary-800">{property.contactName}</div>
                  <div className="text-xs text-secondary-500">
                    <FaCalendar className="inline w-3 h-3 mr-1" />
                    {new Date(property.postedDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <a
                  href={`tel:${property.contactPhone}`}
                  className="p-2 bg-primary-50 hover:bg-primary-100 text-primary-600 rounded-lg transition-colors"
                  title="Call"
                >
                  <FaPhone className="w-4 h-4" />
                </a>
                <a
                  href={`https://wa.me/${property.contactPhone.replace(/\s+/g, '').replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition-colors"
                  title="WhatsApp"
                >
                  <FaWhatsapp className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PostPropertyForm = () => {
    const [formData, setFormData] = useState({
      type: activeTab,
      category: 'house',
      title: '',
      location: '',
      price: '',
      area: '',
      bedrooms: '',
      bathrooms: '',
      description: '',
      contactName: '',
      contactPhone: '',
      features: []
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      // In real app, this would submit to an API
      console.log('Property posted:', formData);
      setShowPostForm(false);
      // Show success message
      alert('Property posted successfully!');
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-hard max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-secondary-100">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-secondary-800">
                Post Property {activeTab === 'sell' ? 'for Sale' : 'Request'}
              </h2>
              <button
                onClick={() => setShowPostForm(false)}
                className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
              >
                <FaEdit className="w-5 h-5 rotate-45" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                >
                  <option value="house">House</option>
                  <option value="plot">Plot/Land</option>
                  <option value="building">Building</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter location"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Property Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter property title"
                required
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Price (₹)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter price"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Area</label>
                <input
                  type="text"
                  value={formData.area}
                  onChange={(e) => setFormData({...formData, area: e.target.value})}
                  className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., 1200 sq ft"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Bedrooms</label>
                <input
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({...formData, bedrooms: e.target.value})}
                  className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Number of bedrooms"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={4}
                className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Describe the property..."
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Contact Name</label>
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                  className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Contact Phone</label>
                <input
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                  className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="+91 xxxxx xxxxx"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => setShowPostForm(false)}
                className="flex-1 px-6 py-3 border border-secondary-300 text-secondary-700 rounded-lg hover:bg-secondary-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
              >
                Post Property
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-secondary-50">
        <Helmet>
          <title>Buy & Sell Properties | B4 Brothers Infratech - Real Estate Marketplace</title>
          <meta name="description" content="Buy and sell properties with B4 Brothers Infratech. Find houses, plots, buildings, and commercial spaces. Post your property requirements or listings." />
          <meta name="keywords" content="buy property, sell property, real estate, houses, plots, buildings, kolkata properties" />
        </Helmet>

        <Header />

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500 text-white pt-16 pb-4">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3">
                Professional Real Estate Solutions
              </h1>
              <p className="text-sm sm:text-base text-white/90 mb-4 leading-relaxed">
                Connect with verified buyers and sellers in West Bengal's premier real estate marketplace.
                <br className="hidden sm:block" />
                Professional support, transparent transactions, and trusted expertise since 2019.
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-3 mb-4 text-xs text-white/80">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  <span>Verified Properties</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  <span>Legal Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  <span>Professional Guidance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  <span>40+ Projects Delivered</span>
                </div>
              </div>
              
              {/* Tab Navigation */}
              <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-xl p-2 mb-8">
                <button
                  onClick={() => setActiveTab('buy')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === 'buy'
                      ? 'bg-white text-primary-600 shadow-lg'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Looking to Buy
                </button>
                <button
                  onClick={() => setActiveTab('sell')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === 'sell'
                      ? 'bg-white text-primary-600 shadow-lg'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  For Sale
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setShowPostForm(true)}
                  className="bg-white text-primary-600 hover:bg-primary-50 font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center justify-center"
                >
                  <FaPlus className="w-5 h-5 mr-3" />
                  {activeTab === 'sell' ? 'List Your Property' : 'Post Your Requirement'}
                </button>
                <a
                  href="#contact"
                  className="border-2 border-white/30 hover:border-white text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl transition-all duration-300 backdrop-blur-sm inline-flex items-center justify-center"
                >
                  <FaPhone className="w-5 h-5 mr-3" />
                  Get Expert Consultation
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="bg-white border-b border-secondary-200 sticky top-20 z-40">
          <div className="container mx-auto px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search properties..."
                    className="w-full pl-12 pr-4 py-3 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>

              {/* Location Filter */}
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-3 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Locations</option>
                {locations.slice(1).map(location => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>

              {/* Price Range */}
              <div className="flex gap-2">
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                  placeholder="Min Price"
                  className="w-32 px-3 py-3 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                  placeholder="Max Price"
                  className="w-32 px-3 py-3 border border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Properties Grid */}
        <section className="py-12">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-secondary-800">
                {activeTab === 'buy' ? 'Buying Requirements' : 'Properties for Sale'} ({properties.length})
              </h2>
            </div>

            {properties.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {properties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl text-secondary-300 mb-4">🏠</div>
                <h3 className="text-xl font-semibold text-secondary-600 mb-2">No properties found</h3>
                <p className="text-secondary-500 mb-6">
                  {activeTab === 'buy' 
                    ? "No buying requirements match your search criteria."
                    : "No properties for sale match your search criteria."
                  }
                </p>
                <button
                  onClick={() => setShowPostForm(true)}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  <FaPlus className="w-4 h-4 mr-2 inline" />
                  {activeTab === 'sell' ? 'Post Property' : 'Post Requirement'}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Post Property Form Modal */}
        {showPostForm && <PostPropertyForm />}

        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default BuySellPage;
