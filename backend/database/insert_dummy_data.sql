-- B4 Brothers Infratech - Complete Dummy Data Insert Script
-- This script populates all tables with realistic sample data for testing

-- Clear existing data (optional - uncomment if needed for fresh start)
-- TRUNCATE TABLE analytics RESTART IDENTITY CASCADE;
-- TRUNCATE TABLE form_submissions CASCADE;
-- TRUNCATE TABLE testimonials CASCADE;
-- TRUNCATE TABLE projects CASCADE;
-- DELETE FROM configs WHERE key NOT IN ('site_title', 'site_tagline', 'primary_phone', 'primary_email', 'whatsapp_number');
-- TRUNCATE TABLE contact_info RESTART IDENTITY CASCADE;
-- TRUNCATE TABLE services CASCADE;

-- =========================
-- INSERT PROJECTS DATA
-- =========================

INSERT INTO projects (id, title, description, category, location, area, duration, budget, year, status, features, highlights, client_name, is_active, is_featured, display_order, tags, technologies, seo_title, seo_description, created_at) VALUES

('proj_' || EXTRACT(EPOCH FROM NOW()) || '_1',
 'Modern Residential Villa',
 'A luxurious 5,000 sq ft villa featuring contemporary architecture, open-plan living spaces, green roof terraces, and a comprehensive smart-home automation system. This project showcases our expertise in high-end residential construction with sustainable design elements.',
 'Residential',
 'Kolkata, West Bengal',
 '5,000 sq ft',
 '8 months',
 '₹1.2 Crores',
 2024,
 'completed',
 '["Smart home automation system", "Green roof terraces with rainwater harvesting", "Open-plan living with floor-to-ceiling windows", "Energy-efficient LED lighting throughout", "Premium marble flooring and wooden accents", "Modular kitchen with imported appliances", "Swimming pool with infinity edge", "Home theater and entertainment room"]',
 '["LEED Gold certified design", "Completed 2 weeks ahead of schedule", "15% under budget due to efficient planning", "Zero safety incidents during construction", "Featured in Architectural Digest India", "Winner of Best Residential Project 2024"]',
 'Rajesh Kumar & Family',
 true, true, 1,
 '["luxury", "residential", "smart-home", "eco-friendly", "villa", "kolkata"]',
 '["Smart Automation", "Solar Panels", "Rainwater Harvesting", "Home Automation", "Sustainable Design"]',
 'Modern Residential Villa Construction in Kolkata - B4 Brothers',
 'Luxury residential villa construction with smart home features and eco-friendly design in Kolkata by B4 Brothers Infratech.',
 CURRENT_TIMESTAMP),

('proj_' || EXTRACT(EPOCH FROM NOW()) || '_2',
 'Downtown Office Tower',
 'A 20-storey Class A office building featuring modern double-glass façade, LEED Gold certification, and an elegant concierge lobby with premium finishes. This commercial project demonstrates our capability in large-scale urban development.',
 'Commercial',
 'Salt Lake, Kolkata',
 '50,000 sq ft',
 '18 months',
 '₹8.5 Crores',
 2023,
 'completed',
 '["Double-glass façade for energy efficiency", "High-speed elevators with smart controls", "Central air conditioning with zone control", "Rooftop garden and recreational area", "Underground parking for 200+ vehicles", "Conference facilities and business center", "24/7 security systems", "Fiber optic network infrastructure"]',
 '["LEED Gold certified building", "Pre-leased to 95% capacity before completion", "Advanced fire safety and security systems", "Sustainable design reduces operational costs by 30%", "Featured in Commercial Architecture magazine", "Awarded Best Commercial Building 2023"]',
 'TechCorp Solutions Pvt Ltd',
 true, true, 2,
 '["commercial", "office-tower", "leed-certified", "sustainable", "salt-lake", "corporate"]',
 '["LEED Certification", "Smart Elevators", "Energy Management", "Building Automation", "Green Building"]',
 'Commercial Office Tower Construction in Salt Lake - B4 Brothers',
 'LEED Gold certified office tower construction with modern amenities in Salt Lake, Kolkata by B4 Brothers Infratech.',
 CURRENT_TIMESTAMP),

('proj_' || EXTRACT(EPOCH FROM NOW()) || '_3',
 'Historic Building Renovation',
 'Complete restoration of a 1920s heritage landmark building, including comprehensive seismic retrofitting and period-correct interior restoration. This project showcases our expertise in heritage conservation and restoration.',
 'Renovation',
 'Central Kolkata',
 '15,000 sq ft',
 '14 months',
 '₹3.2 Crores',
 2022,
 'completed',
 '["Heritage façade restoration with original materials", "Seismic retrofitting for modern safety standards", "Period-correct interior design and fixtures", "Modern utilities integrated seamlessly", "Accessibility features added per regulations", "Museum-quality restoration of decorative elements", "Climate-controlled preservation systems", "Restored original hardwood floors"]',
 '["Heritage conservation award winner", "Featured in architectural magazines", "Maintained 100% historical authenticity", "Now serves as a cultural heritage center", "ASI (Archaeological Survey of India) approved", "Tourism department recognition"]',
 'Kolkata Heritage Trust',
 true, true, 3,
 '["heritage", "renovation", "historic", "conservation", "restoration", "landmark"]',
 '["Heritage Conservation", "Seismic Retrofitting", "Period Restoration", "Historical Preservation", "Structural Strengthening"]',
 'Heritage Building Renovation in Central Kolkata - B4 Brothers',
 'Expert heritage building renovation and restoration services preserving historical authenticity in Central Kolkata.',
 CURRENT_TIMESTAMP),

('proj_' || EXTRACT(EPOCH FROM NOW()) || '_4',
 'Luxury Apartment Complex',
 'A premium 50-unit residential complex featuring rooftop amenities, fitness center, and secure underground parking with modern lifestyle facilities. This project represents our expertise in large-scale residential development.',
 'Residential',
 'New Town, Kolkata',
 '80,000 sq ft',
 '15 months',
 '₹12 Crores',
 2024,
 'completed',
 '["Rooftop infinity pool and landscaped gardens", "State-of-the-art fitness center and spa", "Clubhouse with party hall and gaming zone", "24/7 security with CCTV surveillance", "Underground parking with EV charging stations", "Children play area and senior citizen zone", "Rainwater harvesting system", "Solar power backup"]',
 '["100% units sold before possession", "Winner of Best Residential Project 2024", "Earthquake-resistant structure design", "Smart waste management system implemented", "IGBC Green Homes certified", "Zero construction accidents record"]',
 'New Town Developers Ltd',
 true, false, 4,
 '["luxury", "apartments", "amenities", "new-town", "residential-complex", "premium"]',
 '["EV Charging", "Smart Security", "Waste Management", "Green Building", "Solar Power"]',
 'Luxury Apartment Complex Construction in New Town - B4 Brothers',
 'Premium residential apartment complex with modern amenities and luxury facilities in New Town, Kolkata.',
 CURRENT_TIMESTAMP),

('proj_' || EXTRACT(EPOCH FROM NOW()) || '_5',
 'Industrial Warehouse Complex',
 'Large-scale LEED Silver-certified distribution center featuring automated storage and retrieval systems with climate-controlled environments. This project demonstrates our industrial construction capabilities.',
 'Industrial',
 'Durgapur Industrial Area',
 '100,000 sq ft',
 '12 months',
 '₹6.5 Crores',
 2021,
 'completed',
 '["Automated storage and retrieval systems", "Climate-controlled storage zones", "High-bay lighting with motion sensors", "Loading docks with hydraulic levelers", "Fire suppression and safety systems", "Office spaces and employee facilities", "Truck parking and maintenance area", "Quality control laboratories"]',
 '["LEED Silver certification achieved", "Automated systems increase efficiency by 60%", "Zero-accident construction record", "Operational cost savings of 25% annually", "Featured in Industrial Construction India", "State pollution control board certified"]',
 'LogiCorp Industries Private Limited',
 true, false, 5,
 '["industrial", "warehouse", "automated", "leed-silver", "distribution", "logistics"]',
 '["Automation Systems", "Climate Control", "LEED Certification", "Industrial Design", "Logistics Solutions"]',
 'Industrial Warehouse Construction in Durgapur - B4 Brothers',
 'LEED certified industrial warehouse construction with automated systems in Durgapur Industrial Area.',
 CURRENT_TIMESTAMP),

('proj_' || EXTRACT(EPOCH FROM NOW()) || '_6',
 'Boutique Hotel Renovation',
 'Complete renovation of a boutique hotel including lobby redesign, room upgrades, and modern amenities integration while maintaining the heritage charm of the property.',
 'Hospitality',
 'Park Street, Kolkata',
 '25,000 sq ft',
 '10 months',
 '₹4.8 Crores',
 2023,
 'completed',
 '["Luxury room redesign with modern amenities", "Grand lobby with marble flooring", "Rooftop restaurant and bar", "Spa and wellness center", "Conference halls with AV systems", "Upgraded electrical and plumbing", "Central air conditioning", "Heritage façade preservation"]',
 '["Increased hotel rating from 3-star to 5-star", "Featured in Hospitality Design magazine", "Heritage preservation award", "Increased occupancy rate by 75%", "TripAdvisor Certificate of Excellence", "Tourism board recognition"]',
 'Heritage Hotels Group',
 true, false, 6,
 '["hospitality", "hotel", "renovation", "luxury", "heritage", "park-street"]',
 '["Hotel Design", "Heritage Preservation", "Luxury Interiors", "Hospitality Solutions", "Modern Amenities"]',
 'Boutique Hotel Renovation in Park Street - B4 Brothers',
 'Luxury boutique hotel renovation preserving heritage charm while adding modern amenities in Park Street, Kolkata.',
 CURRENT_TIMESTAMP);

-- =========================
-- INSERT TESTIMONIALS DATA
-- =========================

INSERT INTO testimonials (id, name, about, post, rating, location, project_type, is_active, is_featured, verification_status, display_order, created_at) VALUES

('test_' || EXTRACT(EPOCH FROM NOW()) || '_1',
 'Rajesh Kumar',
 'B4 Brothers exceeded our expectations in every way. Their attention to detail and commitment to quality is unmatched. Our villa was completed on time and within budget, with exceptional craftsmanship throughout. The smart home features they integrated are simply amazing!',
 'Villa Owner & IT Professional',
 5, 'Kolkata', 'Residential Villa', true, true, 'verified', 1, CURRENT_TIMESTAMP),

('test_' || EXTRACT(EPOCH FROM NOW()) || '_2',
 'Priya Sharma',
 'The renovation of our heritage building was handled with utmost care and professionalism. B4 Brothers maintained the historical integrity while adding modern amenities. Their team of specialists understood the importance of preservation. Highly recommended!',
 'Heritage Trust Director',
 5, 'Central Kolkata', 'Heritage Renovation', true, true, 'verified', 2, CURRENT_TIMESTAMP),

('test_' || EXTRACT(EPOCH FROM NOW()) || '_3',
 'Amit Bhattacharya',
 'Outstanding work on our office tower project. The team was professional, efficient, and delivered a world-class building. The LEED certification was achieved without any hassles. Our employees love the modern workspace and amenities.',
 'CEO, TechCorp Solutions',
 5, 'Salt Lake', 'Commercial Tower', true, true, 'verified', 3, CURRENT_TIMESTAMP),

('test_' || EXTRACT(EPOCH FROM NOW()) || '_4',
 'Sunita Das',
 'We are extremely satisfied with our apartment complex project. The quality of construction, timely delivery, and after-sales service has been excellent. B4 Brothers is our go-to contractor for all future projects. The residents are very happy!',
 'Real Estate Developer',
 5, 'New Town', 'Residential Complex', true, false, 'verified', 4, CURRENT_TIMESTAMP),

('test_' || EXTRACT(EPOCH FROM NOW()) || '_5',
 'Ravi Agarwal',
 'The industrial warehouse project was completed with precision and efficiency. The automated systems integration was seamless. B4 Brothers understands industrial requirements perfectly and delivered exactly what we needed for our operations.',
 'Operations Manager, LogiCorp',
 4, 'Durgapur', 'Industrial Warehouse', true, false, 'verified', 5, CURRENT_TIMESTAMP),

('test_' || EXTRACT(EPOCH FROM NOW()) || '_6',
 'Meera Ghosh',
 'Excellent interior design work! They transformed our office space into a modern, functional workplace. The attention to detail and creative solutions impressed our entire team. The project was completed without disrupting our business operations.',
 'Office Manager',
 5, 'Park Street', 'Interior Design', true, false, 'verified', 6, CURRENT_TIMESTAMP),

('test_' || EXTRACT(EPOCH FROM NOW()) || '_7',
 'Dr. Ashok Mittal',
 'B4 Brothers built our dream home exactly as we envisioned. Their architectural suggestions improved our original plan significantly. The quality of materials used and workmanship is top-notch. We have been living here for 2 years now and love every aspect.',
 'Cardiologist & Home Owner',
 5, 'Ballygunge', 'Custom Home', true, true, 'verified', 7, CURRENT_TIMESTAMP),

('test_' || EXTRACT(EPOCH FROM NOW()) || '_8',
 'Kavita Sengupta',
 'The hotel renovation project was handled professionally. They completed the work in phases so we could keep operating. The new design has significantly improved our guest experience and ratings. Bookings have increased by 60% since the renovation.',
 'Hotel Manager',
 4, 'Park Street', 'Hotel Renovation', true, false, 'verified', 8, CURRENT_TIMESTAMP);

-- =========================
-- INSERT FORM SUBMISSIONS DATA
-- =========================

INSERT INTO form_submissions (id, type, form_data, status, priority, source, visitor_id, created_at) VALUES

('form_' || EXTRACT(EPOCH FROM NOW()) || '_1',
 'contact',
 '{"name": "Ankit Sharma", "email": "ankit.sharma@email.com", "phone": "+91 98765 43210", "service": "Building Construction", "budget": "₹15-50 Lakhs", "timeline": "3-6 Months", "message": "Looking to build a 3BHK house in Kolkata. Need detailed quote and timeline. Interested in modern design with eco-friendly features."}',
 'new', 'high', 'website', 'visitor_' || EXTRACT(EPOCH FROM NOW()) || '_1', CURRENT_TIMESTAMP - INTERVAL '2 days'),

('form_' || EXTRACT(EPOCH FROM NOW()) || '_2',
 'contact',
 '{"name": "Deepika Patel", "email": "deepika.patel@company.com", "phone": "+91 87654 32109", "service": "Commercial Construction", "budget": "Above ₹1 Crore", "timeline": "6-12 Months", "message": "Planning to build a commercial complex in New Town. Need consultation on design and planning. Looking for LEED certification."}',
 'contacted', 'high', 'website', 'visitor_' || EXTRACT(EPOCH FROM NOW()) || '_2', CURRENT_TIMESTAMP - INTERVAL '1 day'),

('form_' || EXTRACT(EPOCH FROM NOW()) || '_3',
 'contact',
 '{"name": "Rohit Mukherjee", "email": "rohit.m@gmail.com", "phone": "+91 76543 21098", "service": "Renovation Services", "budget": "₹5-15 Lakhs", "timeline": "1-3 Months", "message": "Need to renovate my old house. Looking for interior and exterior renovation. Want to add modern kitchen and bathrooms."}',
 'in_progress', 'medium', 'website', 'visitor_' || EXTRACT(EPOCH FROM NOW()) || '_3', CURRENT_TIMESTAMP - INTERVAL '3 hours'),

('form_' || EXTRACT(EPOCH FROM NOW()) || '_4',
 'career',
 '{"name": "Sanjay Kumar", "email": "sanjay.kumar@email.com", "phone": "+91 65432 10987", "position": "Site Engineer", "experience": "5 years", "message": "Experienced civil engineer looking for opportunities. Available for immediate joining. Have experience in residential and commercial projects."}',
 'new', 'medium', 'career_page', 'visitor_' || EXTRACT(EPOCH FROM NOW()) || '_4', CURRENT_TIMESTAMP - INTERVAL '1 hour'),

('form_' || EXTRACT(EPOCH FROM NOW()) || '_5',
 'quote',
 '{"name": "Kavya Singh", "email": "kavya.singh@business.com", "phone": "+91 54321 09876", "service": "Interior Design", "budget": "₹5-15 Lakhs", "timeline": "Flexible", "message": "Need complete interior design for new office space. 2000 sq ft area. Looking for modern professional look."}',
 'completed', 'low', 'referral', 'visitor_' || EXTRACT(EPOCH FROM NOW()) || '_5', CURRENT_TIMESTAMP - INTERVAL '5 days'),

('form_' || EXTRACT(EPOCH FROM NOW()) || '_6',
 'contact',
 '{"name": "Arjun Banerjee", "email": "arjun.b@email.com", "phone": "+91 98123 45678", "service": "Building Construction", "budget": "₹50 Lakhs - 1 Crore", "timeline": "6-12 Months", "message": "Want to build a duplex house. Have land in Rajarhat. Need complete construction service including design and permits."}',
 'contacted', 'high', 'website', 'visitor_' || EXTRACT(EPOCH FROM NOW()) || '_6', CURRENT_TIMESTAMP - INTERVAL '6 hours'),

('form_' || EXTRACT(EPOCH FROM NOW()) || '_7',
 'contact',
 '{"name": "Neha Gupta", "email": "neha.gupta@company.in", "phone": "+91 87123 98765", "service": "Commercial Construction", "budget": "₹15-50 Lakhs", "timeline": "3-6 Months", "message": "Planning to open a restaurant. Need complete construction and interior design. Location is in South Kolkata."}',
 'new', 'medium', 'website', 'visitor_' || EXTRACT(EPOCH FROM NOW()) || '_7', CURRENT_TIMESTAMP - INTERVAL '30 minutes'),

('form_' || EXTRACT(EPOCH FROM NOW()) || '_8',
 'career',
 '{"name": "Pooja Das", "email": "pooja.das@email.com", "phone": "+91 76123 45789", "position": "Interior Designer", "experience": "3 years", "message": "Interior designer with 3 years experience. Specialized in residential and commercial interiors. Looking for growth opportunities."}',
 'new', 'medium', 'career_page', 'visitor_' || EXTRACT(EPOCH FROM NOW()) || '_8', CURRENT_TIMESTAMP - INTERVAL '2 hours');

-- =========================
-- INSERT SERVICES DATA
-- =========================

INSERT INTO services (id, name, description, short_description, category, features, benefits, is_active, is_featured, display_order, created_at) VALUES

('service_' || EXTRACT(EPOCH FROM NOW()) || '_1', 
 'Building Construction', 
 'Complete building construction services from foundation to finishing with quality materials and expert workmanship. We handle residential, commercial, and industrial construction projects with attention to detail and commitment to excellence.',
 'End-to-end construction solutions', 
 'construction',
 '["Foundation and structural work", "Quality materials and workmanship", "Timely project completion", "Licensed and insured contractors", "Project management", "Quality assurance", "Safety compliance", "Modern construction techniques"]',
 '["Expert project management", "Cost-effective solutions", "24/7 customer support", "Quality guarantee", "Timely delivery", "Post-construction support", "Transparent pricing", "Professional team"]',
 true, true, 1, CURRENT_TIMESTAMP),

('service_' || EXTRACT(EPOCH FROM NOW()) || '_2', 
 'Renovation Services', 
 'Professional renovation and remodeling services for homes and offices with modern design solutions. We specialize in interior and exterior renovations, kitchen and bathroom remodeling, and heritage building restoration.',
 'Transform your space with expert renovation', 
 'renovation',
 '["Interior and exterior renovation", "Kitchen and bathroom remodeling", "Structural modifications", "Heritage building restoration", "Modern amenities integration", "Energy-efficient upgrades", "Space optimization", "Custom design solutions"]',
 '["Increased property value", "Modern amenities integration", "Energy-efficient upgrades", "Minimal disruption during work", "Custom design solutions", "Quality materials", "Expert craftsmanship", "Warranty coverage"]',
 true, true, 2, CURRENT_TIMESTAMP),

('service_' || EXTRACT(EPOCH FROM NOW()) || '_3', 
 'Design & Planning', 
 'Comprehensive architectural design and project planning services with 3D visualization and modern design solutions. Our team of architects and designers create functional and aesthetically pleasing spaces.',
 'Professional design and planning solutions', 
 'design',
 '["Architectural design", "Structural engineering", "Project planning and management", "3D visualization and modeling", "Building permits assistance", "Interior design", "Landscape design", "Sustainable design solutions"]',
 '["Optimized space utilization", "Code-compliant designs", "Cost-effective planning", "Future-ready solutions", "Professional execution", "Creative solutions", "Technical expertise", "Collaborative approach"]',
 true, true, 3, CURRENT_TIMESTAMP),

('service_' || EXTRACT(EPOCH FROM NOW()) || '_4', 
 'Interior Design', 
 'Creative interior design solutions for residential and commercial spaces with modern aesthetics and functional layouts. We create beautiful, comfortable, and productive environments.',
 'Beautiful and functional interior spaces', 
 'interior',
 '["Space planning and layout", "Material selection and sourcing", "Custom furniture design", "Lighting and electrical planning", "Color consultation", "Décor and accessories", "Project coordination", "Budget management"]',
 '["Enhanced aesthetics", "Improved functionality", "Personalized solutions", "Professional execution", "Value for money", "Quality materials", "Timely completion", "Design warranty"]',
 true, false, 4, CURRENT_TIMESTAMP),

('service_' || EXTRACT(EPOCH FROM NOW()) || '_5', 
 'Commercial Construction', 
 'Large-scale commercial construction projects for businesses and institutions including office buildings, retail spaces, hotels, and industrial facilities with modern amenities and sustainable design.',
 'Professional commercial construction', 
 'commercial',
 '["Office buildings and complexes", "Retail and hospitality spaces", "Industrial facilities", "Institutional buildings", "High-rise construction", "Modern amenities", "Sustainable design", "Safety systems"]',
 '["Scalable solutions", "Business-focused design", "Compliance with regulations", "Fast-track construction", "Modern amenities", "Energy efficiency", "Professional management", "Quality assurance"]',
 true, false, 5, CURRENT_TIMESTAMP),

('service_' || EXTRACT(EPOCH FROM NOW()) || '_6', 
 'Project Management', 
 'Comprehensive project management services ensuring timely completion, quality control, and budget management. Our experienced project managers coordinate all aspects of construction projects.',
 'Expert project management services', 
 'management',
 '["Project planning and scheduling", "Quality control and assurance", "Budget management and cost control", "Vendor and supplier coordination", "Safety management", "Progress monitoring", "Risk assessment", "Client communication"]',
 '["Timely project completion", "Budget control", "Quality assurance", "Risk mitigation", "Professional coordination", "Transparent reporting", "Efficient execution", "Client satisfaction"]',
 true, false, 6, CURRENT_TIMESTAMP);

-- =========================
-- INSERT ADDITIONAL CONFIGURATIONS
-- =========================

INSERT INTO configs (key, value, description, category, created_at) VALUES
('company_description', '"Leading construction company in West Bengal specializing in residential, commercial, and industrial projects with over 5 years of experience."', 'Company description for SEO', 'general', CURRENT_TIMESTAMP),
('business_address', '"123 Construction Street, Kolkata, West Bengal 700001"', 'Business address', 'contact', CURRENT_TIMESTAMP),
('business_hours', '{"monday": "9:00 AM - 6:00 PM", "tuesday": "9:00 AM - 6:00 PM", "wednesday": "9:00 AM - 6:00 PM", "thursday": "9:00 AM - 6:00 PM", "friday": "9:00 AM - 6:00 PM", "saturday": "9:00 AM - 4:00 PM", "sunday": "Emergency Only"}', 'Business operating hours', 'contact', CURRENT_TIMESTAMP),
('social_media', '{"facebook": "https://facebook.com/b4brothers", "instagram": "https://instagram.com/b4brothers", "linkedin": "https://linkedin.com/company/b4brothers", "youtube": "https://youtube.com/b4brothers", "twitter": "https://twitter.com/b4brothers"}', 'Social media links', 'social', CURRENT_TIMESTAMP),
('seo_keywords', '"construction company, building contractor, residential construction, commercial construction, West Bengal, Kolkata, renovation, interior design"', 'Default SEO keywords', 'seo', CURRENT_TIMESTAMP),
('notification_settings', '{"emailNotifications": true, "smsNotifications": false, "formSubmissionAlerts": true, "dailyReports": true}', 'Notification preferences', 'notifications', CURRENT_TIMESTAMP),
('company_stats', '{"projects_completed": 150, "clients_served": 200, "years_experience": 5, "team_members": 25}', 'Company statistics', 'general', CURRENT_TIMESTAMP),
('certifications', '["ISO 9001:2015", "LEED Certified", "Green Building Council Member", "Construction Industry Development Council"]', 'Company certifications', 'general', CURRENT_TIMESTAMP)
ON CONFLICT (key) DO NOTHING;

-- =========================
-- INSERT CONTACT INFORMATION
-- =========================

INSERT INTO contact_info (type, label, value, is_primary, is_active, display_order, created_at) VALUES
('phone', 'Primary Phone', '+91 97332 21114', true, true, 1, CURRENT_TIMESTAMP),
('phone', 'Office Phone', '+91 33 2345 6789', false, true, 2, CURRENT_TIMESTAMP),
('email', 'Primary Email', 'info@b4brothersinfratech.com', true, true, 1, CURRENT_TIMESTAMP),
('email', 'Projects Email', 'projects@b4brothersinfratech.com', false, true, 2, CURRENT_TIMESTAMP),
('email', 'Careers Email', 'careers@b4brothersinfratech.com', false, true, 3, CURRENT_TIMESTAMP),
('address', 'Head Office', '123 Construction Street, Kolkata, West Bengal 700001', true, true, 1, CURRENT_TIMESTAMP),
('address', 'Site Office', 'New Town Project Site, Rajarhat, Kolkata 700135', false, true, 2, CURRENT_TIMESTAMP),
('social', 'WhatsApp', 'https://wa.me/919733221114', true, true, 1, CURRENT_TIMESTAMP),
('social', 'Facebook', 'https://facebook.com/b4brothers', false, true, 2, CURRENT_TIMESTAMP),
('social', 'Instagram', 'https://instagram.com/b4brothers', false, true, 3, CURRENT_TIMESTAMP),
('social', 'LinkedIn', 'https://linkedin.com/company/b4brothers', false, true, 4, CURRENT_TIMESTAMP),
('hours', 'Monday-Friday', '9:00 AM - 6:00 PM', true, true, 1, CURRENT_TIMESTAMP),
('hours', 'Saturday', '9:00 AM - 4:00 PM', false, true, 2, CURRENT_TIMESTAMP),
('hours', 'Sunday', 'Emergency Only', false, true, 3, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

-- =========================
-- INSERT SAMPLE ANALYTICS DATA (Last 30 days)
-- =========================

DO $$
DECLARE
    i INTEGER;
    j INTEGER;
    event_date DATE;
    event_time TIMESTAMP;
    visitor_id TEXT;
    session_id TEXT;
    pages TEXT[] := ARRAY['/', '/projects', '/about', '/contact', '/career', '/services'];
    elements TEXT[] := ARRAY['Contact Button', 'WhatsApp Button', 'Quote Form', 'Call Button', 'Project Gallery', 'Service Card'];
    events_per_day INTEGER;
    form_types TEXT[] := ARRAY['contact', 'career', 'quote', 'newsletter'];
BEGIN
    FOR i IN 0..29 LOOP
        event_date := CURRENT_DATE - i;
        events_per_day := 15 + FLOOR(RANDOM() * 35); -- 15-50 events per day
        
        FOR j IN 1..events_per_day LOOP
            event_time := event_date + (RANDOM() * INTERVAL '24 hours');
            visitor_id := 'visitor_' || i || '_' || j || '_' || SUBSTRING(MD5(RANDOM()::TEXT), 1, 9);
            session_id := 'session_' || i || '_' || j || '_' || SUBSTRING(MD5(RANDOM()::TEXT), 1, 9);
            
            -- Insert page view (always)
            INSERT INTO analytics (visitor_id, session_id, event_type, event_data, user_agent, ip_address, timestamp)
            VALUES (
                visitor_id,
                session_id,
                'pageview',
                ('{"page": "' || pages[1 + FLOOR(RANDOM() * 6)] || '"}')::jsonb,
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                ('192.168.' || FLOOR(RANDOM() * 255) || '.' || FLOOR(RANDOM() * 255))::inet,
                event_time
            );
            
            -- Random chance for click event (40%)
            IF RANDOM() > 0.6 THEN
                INSERT INTO analytics (visitor_id, session_id, event_type, event_data, user_agent, ip_address, timestamp)
                VALUES (
                    visitor_id,
                    session_id,
                    'click',
                    ('{"element": "' || elements[1 + FLOOR(RANDOM() * 6)] || '", "location": "' || pages[1 + FLOOR(RANDOM() * 6)] || '"}')::jsonb,
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    ('192.168.' || FLOOR(RANDOM() * 255) || '.' || FLOOR(RANDOM() * 255))::inet,
                    event_time + INTERVAL '1 minute' * RANDOM() * 10
                );
            END IF;
            
            -- Random chance for WhatsApp redirect (5%)
            IF RANDOM() > 0.95 THEN
                INSERT INTO analytics (visitor_id, session_id, event_type, event_data, user_agent, ip_address, timestamp)
                VALUES (
                    visitor_id,
                    session_id,
                    'whatsapp_redirect',
                    '{"message": "Hi B4Brothers! I am interested in your construction services.", "formData": null}'::jsonb,
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    ('192.168.' || FLOOR(RANDOM() * 255) || '.' || FLOOR(RANDOM() * 255))::inet,
                    event_time + INTERVAL '1 minute' * RANDOM() * 20
                );
            END IF;
            
            -- Random chance for form submission tracking (3%)
            IF RANDOM() > 0.97 THEN
                INSERT INTO analytics (visitor_id, session_id, event_type, event_data, user_agent, ip_address, timestamp)
                VALUES (
                    visitor_id,
                    session_id,
                    'form_submission',
                    ('{"formType": "' || form_types[1 + FLOOR(RANDOM() * 4)] || '", "formData": {"name": "Sample User", "email": "user@example.com"}}')::jsonb,
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    ('192.168.' || FLOOR(RANDOM() * 255) || '.' || FLOOR(RANDOM() * 255))::inet,
                    event_time + INTERVAL '1 minute' * RANDOM() * 30
                );
            END IF;
        END LOOP;
    END LOOP;
END $$;

-- =========================
-- VERIFY DATA INSERTION
-- =========================

DO $$
BEGIN
    RAISE NOTICE '=================================';
    RAISE NOTICE 'B4 Brothers Database Setup Complete!';
    RAISE NOTICE '=================================';
    RAISE NOTICE 'Projects: %', (SELECT COUNT(*) FROM projects);
    RAISE NOTICE 'Testimonials: %', (SELECT COUNT(*) FROM testimonials);
    RAISE NOTICE 'Form Submissions: %', (SELECT COUNT(*) FROM form_submissions);
    RAISE NOTICE 'Services: %', (SELECT COUNT(*) FROM services);
    RAISE NOTICE 'Configs: %', (SELECT COUNT(*) FROM configs);
    RAISE NOTICE 'Contact Info: %', (SELECT COUNT(*) FROM contact_info);
    RAISE NOTICE 'Analytics Events: %', (SELECT COUNT(*) FROM analytics);
    RAISE NOTICE '=================================';
    RAISE NOTICE 'Admin Login: username=admin, password=b4brothers2024';
    RAISE NOTICE 'Test API at: http://localhost:5000/test-api.html';
    RAISE NOTICE '=================================';
END $$;

COMMIT;
