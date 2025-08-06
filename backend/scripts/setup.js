// PostgreSQL Database Setup Script for B4 Brothers Backend
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// PostgreSQL connection
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'b4brothers',
    password: process.env.DB_PASSWORD || 'password',
    port: process.env.DB_PORT || 5432,
});

async function setupDatabase() {
    let client;
    try {
        console.log('🔗 Connecting to PostgreSQL...');
        client = await pool.connect();
        
        console.log('✅ Connected to PostgreSQL database');

        // Run schema creation
        await createDatabaseSchema(client);
        
        // Create admin user
        await createAdminUser(client);
        
        // Setup default configurations
        await setupDefaultConfigs(client);
        
        // Setup contact information
        await setupContactInfo(client);
        
        // Setup default services
        await setupDefaultServices(client);
        
        console.log('✅ Database setup completed successfully!');
        
    } catch (error) {
        console.error('❌ Setup failed:', error);
        process.exit(1);
    } finally {
        if (client) {
            client.release();
        }
        await pool.end();
        console.log('📁 Database connection closed');
    }
}

async function createDatabaseSchema(client) {
    try {
        console.log('📊 Creating database schema...');
        
        // Read and execute schema file
        const schemaPath = path.join(__dirname, '../database/schema.sql');
        const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
        
        await client.query(schemaSQL);
        
        console.log('✅ Database schema created successfully');
    } catch (error) {
        console.error('❌ Error creating schema:', error);
        throw error;
    }
}

async function createAdminUser(client) {
    try {
        console.log('👤 Creating admin user...');
        
        // Check if admin user exists
        const existingAdmin = await client.query(
            'SELECT id FROM users WHERE username = $1',
            ['admin']
        );
        
        if (existingAdmin.rows.length === 0) {
            const hashedPassword = await bcrypt.hash(
                process.env.ADMIN_PASSWORD || 'b4brothers2024', 
                10
            );
            
            const adminId = Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
            
            const permissions = [
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
            ];
            
            await client.query(
                `INSERT INTO users (id, username, email, password, role, is_active, permissions, created_at)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP)`,
                [
                    adminId,
                    process.env.ADMIN_USERNAME || 'admin',
                    process.env.ADMIN_EMAIL || 'admin@b4brothersinfratech.com',
                    hashedPassword,
                    'admin',
                    true,
                    JSON.stringify(permissions)
                ]
            );
            
            console.log('✅ Admin user created successfully');
            console.log(`   Username: ${process.env.ADMIN_USERNAME || 'admin'}`);
            console.log(`   Email: ${process.env.ADMIN_EMAIL || 'admin@b4brothersinfratech.com'}`);
        } else {
            console.log('👤 Admin user already exists');
        }
    } catch (error) {
        console.error('❌ Error creating admin user:', error);
        throw error;
    }
}

async function setupDefaultConfigs(client) {
    try {
        console.log('⚙️ Setting up default configurations...');
        
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
            await client.query(
                `INSERT INTO configs (key, value, description, category, created_at)
                 VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
                 ON CONFLICT (key) DO UPDATE SET
                 value = EXCLUDED.value,
                 description = EXCLUDED.description,
                 category = EXCLUDED.category,
                 updated_at = CURRENT_TIMESTAMP`,
                [config.key, JSON.stringify(config.value), config.description, config.category]
            );
        }
        
        console.log('✅ Default configurations setup completed');
    } catch (error) {
        console.error('❌ Error setting up configurations:', error);
        throw error;
    }
}

async function setupContactInfo(client) {
    try {
        console.log('📞 Setting up contact information...');
        
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
            await client.query(
                `INSERT INTO contact_info (type, label, value, is_primary, is_active, display_order, created_at)
                 VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)
                 ON CONFLICT DO NOTHING`,
                [contact.type, contact.label, contact.value, contact.isPrimary, contact.isActive, contact.order]
            );
        }
        
        console.log('✅ Contact information setup completed');
    } catch (error) {
        console.error('❌ Error setting up contact info:', error);
        throw error;
    }
}

async function setupDefaultServices(client) {
    try {
        console.log('🔧 Setting up default services...');
        
        const services = [
            {
                id: 'service_' + Date.now() + '_1',
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
                id: 'service_' + Date.now() + '_2',
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
                id: 'service_' + Date.now() + '_3',
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
            }
        ];

        for (const service of services) {
            await client.query(
                `INSERT INTO services (id, name, description, short_description, category, features, benefits, is_active, is_featured, display_order, created_at)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, CURRENT_TIMESTAMP)
                 ON CONFLICT (id) DO NOTHING`,
                [
                    service.id,
                    service.name,
                    service.description,
                    service.shortDescription,
                    service.category,
                    JSON.stringify(service.features),
                    JSON.stringify(service.benefits),
                    service.isActive,
                    service.isFeatured,
                    service.order
                ]
            );
        }
        
        console.log('✅ Default services setup completed');
    } catch (error) {
        console.error('❌ Error setting up services:', error);
        throw error;
    }
}

// Run setup if called directly
if (require.main === module) {
    setupDatabase();
}

module.exports = setupDatabase;
