import React, { useEffect, useState } from 'react';
import App from './App.jsx';
import CareerPage from './pages/CareerPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import AdminLogin from './components/AdminLogin.jsx';
import ApiTester from './pages/ApiTester.jsx';
import { AnalyticsProvider, useAnalytics } from './contexts/AnalyticsContext.jsx';

const RouterContent = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Track page views
  useEffect(() => {
    let pageName = 'Home';
    if (currentPath === '/career' || currentPath === '/career/') {
      pageName = 'Career';
    } else if (currentPath === '/admin' || currentPath === '/admin/') {
      pageName = 'Admin';
    }
    trackPageView(pageName);
  }, [currentPath, trackPageView]);

  // Handle admin pages
  if (currentPath === '/admin' || currentPath === '/admin/') {
    if (!isLoggedIn) {
      return <AdminLogin onLogin={setIsLoggedIn} />;
    }
    return <AdminPage onLogout={() => setIsLoggedIn(false)} />;
  }

  // Handle career page
  if (currentPath === '/career' || currentPath === '/career/') {
    return <CareerPage />;
  }

  // Default to main app for all other routes
  return <App />;
};

const Router = () => {
  return (
    <AnalyticsProvider>
      <RouterContent />
    </AnalyticsProvider>
  );
};

export default Router;
