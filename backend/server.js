// B4 Brothers Infratech Backend Server
// Complete Node.js backend with Express, MongoDB, and comprehensive API endpoints

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://b4brothersinfratech.com', 'https://www.b4brothersinfratech.com']
        : ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// File upload configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Static files
app.use('/uploads', express.static('uploads'));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/b4brothers', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB database');
});

// =========================
// DATABASE SCHEMAS
// =========================

// User Schema (Admin Authentication)
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'manager'], default: 'admin' },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
    permissions: [{
        resource: String,
        actions: [String] // ['create', 'read', 'update', 'delete']
    }]
}, { timestamps: true });

// Analytics Schema
const analyticsSchema = new mongoose.Schema({
    visitorId: { type: String, required: true },
    sessionId: { type: String, required: true },
    eventType: { 
        type: String, 
        enum: ['pageview', 'click', 'form_submission', 'whatsapp_redirect'],
        required: true 
    },
    eventData: {
        page: String,
        element: String,
        location: String,
        formType: String,
        formData: Object,
        message: String,
        duration: Number
    },
    userAgent: String,
    ipAddress: String,
    referrer: String,
    timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

// Form Submissions Schema
const formSubmissionSchema = new mongoose.Schema({
    type: { 
        type: String, 
        enum: ['contact', 'career', 'quote', 'newsletter', 'quick_contact'],
        required: true 
    },
    formData: {
        name: String,
        email: String,
        phone: String,
        service: String,
        budget: String,
        timeline: String,
        message: String,
        position: String,
        experience: String,
        resume: String,
        portfolio: String,
        query: String
    },
    status: { 
        type: String, 
        enum: ['new', 'contacted', 'in_progress', 'completed', 'archived'],
        default: 'new' 
    },
    priority: { 
        type: String, 
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'medium' 
    },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    notes: [{
        note: String,
        addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        addedAt: { type: Date, default: Date.now }
    }],
    followUpDate: Date,
    source: String, // website, phone, email, referral
    visitorId: String,
    ipAddress: String
}, { timestamps: true });

// Testimonials Schema
const testimonialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    about: { type: String, required: true },
    post: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    image: String,
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    location: String,
    projectType: String,
    verificationStatus: { 
        type: String, 
        enum: ['pending', 'verified', 'rejected'],
        default: 'pending' 
    }
}, { timestamps: true });

// Projects Schema
const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { 
        type: String, 
        enum: ['Residential', 'Commercial', 'Industrial', 'Renovation', 'Hospitality'],
        required: true 
    },
    images: [String],
    thumbnailImage: String,
    location: String,
    area: String,
    duration: String,
    budget: String,
    year: Number,
    status: { 
        type: String, 
        enum: ['planning', 'in_progress', 'completed', 'on_hold'],
        default: 'completed' 
    },
    features: [String],
    highlights: [String],
    clientName: String,
    clientTestimonial: { type: mongoose.Schema.Types.ObjectId, ref: 'Testimonial' },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    seoTitle: String,
    seoDescription: String,
    tags: [String],
    technologies: [String],
    teamMembers: [String],
    challenges: [String],
    solutions: [String]
}, { timestamps: true });

// News/Blog Schema
const newsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    excerpt: String,
    featuredImage: String,
    images: [String],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    category: { 
        type: String, 
        enum: ['company_news', 'project_update', 'industry_news', 'tips', 'case_study'],
        default: 'company_news' 
    },
    tags: [String],
    isPublished: { type: Boolean, default: false },
    publishDate: Date,
    seoTitle: String,
    seoDescription: String,
    readTime: Number,
    views: { type: Number, default: 0 }
}, { timestamps: true });

// Site Configuration Schema
const configSchema = new mongoose.Schema({
    key: { type: String, unique: true, required: true },
    value: mongoose.Schema.Types.Mixed,
    description: String,
    category: String,
    isEditable: { type: Boolean, default: true }
}, { timestamps: true });

// Contact Information Schema
const contactInfoSchema = new mongoose.Schema({
    type: { 
        type: String, 
        enum: ['phone', 'email', 'address', 'social', 'hours'],
        required: true 
    },
    label: String,
    value: String,
    isPrimary: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
}, { timestamps: true });

// Services Schema
const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    shortDescription: String,
    icon: String,
    image: String,
    category: String,
    features: [String],
    benefits: [String],
    process: [{
        step: Number,
        title: String,
        description: String
    }],
    pricing: {
        startingPrice: Number,
        unit: String,
        notes: String
    },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    seoTitle: String,
    seoDescription: String
}, { timestamps: true });

// Create Models
const User = mongoose.model('User', userSchema);
const Analytics = mongoose.model('Analytics', analyticsSchema);
const FormSubmission = mongoose.model('FormSubmission', formSubmissionSchema);
const Testimonial = mongoose.model('Testimonial', testimonialSchema);
const Project = mongoose.model('Project', projectSchema);
const News = mongoose.model('News', newsSchema);
const Config = mongoose.model('Config', configSchema);
const ContactInfo = mongoose.model('ContactInfo', contactInfoSchema);
const Service = mongoose.model('Service', serviceSchema);

// =========================
// MIDDLEWARE FUNCTIONS
// =========================

// Authentication middleware
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const user = await User.findById(decoded.id).select('-password');
        if (!user || !user.isActive) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid token' });
    }
};

// Permission check middleware
const checkPermission = (resource, action) => {
    return (req, res, next) => {
        const user = req.user;
        const hasPermission = user.permissions.some(perm => 
            perm.resource === resource && perm.actions.includes(action)
        ) || user.role === 'admin';

        if (!hasPermission) {
            return res.status(403).json({ error: 'Insufficient permissions' });
        }
        next();
    };
};

// =========================
// API ROUTES
// =========================

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: '1.0.0'
    });
});

// Authentication Routes
app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const user = await User.findOne({ 
            $or: [{ username }, { email: username }],
            isActive: true 
        });
        
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        const token = jwt.sign(
            { id: user._id, username: user.username, role: user.role },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                permissions: user.permissions
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/auth/change-password', authenticateToken, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id);

        if (!await bcrypt.compare(currentPassword, user.password)) {
            return res.status(400).json({ error: 'Current password is incorrect' });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Analytics Routes
app.post('/api/analytics/track', async (req, res) => {
    try {
        const { visitorId, sessionId, eventType, eventData, userAgent, referrer } = req.body;
        
        const analytics = new Analytics({
            visitorId,
            sessionId,
            eventType,
            eventData,
            userAgent,
            ipAddress: req.ip,
            referrer
        });

        await analytics.save();
        res.json({ message: 'Event tracked successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/analytics/dashboard', authenticateToken, async (req, res) => {
    try {
        const { startDate, endDate, eventType } = req.query;
        
        let query = {};
        if (startDate && endDate) {
            query.timestamp = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }
        if (eventType) {
            query.eventType = eventType;
        }

        const [
            totalEvents,
            uniqueVisitors,
            pageViews,
            formSubmissions,
            whatsappRedirects,
            buttonClicks,
            eventsByType,
            topPages,
            dailyStats
        ] = await Promise.all([
            Analytics.countDocuments(query),
            Analytics.distinct('visitorId', query).then(ids => ids.length),
            Analytics.countDocuments({ ...query, eventType: 'pageview' }),
            Analytics.countDocuments({ ...query, eventType: 'form_submission' }),
            Analytics.countDocuments({ ...query, eventType: 'whatsapp_redirect' }),
            Analytics.countDocuments({ ...query, eventType: 'click' }),
            Analytics.aggregate([
                { $match: query },
                { $group: { _id: '$eventType', count: { $sum: 1 } } }
            ]),
            Analytics.aggregate([
                { $match: { ...query, eventType: 'pageview' } },
                { $group: { _id: '$eventData.page', count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 10 }
            ]),
            Analytics.aggregate([
                { $match: query },
                { 
                    $group: { 
                        _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
                        count: { $sum: 1 },
                        uniqueVisitors: { $addToSet: '$visitorId' }
                    } 
                },
                { $sort: { _id: 1 } }
            ])
        ]);

        res.json({
            summary: {
                totalEvents,
                uniqueVisitors,
                pageViews,
                formSubmissions,
                whatsappRedirects,
                buttonClicks
            },
            eventsByType,
            topPages,
            dailyStats: dailyStats.map(stat => ({
                date: stat._id,
                events: stat.count,
                uniqueVisitors: stat.uniqueVisitors.length
            }))
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Form Submission Routes
app.post('/api/forms/submit', async (req, res) => {
    try {
        const { type, formData, visitorId, source } = req.body;
        
        const submission = new FormSubmission({
            type,
            formData,
            visitorId,
            source: source || 'website',
            ipAddress: req.ip
        });

        await submission.save();

        // Track analytics
        const analytics = new Analytics({
            visitorId,
            sessionId: req.body.sessionId || visitorId,
            eventType: 'form_submission',
            eventData: { formType: type, formData },
            ipAddress: req.ip,
            userAgent: req.headers['user-agent']
        });
        await analytics.save();

        res.json({ 
            message: 'Form submitted successfully',
            submissionId: submission._id
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/forms/submissions', authenticateToken, async (req, res) => {
    try {
        const { 
            page = 1, 
            limit = 20, 
            type, 
            status, 
            priority,
            startDate,
            endDate,
            search 
        } = req.query;

        let query = {};
        if (type) query.type = type;
        if (status) query.status = status;
        if (priority) query.priority = priority;
        if (startDate && endDate) {
            query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }
        if (search) {
            query.$or = [
                { 'formData.name': { $regex: search, $options: 'i' } },
                { 'formData.email': { $regex: search, $options: 'i' } },
                { 'formData.phone': { $regex: search, $options: 'i' } }
            ];
        }

        const submissions = await FormSubmission.find(query)
            .populate('assignedTo', 'username email')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await FormSubmission.countDocuments(query);

        res.json({
            submissions,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/forms/submissions/:id', authenticateToken, async (req, res) => {
    try {
        const { status, priority, assignedTo, notes, followUpDate } = req.body;
        
        const submission = await FormSubmission.findById(req.params.id);
        if (!submission) {
            return res.status(404).json({ error: 'Submission not found' });
        }

        if (status) submission.status = status;
        if (priority) submission.priority = priority;
        if (assignedTo) submission.assignedTo = assignedTo;
        if (followUpDate) submission.followUpDate = followUpDate;
        
        if (notes) {
            submission.notes.push({
                note: notes,
                addedBy: req.user.id
            });
        }

        await submission.save();
        res.json(submission);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Testimonials Routes
app.get('/api/testimonials', async (req, res) => {
    try {
        const { isActive = true, isFeatured, limit, page = 1 } = req.query;
        
        let query = {};
        if (isActive !== undefined) query.isActive = isActive === 'true';
        if (isFeatured !== undefined) query.isFeatured = isFeatured === 'true';

        const testimonials = await Testimonial.find(query)
            .populate('projectId', 'title category')
            .sort({ order: 1, createdAt: -1 })
            .limit(limit ? parseInt(limit) : undefined)
            .skip(limit ? (parseInt(page) - 1) * parseInt(limit) : 0);

        const total = await Testimonial.countDocuments(query);

        res.json({
            testimonials,
            total,
            page: parseInt(page),
            totalPages: limit ? Math.ceil(total / parseInt(limit)) : 1
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/testimonials', authenticateToken, upload.single('image'), async (req, res) => {
    try {
        const testimonialData = { ...req.body };
        if (req.file) {
            testimonialData.image = `/uploads/${req.file.filename}`;
        }

        const testimonial = new Testimonial(testimonialData);
        await testimonial.save();
        
        res.status(201).json(testimonial);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/testimonials/:id', authenticateToken, upload.single('image'), async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) {
            return res.status(404).json({ error: 'Testimonial not found' });
        }

        Object.assign(testimonial, req.body);
        
        if (req.file) {
            testimonial.image = `/uploads/${req.file.filename}`;
        }

        await testimonial.save();
        res.json(testimonial);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/testimonials/:id', authenticateToken, async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
        if (!testimonial) {
            return res.status(404).json({ error: 'Testimonial not found' });
        }
        res.json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Projects Routes
app.get('/api/projects', async (req, res) => {
    try {
        const { 
            category, 
            isActive = true, 
            isFeatured, 
            limit, 
            page = 1,
            search,
            year,
            status
        } = req.query;
        
        let query = {};
        if (isActive !== undefined) query.isActive = isActive === 'true';
        if (isFeatured !== undefined) query.isFeatured = isFeatured === 'true';
        if (category && category !== 'All') query.category = category;
        if (year) query.year = parseInt(year);
        if (status) query.status = status;
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } }
            ];
        }

        const projects = await Project.find(query)
            .populate('clientTestimonial')
            .sort({ order: 1, year: -1, createdAt: -1 })
            .limit(limit ? parseInt(limit) : undefined)
            .skip(limit ? (parseInt(page) - 1) * parseInt(limit) : 0);

        const total = await Project.countDocuments(query);
        const categories = await Project.distinct('category', { isActive: true });

        res.json({
            projects,
            total,
            page: parseInt(page),
            totalPages: limit ? Math.ceil(total / parseInt(limit)) : 1,
            categories: ['All', ...categories]
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/projects', authenticateToken, upload.array('images', 10), async (req, res) => {
    try {
        const projectData = { ...req.body };
        
        if (req.files && req.files.length > 0) {
            projectData.images = req.files.map(file => `/uploads/${file.filename}`);
            projectData.thumbnailImage = projectData.images[0];
        }

        // Parse arrays if they come as strings
        if (typeof projectData.features === 'string') {
            projectData.features = JSON.parse(projectData.features);
        }
        if (typeof projectData.highlights === 'string') {
            projectData.highlights = JSON.parse(projectData.highlights);
        }

        const project = new Project(projectData);
        await project.save();
        
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/projects/:id', authenticateToken, upload.array('images', 10), async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        Object.assign(project, req.body);
        
        if (req.files && req.files.length > 0) {
            const newImages = req.files.map(file => `/uploads/${file.filename}`);
            project.images = [...(project.images || []), ...newImages];
            if (!project.thumbnailImage) {
                project.thumbnailImage = newImages[0];
            }
        }

        await project.save();
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/projects/:id', authenticateToken, async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Services Routes
app.get('/api/services', async (req, res) => {
    try {
        const { isActive = true, isFeatured, category } = req.query;
        
        let query = {};
        if (isActive !== undefined) query.isActive = isActive === 'true';
        if (isFeatured !== undefined) query.isFeatured = isFeatured === 'true';
        if (category) query.category = category;

        const services = await Service.find(query)
            .sort({ order: 1, createdAt: -1 });

        res.json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/services', authenticateToken, upload.single('image'), async (req, res) => {
    try {
        const serviceData = { ...req.body };
        
        if (req.file) {
            serviceData.image = `/uploads/${req.file.filename}`;
        }

        const service = new Service(serviceData);
        await service.save();
        
        res.status(201).json(service);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Configuration Routes
app.get('/api/config', async (req, res) => {
    try {
        const { category, key } = req.query;
        
        let query = {};
        if (category) query.category = category;
        if (key) query.key = key;

        const configs = await Config.find(query);
        
        if (key && configs.length === 1) {
            return res.json(configs[0]);
        }
        
        res.json(configs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/config/:key', authenticateToken, async (req, res) => {
    try {
        const { value, description, category } = req.body;
        
        const config = await Config.findOneAndUpdate(
            { key: req.params.key },
            { value, description, category },
            { new: true, upsert: true }
        );

        res.json(config);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Contact Information Routes
app.get('/api/contact-info', async (req, res) => {
    try {
        const { type, isActive = true } = req.query;
        
        let query = {};
        if (type) query.type = type;
        if (isActive !== undefined) query.isActive = isActive === 'true';

        const contactInfo = await ContactInfo.find(query)
            .sort({ order: 1, createdAt: -1 });

        res.json(contactInfo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/contact-info', authenticateToken, async (req, res) => {
    try {
        const contactInfo = new ContactInfo(req.body);
        await contactInfo.save();
        res.status(201).json(contactInfo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Export/Import Routes
app.get('/api/export/data', authenticateToken, async (req, res) => {
    try {
        const { collections = 'all' } = req.query;
        
        const exportData = {};
        
        if (collections === 'all' || collections.includes('analytics')) {
            exportData.analytics = await Analytics.find().limit(10000);
        }
        if (collections === 'all' || collections.includes('forms')) {
            exportData.formSubmissions = await FormSubmission.find();
        }
        if (collections === 'all' || collections.includes('testimonials')) {
            exportData.testimonials = await Testimonial.find();
        }
        if (collections === 'all' || collections.includes('projects')) {
            exportData.projects = await Project.find();
        }

        res.setHeader('Content-Disposition', 'attachment; filename=b4brothers-data-export.json');
        res.setHeader('Content-Type', 'application/json');
        res.json({
            exportDate: new Date().toISOString(),
            data: exportData
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Error handling middleware
app.use((error, req, res, next) => {
    if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File too large' });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(400).json({ error: 'Too many files' });
    }
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`B4 Brothers Backend Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Database: ${process.env.MONGODB_URI || 'mongodb://localhost:27017/b4brothers'}`);
});

module.exports = app;
