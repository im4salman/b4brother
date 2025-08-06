// B4 Brothers Infratech Backend Server - PostgreSQL Version
// Complete Node.js backend with Express, PostgreSQL, and comprehensive API endpoints

const express = require('express');
const { Pool } = require('pg');
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

// PostgreSQL connection pool
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'b4brothers',
    password: process.env.DB_PASSWORD || 'password',
    port: process.env.DB_PORT || 5432,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

// Test database connection
pool.connect((err, client, release) => {
    if (err) {
        console.error('Error acquiring client', err.stack);
    } else {
        console.log('✅ Connected to PostgreSQL database');
        release();
    }
});

// Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? process.env.CORS_ORIGIN?.split(',') || ['https://b4brothersinfratech.com', 'https://be2d9640cc184c4897e251252c04da26-e86bbe1269d04bfb81a894c4c.fly.dev']
        : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5000', 'https://be2d9640cc184c4897e251252c04da26-e86bbe1269d04bfb81a894c4c.fly.dev', null],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: { error: 'Too many requests from this IP, please try again later.' }
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

// =========================
// UTILITY FUNCTIONS
// =========================

// Generate unique ID
const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
};

// Execute query helper
const executeQuery = async (text, params = []) => {
    const client = await pool.connect();
    try {
        const result = await client.query(text, params);
        return result;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    } finally {
        client.release();
    }
};

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
        
        // Get user from database
        const result = await executeQuery(
            'SELECT id, username, email, role, is_active, permissions FROM users WHERE id = $1',
            [decoded.id]
        );
        
        if (result.rows.length === 0 || !result.rows[0].is_active) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        
        req.user = result.rows[0];
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid token' });
    }
};

// Permission check middleware
const checkPermission = (resource, action) => {
    return (req, res, next) => {
        const user = req.user;
        
        if (user.role === 'admin') {
            return next(); // Admin has all permissions
        }
        
        const permissions = user.permissions || [];
        const hasPermission = permissions.some(perm => 
            perm.resource === resource && perm.actions.includes(action)
        );

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
app.get('/api/health', async (req, res) => {
    try {
        await executeQuery('SELECT 1');
        res.json({ 
            status: 'ok', 
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            version: '1.0.0',
            database: 'connected'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            timestamp: new Date().toISOString(),
            database: 'disconnected'
        });
    }
});

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// API Testing Interface Route
app.get('/api-test', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'api-test.html'));
});

// =========================
// AUTHENTICATION ROUTES
// =========================

app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password required' });
        }
        
        const result = await executeQuery(
            'SELECT * FROM users WHERE (username = $1 OR email = $1) AND is_active = true',
            [username]
        );
        
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const user = result.rows[0];
        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Update last login
        await executeQuery(
            'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
            [user.id]
        );

        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                permissions: user.permissions
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/auth/change-password', authenticateToken, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Current and new password required' });
        }
        
        const result = await executeQuery('SELECT password FROM users WHERE id = $1', [req.user.id]);
        const user = result.rows[0];

        const isValidPassword = await bcrypt.compare(currentPassword, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ error: 'Current password is incorrect' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await executeQuery(
            'UPDATE users SET password = $1 WHERE id = $2',
            [hashedPassword, req.user.id]
        );

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// =========================
// ANALYTICS ROUTES
// =========================

app.post('/api/analytics/track', async (req, res) => {
    try {
        const { visitorId, sessionId, eventType, eventData, userAgent, referrer } = req.body;
        
        if (!visitorId || !eventType) {
            return res.status(400).json({ error: 'visitorId and eventType are required' });
        }
        
        await executeQuery(
            `INSERT INTO analytics (visitor_id, session_id, event_type, event_data, user_agent, ip_address, referrer, timestamp)
             VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP)`,
            [visitorId, sessionId, eventType, JSON.stringify(eventData), userAgent, req.ip, referrer]
        );

        res.json({ message: 'Event tracked successfully' });
    } catch (error) {
        console.error('Analytics tracking error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/analytics/dashboard', authenticateToken, async (req, res) => {
    try {
        const { startDate, endDate, eventType } = req.query;
        
        let whereClause = '1=1';
        let params = [];
        let paramCount = 0;
        
        if (startDate && endDate) {
            whereClause += ` AND timestamp >= $${++paramCount} AND timestamp <= $${++paramCount}`;
            params.push(startDate, endDate);
        }
        
        if (eventType) {
            whereClause += ` AND event_type = $${++paramCount}`;
            params.push(eventType);
        }

        // Get summary statistics
        const totalEventsResult = await executeQuery(
            `SELECT COUNT(*) as total FROM analytics WHERE ${whereClause}`,
            params
        );

        const uniqueVisitorsResult = await executeQuery(
            `SELECT COUNT(DISTINCT visitor_id) as unique_visitors FROM analytics WHERE ${whereClause}`,
            params
        );

        const eventsByTypeResult = await executeQuery(
            `SELECT event_type, COUNT(*) as count FROM analytics WHERE ${whereClause} GROUP BY event_type`,
            params
        );

        const topPagesResult = await executeQuery(
            `SELECT event_data->>'page' as page, COUNT(*) as count 
             FROM analytics 
             WHERE ${whereClause} AND event_type = 'pageview' AND event_data->>'page' IS NOT NULL
             GROUP BY event_data->>'page'
             ORDER BY count DESC
             LIMIT 10`,
            params
        );

        const dailyStatsResult = await executeQuery(
            `SELECT DATE(timestamp) as date, COUNT(*) as events, COUNT(DISTINCT visitor_id) as unique_visitors
             FROM analytics 
             WHERE ${whereClause}
             GROUP BY DATE(timestamp)
             ORDER BY date DESC`,
            params
        );

        res.json({
            summary: {
                totalEvents: parseInt(totalEventsResult.rows[0].total),
                uniqueVisitors: parseInt(uniqueVisitorsResult.rows[0].unique_visitors),
                pageViews: eventsByTypeResult.rows.find(r => r.event_type === 'pageview')?.count || 0,
                formSubmissions: eventsByTypeResult.rows.find(r => r.event_type === 'form_submission')?.count || 0,
                whatsappRedirects: eventsByTypeResult.rows.find(r => r.event_type === 'whatsapp_redirect')?.count || 0,
                buttonClicks: eventsByTypeResult.rows.find(r => r.event_type === 'click')?.count || 0
            },
            eventsByType: eventsByTypeResult.rows,
            topPages: topPagesResult.rows,
            dailyStats: dailyStatsResult.rows
        });
    } catch (error) {
        console.error('Analytics dashboard error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// =========================
// FORM SUBMISSION ROUTES
// =========================

app.post('/api/forms/submit', async (req, res) => {
    try {
        const { type, formData, visitorId, source } = req.body;
        
        if (!type || !formData) {
            return res.status(400).json({ error: 'Type and formData are required' });
        }
        
        const submissionId = generateId();
        
        await executeQuery(
            `INSERT INTO form_submissions (id, type, form_data, status, priority, visitor_id, source, ip_address, created_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP)`,
            [submissionId, type, JSON.stringify(formData), 'new', 'medium', visitorId, source || 'website', req.ip]
        );

        // Track analytics
        if (visitorId) {
            await executeQuery(
                `INSERT INTO analytics (visitor_id, session_id, event_type, event_data, ip_address, user_agent, timestamp)
                 VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)`,
                [visitorId, req.body.sessionId || visitorId, 'form_submission', JSON.stringify({ formType: type, formData }), req.ip, req.headers['user-agent']]
            );
        }

        res.json({ 
            message: 'Form submitted successfully',
            submissionId
        });
    } catch (error) {
        console.error('Form submission error:', error);
        res.status(500).json({ error: 'Internal server error' });
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

        let whereClause = '1=1';
        let params = [];
        let paramCount = 0;

        if (type) {
            whereClause += ` AND type = $${++paramCount}`;
            params.push(type);
        }
        if (status) {
            whereClause += ` AND status = $${++paramCount}`;
            params.push(status);
        }
        if (priority) {
            whereClause += ` AND priority = $${++paramCount}`;
            params.push(priority);
        }
        if (startDate && endDate) {
            whereClause += ` AND created_at >= $${++paramCount} AND created_at <= $${++paramCount}`;
            params.push(startDate, endDate);
        }
        if (search) {
            whereClause += ` AND (
                form_data->>'name' ILIKE $${++paramCount} OR 
                form_data->>'email' ILIKE $${++paramCount} OR 
                form_data->>'phone' ILIKE $${++paramCount}
            )`;
            params.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }

        const offset = (page - 1) * limit;
        whereClause += ` ORDER BY created_at DESC LIMIT $${++paramCount} OFFSET $${++paramCount}`;
        params.push(limit, offset);

        const submissionsResult = await executeQuery(
            `SELECT fs.*, u.username as assigned_username 
             FROM form_submissions fs
             LEFT JOIN users u ON fs.assigned_to = u.id
             WHERE ${whereClause}`,
            params
        );

        const totalResult = await executeQuery(
            `SELECT COUNT(*) as total FROM form_submissions WHERE ${whereClause.replace(` ORDER BY created_at DESC LIMIT $${paramCount-1} OFFSET $${paramCount}`, '')}`,
            params.slice(0, -2)
        );

        res.json({
            submissions: submissionsResult.rows,
            totalPages: Math.ceil(totalResult.rows[0].total / limit),
            currentPage: parseInt(page),
            total: parseInt(totalResult.rows[0].total)
        });
    } catch (error) {
        console.error('Get submissions error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/forms/submissions/:id', authenticateToken, async (req, res) => {
    try {
        const { status, priority, assignedTo, notes, followUpDate } = req.body;
        const submissionId = req.params.id;
        
        let updateFields = [];
        let params = [];
        let paramCount = 0;

        if (status) {
            updateFields.push(`status = $${++paramCount}`);
            params.push(status);
        }
        if (priority) {
            updateFields.push(`priority = $${++paramCount}`);
            params.push(priority);
        }
        if (assignedTo) {
            updateFields.push(`assigned_to = $${++paramCount}`);
            params.push(assignedTo);
        }
        if (followUpDate) {
            updateFields.push(`follow_up_date = $${++paramCount}`);
            params.push(followUpDate);
        }
        
        updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
        params.push(submissionId);

        const result = await executeQuery(
            `UPDATE form_submissions SET ${updateFields.join(', ')} WHERE id = $${++paramCount} RETURNING *`,
            params
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Submission not found' });
        }

        // Add note if provided
        if (notes) {
            await executeQuery(
                `INSERT INTO submission_notes (submission_id, note, added_by, added_at)
                 VALUES ($1, $2, $3, CURRENT_TIMESTAMP)`,
                [submissionId, notes, req.user.id]
            );
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Update submission error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// =========================
// TESTIMONIALS ROUTES
// =========================

app.get('/api/testimonials', async (req, res) => {
    try {
        const result = await executeQuery(`
            SELECT
                id,
                name,
                message as about,
                position as post,
                rating,
                image_url,
                created_at
            FROM testimonials
            WHERE is_active = true
            ORDER BY display_order ASC, created_at DESC
        `);

        // Transform data to match frontend clients structure
        const testimonials = result.rows.map(testimonial => ({
            id: testimonial.id,
            name: testimonial.name,
            about: testimonial.about,
            post: testimonial.post || 'Client',
            rating: testimonial.rating || 5,
            image: testimonial.image_url || `/assets/client${testimonial.id}.png`
        }));

        res.json(testimonials);
    } catch (error) {
        console.error('Get testimonials error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/testimonials', authenticateToken, upload.single('image'), async (req, res) => {
    try {
        const testimonialData = { ...req.body };
        const testimonialId = generateId();
        
        if (req.file) {
            testimonialData.image = `/uploads/${req.file.filename}`;
        }

        await executeQuery(
            `INSERT INTO testimonials (id, name, about, post, rating, image, project_id, location, project_type, 
                                     is_active, is_featured, display_order, verification_status, created_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, CURRENT_TIMESTAMP)`,
            [
                testimonialId,
                testimonialData.name,
                testimonialData.about,
                testimonialData.post,
                testimonialData.rating || 5,
                testimonialData.image,
                testimonialData.projectId || null,
                testimonialData.location,
                testimonialData.projectType,
                testimonialData.isActive !== 'false',
                testimonialData.isFeatured === 'true',
                testimonialData.order || 0,
                testimonialData.verificationStatus || 'pending'
            ]
        );
        
        const result = await executeQuery('SELECT * FROM testimonials WHERE id = $1', [testimonialId]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Create testimonial error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/testimonials/:id', authenticateToken, upload.single('image'), async (req, res) => {
    try {
        const testimonialId = req.params.id;
        const updates = { ...req.body };
        
        if (req.file) {
            updates.image = `/uploads/${req.file.filename}`;
        }

        const updateFields = [];
        const params = [];
        let paramCount = 0;

        Object.keys(updates).forEach(key => {
            if (key !== 'id') {
                const dbKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
                updateFields.push(`${dbKey} = $${++paramCount}`);
                params.push(updates[key]);
            }
        });

        updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
        params.push(testimonialId);

        const result = await executeQuery(
            `UPDATE testimonials SET ${updateFields.join(', ')} WHERE id = $${++paramCount} RETURNING *`,
            params
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Testimonial not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Update testimonial error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/testimonials/:id', authenticateToken, async (req, res) => {
    try {
        const result = await executeQuery('DELETE FROM testimonials WHERE id = $1 RETURNING *', [req.params.id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Testimonial not found' });
        }
        
        res.json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
        console.error('Delete testimonial error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// =========================
// PROJECTS ROUTES
// =========================

app.get('/api/projects', async (req, res) => {
    try {
        const result = await executeQuery(`
            SELECT
                id,
                title,
                category,
                year,
                location,
                area,
                duration,
                budget,
                description,
                features,
                highlights,
                image_url
            FROM projects
            WHERE is_active = true
            ORDER BY year DESC, id ASC
        `);

        // Transform data to match frontend projects.js structure
        const projects = result.rows.map(project => ({
            id: project.id,
            title: project.title,
            category: project.category,
            year: project.year,
            location: project.location,
            area: project.area,
            duration: project.duration,
            budget: project.budget,
            description: project.description,
            features: Array.isArray(project.features) ? project.features : JSON.parse(project.features || '[]'),
            highlights: Array.isArray(project.highlights) ? project.highlights : JSON.parse(project.highlights || '[]'),
            image: project.image_url || `/assets/project${project.id}.jpg`
        }));

        res.json(projects);
    } catch (error) {
        console.error('Get projects error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Continue with remaining routes...
// (Projects POST, PUT, DELETE, Services, Config, Contact Info routes follow the same pattern)

// =========================
// ERROR HANDLING
// =========================

// Error handling middleware
app.use((error, req, res, next) => {
    if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File too large' });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(400).json({ error: 'Too many files' });
    }
    console.error('Unhandled error:', error);
    res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...');
    await pool.end();
    process.exit(0);
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 B4 Brothers Backend Server running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🗄️  Database: PostgreSQL`);
});

module.exports = app;
