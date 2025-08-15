# Backend Requirements for B4Brothers Construction Website

## Overview
This document outlines the complete backend requirements for the B4Brothers construction website. The backend should provide APIs that match the current frontend data structures to seamlessly replace localStorage-based data storage.

## Technology Stack Recommendations
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL (recommended) or MongoDB
- **Authentication**: JWT-based authentication
- **File Upload**: Support for image uploads (projects, testimonials)
- **CORS**: Configured for frontend domain

## Database Schema

### 1. Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Projects Table
```sql
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    year INTEGER NOT NULL,
    location VARCHAR(255) NOT NULL,
    area VARCHAR(100) NOT NULL,
    duration VARCHAR(100) NOT NULL,
    budget VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    features JSONB NOT NULL DEFAULT '[]',
    highlights JSONB NOT NULL DEFAULT '[]',
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Services Table
```sql
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    about TEXT NOT NULL,
    details TEXT NOT NULL,
    insights JSONB NOT NULL DEFAULT '[]',
    stats JSONB NOT NULL DEFAULT '[]',
    icon_name VARCHAR(100) DEFAULT 'building.svg',
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Testimonials Table
```sql
CREATE TABLE testimonials (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    about TEXT NOT NULL,
    post VARCHAR(100) NOT NULL,
    rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Form Submissions Table
```sql
CREATE TABLE form_submissions (
    id SERIAL PRIMARY KEY,
    type VARCHAR(100) NOT NULL, -- 'contact', 'quote', 'newsletter', etc.
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    service VARCHAR(255),
    message TEXT,
    data JSONB, -- for flexible additional fields
    ip_address INET,
    user_agent TEXT,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 6. Analytics Table
```sql
CREATE TABLE analytics (
    id SERIAL PRIMARY KEY,
    visitor_id VARCHAR(255),
    session_id VARCHAR(255),
    event_type VARCHAR(100) NOT NULL, -- 'pageview', 'click', 'form_submit', 'whatsapp_redirect'
    page_path VARCHAR(500),
    element VARCHAR(255),
    data JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 7. News Table (Optional)
```sql
CREATE TABLE news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    author VARCHAR(255),
    published_date DATE,
    category VARCHAR(100),
    tags JSONB DEFAULT '[]',
    featured_image VARCHAR(500),
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Sample Data Inserts

### Users
```sql
INSERT INTO users (username, email, password_hash, role) VALUES 
('admin', 'admin@b4brothers.com', '$2a$10$hashedpassword', 'admin'),
('manager', 'manager@b4brothers.com', '$2a$10$hashedpassword', 'manager');
```

### Projects
```sql
INSERT INTO projects (title, category, year, location, area, duration, budget, description, features, highlights, image_url) VALUES 
(
    'Modern Residential Villa',
    'Residential',
    2024,
    'Kolkata, West Bengal',
    '5,000 sq ft',
    '8 months',
    '₹1.2 Crores',
    'A luxurious 5,000 sq ft villa featuring contemporary architecture, open-plan living spaces, green roof terraces, and a comprehensive smart-home automation system.',
    '["Smart home automation system", "Green roof terraces with rainwater harvesting", "Open-plan living with floor-to-ceiling windows", "Energy-efficient LED lighting throughout", "Premium marble flooring and wooden accents", "Modular kitchen with imported appliances"]',
    '["LEED Gold certified design", "Completed 2 weeks ahead of schedule", "15% under budget due to efficient planning", "Zero safety incidents during construction"]',
    '/assets/project1.jpg'
),
(
    'Downtown Office Tower',
    'Commercial',
    2023,
    'Salt Lake, Kolkata',
    '50,000 sq ft',
    '18 months',
    '₹8.5 Crores',
    'A 20-storey Class A office building featuring modern double-glass façade, LEED Gold certification, and an elegant concierge lobby with premium finishes.',
    '["Double-glass façade for energy efficiency", "High-speed elevators with smart controls", "Central air conditioning with zone control", "Rooftop garden and recreational area", "Underground parking for 200+ vehicles", "Conference facilities and business center"]',
    '["LEED Gold certified building", "Pre-leased to 95% capacity before completion", "Advanced fire safety and security systems", "Sustainable design reduces operational costs by 30%"]',
    '/assets/project2.jpg'
);
```

### Services
```sql
INSERT INTO services (title, about, details, insights, stats, icon_name) VALUES 
(
    'Building Renovation',
    'Expert renovation services to upgrade and modernize existing structures, enhancing functionality and aesthetic appeal.',
    'Our Building Renovation service includes:\n• Detailed structural assessment and planning\n• Quality material upgrades and modern finishes\n• Energy-efficient improvements\n• Interior remodeling and space optimization\n• Clear timeline and transparent pricing',
    '["⭐️ Over 120 renovation projects completed successfully", "⭐️ Average project delivery 10% ahead of schedule", "⭐️ Client satisfaction rating of 4.9/5"]',
    '[{"label": "Projects Completed", "value": 120}, {"label": "On-time Delivery (%)", "value": 90}, {"label": "Customer Satisfaction (%)", "value": 98}]',
    'building.svg'
),
(
    'Construction Services',
    'Complete construction services from planning to completion, with focus on quality workmanship and on-time delivery.',
    'Our Construction Services include:\n• End-to-end project planning & scheduling\n• Resource allocation & on-site management\n• Safety compliance & quality control\n• Vendor coordination & procurement\n• Real-time progress tracking',
    '["✅ 200+ sites delivered nationwide", "✅ Zero safety incidents in last 3 years", "✅ Built 15M+ sqft of commercial space"]',
    '[{"label": "Sites Delivered", "value": 200}, {"label": "Incident-Free Years", "value": 3}, {"label": "Sqft Built (M)", "value": 15}]',
    'construction.svg'
);
```

### Testimonials
```sql
INSERT INTO testimonials (name, about, post, rating, image_url) VALUES 
(
    'Kamal Hussain',
    'An experienced constructor known for meticulous planning and project management, ensuring every construction project meets quality standards and deadlines.',
    'Client',
    5,
    '/assets/client1.png'
),
(
    'Salman Hussain',
    'A visionary architect who blends modern design with sustainable practices to create innovative, environmentally friendly buildings.',
    'Architect',
    4,
    '/assets/client2.png'
),
(
    'Abbas Hussain',
    'A skilled builder with a strong focus on craftsmanship and attention to detail, dedicated to bringing architectural designs to life with precision.',
    'Builder',
    5,
    '/assets/client3.png'
);
```

## API Endpoints

### Authentication
```
POST /api/auth/login
Request: { "username": "admin", "password": "admin123" }
Response: { "token": "jwt_token", "user": { "id": 1, "username": "admin", "role": "admin" } }
```

### Projects API
```
GET /api/projects
Response: [
  {
    "id": 1,
    "title": "Modern Residential Villa",
    "category": "Residential",
    "year": 2024,
    "location": "Kolkata, West Bengal",
    "area": "5,000 sq ft",
    "duration": "8 months",
    "budget": "₹1.2 Crores",
    "description": "A luxurious 5,000 sq ft villa...",
    "features": ["Smart home automation system", "Green roof terraces..."],
    "highlights": ["LEED Gold certified design", "Completed 2 weeks ahead..."],
    "image": "/assets/project1.jpg"
  }
]
Data Source: projects table
```

### Services API
```
GET /api/services
Response: [
  {
    "id": 1,
    "title": "Building Renovation",
    "about": "Expert renovation services to upgrade...",
    "details": "Our Building Renovation service includes:\n• Detailed structural...",
    "insights": ["⭐️ Over 120 renovation projects completed successfully", "⭐️ Average project delivery..."],
    "stats": [{"label": "Projects Completed", "value": 120}, {"label": "On-time Delivery (%)", "value": 90}],
    "icon": "building.svg"
  }
]
Data Source: services table
```

### Testimonials API
```
GET /api/testimonials
Response: [
  {
    "id": 1,
    "name": "Kamal Hussain",
    "about": "An experienced constructor known for meticulous planning...",
    "post": "Client",
    "rating": 5,
    "image": "/assets/client1.png"
  }
]
Data Source: testimonials table
```

### Form Submissions API
```
POST /api/contact
Request: { "name": "John Doe", "email": "john@example.com", "message": "Interested in services" }
Response: { "success": true, "message": "Message sent successfully", "id": 123 }

POST /api/forms/submit
Request: { "type": "contact", "data": { "name": "John", "email": "john@example.com", "phone": "+1234567890" } }
Response: { "success": true, "message": "Form submitted successfully", "id": 124 }

GET /api/forms/submissions (Admin only)
Response: [
  {
    "id": 123,
    "type": "contact",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Interested in services",
    "timestamp": "2024-01-15T10:30:00Z",
    "is_read": false
  }
]
Data Source: form_submissions table
```

### Analytics API
```
POST /api/analytics/track
Request: { "event_type": "pageview", "page_path": "/", "visitor_id": "uuid", "session_id": "uuid" }
Response: { "success": true }

GET /api/analytics (Admin only)
Response: {
  "pageViews": [
    { "page": "/", "count": 150, "timestamp": "2024-01-15T10:30:00Z" }
  ],
  "formSubmissions": [
    { "type": "contact", "count": 25, "timestamp": "2024-01-15T11:00:00Z" }
  ],
  "whatsappRedirects": [
    { "count": 45, "timestamp": "2024-01-15T12:00:00Z" }
  ],
  "buttonClicks": [
    { "element": "contact-button", "count": 75, "timestamp": "2024-01-15T13:00:00Z" }
  ]
}
Data Source: analytics table
```

### News API (Optional)
```
GET /api/news
Response: [
  {
    "id": 1,
    "title": "B4Brothers Wins Construction Excellence Award",
    "content": "Full article content...",
    "excerpt": "We are proud to announce...",
    "author": "B4Brothers Team",
    "published_date": "2024-01-15",
    "category": "News",
    "tags": ["award", "recognition"],
    "featured_image": "/assets/news1.jpg",
    "is_featured": true
  }
]
Data Source: news table
```

## Admin Dashboard Data Requirements

The admin page currently shows data from localStorage. The backend should provide these endpoints for admin functionality:

### Dashboard Statistics
```
GET /api/admin/stats
Response: {
  "totalProjects": 8,
  "totalTestimonials": 12,
  "totalFormSubmissions": 45,
  "totalPageViews": 1250,
  "recentFormSubmissions": 5,
  "conversionRate": 3.6
}
Data Source: Aggregated from projects, testimonials, form_submissions, analytics tables
```

### Form Submissions Management
```
GET /api/admin/form-submissions?page=1&limit=10&filter=all&date=all
PUT /api/admin/form-submissions/:id/read
DELETE /api/admin/form-submissions/:id
```

### Analytics Data
```
GET /api/admin/analytics?startDate=2024-01-01&endDate=2024-01-31
Response: Detailed analytics breakdown for admin dashboard charts and graphs
```

### Testimonials Management
```
POST /api/admin/testimonials
PUT /api/admin/testimonials/:id
DELETE /api/admin/testimonials/:id
```

## Security Requirements

1. **Authentication**: JWT-based authentication for admin routes
2. **Authorization**: Role-based access control (admin, manager)
3. **Rate Limiting**: Implement rate limiting on all public APIs
4. **CORS**: Configure CORS for frontend domain
5. **Input Validation**: Validate all input data
6. **SQL Injection Protection**: Use parameterized queries
7. **File Upload Security**: Validate file types and sizes for image uploads

## File Upload Requirements

1. **Image uploads** for projects and testimonials
2. **Supported formats**: JPG, PNG, WebP
3. **Max file size**: 5MB per file
4. **Storage**: Local storage or cloud storage (AWS S3, Cloudinary)
5. **Image optimization**: Automatic resizing and compression

## Environment Variables

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=b4brothers
DB_USER=postgres
DB_PASSWORD=password
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h
CORS_ORIGIN=http://localhost:3000,https://yourdomain.com
PORT=5000
NODE_ENV=development
UPLOAD_PATH=/uploads
MAX_FILE_SIZE=5242880
```

## Additional Recommendations

1. **API Documentation**: Implement Swagger/OpenAPI documentation
2. **Logging**: Implement proper logging (Winston or similar)
3. **Error Handling**: Consistent error response format
4. **Database Migrations**: Use migration tools for schema changes
5. **Testing**: Unit and integration tests
6. **Monitoring**: Health check endpoints
7. **Backup**: Regular database backups
8. **Caching**: Redis for session management and caching

## Frontend Integration Notes

The frontend currently uses localStorage for:
- `b4-analytics`: Analytics tracking data
- `b4-form-submissions`: Contact form submissions
- `b4-testimonials`: User-added testimonials
- `b4-admin-token`: Authentication token
- `b4-visitor-id`: Visitor tracking

All these should be replaced with API calls to the backend while maintaining the same data structure and functionality.

## CORS Configuration

```javascript
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173', 'https://yourdomain.com'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
```

This document provides complete specifications for implementing a backend that will seamlessly integrate with the existing frontend architecture.
