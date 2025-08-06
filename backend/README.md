# B4 Brothers Infratech Backend API

A comprehensive Node.js backend application for B4 Brothers Infratech website, providing APIs for analytics, form submissions, project management, testimonials, and admin functionality.

## 🚀 Features

- **Analytics Tracking**: Complete user behavior analytics and reporting
- **Form Management**: Handle contact forms, career applications, and quotes
- **Project Portfolio**: Manage construction projects with images and details
- **Testimonials**: Client reviews and testimonials management
- **Admin Dashboard**: Secure admin panel with role-based permissions
- **File Uploads**: Image and document upload handling
- **Real-time Data**: Live analytics and form submission tracking
- **REST API**: Complete RESTful API with comprehensive documentation

## 📋 Prerequisites

- Node.js (v16+)
- MongoDB (v4.4+)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment setup:**
   ```bash
   cp .env.example .env
   # Edit .env file with your configuration
   ```

4. **Database setup:**
   ```bash
   npm run setup
   ```

5. **Seed sample data (optional):**
   ```bash
   npm run seed
   ```

6. **Start development server:**
   ```bash
   npm run dev
   ```

The server will start at `http://localhost:5000`

## 📂 Project Structure

```
backend/
├── models/              # Database models
│   ├── User.js
│   ├── Analytics.js
│   ├── FormSubmission.js
│   ├── Testimonial.js
│   ├── Project.js
│   └── index.js
├── scripts/             # Setup and utility scripts
│   ├── setup.js        # Database initialization
│   ├── seed.js         # Sample data seeding
│   └── migrate.js      # Database migrations
├── uploads/            # File upload directory
├── logs/               # Application logs
├── server.js           # Main application file
├── package.json        # Dependencies and scripts
├── .env.example        # Environment variables template
├── API_DOCUMENTATION.md # Complete API documentation
└── README.md           # This file
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/b4brothers

# Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@b4brothersinfratech.com
ADMIN_PASSWORD=b4brothers2024

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=uploads/

# Email (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### Database Configuration

The application uses MongoDB with the following collections:

- `users` - Admin users and authentication
- `analytics` - User behavior tracking
- `formsubmissions` - Contact and career forms
- `testimonials` - Client testimonials
- `projects` - Portfolio projects
- `news` - Blog posts and updates
- `configs` - Site configuration
- `contactinfos` - Contact information
- `services` - Service offerings

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/change-password` - Change password

### Analytics
- `POST /api/analytics/track` - Track events
- `GET /api/analytics/dashboard` - Get analytics data (Admin)

### Form Submissions
- `POST /api/forms/submit` - Submit form
- `GET /api/forms/submissions` - Get submissions (Admin)
- `PUT /api/forms/submissions/:id` - Update submission (Admin)

### Projects
- `GET /api/projects` - Get projects
- `POST /api/projects` - Create project (Admin)
- `PUT /api/projects/:id` - Update project (Admin)
- `DELETE /api/projects/:id` - Delete project (Admin)

### Testimonials
- `GET /api/testimonials` - Get testimonials
- `POST /api/testimonials` - Create testimonial (Admin)
- `PUT /api/testimonials/:id` - Update testimonial (Admin)
- `DELETE /api/testimonials/:id` - Delete testimonial (Admin)

### Services
- `GET /api/services` - Get services
- `POST /api/services` - Create service (Admin)

### Configuration
- `GET /api/config` - Get configuration
- `PUT /api/config/:key` - Update config (Admin)

### Contact Information
- `GET /api/contact-info` - Get contact info
- `POST /api/contact-info` - Create contact info (Admin)

For detailed API documentation, see [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

## 💻 Usage Examples

### Frontend Integration

```javascript
// Initialize API client
const api = new B4BrothersAPI('http://localhost:5000/api');

// Submit contact form
await api.submitForm({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+91 98765 43210',
  service: 'Building Construction',
  message: 'Need consultation for house construction'
});

// Get projects for portfolio
const projects = await api.getProjects({
  category: 'Residential',
  isFeatured: true,
  limit: 6
});

// Track user interaction
await api.trackEvent('click', {
  element: 'Contact Button',
  location: 'Header'
});
```

### Admin Panel Integration

```javascript
// Admin login
const adminAPI = new B4BrothersAdminAPI('http://localhost:5000/api');
await adminAPI.login('admin', 'b4brothers2024');

// Get analytics dashboard
const analytics = await adminAPI.getAnalyticsDashboard({
  startDate: '2024-01-01',
  endDate: '2024-01-31'
});

// Manage form submissions
const submissions = await adminAPI.getFormSubmissions({
  status: 'new',
  priority: 'high'
});

// Update submission status
await adminAPI.updateFormSubmission(submissionId, {
  status: 'contacted',
  notes: 'Called customer, scheduled site visit'
});
```

## 🚀 Deployment

### Production Setup

1. **Environment Configuration:**
   ```bash
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/b4brothers
   JWT_SECRET=very-secure-random-string
   ```

2. **Build and Start:**
   ```bash
   npm install --production
   npm start
   ```

3. **Process Management (PM2):**
   ```bash
   npm install -g pm2
   pm2 start server.js --name "b4brothers-api"
   pm2 startup
   pm2 save
   ```

### Docker Deployment

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### Reverse Proxy (Nginx)

```nginx
server {
    listen 80;
    server_name api.b4brothersinfratech.com;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: Protect against DDoS and abuse
- **Input Validation**: Sanitize and validate all inputs
- **File Upload Security**: Restrict file types and sizes
- **CORS Configuration**: Control cross-origin requests
- **Helmet.js**: Security headers and protection
- **Password Hashing**: Bcrypt for secure password storage

## 📊 Monitoring & Logging

- **Request Logging**: Morgan middleware for HTTP request logs
- **Error Handling**: Centralized error handling with proper status codes
- **Health Check**: `/api/health` endpoint for monitoring
- **Analytics**: Built-in user behavior tracking
- **Performance**: Database indexing for optimal queries

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- --grep "Analytics"
```

## 📈 Performance Optimization

- **Database Indexing**: Optimized queries with proper indexes
- **Caching**: Redis integration for session and data caching
- **Compression**: Gzip compression for responses
- **File Optimization**: Image compression and optimization
- **Connection Pooling**: MongoDB connection pooling
- **Rate Limiting**: Prevent abuse and ensure fair usage

## 🔄 API Migration from Frontend

To migrate your existing frontend localStorage data to this backend:

1. **Form Submissions:**
   ```javascript
   // Migrate localStorage form submissions
   const submissions = JSON.parse(localStorage.getItem('b4-form-submissions') || '[]');
   for (const submission of submissions) {
     await api.request('/forms/submit', {
       method: 'POST',
       body: JSON.stringify(submission)
     });
   }
   ```

2. **Testimonials:**
   ```javascript
   // Migrate localStorage testimonials
   const testimonials = JSON.parse(localStorage.getItem('b4-testimonials') || '[]');
   for (const testimonial of testimonials) {
     await adminAPI.createTestimonial(testimonial);
   }
   ```

3. **Analytics:**
   ```javascript
   // Migrate analytics data
   const analytics = JSON.parse(localStorage.getItem('b4-analytics') || '{}');
   // Process and send analytics events to API
   ```

## 📚 Additional Resources

- [API Documentation](API_DOCUMENTATION.md) - Complete API reference
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:

- **Email**: tech@b4brothersinfratech.com
- **Phone**: +91 97332 21114
- **Website**: [b4brothersinfratech.com](https://b4brothersinfratech.com)

---

**B4 Brothers Infratech Backend API v1.0**  
*"Believe in best builds bold"*
