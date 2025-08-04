import React, { createContext, useContext, useState, useEffect } from 'react';

const AnalyticsContext = createContext();

export const useAnalytics = () => {
    const context = useContext(AnalyticsContext);
    if (!context) {
        throw new Error('useAnalytics must be used within an AnalyticsProvider');
    }
    return context;
};

export const AnalyticsProvider = ({ children }) => {
    const [analytics, setAnalytics] = useState(() => {
        const saved = localStorage.getItem('b4-analytics');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error('Error parsing analytics data:', e);
            }
        }
        return {
            totalClicks: 0,
            uniqueVisitors: new Set(),
            formSubmissions: [],
            whatsappRedirects: [],
            pageViews: [],
            buttonClicks: []
        };
    });

    // Convert Set to Array for storage and back
    useEffect(() => {
        const dataToSave = {
            ...analytics,
            uniqueVisitors: Array.from(analytics.uniqueVisitors)
        };
        localStorage.setItem('b4-analytics', JSON.stringify(dataToSave));
    }, [analytics]);

    const generateSessionId = () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    };

    const getVisitorId = () => {
        let visitorId = localStorage.getItem('b4-visitor-id');
        if (!visitorId) {
            visitorId = generateSessionId();
            localStorage.setItem('b4-visitor-id', visitorId);
        }
        return visitorId;
    };

    const trackClick = (element, location = 'unknown') => {
        const visitorId = getVisitorId();
        const timestamp = new Date().toISOString();
        
        setAnalytics(prev => {
            const newUniqueVisitors = new Set(prev.uniqueVisitors);
            newUniqueVisitors.add(visitorId);
            
            return {
                ...prev,
                totalClicks: prev.totalClicks + 1,
                uniqueVisitors: newUniqueVisitors,
                buttonClicks: [...prev.buttonClicks, {
                    id: generateSessionId(),
                    element,
                    location,
                    visitorId,
                    timestamp
                }]
            };
        });
    };

    const trackFormSubmission = (formType, formData) => {
        const visitorId = getVisitorId();
        const timestamp = new Date().toISOString();
        
        setAnalytics(prev => ({
            ...prev,
            formSubmissions: [...prev.formSubmissions, {
                id: generateSessionId(),
                formType,
                formData,
                visitorId,
                timestamp
            }]
        }));
    };

    const trackWhatsAppRedirect = (message, formData = null) => {
        const visitorId = getVisitorId();
        const timestamp = new Date().toISOString();
        
        setAnalytics(prev => ({
            ...prev,
            whatsappRedirects: [...prev.whatsappRedirects, {
                id: generateSessionId(),
                message,
                formData,
                visitorId,
                timestamp
            }]
        }));
    };

    const trackPageView = (page) => {
        const visitorId = getVisitorId();
        const timestamp = new Date().toISOString();
        
        setAnalytics(prev => {
            const newUniqueVisitors = new Set(prev.uniqueVisitors);
            newUniqueVisitors.add(visitorId);
            
            return {
                ...prev,
                uniqueVisitors: newUniqueVisitors,
                pageViews: [...prev.pageViews, {
                    id: generateSessionId(),
                    page,
                    visitorId,
                    timestamp
                }]
            };
        });
    };

    const clearAnalytics = () => {
        setAnalytics({
            totalClicks: 0,
            uniqueVisitors: new Set(),
            formSubmissions: [],
            whatsappRedirects: [],
            pageViews: [],
            buttonClicks: []
        });
        localStorage.removeItem('b4-analytics');
    };

    const exportAnalytics = () => {
        const dataToExport = {
            ...analytics,
            uniqueVisitors: Array.from(analytics.uniqueVisitors),
            exportedAt: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
            type: 'application/json'
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `b4-analytics-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const value = {
        analytics: {
            ...analytics,
            uniqueVisitorsCount: analytics.uniqueVisitors.size
        },
        trackClick,
        trackFormSubmission,
        trackWhatsAppRedirect,
        trackPageView,
        clearAnalytics,
        exportAnalytics
    };

    return (
        <AnalyticsContext.Provider value={value}>
            {children}
        </AnalyticsContext.Provider>
    );
};
