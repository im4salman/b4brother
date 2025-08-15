// Manual Database Setup Script for B4 Brothers Backend
// Run this if the main setup script fails

const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// PostgreSQL connection
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'b4brothers',
    password: process.env.DB_PASSWORD || 'password',
    port: process.env.DB_PORT || 5432,
});

const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
};

async function manualSetup() {
    let client;
    try {
        console.log('🔗 Connecting to PostgreSQL...');
        client = await pool.connect();
        console.log('✅ Connected to PostgreSQL database');

        // Create tables manually
        await createTablesManually(client);
        
        // Create admin user
        await createAdminUser(client);
        
        // Setup basic configurations
        await setupBasicConfig(client);
        
        console.log('✅ Manual database setup completed successfully!');
        console.log('🎯 You can now run: npm start');
        
    } catch (error) {
        console.error('❌ Manual setup failed:', error);
        process.exit(1);
    } finally {
        if (client) {
            client.release();
        }
        await pool.end();
        console.log('📁 Database connection closed');
    }
}

async function createTablesManually(client) {
    console.log('📊 Creating database tables manually...');
    
    // Create users table
    await client.query(`
        CREATE TABLE IF NOT EXISTS users (
            id VARCHAR(50) PRIMARY KEY,
            username VARCHAR(100) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(20) DEFAULT 'admin',
            is_active BOOLEAN DEFAULT true,
            last_login TIMESTAMP,
            permissions JSONB DEFAULT '[]',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);

    // Create analytics table
    await client.query(`
        CREATE TABLE IF NOT EXISTS analytics (
            id SERIAL PRIMARY KEY,
            visitor_id VARCHAR(100) NOT NULL,
            session_id VARCHAR(100),
            event_type VARCHAR(50) NOT NULL,
            event_data JSONB,
            user_agent TEXT,
            ip_address INET,
            referrer TEXT,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);

    // Create form_submissions table
    await client.query(`
        CREATE TABLE IF NOT EXISTS form_submissions (
            id VARCHAR(50) PRIMARY KEY,
            type VARCHAR(50) NOT NULL,
            form_data JSONB NOT NULL,
            status VARCHAR(20) DEFAULT 'new',
            priority VARCHAR(10) DEFAULT 'medium',
            assigned_to VARCHAR(50),
            follow_up_date TIMESTAMP,
            source VARCHAR(50) DEFAULT 'website',
            visitor_id VARCHAR(100),
            ip_address INET,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);

    // Create testimonials table
    await client.query(`
        CREATE TABLE IF NOT EXISTS testimonials (
            id VARCHAR(50) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            about TEXT NOT NULL,
            post VARCHAR(255) NOT NULL,
            rating INTEGER DEFAULT 5,
            image VARCHAR(500),
            project_id VARCHAR(50),
            location VARCHAR(255),
            project_type VARCHAR(100),
            is_active BOOLEAN DEFAULT true,
            is_featured BOOLEAN DEFAULT false,
            display_order INTEGER DEFAULT 0,
            verification_status VARCHAR(20) DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);

    // Create projects table
    await client.query(`
        CREATE TABLE IF NOT EXISTS projects (
            id VARCHAR(50) PRIMARY KEY,
            title VARCHAR(500) NOT NULL,
            description TEXT NOT NULL,
            category VARCHAR(50) NOT NULL,
            images JSONB DEFAULT '[]',
            thumbnail_image VARCHAR(500),
            location VARCHAR(255),
            area VARCHAR(100),
            duration VARCHAR(100),
            budget VARCHAR(100),
            year INTEGER,
            status VARCHAR(20) DEFAULT 'completed',
            features JSONB DEFAULT '[]',
            highlights JSONB DEFAULT '[]',
            client_name VARCHAR(255),
            is_active BOOLEAN DEFAULT true,
            is_featured BOOLEAN DEFAULT false,
            display_order INTEGER DEFAULT 0,
            seo_title VARCHAR(500),
            seo_description TEXT,
            tags JSONB DEFAULT '[]',
            technologies JSONB DEFAULT '[]',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);

    // Create configs table
    await client.query(`
        CREATE TABLE IF NOT EXISTS configs (
            id SERIAL PRIMARY KEY,
            key VARCHAR(100) UNIQUE NOT NULL,
            value JSONB,
            description TEXT,
            category VARCHAR(50),
            is_editable BOOLEAN DEFAULT true,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);

    // Create services table
    await client.query(`
        CREATE TABLE IF NOT EXISTS services (
            id VARCHAR(50) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            short_description TEXT,
            category VARCHAR(100),
            features JSONB DEFAULT '[]',
            benefits JSONB DEFAULT '[]',
            is_active BOOLEAN DEFAULT true,
            is_featured BOOLEAN DEFAULT false,
            display_order INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);

    // Create contact_info table
    await client.query(`
        CREATE TABLE IF NOT EXISTS contact_info (
            id SERIAL PRIMARY KEY,
            type VARCHAR(20) NOT NULL,
            label VARCHAR(100),
            value TEXT NOT NULL,
            is_primary BOOLEAN DEFAULT false,
            is_active BOOLEAN DEFAULT true,
            display_order INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);

    // Create indexes
    await client.query('CREATE INDEX IF NOT EXISTS idx_analytics_visitor_id ON analytics(visitor_id);');
    await client.query('CREATE INDEX IF NOT EXISTS idx_analytics_timestamp ON analytics(timestamp DESC);');
    await client.query('CREATE INDEX IF NOT EXISTS idx_form_submissions_type ON form_submissions(type);');
    await client.query('CREATE INDEX IF NOT EXISTS idx_form_submissions_status ON form_submissions(status);');
    await client.query('CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);');
    await client.query('CREATE INDEX IF NOT EXISTS idx_testimonials_is_active ON testimonials(is_active);');

    console.log('✅ Database tables created successfully');
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
            const hashedPassword = await bcrypt.hash('b4brothers2024', 10);
            const adminId = generateId();
            
            const permissions = [
                { resource: 'analytics', actions: ['create', 'read', 'update', 'delete'] },
                { resource: 'forms', actions: ['create', 'read', 'update', 'delete'] },
                { resource: 'testimonials', actions: ['create', 'read', 'update', 'delete'] },
                { resource: 'projects', actions: ['create', 'read', 'update', 'delete'] },
                { resource: 'users', actions: ['create', 'read', 'update', 'delete'] },
                { resource: 'config', actions: ['create', 'read', 'update', 'delete'] }
            ];
            
            await client.query(
                `INSERT INTO users (id, username, email, password, role, is_active, permissions, created_at)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP)`,
                [
                    adminId,
                    'admin',
                    'admin@b4brothersinfratech.com',
                    hashedPassword,
                    'admin',
                    true,
                    JSON.stringify(permissions)
                ]
            );
            
            console.log('✅ Admin user created successfully');
            console.log('   Username: admin');
            console.log('   Password: b4brothers2024');
        } else {
            console.log('👤 Admin user already exists');
        }
    } catch (error) {
        console.error('❌ Error creating admin user:', error);
        throw error;
    }
}

async function setupBasicConfig(client) {
    try {
        console.log('⚙️ Setting up basic configuration...');
        
        const configs = [
            { key: 'site_title', value: 'B4 Brothers Infratech PVT LTD', category: 'general' },
            { key: 'site_tagline', value: 'Believe in best builds bold', category: 'general' },
            { key: 'primary_phone', value: '+91 97332 21114', category: 'contact' },
            { key: 'primary_email', value: 'info@b4brothersinfratech.com', category: 'contact' },
            { key: 'whatsapp_number', value: '919733221114', category: 'contact' }
        ];

        for (const config of configs) {
            await client.query(
                `INSERT INTO configs (key, value, category, created_at)
                 VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
                 ON CONFLICT (key) DO NOTHING`,
                [config.key, JSON.stringify(config.value), config.category]
            );
        }
        
        console.log('✅ Basic configuration setup completed');
    } catch (error) {
        console.error('❌ Error setting up configuration:', error);
        throw error;
    }
}

// Run manual setup if called directly
if (require.main === module) {
    manualSetup();
}

module.exports = manualSetup;
