-- B4 Brothers Quick Database Setup Script
-- Run this with: psql -d b4brothers -f quick-setup.sql

-- Create users table
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

-- Create analytics table
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

-- Create form_submissions table
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

-- Create testimonials table
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

-- Create projects table
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

-- Create configs table
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

-- Create services table
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

-- Create contact_info table
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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_analytics_visitor_id ON analytics(visitor_id);
CREATE INDEX IF NOT EXISTS idx_analytics_timestamp ON analytics(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_form_submissions_type ON form_submissions(type);
CREATE INDEX IF NOT EXISTS idx_form_submissions_status ON form_submissions(status);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_testimonials_is_active ON testimonials(is_active);

-- Insert admin user (password: b4brothers2024)
INSERT INTO users (id, username, email, password, role, is_active, permissions, created_at) 
VALUES (
    'admin_' || EXTRACT(EPOCH FROM NOW()) || '_' || SUBSTRING(MD5(RANDOM()::TEXT), 1, 9),
    'admin',
    'admin@b4brothersinfratech.com',
    '$2a$10$X8pKKsHxC9K9K7yC7qmFfOxGJP7wKgkZnXv.QnC7LwQqB8.VpY2Da',
    'admin',
    true,
    '[{"resource": "analytics", "actions": ["create", "read", "update", "delete"]}, {"resource": "forms", "actions": ["create", "read", "update", "delete"]}, {"resource": "testimonials", "actions": ["create", "read", "update", "delete"]}, {"resource": "projects", "actions": ["create", "read", "update", "delete"]}, {"resource": "users", "actions": ["create", "read", "update", "delete"]}, {"resource": "config", "actions": ["create", "read", "update", "delete"]}]'::jsonb,
    CURRENT_TIMESTAMP
) ON CONFLICT (username) DO NOTHING;

-- Insert basic configurations
INSERT INTO configs (key, value, category, created_at) VALUES
('site_title', '"B4 Brothers Infratech PVT LTD"', 'general', CURRENT_TIMESTAMP),
('site_tagline', '"Believe in best builds bold"', 'general', CURRENT_TIMESTAMP),
('primary_phone', '"+91 97332 21114"', 'contact', CURRENT_TIMESTAMP),
('primary_email', '"info@b4brothersinfratech.com"', 'contact', CURRENT_TIMESTAMP),
('whatsapp_number', '"919733221114"', 'contact', CURRENT_TIMESTAMP)
ON CONFLICT (key) DO NOTHING;

-- Success message
DO $$
BEGIN
    RAISE NOTICE '✅ B4 Brothers database setup completed successfully!';
    RAISE NOTICE '👤 Admin user created - Username: admin, Password: b4brothers2024';
    RAISE NOTICE '🚀 You can now start your server with: npm start';
END $$;
