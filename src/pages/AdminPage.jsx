import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import apiClient from '../utils/apiClient';
import {
    FaEye,
    FaUsers,
    FaMousePointer,
    FaWhatsapp,
    FaWpforms,
    FaDownload,
    FaTrash,
    FaArrowLeft,
    FaCalendar,
    FaClock,
    FaUser,
    FaEnvelope,
    FaPhone,
    FaSignOutAlt,
    FaChartLine,
    FaGlobe,
    FaBriefcase,
    FaHeart
} from 'react-icons/fa';
import { useAnalytics } from '../contexts/AnalyticsContext';

const AdminPage = ({ onLogout }) => {
    const { analytics, clearAnalytics, exportAnalytics } = useAnalytics();
    const [filter, setFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');
    const [formSubmissions, setFormSubmissions] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [showTestimonialForm, setShowTestimonialForm] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState(null);
    const [apiData, setApiData] = useState({
        applications: [],
        contacts: [],
        feedback: [],
        reachUs: []
    });
    const [loading, setLoading] = useState(true);

    // Load data from localStorage and API
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);

            // Load local data
            const stored = JSON.parse(localStorage.getItem('b4-form-submissions') || '[]');
            setFormSubmissions(stored);

            const storedTestimonials = JSON.parse(localStorage.getItem('b4-testimonials') || '[]');
            setTestimonials(storedTestimonials);

            // Load data from API
            const dashboardData = await apiClient.getAdminDashboard();
            setApiData(dashboardData);

            // Merge API feedback with local testimonials
            const apiFeedback = dashboardData.feedback.map(feedback => ({
                id: feedback.id,
                name: feedback.name,
                about: feedback.feedback,
                post: feedback.designation,
                rating: feedback.rating,
                createdAt: feedback.createdAt || new Date().toISOString(),
                updatedAt: feedback.updatedAt || new Date().toISOString(),
                fromAPI: true
            }));

            setTestimonials([...storedTestimonials, ...apiFeedback]);

        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const filterByDate = (items) => {
        if (dateFilter === 'all') return items;
        
        const now = new Date();
        const filterDate = new Date();
        
        switch (dateFilter) {
            case 'today':
                filterDate.setHours(0, 0, 0, 0);
                break;
            case 'week':
                filterDate.setDate(now.getDate() - 7);
                break;
            case 'month':
                filterDate.setMonth(now.getMonth() - 1);
                break;
            default:
                return items;
        }
        
        return items.filter(item => new Date(item.timestamp) >= filterDate);
    };

    const getFilteredData = () => {
        let data = [];
        
        switch (filter) {
            case 'forms':
                data = analytics.formSubmissions || [];
                break;
            case 'stored-forms':
                data = formSubmissions.map(item => ({ ...item, type: 'stored-form' })) || [];
                break;
            case 'whatsapp':
                data = analytics.whatsappRedirects || [];
                break;
            case 'clicks':
                data = analytics.buttonClicks || [];
                break;
            case 'pageviews':
                data = analytics.pageViews || [];
                break;
            default:
                data = [
                    ...(analytics.formSubmissions || []).map(item => ({ ...item, type: 'form' })),
                    ...(formSubmissions || []).map(item => ({ ...item, type: 'stored-form' })),
                    ...(analytics.whatsappRedirects || []).map(item => ({ ...item, type: 'whatsapp' })),
                    ...(analytics.buttonClicks || []).map(item => ({ ...item, type: 'click' })),
                    ...(analytics.pageViews || []).map(item => ({ ...item, type: 'pageview' }))
                ];
        }
        
        return filterByDate(data).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    };

    const stats = [
        {
            title: 'Job Applications',
            value: apiData.applications.length,
            icon: <FaBriefcase className="w-6 h-6" />,
            color: 'bg-blue-500'
        },
        {
            title: 'Contact Submissions',
            value: apiData.contacts.length,
            icon: <FaEnvelope className="w-6 h-6" />,
            color: 'bg-green-500'
        },
        {
            title: 'Client Feedback',
            value: apiData.feedback.length,
            icon: <FaHeart className="w-6 h-6" />,
            color: 'bg-purple-500'
        },
        {
            title: 'Reach Us Queries',
            value: apiData.reachUs.length,
            icon: <FaWhatsapp className="w-6 h-6" />,
            color: 'bg-green-600'
        },
        {
            title: 'Local Analytics',
            value: filterByDate(analytics.formSubmissions || []).length,
            icon: <FaWpforms className="w-6 h-6" />,
            color: 'bg-orange-500'
        },
        {
            title: 'Local Storage',
            value: filterByDate(formSubmissions || []).length,
            icon: <FaGlobe className="w-6 h-6" />,
            color: 'bg-indigo-500'
        }
    ];

    const renderDataItem = (item) => {
        const baseClasses = "bg-white rounded-lg shadow-soft p-4 border-l-4";
        
        switch (item.type) {
            case 'form':
                return (
                    <div key={item.id} className={`${baseClasses} border-orange-500`}>
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <FaWpforms className="w-4 h-4 text-orange-500" />
                                <span className="font-medium text-orange-700">Form Submission</span>
                            </div>
                            <span className="text-sm text-gray-500">{formatDate(item.timestamp)}</span>
                        </div>
                        <div className="text-sm space-y-1">
                            <p><strong>Type:</strong> {item.formType}</p>
                            {item.formData?.name && <p><strong>Name:</strong> {item.formData.name}</p>}
                            {item.formData?.email && <p><strong>Email:</strong> {item.formData.email}</p>}
                            {item.formData?.phone && <p><strong>Phone:</strong> {item.formData.phone}</p>}
                            {item.formData?.position && <p><strong>Position:</strong> {item.formData.position}</p>}
                            {item.formData?.message && <p><strong>Message:</strong> {item.formData.message.substring(0, 100)}...</p>}
                        </div>
                    </div>
                );
            
            case 'whatsapp':
                return (
                    <div key={item.id} className={`${baseClasses} border-green-500`}>
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <FaWhatsapp className="w-4 h-4 text-green-500" />
                                <span className="font-medium text-green-700">WhatsApp Redirect</span>
                            </div>
                            <span className="text-sm text-gray-500">{formatDate(item.timestamp)}</span>
                        </div>
                        <div className="text-sm">
                            <p><strong>Message Preview:</strong> {item.message?.substring(0, 100)}...</p>
                            {item.formData && (
                                <div className="mt-2 p-2 bg-gray-50 rounded">
                                    <p className="text-xs font-medium">Associated Form Data:</p>
                                    {item.formData.name && <p className="text-xs">Name: {item.formData.name}</p>}
                                    {item.formData.email && <p className="text-xs">Email: {item.formData.email}</p>}
                                </div>
                            )}
                        </div>
                    </div>
                );
            
            case 'click':
                return (
                    <div key={item.id} className={`${baseClasses} border-purple-500`}>
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <FaMousePointer className="w-4 h-4 text-purple-500" />
                                <span className="font-medium text-purple-700">Button Click</span>
                            </div>
                            <span className="text-sm text-gray-500">{formatDate(item.timestamp)}</span>
                        </div>
                        <div className="text-sm">
                            <p><strong>Element:</strong> {item.element}</p>
                            <p><strong>Location:</strong> {item.location}</p>
                        </div>
                    </div>
                );
            
            case 'pageview':
                return (
                    <div key={item.id} className={`${baseClasses} border-blue-500`}>
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <FaEye className="w-4 h-4 text-blue-500" />
                                <span className="font-medium text-blue-700">Page View</span>
                            </div>
                            <span className="text-sm text-gray-500">{formatDate(item.timestamp)}</span>
                        </div>
                        <div className="text-sm">
                            <p><strong>Page:</strong> {item.page}</p>
                        </div>
                    </div>
                );

            case 'stored-form':
                return (
                    <div key={item.id} className={`${baseClasses} border-indigo-500`}>
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <FaEnvelope className="w-4 h-4 text-indigo-500" />
                                <span className="font-medium text-indigo-700">Stored Form Data - {item.type}</span>
                            </div>
                            <span className="text-sm text-gray-500">{formatDate(item.timestamp)}</span>
                        </div>
                        <div className="text-sm space-y-1">
                            {item.data?.name && <p><strong>Name:</strong> {item.data.name}</p>}
                            {item.data?.email && <p><strong>Email:</strong> {item.data.email}</p>}
                            {item.data?.phone && <p><strong>Phone:</strong> {item.data.phone}</p>}
                            {item.data?.service && <p><strong>Service:</strong> {item.data.service}</p>}
                            {item.data?.budget && <p><strong>Budget:</strong> {item.data.budget}</p>}
                            {item.data?.timeline && <p><strong>Timeline:</strong> {item.data.timeline}</p>}
                            {item.data?.query && <p><strong>Query:</strong> {item.data.query}</p>}
                            {item.data?.message && <p><strong>Message:</strong> {item.data.message.substring(0, 100)}...</p>}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    const saveTestimonial = async (testimonialData) => {
        try {
            const feedbackData = {
                feedback: testimonialData.about,
                rating: testimonialData.rating,
                name: testimonialData.name,
                designation: testimonialData.post
            };

            let result;
            if (editingTestimonial) {
                // Update existing testimonial via API
                result = await apiClient.updateFeedback(editingTestimonial.id, feedbackData);
            } else {
                // Create new testimonial via API
                result = await apiClient.createFeedback(feedbackData);
            }

            // Also update local storage as backup
            const newTestimonial = {
                id: editingTestimonial?.id || result.id || Date.now().toString(36) + Math.random().toString(36).substr(2),
                ...testimonialData,
                createdAt: editingTestimonial?.createdAt || new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            let updatedTestimonials;
            if (editingTestimonial) {
                updatedTestimonials = testimonials.map(t => t.id === editingTestimonial.id ? newTestimonial : t);
            } else {
                updatedTestimonials = [...testimonials, newTestimonial];
            }

            setTestimonials(updatedTestimonials);
            localStorage.setItem('b4-testimonials', JSON.stringify(updatedTestimonials));
            setShowTestimonialForm(false);
            setEditingTestimonial(null);

            alert('Testimonial saved successfully!');
        } catch (error) {
            console.error('Error saving testimonial:', error);
            alert('Failed to save testimonial: ' + error.message);
        }
    };

    const deleteTestimonial = async (id) => {
        try {
            // Delete from API
            await apiClient.deleteFeedback(id);

            // Also remove from local storage
            const updatedTestimonials = testimonials.filter(t => t.id !== id);
            setTestimonials(updatedTestimonials);
            localStorage.setItem('b4-testimonials', JSON.stringify(updatedTestimonials));

            alert('Testimonial deleted successfully!');
        } catch (error) {
            console.error('Error deleting testimonial:', error);
            alert('Failed to delete testimonial: ' + error.message);
        }
    };

    const TestimonialForm = () => {
        const [formData, setFormData] = useState({
            name: editingTestimonial?.name || '',
            about: editingTestimonial?.about || '',
            post: editingTestimonial?.post || '',
            rating: editingTestimonial?.rating || 5,
            image: editingTestimonial?.image || ''
        });

        const handleSubmit = (e) => {
            e.preventDefault();
            saveTestimonial(formData);
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                    <h3 className="text-lg font-semibold mb-4">
                        {editingTestimonial ? 'Edit' : 'Add'} Testimonial
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Review</label>
                            <textarea
                                value={formData.about}
                                onChange={(e) => setFormData({...formData, about: e.target.value})}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Position/Role</label>
                            <input
                                type="text"
                                value={formData.post}
                                onChange={(e) => setFormData({...formData, post: e.target.value})}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Rating (1-5)</label>
                            <select
                                value={formData.rating}
                                onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            >
                                {[1,2,3,4,5].map(n => (
                                    <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Image URL (optional)</label>
                            <input
                                type="url"
                                value={formData.image}
                                onChange={(e) => setFormData({...formData, image: e.target.value})}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>
                        <div className="flex gap-2 pt-4">
                            <button
                                type="submit"
                                className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg"
                            >
                                {editingTestimonial ? 'Update' : 'Add'} Testimonial
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowTestimonialForm(false);
                                    setEditingTestimonial(null);
                                }}
                                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    const filteredData = getFilteredData();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => {
                                    window.history.pushState(null, '', '/');
                                    window.dispatchEvent(new PopStateEvent('popstate'));
                                }}
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                <FaArrowLeft className="w-4 h-4" />
                                Back to Site
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">B4 Brothers Admin</h1>
                                <p className="text-sm text-gray-600">Analytics Dashboard</p>
                            </div>
                        </div>
                        <button
                            onClick={onLogout}
                            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            <FaSignOutAlt className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-lg shadow-soft p-6"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                                </div>
                                <div className={`${stat.color} text-white p-3 rounded-lg`}>
                                    {stat.icon}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Controls */}
                <div className="bg-white rounded-lg shadow-soft p-6 mb-8">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Type</label>
                                <select
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                >
                                    <option value="all">All Activities</option>
                                    <option value="forms">Form Submissions</option>
                                    <option value="stored-forms">Stored Form Data</option>
                                    <option value="whatsapp">WhatsApp Redirects</option>
                                    <option value="clicks">Button Clicks</option>
                                    <option value="pageviews">Page Views</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                                <select
                                    value={dateFilter}
                                    onChange={(e) => setDateFilter(e.target.value)}
                                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                >
                                    <option value="all">All Time</option>
                                    <option value="today">Today</option>
                                    <option value="week">Last 7 Days</option>
                                    <option value="month">Last 30 Days</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={exportAnalytics}
                                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                            >
                                <FaDownload className="w-4 h-4" />
                                Export Data
                            </button>
                            <button
                                onClick={() => {
                                    if (confirm('Are you sure you want to clear all analytics data? This action cannot be undone.')) {
                                        clearAnalytics();
                                    }
                                }}
                                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                            >
                                <FaTrash className="w-4 h-4" />
                                Clear Data
                            </button>
                        </div>
                    </div>
                </div>

                {/* Data List */}
                <div className="bg-white rounded-lg shadow-soft">
                    <div className="p-6 border-b">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Recent Activity ({filteredData.length} items)
                        </h2>
                    </div>
                    <div className="p-6">
                        {filteredData.length > 0 ? (
                            <div className="space-y-4 max-h-96 overflow-y-auto">
                                {filteredData.map(renderDataItem)}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <FaChartLine className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600">No data available for the selected filters.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Testimonials Management */}
                <div className="bg-white rounded-lg shadow-soft mt-8">
                    <div className="p-6 border-b">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Client Testimonials Management
                            </h2>
                            <button
                                onClick={() => setShowTestimonialForm(true)}
                                className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm"
                            >
                                Add New Testimonial
                            </button>
                        </div>
                    </div>
                    <div className="p-6">
                        {testimonials.length > 0 ? (
                            <div className="space-y-4">
                                {testimonials.map((testimonial) => (
                                    <div key={testimonial.id} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    {testimonial.image && (
                                                        <img
                                                            src={testimonial.image}
                                                            alt={testimonial.name}
                                                            className="w-12 h-12 rounded-full object-cover"
                                                        />
                                                    )}
                                                    <div>
                                                        <h4 className="font-medium text-gray-800">{testimonial.name}</h4>
                                                        <p className="text-sm text-gray-600">{testimonial.post}</p>
                                                        <div className="flex items-center gap-1">
                                                            {Array.from({length: testimonial.rating}).map((_, i) => (
                                                                <span key={i} className="text-yellow-400">⭐</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-gray-700">{testimonial.about}</p>
                                            </div>
                                            <div className="flex gap-2 ml-4">
                                                <button
                                                    onClick={() => {
                                                        setEditingTestimonial(testimonial);
                                                        setShowTestimonialForm(true);
                                                    }}
                                                    className="text-blue-500 hover:text-blue-700 text-sm"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        if (confirm('Are you sure you want to delete this testimonial?')) {
                                                            deleteTestimonial(testimonial.id);
                                                        }
                                                    }}
                                                    className="text-red-500 hover:text-red-700 text-sm"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-600">No testimonials added yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Testimonial Form Modal */}
            {showTestimonialForm && <TestimonialForm />}
        </div>
    );
};

export default AdminPage;
