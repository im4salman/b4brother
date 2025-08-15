// B4 Brothers API Client Utility
// Use this to integrate backend APIs throughout your React app

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-domain.com/api'  // Update with your production backend URL
  : 'http://localhost:5000/api';

class B4BrothersAPI {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('b4-admin-token');
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('b4-admin-token', token);
    } else {
      localStorage.removeItem('b4-admin-token');
    }
  }

  // Get authentication token
  getToken() {
    return this.token || localStorage.getItem('b4-admin-token');
  }

  // Make API request
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Add auth token if available
    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Generate visitor ID for analytics
  generateVisitorId() {
    let visitorId = localStorage.getItem('b4-visitor-id');
    if (!visitorId) {
      visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('b4-visitor-id', visitorId);
    }
    return visitorId;
  }

  // Generate session ID
  generateSessionId() {
    let sessionId = sessionStorage.getItem('b4-session-id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('b4-session-id', sessionId);
    }
    return sessionId;
  }

  // =========================
  // PUBLIC API METHODS
  // =========================

  // Get server health
  async getHealth() {
    return this.request('/health');
  }

  // Submit contact form
  async submitForm(type, formData) {
    return this.request('/forms/submit', {
      method: 'POST',
      body: JSON.stringify({
        type,
        formData,
        visitorId: this.generateVisitorId(),
        sessionId: this.generateSessionId(),
        source: 'website'
      }),
    });
  }

  // Track analytics event
  async trackEvent(eventType, eventData) {
    return this.request('/analytics/track', {
      method: 'POST',
      body: JSON.stringify({
        visitorId: this.generateVisitorId(),
        sessionId: this.generateSessionId(),
        eventType,
        eventData,
        userAgent: navigator.userAgent,
        referrer: document.referrer
      }),
    });
  }

  // Get projects
  async getProjects(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/projects?${params}`);
  }

  // Get testimonials
  async getTestimonials(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/testimonials?${params}`);
  }

  // Get services
  async getServices(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/services?${params}`);
  }

  // Get configuration
  async getConfig(category = '') {
    const params = category ? `?category=${category}` : '';
    return this.request(`/config${params}`);
  }

  // Get contact information
  async getContactInfo(type = '') {
    const params = type ? `?type=${type}` : '';
    return this.request(`/contact-info${params}`);
  }

  // =========================
  // ADMIN API METHODS
  // =========================

  // Admin login
  async login(username, password) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    if (response.token) {
      this.setToken(response.token);
    }

    return response;
  }

  // Change password
  async changePassword(currentPassword, newPassword) {
    return this.request('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  // Get analytics dashboard
  async getAnalyticsDashboard(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/analytics/dashboard?${params}`);
  }

  // Get form submissions
  async getFormSubmissions(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/forms/submissions?${params}`);
  }

  // Update form submission
  async updateFormSubmission(id, updates) {
    return this.request(`/forms/submissions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  // Create testimonial
  async createTestimonial(testimonialData, imageFile = null) {
    if (imageFile) {
      // Handle file upload
      const formData = new FormData();
      Object.keys(testimonialData).forEach(key => {
        formData.append(key, testimonialData[key]);
      });
      formData.append('image', imageFile);

      return this.request('/testimonials', {
        method: 'POST',
        headers: {}, // Don't set Content-Type for FormData
        body: formData,
      });
    } else {
      return this.request('/testimonials', {
        method: 'POST',
        body: JSON.stringify(testimonialData),
      });
    }
  }

  // Update testimonial
  async updateTestimonial(id, testimonialData, imageFile = null) {
    if (imageFile) {
      const formData = new FormData();
      Object.keys(testimonialData).forEach(key => {
        formData.append(key, testimonialData[key]);
      });
      formData.append('image', imageFile);

      return this.request(`/testimonials/${id}`, {
        method: 'PUT',
        headers: {},
        body: formData,
      });
    } else {
      return this.request(`/testimonials/${id}`, {
        method: 'PUT',
        body: JSON.stringify(testimonialData),
      });
    }
  }

  // Delete testimonial
  async deleteTestimonial(id) {
    return this.request(`/testimonials/${id}`, {
      method: 'DELETE',
    });
  }

  // Create project
  async createProject(projectData, imageFiles = []) {
    const formData = new FormData();
    Object.keys(projectData).forEach(key => {
      if (Array.isArray(projectData[key])) {
        formData.append(key, JSON.stringify(projectData[key]));
      } else {
        formData.append(key, projectData[key]);
      }
    });

    imageFiles.forEach((file, index) => {
      formData.append('images', file);
    });

    return this.request('/projects', {
      method: 'POST',
      headers: {},
      body: formData,
    });
  }

  // Update project
  async updateProject(id, projectData, imageFiles = []) {
    const formData = new FormData();
    Object.keys(projectData).forEach(key => {
      if (Array.isArray(projectData[key])) {
        formData.append(key, JSON.stringify(projectData[key]));
      } else {
        formData.append(key, projectData[key]);
      }
    });

    imageFiles.forEach((file, index) => {
      formData.append('images', file);
    });

    return this.request(`/projects/${id}`, {
      method: 'PUT',
      headers: {},
      body: formData,
    });
  }

  // Delete project
  async deleteProject(id) {
    return this.request(`/projects/${id}`, {
      method: 'DELETE',
    });
  }

  // Update configuration
  async updateConfig(key, value, description = '', category = '') {
    return this.request(`/config/${key}`, {
      method: 'PUT',
      body: JSON.stringify({ value, description, category }),
    });
  }

  // Export data
  async exportData(collections = 'all') {
    const params = new URLSearchParams({ collections });
    return this.request(`/export/data?${params}`);
  }
}

// Create singleton instance
const apiClient = new B4BrothersAPI();

export default apiClient;

// Export the class for creating custom instances
export { B4BrothersAPI };

// =========================
// USAGE EXAMPLES
// =========================

/*

// Basic usage in React components:

import apiClient from '../utils/apiClient';

// In a component:
const MyComponent = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Get projects on component mount
    apiClient.getProjects({ category: 'Residential', limit: 6 })
      .then(data => setProjects(data.projects))
      .catch(error => console.error('Failed to load projects:', error));
  }, []);

  const handleFormSubmit = async (formData) => {
    try {
      await apiClient.submitForm('contact', formData);
      // Track the form submission
      await apiClient.trackEvent('form_submission', { 
        formType: 'contact', 
        formData 
      });
      alert('Form submitted successfully!');
    } catch (error) {
      alert('Failed to submit form: ' + error.message);
    }
  };

  const handleWhatsAppClick = async () => {
    await apiClient.trackEvent('whatsapp_redirect', {
      message: 'Clicked WhatsApp button',
      location: window.location.pathname
    });
  };

  return (
    <div>
      {projects.map(project => (
        <div key={project.id}>{project.title}</div>
      ))}
    </div>
  );
};

// Admin usage:
const AdminComponent = () => {
  const [analytics, setAnalytics] = useState(null);

  const loadAnalytics = async () => {
    try {
      const data = await apiClient.getAnalyticsDashboard({
        startDate: '2024-01-01',
        endDate: '2024-01-31'
      });
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    }
  };

  const handleLogin = async () => {
    try {
      await apiClient.login('admin', 'b4brothers2024');
      loadAnalytics();
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={loadAnalytics}>Load Analytics</button>
    </div>
  );
};

*/
