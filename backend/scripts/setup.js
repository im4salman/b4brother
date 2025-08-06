// Database Setup Script for B4 Brothers Backend
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('../models/User');
const Config = require('../models/Config');
const ContactInfo = require('../models/ContactInfo');
const Service = require('../models/Service');

async function setupDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/b4brothers', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log('📁 Connected to MongoDB');

        // Create admin user
        await createAdminUser();
        
        // Setup default configurations
        await setupDefaultConfigs();
        
        // Setup contact information
        await setupContactInfo();
        
        // Setup default services
        await setupDefaultServices();
        
        // Create indexes for performance
        await createIndexes();
        
        console.log('✅ Database setup completed successfully!');
        
    } catch (error) {
        console.error('❌ Setup failed:', error);
    } finally {
        await mongoose.disconnect();
        console.log('📁 Database connection closed');
    }
}

async function createAdminUser() {
    try {
        const existingAdmin = await User.findOne({ username: 'admin' });
        
        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash(
                process.env.ADMIN_PASSWORD || 'b4brothers2024', 
                10
            );
            
            const adminUser = new User({
                username: process.env.ADMIN_USERNAME || 'admin',
                email: process.env.ADMIN_EMAIL || 'admin@b4brothersinfratech.com',
                password: hashedPassword,
                role: 'admin',
                isActive: true,
                permissions: [
                    {
                        resource: 'analytics',
                        actions: ['create', 'read', 'update', 'delete']
                    },
                    {
                        resource: 'forms',
                        actions: ['create', 'read', 'update', 'delete']
                    },
                    {
                        resource: 'testimonials',
                        actions: ['create', 'read', 'update', 'delete']
                    },
                    {
                        resource: 'projects',
                        actions: ['create', 'read', 'update', 'delete']
                    },
                    {
                        resource: 'users',
                        actions: ['create', 'read', 'update', 'delete']
                    },
                    {
                        resource: 'config',
                        actions: ['create', 'read', 'update', 'delete']
                    }
                ]
            });
            
            await adminUser.save();
            console.log('👤 Admin user created successfully');
        } else {
            console.log('👤 Admin user already exists');
        }
    } catch (error) {
        console.error('❌ Error creating admin user:', error);
    }
}

async function setupDefaultConfigs() {
    try {
        const defaultConfigs = [
            {
                key: 'site_title',
                value: 'B4 Brothers Infratech PVT LTD',
                description: 'Main website title',
                category: 'general'
            },
            {
                key: 'site_tagline',
                value: 'Believe in best builds bold',
                description: 'Company tagline/motto',
                category: 'general'
            },
            {
                key: 'company_description',
                value: 'Leading construction company in West Bengal specializing in residential, commercial, and industrial projects.',
                description: 'Company description for SEO',
                category: 'general'
            },
            {
                key: 'primary_phone',
                value: '+91 97332 21114',
                description: 'Primary contact phone number',
                category: 'contact'
            },
            {
                key: 'primary_email',
                value: 'info@b4brothersinfratech.com',
                description: 'Primary contact email',
                category: 'contact'
            },
            {
                key: 'whatsapp_number',
                value: '919733221114',
                description: 'WhatsApp business number',
                category: 'contact'
            },
            {
                key: 'business_address',
                value: 'West Bengal, India',
                description: 'Business address',
                category: 'contact'
            },
            {
                key: 'business_hours',
                value: {
                    monday: '9:00 AM - 6:00 PM',
                    tuesday: '9:00 AM - 6:00 PM',
                    wednesday: '9:00 AM - 6:00 PM',
                    thursday: '9:00 AM - 6:00 PM',
                    friday: '9:00 AM - 6:00 PM',
                    saturday: '9:00 AM - 4:00 PM',
                    sunday: 'Emergency Only'
                },
                description: 'Business operating hours',
                category: 'contact'
            },
            {
                key: 'google_analytics_id',
                value: '',
                description: 'Google Analytics tracking ID',
                category: 'analytics'
            },
            {
                key: 'social_media',
                value: {
                    facebook: '',
                    instagram: '',
                    linkedin: '',
                    youtube: '',
                    twitter: ''
                },
                description: 'Social media links',
                category: 'social'
            },
            {
                key: 'seo_keywords',
                value: 'construction company, building contractor, residential construction, commercial construction, West Bengal, Kolkata',
                description: 'Default SEO keywords',
                category: 'seo'
            },
            {
                key: 'notification_settings',
                value: {
                    emailNotifications: true,
                    smsNotifications: false,
                    formSubmissionAlerts: true,
                    dailyReports: true
                },
                description: 'Notification preferences',
                category: 'notifications'
            }
        ];

        for (const config of defaultConfigs) {
            await Config.findOneAndUpdate(
                { key: config.key },
                config,
                { upsert: true, new: true }
            );
        }
        
        console.log('⚙️ Default configurations setup completed');
    } catch (error) {
        console.error('❌ Error setting up configurations:', error);
    }
}

async function setupContactInfo() {
    try {
        const contactData = [
            {
                type: 'phone',
                label: 'Primary Phone',
                value: '+91 97332 21114',
                isPrimary: true,
                isActive: true,
                order: 1
            },
            {
                type: 'email',
                label: 'Primary Email',
                value: 'info@b4brothersinfratech.com',
                isPrimary: true,
                isActive: true,
                order: 1
            },
            {
                type: 'address',
                label: 'Head Office',
                value: 'West Bengal, India',
                isPrimary: true,
                isActive: true,
                order: 1
            },
            {
                type: 'social',
                label: 'WhatsApp',
                value: 'https://wa.me/919733221114',
                isPrimary: true,
                isActive: true,
                order: 1
            }
        ];

        for (const contact of contactData) {
            await ContactInfo.findOneAndUpdate(
                { type: contact.type, label: contact.label },
                contact,
                { upsert: true, new: true }
            );
        }
        
        console.log('📞 Contact information setup completed');
    } catch (error) {
        console.error('❌ Error setting up contact info:', error);
    }
}

async function setupDefaultServices() {
    try {
        const services = [
            {
                name: 'Building Construction',
                description: 'Complete building construction services from foundation to finishing',
                shortDescription: 'End-to-end construction solutions',
                category: 'construction',
                features: [
                    'Foundation and structural work',
                    'Quality materials and workmanship',
                    'Timely project completion',
                    'Licensed and insured contractors'
                ],
                benefits: [
                    'Expert project management',
                    'Cost-effective solutions',
                    '24/7 customer support',
                    'Quality guarantee'
                ],
                isActive: true,
                isFeatured: true,
                order: 1
            },
            {
                name: 'Renovation Services',
                description: 'Professional renovation and remodeling services for homes and offices',
                shortDescription: 'Transform your space with expert renovation',
                category: 'renovation',
                features: [
                    'Interior and exterior renovation',
                    'Kitchen and bathroom remodeling',
                    'Structural modifications',
                    'Heritage building restoration'
                ],
                benefits: [
                    'Increased property value',
                    'Modern amenities integration',
                    'Energy-efficient upgrades',
                    'Minimal disruption during work'
                ],
                isActive: true,
                isFeatured: true,
                order: 2
            },
            {
                name: 'Design & Planning',
                description: 'Comprehensive architectural design and project planning services',
                shortDescription: 'Professional design and planning solutions',
                category: 'design',
                features: [
                    'Architectural design',
                    'Structural engineering',
                    'Project planning and management',
                    '3D visualization and modeling'
                ],
                benefits: [
                    'Optimized space utilization',
                    'Code-compliant designs',
                    'Cost-effective planning',
                    'Future-ready solutions'
                ],
                isActive: true,
                isFeatured: true,
                order: 3
            },
            {
                name: 'Interior Design',
                description: 'Creative interior design solutions for residential and commercial spaces',
                shortDescription: 'Beautiful and functional interior spaces',
                category: 'interior',
                features: [
                    'Space planning and layout',
                    'Material selection and sourcing',
                    'Custom furniture design',
                    'Lighting and electrical planning'
                ],
                benefits: [
                    'Enhanced aesthetics',
                    'Improved functionality',
                    'Personalized solutions',
                    'Professional execution'
                ],
                isActive: true,
                isFeatured: false,
                order: 4
            },
            {
                name: 'Commercial Construction',
                description: 'Large-scale commercial construction projects for businesses and institutions',
                shortDescription: 'Professional commercial construction',
                category: 'commercial',
                features: [
                    'Office buildings and complexes',
                    'Retail and hospitality spaces',
                    'Industrial facilities',
                    'Institutional buildings'
                ],
                benefits: [
                    'Scalable solutions',
                    'Business-focused design',
                    'Compliance with regulations',
                    'Fast-track construction'
                ],
                isActive: true,
                isFeatured: false,
                order: 5
            }
        ];

        for (const service of services) {
            await Service.findOneAndUpdate(
                { name: service.name },
                service,
                { upsert: true, new: true }
            );
        }
        
        console.log('🔧 Default services setup completed');
    } catch (error) {
        console.error('❌ Error setting up services:', error);
    }
}

async function createIndexes() {
    try {
        // Analytics indexes
        await mongoose.connection.db.collection('analytics').createIndex({ visitorId: 1 });
        await mongoose.connection.db.collection('analytics').createIndex({ timestamp: -1 });
        await mongoose.connection.db.collection('analytics').createIndex({ eventType: 1 });
        
        // Form submissions indexes
        await mongoose.connection.db.collection('formsubmissions').createIndex({ type: 1 });
        await mongoose.connection.db.collection('formsubmissions').createIndex({ status: 1 });
        await mongoose.connection.db.collection('formsubmissions').createIndex({ createdAt: -1 });
        await mongoose.connection.db.collection('formsubmissions').createIndex({ 'formData.email': 1 });
        
        // Projects indexes
        await mongoose.connection.db.collection('projects').createIndex({ category: 1 });
        await mongoose.connection.db.collection('projects').createIndex({ isActive: 1 });
        await mongoose.connection.db.collection('projects').createIndex({ year: -1 });
        
        // Testimonials indexes
        await mongoose.connection.db.collection('testimonials').createIndex({ isActive: 1 });
        await mongoose.connection.db.collection('testimonials').createIndex({ isFeatured: 1 });
        
        console.log('📊 Database indexes created successfully');
    } catch (error) {
        console.error('❌ Error creating indexes:', error);
    }
}

// Run setup if called directly
if (require.main === module) {
    setupDatabase();
}

module.exports = setupDatabase;
