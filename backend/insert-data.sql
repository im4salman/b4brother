-- B4 Brothers Infratech - Simple Dummy Data Insert Script
-- Run this with: psql -d b4brothers -f insert-data.sql

-- =========================
-- INSERT PROJECTS DATA
-- =========================

INSERT INTO projects (id, title, description, category, location, area, duration, budget, year, status, features, highlights, client_name, is_active, is_featured, display_order, tags, technologies, seo_title, seo_description, created_at) VALUES

('proj_modern_villa_1',
 'Modern Residential Villa',
 'A luxurious 5,000 sq ft villa featuring contemporary architecture, open-plan living spaces, green roof terraces, and a comprehensive smart-home automation system.',
 'Residential',
 'Kolkata, West Bengal',
 '5,000 sq ft',
 '8 months',
 '₹1.2 Crores',
 2024,
 'completed',
 '["Smart home automation system", "Green roof terraces with rainwater harvesting", "Open-plan living with floor-to-ceiling windows", "Energy-efficient LED lighting throughout", "Premium marble flooring and wooden accents", "Modular kitchen with imported appliances"]',
 '["LEED Gold certified design", "Completed 2 weeks ahead of schedule", "15% under budget due to efficient planning", "Zero safety incidents during construction"]',
 'Rajesh Kumar',
 true, true, 1,
 '["luxury", "residential", "smart-home", "eco-friendly"]',
 '["Smart Automation", "Solar Panels", "Rainwater Harvesting"]',
 'Modern Residential Villa Construction in Kolkata',
 'Luxury residential villa construction with smart home features and eco-friendly design in Kolkata.',
 CURRENT_TIMESTAMP),

('proj_office_tower_2',
 'Downtown Office Tower',
 'A 20-storey Class A office building featuring modern double-glass façade, LEED Gold certification, and an elegant concierge lobby with premium finishes.',
 'Commercial',
 'Salt Lake, Kolkata',
 '50,000 sq ft',
 '18 months',
 '₹8.5 Crores',
 2023,
 'completed',
 '["Double-glass façade for energy efficiency", "High-speed elevators with smart controls", "Central air conditioning with zone control", "Rooftop garden and recreational area", "Underground parking for 200+ vehicles", "Conference facilities and business center"]',
 '["LEED Gold certified building", "Pre-leased to 95% capacity before completion", "Advanced fire safety and security systems", "Sustainable design reduces operational costs by 30%"]',
 'TechCorp Solutions',
 true, true, 2,
 '["commercial", "office-tower", "leed-certified", "sustainable"]',
 '["LEED Certification", "Smart Elevators", "Energy Management"]',
 'Commercial Office Tower Construction in Salt Lake',
 'LEED Gold certified office tower construction with modern amenities in Salt Lake, Kolkata.',
 CURRENT_TIMESTAMP),

('proj_heritage_3',
 'Historic Building Renovation',
 'Complete restoration of a 1920s heritage landmark building, including comprehensive seismic retrofitting and period-correct interior restoration.',
 'Renovation',
 'Central Kolkata',
 '15,000 sq ft',
 '14 months',
 '₹3.2 Crores',
 2022,
 'completed',
 '["Heritage façade restoration with original materials", "Seismic retrofitting for modern safety standards", "Period-correct interior design and fixtures", "Modern utilities integrated seamlessly", "Accessibility features added per regulations", "Museum-quality restoration of decorative elements"]',
 '["Heritage conservation award winner", "Featured in architectural magazines", "Maintained 100% historical authenticity", "Now serves as a cultural heritage center"]',
 'Kolkata Heritage Trust',
 true, true, 3,
 '["heritage", "renovation", "historic", "conservation"]',
 '["Heritage Conservation", "Seismic Retrofitting", "Period Restoration"]',
 'Heritage Building Renovation in Central Kolkata',
 'Expert heritage building renovation and restoration services preserving historical authenticity.',
 CURRENT_TIMESTAMP);

-- =========================
-- INSERT TESTIMONIALS DATA
-- =========================

INSERT INTO testimonials (id, name, about, post, rating, location, project_type, is_active, is_featured, verification_status, display_order, created_at) VALUES

('test_rajesh_1',
 'Rajesh Kumar',
 'B4 Brothers exceeded our expectations in every way. Their attention to detail and commitment to quality is unmatched. Our villa was completed on time and within budget, with exceptional craftsmanship throughout.',
 'Villa Owner',
 5, 'Kolkata', 'Residential Villa', true, true, 'verified', 1, CURRENT_TIMESTAMP),

('test_priya_2',
 'Priya Sharma',
 'The renovation of our heritage building was handled with utmost care and professionalism. B4 Brothers maintained the historical integrity while adding modern amenities. Highly recommended!',
 'Heritage Trust Director',
 5, 'Central Kolkata', 'Heritage Renovation', true, true, 'verified', 2, CURRENT_TIMESTAMP),

('test_amit_3',
 'Amit Bhattacharya',
 'Outstanding work on our office tower project. The team was professional, efficient, and delivered a world-class building. The LEED certification was achieved without any hassles.',
 'TechCorp CEO',
 5, 'Salt Lake', 'Commercial Tower', true, true, 'verified', 3, CURRENT_TIMESTAMP);

-- =========================
-- INSERT FORM SUBMISSIONS DATA
-- =========================

INSERT INTO form_submissions (id, type, form_data, status, priority, source, visitor_id, created_at) VALUES

('form_ankit_1',
 'contact',
 '{"name": "Ankit Sharma", "email": "ankit.sharma@email.com", "phone": "+91 98765 43210", "service": "Building Construction", "budget": "₹15-50 Lakhs", "timeline": "3-6 Months", "message": "Looking to build a 3BHK house in Kolkata. Need detailed quote and timeline."}',
 'new', 'high', 'website', 'visitor_12345', CURRENT_TIMESTAMP),

('form_deepika_2',
 'contact',
 '{"name": "Deepika Patel", "email": "deepika.patel@company.com", "phone": "+91 87654 32109", "service": "Commercial Construction", "budget": "Above ₹1 Crore", "timeline": "6-12 Months", "message": "Planning to build a commercial complex. Need consultation on design and planning."}',
 'contacted', 'high', 'website', 'visitor_12346', CURRENT_TIMESTAMP),

('form_sanjay_3',
 'career',
 '{"name": "Sanjay Kumar", "email": "sanjay.kumar@email.com", "phone": "+91 65432 10987", "position": "Site Engineer", "experience": "5 years", "message": "Experienced civil engineer looking for opportunities. Available for immediate joining."}',
 'new', 'medium', 'career_page', 'visitor_12347', CURRENT_TIMESTAMP);

-- =========================
-- INSERT SERVICES DATA
-- =========================

INSERT INTO services (id, name, description, short_description, category, features, benefits, is_active, is_featured, display_order, created_at) VALUES

('service_construction_1', 
 'Building Construction', 
 'Complete building construction services from foundation to finishing with quality materials and expert workmanship.',
 'End-to-end construction solutions', 
 'construction',
 '["Foundation and structural work", "Quality materials and workmanship", "Timely project completion", "Licensed and insured contractors"]',
 '["Expert project management", "Cost-effective solutions", "24/7 customer support", "Quality guarantee"]',
 true, true, 1, CURRENT_TIMESTAMP),

('service_renovation_2', 
 'Renovation Services', 
 'Professional renovation and remodeling services for homes and offices with modern design solutions.',
 'Transform your space with expert renovation', 
 'renovation',
 '["Interior and exterior renovation", "Kitchen and bathroom remodeling", "Structural modifications", "Heritage building restoration"]',
 '["Increased property value", "Modern amenities integration", "Energy-efficient upgrades", "Minimal disruption during work"]',
 true, true, 2, CURRENT_TIMESTAMP),

('service_design_3', 
 'Design & Planning', 
 'Comprehensive architectural design and project planning services with 3D visualization.',
 'Professional design and planning solutions', 
 'design',
 '["Architectural design", "Structural engineering", "Project planning and management", "3D visualization and modeling"]',
 '["Optimized space utilization", "Code-compliant designs", "Cost-effective planning", "Future-ready solutions"]',
 true, true, 3, CURRENT_TIMESTAMP);

-- =========================
-- INSERT ADDITIONAL CONFIGURATIONS
-- =========================

INSERT INTO configs (key, value, description, category, created_at) VALUES
('company_description', '"Leading construction company in West Bengal specializing in residential, commercial, and industrial projects."', 'Company description for SEO', 'general', CURRENT_TIMESTAMP),
('business_address', '"West Bengal, India"', 'Business address', 'contact', CURRENT_TIMESTAMP),
('social_media', '{"facebook": "", "instagram": "", "linkedin": "", "youtube": "", "twitter": ""}', 'Social media links', 'social', CURRENT_TIMESTAMP)
ON CONFLICT (key) DO NOTHING;

-- =========================
-- INSERT CONTACT INFORMATION
-- =========================

INSERT INTO contact_info (type, label, value, is_primary, is_active, display_order, created_at) VALUES
('phone', 'Primary Phone', '+91 97332 21114', true, true, 1, CURRENT_TIMESTAMP),
('email', 'Primary Email', 'info@b4brothersinfratech.com', true, true, 1, CURRENT_TIMESTAMP),
('address', 'Head Office', 'West Bengal, India', true, true, 1, CURRENT_TIMESTAMP),
('social', 'WhatsApp', 'https://wa.me/919733221114', true, true, 1, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

-- =========================
-- INSERT SAMPLE ANALYTICS DATA
-- =========================

-- Insert some sample analytics events
INSERT INTO analytics (visitor_id, session_id, event_type, event_data, user_agent, ip_address, timestamp) VALUES
('visitor_001', 'session_001', 'pageview', '{"page": "/"}', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', '192.168.1.100', CURRENT_TIMESTAMP - INTERVAL '1 hour'),
('visitor_001', 'session_001', 'click', '{"element": "Contact Button", "location": "/"}', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', '192.168.1.100', CURRENT_TIMESTAMP - INTERVAL '55 minutes'),
('visitor_002', 'session_002', 'pageview', '{"page": "/projects"}', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', '192.168.1.101', CURRENT_TIMESTAMP - INTERVAL '30 minutes'),
('visitor_003', 'session_003', 'whatsapp_redirect', '{"message": "Hi! Interested in your services"}', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1)', '192.168.1.102', CURRENT_TIMESTAMP - INTERVAL '15 minutes');

-- Success message
DO $$
BEGIN
    RAISE NOTICE '=================================';
    RAISE NOTICE 'B4 Brothers Dummy Data Inserted!';
    RAISE NOTICE '=================================';
    RAISE NOTICE 'Projects: %', (SELECT COUNT(*) FROM projects);
    RAISE NOTICE 'Testimonials: %', (SELECT COUNT(*) FROM testimonials);
    RAISE NOTICE 'Form Submissions: %', (SELECT COUNT(*) FROM form_submissions);
    RAISE NOTICE 'Services: %', (SELECT COUNT(*) FROM services);
    RAISE NOTICE 'Analytics Events: %', (SELECT COUNT(*) FROM analytics);
    RAISE NOTICE '=================================';
    RAISE NOTICE 'Ready to test APIs!';
    RAISE NOTICE '=================================';
END $$;

COMMIT;
