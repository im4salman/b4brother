# B4 Brothers Infratech Backend API Documentation

## Overview

This is the complete API documentation for the B4 Brothers Infratech backend system. The API provides endpoints for managing analytics, form submissions, testimonials, projects, user authentication, and site configuration.

**Base URL:** `http://localhost:5000/api` (Development)  
**Base URL:** `https://api.b4brothersinfratech.com/api` (Production)

---

## Table of Contents

1. [Authentication](#authentication)
2. [Analytics API](#analytics-api)
3. [Form Submissions API](#form-submissions-api)
4. [Testimonials API](#testimonials-api)
5. [Projects API](#projects-api)
6. [Services API](#services-api)
7. [Configuration API](#configuration-api)
8. [Contact Information API](#contact-information-api)
9. [File Upload](#file-upload)
10. [Error Handling](#error-handling)
11. [Rate Limiting](#rate-limiting)

---

## Authentication

### Login
**POST** `/auth/login`

Authenticate admin user and get access token.

**Request Body:**
```json
{
  "username": "admin",
  "password": "b4brothers2024"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "username": "admin",
    "email": "admin@b4brothersinfratech.com",
    "role": "admin",
    "permissions": [...]
  }
}
```

### Change Password
**POST** `/auth/change-password`

Change authenticated user's password.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "currentPassword": "current_password",
  "newPassword": "new_password"
}
```

---

## Analytics API

### Track Event
**POST** `/analytics/track`

Track user events for analytics.

**Request Body:**
```json
{
  "visitorId": "visitor_unique_id",
  "sessionId": "session_unique_id",
  "eventType": "pageview|click|form_submission|whatsapp_redirect",
  "eventData": {
    "page": "/contact",
    "element": "Contact Button",
    "location": "Header",
    "formType": "contact",
    "formData": {...},
    "message": "WhatsApp message"
  },
  "userAgent": "Mozilla/5.0...",
  "referrer": "https://google.com"
}
```

### Get Analytics Dashboard
**GET** `/analytics/dashboard`

Get analytics dashboard data (Admin only).

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `startDate` (optional): Start date in ISO format
- `endDate` (optional): End date in ISO format
- `eventType` (optional): Filter by event type

**Response:**
```json
{
  "summary": {
    "totalEvents": 1250,
    "uniqueVisitors": 450,
    "pageViews": 800,
    "formSubmissions": 25,
    "whatsappRedirects": 15,
    "buttonClicks": 410
  },
  "eventsByType": [
    {"_id": "pageview", "count": 800},
    {"_id": "click", "count": 410}
  ],
  "topPages": [
    {"_id": "/", "count": 300},
    {"_id": "/contact", "count": 150}
  ],
  "dailyStats": [
    {
      "date": "2024-01-15",
      "events": 45,
      "uniqueVisitors": 23
    }
  ]
}
```

---

## Form Submissions API

### Submit Form
**POST** `/forms/submit`

Submit a form from the website.

**Request Body:**
```json
{
  "type": "contact|career|quote|newsletter|quick_contact",
  "formData": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 98765 43210",
    "service": "Building Construction",
    "budget": "₹15-50 Lakhs",
    "timeline": "3-6 Months",
    "message": "Need consultation for house construction"
  },
  "visitorId": "visitor_unique_id",
  "sessionId": "session_unique_id",
  "source": "website"
}
```

**Response:**
```json
{
  "message": "Form submitted successfully",
  "submissionId": "submission_id"
}
```

### Get Form Submissions
**GET** `/forms/submissions`

Get list of form submissions (Admin only).

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (default: 1): Page number
- `limit` (default: 20): Items per page
- `type`: Filter by form type
- `status`: Filter by status (new|contacted|in_progress|completed|archived)
- `priority`: Filter by priority (low|medium|high|urgent)
- `startDate`: Start date filter
- `endDate`: End date filter
- `search`: Search in name, email, or phone

**Response:**
```json
{
  "submissions": [
    {
      "_id": "submission_id",
      "type": "contact",
      "formData": {...},
      "status": "new",
      "priority": "medium",
      "assignedTo": null,
      "notes": [],
      "createdAt": "2024-01-15T10:30:00Z",
      "ipAddress": "192.168.1.1"
    }
  ],
  "totalPages": 5,
  "currentPage": 1,
  "total": 95
}
```

### Update Form Submission
**PUT** `/forms/submissions/:id`

Update form submission status and add notes (Admin only).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "status": "contacted",
  "priority": "high",
  "assignedTo": "user_id",
  "notes": "Called customer, scheduled site visit",
  "followUpDate": "2024-01-20T10:00:00Z"
}
```

---

## Testimonials API

### Get Testimonials
**GET** `/testimonials`

Get list of testimonials.

**Query Parameters:**
- `isActive` (default: true): Filter active testimonials
- `isFeatured`: Filter featured testimonials
- `limit`: Limit number of results
- `page` (default: 1): Page number

**Response:**
```json
{
  "testimonials": [
    {
      "_id": "testimonial_id",
      "name": "John Doe",
      "about": "Excellent service and quality work...",
      "post": "Home Owner",
      "rating": 5,
      "image": "/uploads/testimonial-image.jpg",
      "projectId": "project_id",
      "isActive": true,
      "isFeatured": true,
      "location": "Kolkata",
      "projectType": "Residential Villa",
      "verificationStatus": "verified",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 25,
  "page": 1,
  "totalPages": 3
}
```

### Create Testimonial
**POST** `/testimonials`

Create new testimonial (Admin only).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
- `name`: Client name
- `about`: Testimonial text
- `post`: Client position/role
- `rating`: Rating (1-5)
- `image`: Image file (optional)
- `projectId`: Related project ID (optional)
- `location`: Client location
- `projectType`: Type of project
- `isFeatured`: boolean
- `isActive`: boolean

### Update Testimonial
**PUT** `/testimonials/:id`

Update existing testimonial (Admin only).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

### Delete Testimonial
**DELETE** `/testimonials/:id`

Delete testimonial (Admin only).

**Headers:**
```
Authorization: Bearer <token>
```

---

## Projects API

### Get Projects
**GET** `/projects`

Get list of projects.

**Query Parameters:**
- `category`: Filter by category (Residential|Commercial|Industrial|Renovation|Hospitality)
- `isActive` (default: true): Filter active projects
- `isFeatured`: Filter featured projects
- `limit`: Limit number of results
- `page` (default: 1): Page number
- `search`: Search in title, description, location
- `year`: Filter by completion year
- `status`: Filter by project status

**Response:**
```json
{
  "projects": [
    {
      "_id": "project_id",
      "title": "Modern Residential Villa",
      "description": "A luxurious 5,000 sq ft villa...",
      "category": "Residential",
      "images": ["/uploads/project1.jpg"],
      "thumbnailImage": "/uploads/project1.jpg",
      "location": "Kolkata, West Bengal",
      "area": "5,000 sq ft",
      "duration": "8 months",
      "budget": "₹1.2 Crores",
      "year": 2024,
      "status": "completed",
      "features": ["Smart home automation", "..."],
      "highlights": ["LEED Gold certified", "..."],
      "isActive": true,
      "isFeatured": true,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 45,
  "page": 1,
  "totalPages": 5,
  "categories": ["All", "Residential", "Commercial", "Industrial"]
}
```

### Create Project
**POST** `/projects`

Create new project (Admin only).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
- `title`: Project title
- `description`: Detailed description
- `category`: Project category
- `location`: Project location
- `area`: Project area
- `duration`: Project duration
- `budget`: Project budget
- `year`: Completion year
- `features`: JSON array of features
- `highlights`: JSON array of highlights
- `images`: Multiple image files
- `isActive`: boolean
- `isFeatured`: boolean

### Update Project
**PUT** `/projects/:id`

Update existing project (Admin only).

### Delete Project
**DELETE** `/projects/:id`

Delete project (Admin only).

---

## Services API

### Get Services
**GET** `/services`

Get list of services.

**Query Parameters:**
- `isActive` (default: true): Filter active services
- `isFeatured`: Filter featured services
- `category`: Filter by category

**Response:**
```json
[
  {
    "_id": "service_id",
    "name": "Building Construction",
    "description": "Complete building construction services...",
    "shortDescription": "End-to-end construction solutions",
    "icon": "construction-icon",
    "image": "/uploads/service-image.jpg",
    "category": "construction",
    "features": ["Foundation work", "Quality materials"],
    "benefits": ["Expert management", "Cost-effective"],
    "process": [
      {
        "step": 1,
        "title": "Planning",
        "description": "Initial planning and design"
      }
    ],
    "pricing": {
      "startingPrice": 1500,
      "unit": "per sq ft",
      "notes": "Price varies based on requirements"
    },
    "isActive": true,
    "isFeatured": true,
    "order": 1
  }
]
```

### Create Service
**POST** `/services`

Create new service (Admin only).

---

## Configuration API

### Get Configuration
**GET** `/config`

Get site configuration.

**Query Parameters:**
- `category`: Filter by category
- `key`: Get specific configuration

**Response:**
```json
[
  {
    "_id": "config_id",
    "key": "site_title",
    "value": "B4 Brothers Infratech PVT LTD",
    "description": "Main website title",
    "category": "general",
    "isEditable": true
  }
]
```

### Update Configuration
**PUT** `/config/:key`

Update configuration value (Admin only).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "value": "New Value",
  "description": "Updated description",
  "category": "general"
}
```

---

## Contact Information API

### Get Contact Information
**GET** `/contact-info`

Get contact information.

**Query Parameters:**
- `type`: Filter by type (phone|email|address|social|hours)
- `isActive` (default: true): Filter active contacts

**Response:**
```json
[
  {
    "_id": "contact_id",
    "type": "phone",
    "label": "Primary Phone",
    "value": "+91 97332 21114",
    "isPrimary": true,
    "isActive": true,
    "order": 1
  }
]
```

### Create Contact Information
**POST** `/contact-info`

Create new contact information (Admin only).

---

## File Upload

File uploads are handled using multipart/form-data. Supported file types:
- Images: JPEG, JPG, PNG, GIF
- Documents: PDF, DOC, DOCX
- Maximum file size: 5MB

Uploaded files are stored in `/uploads/` directory and accessible via `/uploads/filename`.

---

## Error Handling

All API endpoints return standardized error responses:

```json
{
  "error": "Error message describing what went wrong"
}
```

**HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

---

## Rate Limiting

API endpoints are rate-limited to prevent abuse:
- **Limit:** 100 requests per 15 minutes per IP
- **Headers:** Rate limit info is included in response headers

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642694400
```

---

## Integration Examples

### Frontend Integration (React)

```javascript
// API utility class
class B4BrothersAPI {
  constructor(baseURL, token = null) {
    this.baseURL = baseURL;
    this.token = token;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Request failed');
    }

    return response.json();
  }

  // Submit contact form
  async submitForm(formData) {
    return this.request('/forms/submit', {
      method: 'POST',
      body: JSON.stringify({
        type: 'contact',
        formData,
        visitorId: this.getVisitorId(),
        sessionId: this.getSessionId(),
        source: 'website'
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

  // Track analytics event
  async trackEvent(eventType, eventData) {
    return this.request('/analytics/track', {
      method: 'POST',
      body: JSON.stringify({
        visitorId: this.getVisitorId(),
        sessionId: this.getSessionId(),
        eventType,
        eventData,
        userAgent: navigator.userAgent,
        referrer: document.referrer
      }),
    });
  }

  getVisitorId() {
    let visitorId = localStorage.getItem('b4-visitor-id');
    if (!visitorId) {
      visitorId = Date.now().toString(36) + Math.random().toString(36).substr(2);
      localStorage.setItem('b4-visitor-id', visitorId);
    }
    return visitorId;
  }

  getSessionId() {
    let sessionId = sessionStorage.getItem('b4-session-id');
    if (!sessionId) {
      sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
      sessionStorage.setItem('b4-session-id', sessionId);
    }
    return sessionId;
  }
}

// Usage in React component
const api = new B4BrothersAPI('http://localhost:5000/api');

// In form submission
const handleSubmit = async (formData) => {
  try {
    await api.submitForm(formData);
    await api.trackEvent('form_submission', { formType: 'contact', formData });
    // Show success message
  } catch (error) {
    // Handle error
  }
};
```

### Admin Dashboard Integration

```javascript
// Admin API class with authentication
class B4BrothersAdminAPI extends B4BrothersAPI {
  async login(username, password) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    
    this.token = response.token;
    localStorage.setItem('admin-token', this.token);
    return response;
  }

  async getAnalyticsDashboard(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/analytics/dashboard?${params}`);
  }

  async getFormSubmissions(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/forms/submissions?${params}`);
  }

  async updateFormSubmission(id, updates) {
    return this.request(`/forms/submissions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async createTestimonial(testimonialData, imageFile) {
    const formData = new FormData();
    Object.keys(testimonialData).forEach(key => {
      formData.append(key, testimonialData[key]);
    });
    if (imageFile) {
      formData.append('image', imageFile);
    }

    return this.request('/testimonials', {
      method: 'POST',
      headers: {}, // Don't set Content-Type for FormData
      body: formData,
    });
  }
}
```

---

## Database Schema

### Collections Overview

1. **users** - Admin users and authentication
2. **analytics** - User behavior tracking data
3. **formsubmissions** - Contact and other form submissions
4. **testimonials** - Client testimonials and reviews
5. **projects** - Portfolio projects and case studies
6. **news** - Blog posts and company news
7. **configs** - Site configuration and settings
8. **contactinfos** - Contact information entries
9. **services** - Service offerings and descriptions

### Indexes

The following indexes are automatically created for optimal performance:

```javascript
// Analytics
{ "visitorId": 1 }
{ "timestamp": -1 }
{ "eventType": 1 }

// Form Submissions
{ "type": 1 }
{ "status": 1 }
{ "createdAt": -1 }
{ "formData.email": 1 }

// Projects
{ "category": 1 }
{ "isActive": 1 }
{ "year": -1 }

// Testimonials
{ "isActive": 1 }
{ "isFeatured": 1 }
```

---

## Deployment Guide

### Environment Setup

1. Copy `.env.example` to `.env`
2. Update environment variables:
   - `MONGODB_URI` - MongoDB connection string
   - `JWT_SECRET` - JWT signing secret
   - `ADMIN_PASSWORD` - Default admin password

### Installation

```bash
# Install dependencies
npm install

# Setup database and create admin user
npm run setup

# Seed sample data (optional)
npm run seed

# Start development server
npm run dev

# Start production server
npm start
```

### Production Considerations

1. **Security:**
   - Use strong JWT secrets
   - Enable HTTPS
   - Configure CORS properly
   - Use environment variables for sensitive data

2. **Performance:**
   - Enable MongoDB indexes
   - Use Redis for caching (optional)
   - Implement CDN for file uploads
   - Monitor server resources

3. **Backup:**
   - Regular database backups
   - File upload backups
   - Environment configuration backups

---

## Support

For technical support or questions about the API:

- **Email:** tech@b4brothersinfratech.com
- **Documentation:** This file
- **Repository:** Internal Git repository

---

*API Documentation v1.0 - Last updated: January 2024*
