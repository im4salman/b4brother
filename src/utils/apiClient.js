// B4 Brothers API Client Utility
// Updated to integrate with real backend APIs

const API_BASE_URL = 'https://b4brother-backend.onrender.com';

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

    console.log(`🔍 API Request: ${options.method || 'GET'} ${url}`);

    try {
      const response = await fetch(url, config);

      console.log(`📡 API Response: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage;

        console.error(`❌ API Error Response (${response.status}):`, errorText);

        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorData.message || `HTTP ${response.status} - ${response.statusText}`;
        } catch {
          errorMessage = errorText || `HTTP ${response.status} - ${response.statusText}`;
        }

        // Add more specific error context
        if (response.status === 404) {
          errorMessage = `Endpoint not found: ${endpoint}. Please check if this API endpoint exists on the server.`;
        } else if (response.status === 500) {
          errorMessage = `Server error: ${errorMessage}`;
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log(`✅ API Success:`, data);
      return data;
    } catch (error) {
      console.error(`🚨 API Request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // =========================
  // JOB APPLICATION APIs
  // =========================

  // Create Job Application
  async createApplication(applicationData) {
    return this.request('/applications', {
      method: 'POST',
      body: JSON.stringify(applicationData),
    });
  }

  // Get All Job Applications
  async getAllApplications() {
    return this.request('/applications');
  }

  // Get Single Job Application
  async getApplication(id) {
    return this.request(`/applications/${id}`);
  }

  // Update Job Application
  async updateApplication(id, updates) {
    return this.request(`/applications/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  // Delete Job Application
  async deleteApplication(id) {
    return this.request(`/applications/${id}`, {
      method: 'DELETE',
    });
  }

  // Submit Application via WhatsApp
  async submitApplicationViaWhatsApp(applicationData) {
    return this.request('/applications/whatsapp', {
      method: 'POST',
      body: JSON.stringify(applicationData),
    });
  }

  // =========================
  // FEEDBACK APIs
  // =========================

  // Create Feedback
  async createFeedback(feedbackData) {
    return this.request('/feedback', {
      method: 'POST',
      body: JSON.stringify(feedbackData),
    });
  }

  // Get All Feedback
  async getAllFeedback() {
    return this.request('/feedback');
  }

  // Get Single Feedback
  async getFeedback(id) {
    return this.request(`/feedback/${id}`);
  }

  // Update Feedback
  async updateFeedback(id, updates) {
    return this.request(`/feedback/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  // Delete Feedback
  async deleteFeedback(id) {
    return this.request(`/feedback/${id}`, {
      method: 'DELETE',
    });
  }

  // =========================
  // CONTACT APIs
  // =========================

  // Create Contact
  async createContact(contactData) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }

  // Get All Contacts
  async getAllContacts() {
    return this.request('/contact');
  }

  // Get Single Contact
  async getContact(id) {
    return this.request(`/contact/${id}`);
  }

  // Update Contact
  async updateContact(id, updates) {
    return this.request(`/contact/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  // Delete Contact
  async deleteContact(id) {
    return this.request(`/contact/${id}`, {
      method: 'DELETE',
    });
  }

  // =========================
  // REACH US APIs
  // =========================

  // Create Reach Us Entry
  async createReachUs(reachUsData) {
    return this.request('/reach-us', {
      method: 'POST',
      body: JSON.stringify(reachUsData),
    });
  }

  // Get All Reach Us Entries
  async getAllReachUs() {
    return this.request('/reach-us');
  }

  // Get Single Reach Us Entry
  async getReachUs(id) {
    return this.request(`/reach-us/${id}`);
  }

  // Update Reach Us Entry
  async updateReachUs(id, updates) {
    return this.request(`/reach-us/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  // Delete Reach Us Entry
  async deleteReachUs(id) {
    return this.request(`/reach-us/${id}`, {
      method: 'DELETE',
    });
  }

  // =========================
  // CONVENIENCE METHODS
  // =========================

  // Submit form data to appropriate endpoint based on type
  async submitForm(formType, formData) {
    try {
      let result;
      
      switch (formType.toLowerCase()) {
        case 'contact':
        case 'contact_form':
          // Map form data to contact API format
          const contactData = {
            fullName: formData.name || formData.fullName,
            phone: formData.phone,
            email: formData.email,
            serviceRequired: formData.service || formData.serviceRequired || 'General Inquiry',
            budgetRange: formData.budget || formData.budgetRange || '',
            projectTimeline: formData.timeline || formData.projectTimeline || '',
            projectDescription: formData.message || formData.query || formData.projectDescription
          };
          result = await this.createContact(contactData);
          break;

        case 'career':
        case 'job_application':
        case 'application':
          // Map form data to application API format
          const applicationData = {
            fullName: formData.name || formData.fullName,
            email: formData.email,
            phone: formData.phone,
            position: formData.position,
            yearsOfExperience: formData.experience || formData.yearsOfExperience || '',
            education: formData.education || '',
            coverLetter: formData.message || formData.coverLetter || ''
          };
          result = await this.createApplication(applicationData);
          break;

        case 'feedback':
        case 'testimonial':
          // Map form data to feedback API format
          const feedbackData = {
            feedback: formData.feedback || formData.message || formData.review,
            rating: formData.rating || 5,
            name: formData.name,
            designation: formData.designation || formData.position || ''
          };
          result = await this.createFeedback(feedbackData);
          break;

        case 'reach_us':
        case 'reach-us':
        case 'quick_contact':
          // Map form data to reach-us API format
          const reachUsData = {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            query: formData.query || formData.message
          };
          result = await this.createReachUs(reachUsData);
          break;

        default:
          throw new Error(`Unknown form type: ${formType}`);
      }

      return { success: true, data: result };
    } catch (error) {
      console.error(`Error submitting ${formType} form:`, error);
      return { success: false, error: error.message };
    }
  }

  // Handle WhatsApp submission with API backup
  async submitFormWithWhatsApp(formType, formData, whatsappMessage) {
    try {
      // Try to submit to API first
      const apiResult = await this.submitForm(formType, formData);
      
      // Store locally as backup
      const submissionData = {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2),
        type: formType,
        timestamp: new Date().toISOString(),
        data: formData,
        apiSubmitted: apiResult.success,
        apiError: apiResult.error || null
      };

      const existingSubmissions = JSON.parse(localStorage.getItem('b4-form-submissions') || '[]');
      existingSubmissions.push(submissionData);
      localStorage.setItem('b4-form-submissions', JSON.stringify(existingSubmissions));

      // Open WhatsApp regardless of API result
      const whatsappNumber = '919733221114';
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');

      return {
        success: true,
        apiSubmitted: apiResult.success,
        localStored: true,
        message: apiResult.success 
          ? 'Form submitted successfully to server and WhatsApp opened!'
          : 'Form stored locally and WhatsApp opened. Server submission failed but data is safe.'
      };
    } catch (error) {
      console.error('Error in submitFormWithWhatsApp:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // =========================
  // ADMIN METHODS (for future use)
  // =========================

  // Get all data for admin dashboard
  async getAdminDashboard() {
    try {
      const [applications, contacts, feedback, reachUs] = await Promise.allSettled([
        this.getAllApplications(),
        this.getAllContacts(),
        this.getAllFeedback(),
        this.getAllReachUs()
      ]);

      return {
        applications: applications.status === 'fulfilled' ? applications.value : [],
        contacts: contacts.status === 'fulfilled' ? contacts.value : [],
        feedback: feedback.status === 'fulfilled' ? feedback.value : [],
        reachUs: reachUs.status === 'fulfilled' ? reachUs.value : [],
        errors: {
          applications: applications.status === 'rejected' ? applications.reason.message : null,
          contacts: contacts.status === 'rejected' ? contacts.reason.message : null,
          feedback: feedback.status === 'rejected' ? feedback.reason.message : null,
          reachUs: reachUs.status === 'rejected' ? reachUs.reason.message : null,
        }
      };
    } catch (error) {
      console.error('Error fetching admin dashboard data:', error);
      throw error;
    }
  }

  // =========================
  // LEGACY METHODS (maintained for compatibility)
  // =========================

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

  // Track analytics event (local storage for now)
  async trackEvent(eventType, eventData) {
    const event = {
      visitorId: this.generateVisitorId(),
      sessionId: this.generateSessionId(),
      eventType,
      eventData,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer
    };

    const events = JSON.parse(localStorage.getItem('b4-analytics-events') || '[]');
    events.push(event);
    localStorage.setItem('b4-analytics-events', JSON.stringify(events));

    return event;
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
const ContactForm = () => {
  const handleSubmit = async (formData) => {
    try {
      const result = await apiClient.submitForm('contact', formData);
      if (result.success) {
        alert('Contact form submitted successfully!');
      } else {
        alert('Failed to submit: ' + result.error);
      }
    } catch (error) {
      alert('Failed to submit form: ' + error.message);
    }
  };

  const handleSubmitWithWhatsApp = async (formData) => {
    const whatsappMessage = `Contact Form Submission:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Message: ${formData.message}`;

    try {
      const result = await apiClient.submitFormWithWhatsApp('contact', formData, whatsappMessage);
      alert(result.message);
    } catch (error) {
      alert('Failed to submit form: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      // Form fields...
    </form>
  );
};

// Admin usage:
const AdminComponent = () => {
  const [dashboardData, setDashboardData] = useState(null);

  const loadDashboard = async () => {
    try {
      const data = await apiClient.getAdminDashboard();
      setDashboardData(data);
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    }
  };

  return (
    <div>
      <button onClick={loadDashboard}>Load Dashboard</button>
      {dashboardData && (
        <div>
          <p>Applications: {dashboardData.applications.length}</p>
          <p>Contacts: {dashboardData.contacts.length}</p>
          <p>Feedback: {dashboardData.feedback.length}</p>
        </div>
      )}
    </div>
  );
};

*/
