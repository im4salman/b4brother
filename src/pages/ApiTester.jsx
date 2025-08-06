import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    FaServer, 
    FaPlay, 
    FaCheckCircle, 
    FaTimesCircle, 
    FaDatabase, 
    FaUsers, 
    FaChartLine,
    FaCode,
    FaCopy,
    FaExternalLinkAlt
} from 'react-icons/fa';

const ApiTester = () => {
    const [baseUrl, setBaseUrl] = useState('http://localhost:5000/api');
    const [authToken, setAuthToken] = useState(localStorage.getItem('b4-admin-token') || '');
    const [responses, setResponses] = useState({});
    const [loading, setLoading] = useState({});
    const [serverStatus, setServerStatus] = useState('checking');

    useEffect(() => {
        checkServerHealth();
        if (authToken) {
            localStorage.setItem('b4-admin-token', authToken);
        }
    }, [authToken]);

    const generateVisitorId = () => {
        return 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    };

    const makeRequest = async (endpoint, method = 'GET', data = null, requiresAuth = false) => {
        const url = `${baseUrl}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
        };

        if (requiresAuth && authToken) {
            headers['Authorization'] = `Bearer ${authToken}`;
        }

        const options = {
            method,
            headers,
        };

        if (data && (method === 'POST' || method === 'PUT')) {
            options.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            
            return {
                success: response.ok,
                status: response.status,
                data: result,
                url: url
            };
        } catch (error) {
            return {
                success: false,
                status: 0,
                data: { error: error.message },
                url: url
            };
        }
    };

    const setResponse = (key, response) => {
        setResponses(prev => ({ ...prev, [key]: response }));
    };

    const setLoadingState = (key, isLoading) => {
        setLoading(prev => ({ ...prev, [key]: isLoading }));
    };

    const checkServerHealth = async () => {
        setServerStatus('checking');
        try {
            const response = await makeRequest('/health');
            setServerStatus(response.success ? 'online' : 'offline');
            setResponse('health', response);
        } catch {
            setServerStatus('offline');
        }
    };

    const testEndpoint = async (key, endpoint, method = 'GET', data = null, requiresAuth = false) => {
        setLoadingState(key, true);
        const response = await makeRequest(endpoint, method, data, requiresAuth);
        setResponse(key, response);
        setLoadingState(key, false);
        return response;
    };

    const adminLogin = async () => {
        const response = await testEndpoint('login', '/auth/login', 'POST', {
            username: 'admin',
            password: 'b4brothers2024'
        });
        
        if (response.success && response.data.token) {
            setAuthToken(response.data.token);
            localStorage.setItem('b4-admin-token', response.data.token);
        }
    };

    const clearToken = () => {
        setAuthToken('');
        localStorage.removeItem('b4-admin-token');
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    const ApiTest = ({ title, endpoint, method = 'GET', description, onTest, response, isLoading, requiresAuth = false }) => (
        <motion.div 
            className="bg-white rounded-xl shadow-soft p-6 border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            method === 'GET' ? 'bg-green-100 text-green-700' :
                            method === 'POST' ? 'bg-blue-100 text-blue-700' :
                            method === 'PUT' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                        }`}>
                            {method}
                        </span>
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-700">
                            {endpoint}
                        </code>
                        {requiresAuth && (
                            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
                                Auth Required
                            </span>
                        )}
                    </div>
                    <p className="text-gray-600 text-sm">{description}</p>
                </div>
                <button
                    onClick={onTest}
                    disabled={isLoading || (requiresAuth && !authToken)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        isLoading 
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : requiresAuth && !authToken
                            ? 'bg-red-100 text-red-500 cursor-not-allowed'
                            : 'bg-primary-500 hover:bg-primary-600 text-white hover:shadow-lg'
                    }`}
                >
                    {isLoading ? (
                        <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Testing...
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <FaPlay className="mr-2" />
                            Test
                        </div>
                    )}
                </button>
            </div>

            {response && (
                <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                            {response.success ? (
                                <FaCheckCircle className="text-green-500 mr-2" />
                            ) : (
                                <FaTimesCircle className="text-red-500 mr-2" />
                            )}
                            <span className={`font-medium ${response.success ? 'text-green-700' : 'text-red-700'}`}>
                                {response.success ? 'Success' : 'Error'} ({response.status})
                            </span>
                        </div>
                        <button
                            onClick={() => copyToClipboard(JSON.stringify(response.data, null, 2))}
                            className="text-gray-500 hover:text-gray-700 text-sm"
                        >
                            <FaCopy />
                        </button>
                    </div>
                    <pre className={`text-xs p-3 rounded-lg overflow-auto max-h-64 ${
                        response.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                    }`}>
                        {JSON.stringify(response.data, null, 2)}
                    </pre>
                </div>
            )}
        </motion.div>
    );

    const DatabaseTable = ({ name, description }) => (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-1">{name}</h4>
            <p className="text-gray-600 text-sm">{description}</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-6">
                {/* Header */}
                <motion.div 
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        🏗️ B4 Brothers API Testing Center
                    </h1>
                    <p className="text-xl text-gray-600 mb-6">
                        Test and validate all backend API endpoints
                    </p>
                    
                    {/* Server Status */}
                    <div className={`inline-flex items-center px-6 py-3 rounded-full font-medium ${
                        serverStatus === 'online' ? 'bg-green-100 text-green-700' :
                        serverStatus === 'offline' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                    }`}>
                        <FaServer className="mr-2" />
                        Server Status: {serverStatus === 'checking' ? 'Checking...' : serverStatus.toUpperCase()}
                    </div>
                </div>

                {/* Configuration */}
                <motion.div 
                    className="bg-white rounded-xl shadow-soft p-6 mb-8 border border-gray-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Configuration</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Backend URL
                            </label>
                            <input
                                type="text"
                                value={baseUrl}
                                onChange={(e) => setBaseUrl(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                placeholder="http://localhost:5000/api"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Auth Token
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={authToken ? `${authToken.substring(0, 20)}...` : 'Not authenticated'}
                                    readOnly
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                />
                                {authToken ? (
                                    <button
                                        onClick={clearToken}
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                    >
                                        Clear
                                    </button>
                                ) : (
                                    <button
                                        onClick={adminLogin}
                                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                    >
                                        Login
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Database Schema */}
                <motion.div 
                    className="bg-white rounded-xl shadow-soft p-6 mb-8 border border-gray-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                        <FaDatabase className="mr-2" />
                        Database Tables
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <DatabaseTable name="users" description="Admin authentication and user management" />
                        <DatabaseTable name="analytics" description="User behavior tracking and website analytics" />
                        <DatabaseTable name="form_submissions" description="Contact forms and career applications" />
                        <DatabaseTable name="testimonials" description="Client testimonials and reviews" />
                        <DatabaseTable name="projects" description="Portfolio projects with images and details" />
                        <DatabaseTable name="services" description="Service offerings and descriptions" />
                        <DatabaseTable name="configs" description="Site configuration and settings" />
                        <DatabaseTable name="contact_info" description="Contact information management" />
                    </div>
                </motion.div>

                {/* API Tests */}
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Public Endpoints */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                            <FaCode className="mr-2" />
                            Public API Endpoints
                        </h2>
                        
                        <div className="space-y-4">
                            <ApiTest
                                title="Health Check"
                                endpoint="/health"
                                method="GET"
                                description="Check server and database connectivity"
                                onTest={() => testEndpoint('health', '/health')}
                                response={responses.health}
                                isLoading={loading.health}
                            />

                            <ApiTest
                                title="Get Projects"
                                endpoint="/projects"
                                method="GET"
                                description="Retrieve construction projects portfolio"
                                onTest={() => testEndpoint('projects', '/projects?limit=5')}
                                response={responses.projects}
                                isLoading={loading.projects}
                            />

                            <ApiTest
                                title="Get Testimonials"
                                endpoint="/testimonials"
                                method="GET"
                                description="Retrieve client testimonials and reviews"
                                onTest={() => testEndpoint('testimonials', '/testimonials?limit=5')}
                                response={responses.testimonials}
                                isLoading={loading.testimonials}
                            />

                            <ApiTest
                                title="Get Services"
                                endpoint="/services"
                                method="GET"
                                description="Retrieve service offerings"
                                onTest={() => testEndpoint('services', '/services')}
                                response={responses.services}
                                isLoading={loading.services}
                            />

                            <ApiTest
                                title="Submit Form"
                                endpoint="/forms/submit"
                                method="POST"
                                description="Submit contact form or career application"
                                onTest={() => testEndpoint('submitForm', '/forms/submit', 'POST', {
                                    type: 'contact',
                                    formData: {
                                        name: 'API Test User',
                                        email: 'test@example.com',
                                        phone: '+91 98765 43210',
                                        message: 'Testing API submission from React app'
                                    },
                                    visitorId: generateVisitorId(),
                                    source: 'api_test'
                                })}
                                response={responses.submitForm}
                                isLoading={loading.submitForm}
                            />

                            <ApiTest
                                title="Track Analytics"
                                endpoint="/analytics/track"
                                method="POST"
                                description="Track user events for analytics"
                                onTest={() => testEndpoint('analytics', '/analytics/track', 'POST', {
                                    visitorId: generateVisitorId(),
                                    sessionId: 'session_' + Date.now(),
                                    eventType: 'pageview',
                                    eventData: { page: '/api-test' },
                                    userAgent: navigator.userAgent
                                })}
                                response={responses.analytics}
                                isLoading={loading.analytics}
                            />
                        </div>
                    </div>

                    {/* Admin Endpoints */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                            <FaUsers className="mr-2" />
                            Admin API Endpoints
                        </h2>
                        
                        <div className="space-y-4">
                            <ApiTest
                                title="Admin Login"
                                endpoint="/auth/login"
                                method="POST"
                                description="Authenticate admin user (admin/b4brothers2024)"
                                onTest={adminLogin}
                                response={responses.login}
                                isLoading={loading.login}
                            />

                            <ApiTest
                                title="Analytics Dashboard"
                                endpoint="/analytics/dashboard"
                                method="GET"
                                description="Get comprehensive analytics data"
                                onTest={() => testEndpoint('dashboard', '/analytics/dashboard', 'GET', null, true)}
                                response={responses.dashboard}
                                isLoading={loading.dashboard}
                                requiresAuth={true}
                            />

                            <ApiTest
                                title="Form Submissions"
                                endpoint="/forms/submissions"
                                method="GET"
                                description="Get and manage form submissions"
                                onTest={() => testEndpoint('submissions', '/forms/submissions?limit=10', 'GET', null, true)}
                                response={responses.submissions}
                                isLoading={loading.submissions}
                                requiresAuth={true}
                            />

                            <ApiTest
                                title="Create Testimonial"
                                endpoint="/testimonials"
                                method="POST"
                                description="Create new client testimonial"
                                onTest={() => testEndpoint('createTestimonial', '/testimonials', 'POST', {
                                    name: 'API Test Client',
                                    about: 'This is a test testimonial created via API testing interface.',
                                    post: 'Test Client',
                                    rating: 5,
                                    location: 'API Test Location',
                                    projectType: 'API Test',
                                    isActive: true,
                                    isFeatured: false,
                                    verificationStatus: 'verified'
                                }, true)}
                                response={responses.createTestimonial}
                                isLoading={loading.createTestimonial}
                                requiresAuth={true}
                            />

                            <ApiTest
                                title="Get Configuration"
                                endpoint="/config"
                                method="GET"
                                description="Retrieve site configuration"
                                onTest={() => testEndpoint('config', '/config', 'GET', null, false)}
                                response={responses.config}
                                isLoading={loading.config}
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <motion.div 
                    className="text-center mt-12 py-8 border-t border-gray-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <p className="text-gray-600 mb-4">
                        🏗️ B4 Brothers Infratech Backend API Testing Center
                    </p>
                    <div className="flex justify-center gap-4">
                        <a 
                            href={`${baseUrl.replace('/api', '')}/test-api.html`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-500 hover:text-primary-600 flex items-center"
                        >
                            <FaExternalLinkAlt className="mr-1" />
                            Open HTML Version
                        </a>
                        <span className="text-gray-300">|</span>
                        <button
                            onClick={checkServerHealth}
                            className="text-primary-500 hover:text-primary-600"
                        >
                            Refresh Server Status
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ApiTester;