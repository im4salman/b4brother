import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import apiClient from '../utils/apiClient';

const ApiStatus = () => {
    const [status, setStatus] = useState('unknown'); // 'online', 'offline', 'cors-error', 'unknown'
    const [showNotification, setShowNotification] = useState(false);
    const [lastCheck, setLastCheck] = useState(null);
    const [corsIssue, setCorsIssue] = useState(false);

    const checkApiStatus = async () => {
        try {
            const health = await apiClient.testApiHealth();
            const hasWorkingEndpoints = Object.values(health.endpoints || {}).some(endpoint => endpoint.available);

            if (health.corsIssue) {
                setStatus('cors-error');
                setCorsIssue(true);
                setShowNotification(true);
                setTimeout(() => setShowNotification(false), 8000);
            } else {
                const newStatus = hasWorkingEndpoints ? 'online' : 'offline';
                setStatus(newStatus);
                setCorsIssue(false);

                // Show notification if status changed to offline
                if (newStatus === 'offline') {
                    setShowNotification(true);
                    setTimeout(() => setShowNotification(false), 5000);
                }
            }

            setLastCheck(new Date());
        } catch (error) {
            const isCorsError = error.isCorsError || (error.name === 'TypeError' && error.message === 'Failed to fetch');

            if (isCorsError) {
                setStatus('cors-error');
                setCorsIssue(true);
                console.log('🌐 CORS issue detected:', error.message);
            } else {
                setStatus('offline');
                setCorsIssue(false);
            }

            setLastCheck(new Date());
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 8000);
        }
    };

    useEffect(() => {
        // Check status on component mount (with a small delay to avoid blocking initial render)
        const initialCheck = setTimeout(() => {
            checkApiStatus();
        }, 2000);

        // Check periodically (every 10 minutes to reduce CORS errors)
        const interval = setInterval(checkApiStatus, 10 * 60 * 1000);

        return () => {
            clearTimeout(initialCheck);
            clearInterval(interval);
        };
    }, []);

    const getStatusColor = () => {
        switch (status) {
            case 'online': return 'bg-green-500';
            case 'offline': return 'bg-red-500';
            case 'cors-error': return 'bg-orange-500';
            default: return 'bg-yellow-500';
        }
    };

    const getStatusText = () => {
        switch (status) {
            case 'online': return 'API Connected';
            case 'offline': return 'API Offline - Using Local Storage';
            case 'cors-error': return 'CORS Issue - Using Local Storage';
            default: return 'Checking API Status...';
        }
    };

    const getNotificationTitle = () => {
        if (corsIssue) {
            return 'CORS Connection Issue';
        }
        return 'Server Connection Issue';
    };

    const getNotificationMessage = () => {
        if (corsIssue) {
            return 'The API server has CORS restrictions. Forms will work using local storage backup.';
        }
        return 'Our servers are temporarily unavailable. Your form submissions will be saved locally and synced when the connection is restored.';
    };

    return (
        <>
            {/* Status Indicator */}
            <div className="fixed top-4 left-4 z-40">
                <div className="flex items-center gap-2 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-1 shadow-md">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}></div>
                    <span className="text-xs font-medium text-gray-700">
                        {getStatusText()}
                    </span>
                </div>
            </div>

            {/* Notification */}
            <AnimatePresence>
                {showNotification && (status === 'offline' || status === 'cors-error') && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-16 left-4 right-4 md:left-4 md:right-auto md:max-w-md z-50"
                    >
                        <div className={`border rounded-lg p-4 shadow-lg ${
                            corsIssue
                                ? 'bg-orange-50 border-orange-200'
                                : 'bg-yellow-50 border-yellow-200'
                        }`}>
                            <div className="flex items-start gap-3">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                    corsIssue ? 'bg-orange-100' : 'bg-yellow-100'
                                }`}>
                                    <svg className={`w-4 h-4 ${
                                        corsIssue ? 'text-orange-600' : 'text-yellow-600'
                                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.962-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className={`text-sm font-medium ${
                                        corsIssue ? 'text-orange-800' : 'text-yellow-800'
                                    }`}>
                                        {getNotificationTitle()}
                                    </h3>
                                    <p className={`text-xs mt-1 ${
                                        corsIssue ? 'text-orange-700' : 'text-yellow-700'
                                    }`}>
                                        {getNotificationMessage()}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowNotification(false)}
                                    className={`${
                                        corsIssue
                                            ? 'text-orange-600 hover:text-orange-800'
                                            : 'text-yellow-600 hover:text-yellow-800'
                                    }`}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Development Info */}
            {process.env.NODE_ENV === 'development' && lastCheck && (
                <div className="fixed bottom-20 right-4 z-40">
                    <div className="bg-gray-800 text-white text-xs px-3 py-2 rounded shadow-lg">
                        Last API check: {lastCheck.toLocaleTimeString()}
                        <br />
                        <button
                            onClick={checkApiStatus}
                            className="text-blue-300 hover:text-blue-100 underline mt-1"
                        >
                            Check Now
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ApiStatus;
