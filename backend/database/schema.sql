-- B4 Brothers Infratech Database Schema for PostgreSQL
-- Complete database structure with all tables, indexes, and constraints

-- Create database (run separately if needed)
-- CREATE DATABASE b4brothers;
-- \c b4brothers;

-- Create extensions if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- =========================
-- USERS TABLE
-- =========================
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'admin' CHECK (role IN ('admin', 'manager')),
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP,
    permissions JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- ANALYTICS TABLE
-- =========================
CREATE TABLE IF NOT EXISTS analytics (
    id SERIAL PRIMARY KEY,
    visitor_id VARCHAR(100) NOT NULL,
    session_id VARCHAR(100),
    event_type VARCHAR(50) NOT NULL CHECK (event_type IN ('pageview', 'click', 'form_submission', 'whatsapp_redirect')),
    event_data JSONB,
    user_agent TEXT,
    ip_address INET,
    referrer TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- FORM SUBMISSIONS TABLE
-- =========================
CREATE TABLE IF NOT EXISTS form_submissions (
    id VARCHAR(50) PRIMARY KEY,
    type VARCHAR(50) NOT NULL CHECK (type IN ('contact', 'career', 'quote', 'newsletter', 'quick_contact')),
    form_data JSONB NOT NULL,
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'archived')),
    priority VARCHAR(10) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    assigned_to VARCHAR(50) REFERENCES users(id),
    follow_up_date TIMESTAMP,
    source VARCHAR(50) DEFAULT 'website',
    visitor_id VARCHAR(100),
    ip_address INET,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- SUBMISSION NOTES TABLE
-- =========================
CREATE TABLE IF NOT EXISTS submission_notes (
    id SERIAL PRIMARY KEY,
    submission_id VARCHAR(50) REFERENCES form_submissions(id) ON DELETE CASCADE,
    note TEXT NOT NULL,
    added_by VARCHAR(50) REFERENCES users(id),
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- TESTIMONIALS TABLE
-- =========================
CREATE TABLE IF NOT EXISTS testimonials (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    about TEXT NOT NULL,
    post VARCHAR(255) NOT NULL,
    rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    image VARCHAR(500),
    project_id VARCHAR(50),
    location VARCHAR(255),
    project_type VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    verification_status VARCHAR(20) DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- PROJECTS TABLE
-- =========================
CREATE TABLE IF NOT EXISTS projects (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('Residential', 'Commercial', 'Industrial', 'Renovation', 'Hospitality')),
    images JSONB DEFAULT '[]',
    thumbnail_image VARCHAR(500),
    location VARCHAR(255),
    area VARCHAR(100),
    duration VARCHAR(100),
    budget VARCHAR(100),
    year INTEGER,
    status VARCHAR(20) DEFAULT 'completed' CHECK (status IN ('planning', 'in_progress', 'completed', 'on_hold')),
    features JSONB DEFAULT '[]',
    highlights JSONB DEFAULT '[]',
    client_name VARCHAR(255),
    client_testimonial_id VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    seo_title VARCHAR(500),
    seo_description TEXT,
    tags JSONB DEFAULT '[]',
    technologies JSONB DEFAULT '[]',
    team_members JSONB DEFAULT '[]',
    challenges JSONB DEFAULT '[]',
    solutions JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add foreign key for testimonials project reference
ALTER TABLE testimonials ADD CONSTRAINT fk_testimonials_project 
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL;

-- Add foreign key for projects client testimonial reference
ALTER TABLE projects ADD CONSTRAINT fk_projects_testimonial 
    FOREIGN KEY (client_testimonial_id) REFERENCES testimonials(id) ON DELETE SET NULL;

-- =========================
-- NEWS/BLOG TABLE
-- =========================
CREATE TABLE IF NOT EXISTS news (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image VARCHAR(500),
    images JSONB DEFAULT '[]',
    author_id VARCHAR(50) REFERENCES users(id),
    category VARCHAR(50) DEFAULT 'company_news' CHECK (category IN ('company_news', 'project_update', 'industry_news', 'tips', 'case_study')),
    tags JSONB DEFAULT '[]',
    is_published BOOLEAN DEFAULT false,
    publish_date TIMESTAMP,
    seo_title VARCHAR(500),
    seo_description TEXT,
    read_time INTEGER,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- SITE CONFIGURATION TABLE
-- =========================
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

-- =========================
-- CONTACT INFORMATION TABLE
-- =========================
CREATE TABLE IF NOT EXISTS contact_info (
    id SERIAL PRIMARY KEY,
    type VARCHAR(20) NOT NULL CHECK (type IN ('phone', 'email', 'address', 'social', 'hours')),
    label VARCHAR(100),
    value TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- SERVICES TABLE
-- =========================
CREATE TABLE IF NOT EXISTS services (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    short_description TEXT,
    icon VARCHAR(100),
    image VARCHAR(500),
    category VARCHAR(100),
    features JSONB DEFAULT '[]',
    benefits JSONB DEFAULT '[]',
    process JSONB DEFAULT '[]',
    pricing JSONB,
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    seo_title VARCHAR(500),
    seo_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- INDEXES FOR PERFORMANCE
-- =========================

-- Analytics indexes
CREATE INDEX IF NOT EXISTS idx_analytics_visitor_id ON analytics(visitor_id);
CREATE INDEX IF NOT EXISTS idx_analytics_timestamp ON analytics(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_session_id ON analytics(session_id);

-- Form submissions indexes
CREATE INDEX IF NOT EXISTS idx_form_submissions_type ON form_submissions(type);
CREATE INDEX IF NOT EXISTS idx_form_submissions_status ON form_submissions(status);
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON form_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_form_submissions_priority ON form_submissions(priority);
CREATE INDEX IF NOT EXISTS idx_form_submissions_assigned_to ON form_submissions(assigned_to);

-- Projects indexes
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_is_active ON projects(is_active);
CREATE INDEX IF NOT EXISTS idx_projects_year ON projects(year DESC);
CREATE INDEX IF NOT EXISTS idx_projects_is_featured ON projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);

-- Testimonials indexes
CREATE INDEX IF NOT EXISTS idx_testimonials_is_active ON testimonials(is_active);
CREATE INDEX IF NOT EXISTS idx_testimonials_is_featured ON testimonials(is_featured);
CREATE INDEX IF NOT EXISTS idx_testimonials_verification_status ON testimonials(verification_status);
CREATE INDEX IF NOT EXISTS idx_testimonials_project_id ON testimonials(project_id);

-- News indexes
CREATE INDEX IF NOT EXISTS idx_news_is_published ON news(is_published);
CREATE INDEX IF NOT EXISTS idx_news_category ON news(category);
CREATE INDEX IF NOT EXISTS idx_news_publish_date ON news(publish_date DESC);
CREATE INDEX IF NOT EXISTS idx_news_author_id ON news(author_id);

-- Config indexes
CREATE INDEX IF NOT EXISTS idx_configs_key ON configs(key);
CREATE INDEX IF NOT EXISTS idx_configs_category ON configs(category);

-- Contact info indexes
CREATE INDEX IF NOT EXISTS idx_contact_info_type ON contact_info(type);
CREATE INDEX IF NOT EXISTS idx_contact_info_is_active ON contact_info(is_active);

-- Services indexes
CREATE INDEX IF NOT EXISTS idx_services_is_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_services_is_featured ON services(is_featured);
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);

-- Full-text search indexes
CREATE INDEX IF NOT EXISTS idx_projects_search ON projects USING gin(to_tsvector('english', title || ' ' || description || ' ' || location));
CREATE INDEX IF NOT EXISTS idx_form_submissions_search ON form_submissions USING gin((form_data->>'name') gin_trgm_ops);

-- =========================
-- TRIGGERS FOR UPDATED_AT
-- =========================

-- Function to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_form_submissions_updated_at BEFORE UPDATE ON form_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_configs_updated_at BEFORE UPDATE ON configs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_info_updated_at BEFORE UPDATE ON contact_info FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =========================
-- VIEWS FOR COMMON QUERIES
-- =========================

-- Active projects with testimonials
CREATE OR REPLACE VIEW active_projects_with_testimonials AS
SELECT 
    p.*,
    t.name as testimonial_author,
    t.about as testimonial_text,
    t.rating as testimonial_rating
FROM projects p
LEFT JOIN testimonials t ON p.client_testimonial_id = t.id
WHERE p.is_active = true;

-- Form submissions with user details
CREATE OR REPLACE VIEW form_submissions_with_users AS
SELECT 
    fs.*,
    u.username as assigned_username,
    u.email as assigned_email
FROM form_submissions fs
LEFT JOIN users u ON fs.assigned_to = u.id;

-- Analytics summary view
CREATE OR REPLACE VIEW analytics_summary AS
SELECT 
    DATE(timestamp) as date,
    event_type,
    COUNT(*) as event_count,
    COUNT(DISTINCT visitor_id) as unique_visitors
FROM analytics 
GROUP BY DATE(timestamp), event_type
ORDER BY date DESC;

-- =========================
-- FUNCTIONS FOR COMMON OPERATIONS
-- =========================

-- Function to get analytics dashboard data
CREATE OR REPLACE FUNCTION get_analytics_dashboard(
    start_date DATE DEFAULT NULL,
    end_date DATE DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
    result JSON;
    date_filter TEXT;
BEGIN
    -- Build date filter
    date_filter := CASE 
        WHEN start_date IS NOT NULL AND end_date IS NOT NULL THEN
            'AND timestamp::date BETWEEN ''' || start_date || ''' AND ''' || end_date || ''''
        ELSE ''
    END;
    
    -- Execute dynamic query and return JSON
    EXECUTE format('
        SELECT json_build_object(
            ''total_events'', (SELECT COUNT(*) FROM analytics WHERE 1=1 %s),
            ''unique_visitors'', (SELECT COUNT(DISTINCT visitor_id) FROM analytics WHERE 1=1 %s),
            ''page_views'', (SELECT COUNT(*) FROM analytics WHERE event_type = ''pageview'' %s),
            ''form_submissions'', (SELECT COUNT(*) FROM analytics WHERE event_type = ''form_submission'' %s),
            ''events_by_type'', (
                SELECT json_agg(json_build_object(''event_type'', event_type, ''count'', count))
                FROM (
                    SELECT event_type, COUNT(*) as count 
                    FROM analytics 
                    WHERE 1=1 %s
                    GROUP BY event_type
                ) t
            )
        )', date_filter, date_filter, date_filter, date_filter, date_filter)
    INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to clean old analytics data
CREATE OR REPLACE FUNCTION clean_old_analytics_data(days_to_keep INTEGER DEFAULT 90)
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM analytics 
    WHERE timestamp < CURRENT_DATE - INTERVAL '1 day' * days_to_keep;
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- =========================
-- INITIAL DATA CONSTRAINTS
-- =========================

-- Ensure at least one admin user exists
-- This will be handled in the setup script

-- =========================
-- COMMENTS FOR DOCUMENTATION
-- =========================

COMMENT ON TABLE users IS 'System users for admin panel authentication';
COMMENT ON TABLE analytics IS 'User behavior tracking and analytics data';
COMMENT ON TABLE form_submissions IS 'All form submissions from website';
COMMENT ON TABLE submission_notes IS 'Notes added to form submissions by admins';
COMMENT ON TABLE testimonials IS 'Client testimonials and reviews';
COMMENT ON TABLE projects IS 'Portfolio projects and case studies';
COMMENT ON TABLE news IS 'Blog posts and company news articles';
COMMENT ON TABLE configs IS 'Site configuration and settings';
COMMENT ON TABLE contact_info IS 'Contact information entries';
COMMENT ON TABLE services IS 'Service offerings and descriptions';

-- =========================
-- PERMISSIONS (Optional - for production)
-- =========================

-- Create application role
-- CREATE ROLE b4brothers_app WITH LOGIN PASSWORD 'your_app_password';
-- GRANT CONNECT ON DATABASE b4brothers TO b4brothers_app;
-- GRANT USAGE ON SCHEMA public TO b4brothers_app;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO b4brothers_app;
-- GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO b4brothers_app;

COMMIT;
