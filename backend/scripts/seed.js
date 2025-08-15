// PostgreSQL Dummy Data Seed Script for B4 Brothers Backend
const { Pool } = require('pg');
require('dotenv').config();

// PostgreSQL connection
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'b4brothers',
    password: process.env.DB_PASSWORD || 'password',
    port: process.env.DB_PORT || 5432,
});

// Generate unique ID
const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
};

async function seedDatabase() {
    let client;
    try {
        console.log('🔗 Connecting to PostgreSQL...');
        client = await pool.connect();
        
        console.log('📁 Connected to PostgreSQL for seeding');

        // Seed projects
        await seedProjects(client);
        
        // Seed testimonials
        await seedTestimonials(client);
        
        // Seed form submissions
        await seedFormSubmissions(client);
        
        // Seed analytics data
        await seedAnalytics(client);
        
        // Seed news/blog posts
        await seedNews(client);
        
        console.log('✅ Database seeding completed successfully!');
        
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    } finally {
        if (client) {
            client.release();
        }
        await pool.end();
        console.log('📁 Database connection closed');
    }
}

async function seedProjects(client) {
    try {
        const existingProjects = await client.query('SELECT COUNT(*) FROM projects');
        if (parseInt(existingProjects.rows[0].count) > 0) {
            console.log('🏗️ Projects already exist, skipping...');
            return;
        }

        console.log('🏗️ Seeding projects...');

        const projects = [
            {
                id: generateId(),
                title: 'Modern Residential Villa',
                description: 'A luxurious 5,000 sq ft villa featuring contemporary architecture, open-plan living spaces, green roof terraces, and a comprehensive smart-home automation system.',
                category: 'Residential',
                location: 'Kolkata, West Bengal',
                area: '5,000 sq ft',
                duration: '8 months',
                budget: '₹1.2 Crores',
                year: 2024,
                status: 'completed',
                features: [
                    'Smart home automation system',
                    'Green roof terraces with rainwater harvesting',
                    'Open-plan living with floor-to-ceiling windows',
                    'Energy-efficient LED lighting throughout',
                    'Premium marble flooring and wooden accents',
                    'Modular kitchen with imported appliances'
                ],
                highlights: [
                    'LEED Gold certified design',
                    'Completed 2 weeks ahead of schedule',
                    '15% under budget due to efficient planning',
                    'Zero safety incidents during construction'
                ],
                clientName: 'Rajesh Kumar',
                isActive: true,
                isFeatured: true,
                order: 1,
                tags: ['luxury', 'residential', 'smart-home', 'eco-friendly'],
                technologies: ['Smart Automation', 'Solar Panels', 'Rainwater Harvesting'],
                seoTitle: 'Modern Residential Villa Construction in Kolkata',
                seoDescription: 'Luxury residential villa construction with smart home features and eco-friendly design in Kolkata.'
            },
            {
                id: generateId(),
                title: 'Downtown Office Tower',
                description: 'A 20-storey Class A office building featuring modern double-glass façade, LEED Gold certification, and an elegant concierge lobby with premium finishes.',
                category: 'Commercial',
                location: 'Salt Lake, Kolkata',
                area: '50,000 sq ft',
                duration: '18 months',
                budget: '₹8.5 Crores',
                year: 2023,
                status: 'completed',
                features: [
                    'Double-glass façade for energy efficiency',
                    'High-speed elevators with smart controls',
                    'Central air conditioning with zone control',
                    'Rooftop garden and recreational area',
                    'Underground parking for 200+ vehicles',
                    'Conference facilities and business center'
                ],
                highlights: [
                    'LEED Gold certified building',
                    'Pre-leased to 95% capacity before completion',
                    'Advanced fire safety and security systems',
                    'Sustainable design reduces operational costs by 30%'
                ],
                clientName: 'TechCorp Solutions',
                isActive: true,
                isFeatured: true,
                order: 2,
                tags: ['commercial', 'office-tower', 'leed-certified', 'sustainable'],
                technologies: ['LEED Certification', 'Smart Elevators', 'Energy Management'],
                seoTitle: 'Commercial Office Tower Construction in Salt Lake',
                seoDescription: 'LEED Gold certified office tower construction with modern amenities in Salt Lake, Kolkata.'
            },
            {
                id: generateId(),
                title: 'Historic Building Renovation',
                description: 'Complete restoration of a 1920s heritage landmark building, including comprehensive seismic retrofitting and period-correct interior restoration.',
                category: 'Renovation',
                location: 'Central Kolkata',
                area: '15,000 sq ft',
                duration: '14 months',
                budget: '₹3.2 Crores',
                year: 2022,
                status: 'completed',
                features: [
                    'Heritage façade restoration with original materials',
                    'Seismic retrofitting for modern safety standards',
                    'Period-correct interior design and fixtures',
                    'Modern utilities integrated seamlessly',
                    'Accessibility features added per regulations',
                    'Museum-quality restoration of decorative elements'
                ],
                highlights: [
                    'Heritage conservation award winner',
                    'Featured in architectural magazines',
                    'Maintained 100% historical authenticity',
                    'Now serves as a cultural heritage center'
                ],
                clientName: 'Kolkata Heritage Trust',
                isActive: true,
                isFeatured: true,
                order: 3,
                tags: ['heritage', 'renovation', 'historic', 'conservation'],
                technologies: ['Heritage Conservation', 'Seismic Retrofitting', 'Period Restoration'],
                seoTitle: 'Heritage Building Renovation in Central Kolkata',
                seoDescription: 'Expert heritage building renovation and restoration services preserving historical authenticity.'
            },
            {
                id: generateId(),
                title: 'Luxury Apartment Complex',
                description: 'A premium 50-unit residential complex featuring rooftop amenities, fitness center, and secure underground parking with modern lifestyle facilities.',
                category: 'Residential',
                location: 'New Town, Kolkata',
                area: '80,000 sq ft',
                duration: '15 months',
                budget: '₹12 Crores',
                year: 2024,
                status: 'completed',
                features: [
                    'Rooftop infinity pool and landscaped gardens',
                    'State-of-the-art fitness center and spa',
                    'Clubhouse with party hall and gaming zone',
                    '24/7 security with CCTV surveillance',
                    'Underground parking with EV charging stations',
                    'Children\'s play area and senior citizen zone'
                ],
                highlights: [
                    '100% units sold before possession',
                    'Winner of Best Residential Project 2024',
                    'Earthquake-resistant structure design',
                    'Smart waste management system implemented'
                ],
                clientName: 'New Town Developers',
                isActive: true,
                isFeatured: false,
                order: 4,
                tags: ['luxury', 'apartments', 'amenities', 'new-town'],
                technologies: ['EV Charging', 'Smart Security', 'Waste Management'],
                seoTitle: 'Luxury Apartment Complex Construction in New Town',
                seoDescription: 'Premium residential apartment complex with modern amenities and luxury facilities in New Town, Kolkata.'
            },
            {
                id: generateId(),
                title: 'Industrial Warehouse Complex',
                description: 'Large-scale LEED Silver-certified distribution center featuring automated storage and retrieval systems with climate-controlled environments.',
                category: 'Industrial',
                location: 'Durgapur Industrial Area',
                area: '100,000 sq ft',
                duration: '12 months',
                budget: '₹6.5 Crores',
                year: 2021,
                status: 'completed',
                features: [
                    'Automated storage and retrieval systems',
                    'Climate-controlled storage zones',
                    'High-bay lighting with motion sensors',
                    'Loading docks with hydraulic levelers',
                    'Fire suppression and safety systems',
                    'Office spaces and employee facilities'
                ],
                highlights: [
                    'LEED Silver certification achieved',
                    'Automated systems increase efficiency by 60%',
                    'Zero-accident construction record',
                    'Operational cost savings of 25% annually'
                ],
                clientName: 'LogiCorp Industries',
                isActive: true,
                isFeatured: false,
                order: 5,
                tags: ['industrial', 'warehouse', 'automated', 'leed-silver'],
                technologies: ['Automation Systems', 'Climate Control', 'LEED Certification'],
                seoTitle: 'Industrial Warehouse Construction in Durgapur',
                seoDescription: 'LEED certified industrial warehouse construction with automated systems in Durgapur Industrial Area.'
            }
        ];

        for (const project of projects) {
            await client.query(
                `INSERT INTO projects (
                    id, title, description, category, location, area, duration, budget, year, status,
                    features, highlights, client_name, is_active, is_featured, display_order,
                    tags, technologies, seo_title, seo_description, created_at
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, CURRENT_TIMESTAMP)`,
                [
                    project.id, project.title, project.description, project.category,
                    project.location, project.area, project.duration, project.budget,
                    project.year, project.status, JSON.stringify(project.features),
                    JSON.stringify(project.highlights), project.clientName, project.isActive,
                    project.isFeatured, project.order, JSON.stringify(project.tags),
                    JSON.stringify(project.technologies), project.seoTitle, project.seoDescription
                ]
            );
        }

        console.log('✅ Sample projects seeded successfully');
    } catch (error) {
        console.error('❌ Error seeding projects:', error);
        throw error;
    }
}

async function seedTestimonials(client) {
    try {
        const existingTestimonials = await client.query('SELECT COUNT(*) FROM testimonials');
        if (parseInt(existingTestimonials.rows[0].count) > 0) {
            console.log('💬 Testimonials already exist, skipping...');
            return;
        }

        console.log('💬 Seeding testimonials...');

        const testimonials = [
            {
                id: generateId(),
                name: 'Rajesh Kumar',
                about: 'B4 Brothers exceeded our expectations in every way. Their attention to detail and commitment to quality is unmatched. Our villa was completed on time and within budget, with exceptional craftsmanship throughout.',
                post: 'Villa Owner',
                rating: 5,
                location: 'Kolkata',
                projectType: 'Residential Villa',
                isActive: true,
                isFeatured: true,
                verificationStatus: 'verified',
                order: 1
            },
            {
                id: generateId(),
                name: 'Priya Sharma',
                about: 'The renovation of our heritage building was handled with utmost care and professionalism. B4 Brothers maintained the historical integrity while adding modern amenities. Highly recommended!',
                post: 'Heritage Trust Director',
                rating: 5,
                location: 'Central Kolkata',
                projectType: 'Heritage Renovation',
                isActive: true,
                isFeatured: true,
                verificationStatus: 'verified',
                order: 2
            },
            {
                id: generateId(),
                name: 'Amit Bhattacharya',
                about: 'Outstanding work on our office tower project. The team was professional, efficient, and delivered a world-class building. The LEED certification was achieved without any hassles.',
                post: 'TechCorp CEO',
                rating: 5,
                location: 'Salt Lake',
                projectType: 'Commercial Tower',
                isActive: true,
                isFeatured: true,
                verificationStatus: 'verified',
                order: 3
            },
            {
                id: generateId(),
                name: 'Sunita Das',
                about: 'We are extremely satisfied with our apartment complex project. The quality of construction, timely delivery, and after-sales service has been excellent. B4 Brothers is our go-to contractor.',
                post: 'Real Estate Developer',
                rating: 5,
                location: 'New Town',
                projectType: 'Residential Complex',
                isActive: true,
                isFeatured: false,
                verificationStatus: 'verified',
                order: 4
            },
            {
                id: generateId(),
                name: 'Ravi Agarwal',
                about: 'The industrial warehouse project was completed with precision and efficiency. The automated systems integration was seamless. B4 Brothers understands industrial requirements perfectly.',
                post: 'LogiCorp Operations Manager',
                rating: 4,
                location: 'Durgapur',
                projectType: 'Industrial Warehouse',
                isActive: true,
                isFeatured: false,
                verificationStatus: 'verified',
                order: 5
            },
            {
                id: generateId(),
                name: 'Meera Ghosh',
                about: 'Excellent interior design work! They transformed our office space into a modern, functional workplace. The attention to detail and creative solutions impressed our entire team.',
                post: 'Office Manager',
                rating: 5,
                location: 'Park Street',
                projectType: 'Interior Design',
                isActive: true,
                isFeatured: false,
                verificationStatus: 'verified',
                order: 6
            }
        ];

        for (const testimonial of testimonials) {
            await client.query(
                `INSERT INTO testimonials (
                    id, name, about, post, rating, location, project_type,
                    is_active, is_featured, verification_status, display_order, created_at
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, CURRENT_TIMESTAMP)`,
                [
                    testimonial.id, testimonial.name, testimonial.about, testimonial.post,
                    testimonial.rating, testimonial.location, testimonial.projectType,
                    testimonial.isActive, testimonial.isFeatured, testimonial.verificationStatus,
                    testimonial.order
                ]
            );
        }

        console.log('✅ Sample testimonials seeded successfully');
    } catch (error) {
        console.error('❌ Error seeding testimonials:', error);
        throw error;
    }
}

async function seedFormSubmissions(client) {
    try {
        const existingSubmissions = await client.query('SELECT COUNT(*) FROM form_submissions');
        if (parseInt(existingSubmissions.rows[0].count) > 0) {
            console.log('📋 Form submissions already exist, skipping...');
            return;
        }

        console.log('📋 Seeding form submissions...');

        const formSubmissions = [
            {
                id: generateId(),
                type: 'contact',
                formData: {
                    name: 'Ankit Sharma',
                    email: 'ankit.sharma@email.com',
                    phone: '+91 98765 43210',
                    service: 'Building Construction',
                    budget: '₹15-50 Lakhs',
                    timeline: '3-6 Months',
                    message: 'Looking to build a 3BHK house in Kolkata. Need detailed quote and timeline.'
                },
                status: 'new',
                priority: 'high',
                source: 'website',
                visitorId: 'visitor_' + Date.now() + '_1'
            },
            {
                id: generateId(),
                type: 'contact',
                formData: {
                    name: 'Deepika Patel',
                    email: 'deepika.patel@company.com',
                    phone: '+91 87654 32109',
                    service: 'Commercial Construction',
                    budget: 'Above ₹1 Crore',
                    timeline: '6-12 Months',
                    message: 'Planning to build a commercial complex. Need consultation on design and planning.'
                },
                status: 'contacted',
                priority: 'high',
                source: 'website',
                visitorId: 'visitor_' + Date.now() + '_2'
            },
            {
                id: generateId(),
                type: 'contact',
                formData: {
                    name: 'Rohit Mukherjee',
                    email: 'rohit.m@gmail.com',
                    phone: '+91 76543 21098',
                    service: 'Renovation Services',
                    budget: '₹5-15 Lakhs',
                    timeline: '1-3 Months',
                    message: 'Need to renovate my old house. Looking for interior and exterior renovation.'
                },
                status: 'in_progress',
                priority: 'medium',
                source: 'website',
                visitorId: 'visitor_' + Date.now() + '_3'
            },
            {
                id: generateId(),
                type: 'career',
                formData: {
                    name: 'Sanjay Kumar',
                    email: 'sanjay.kumar@email.com',
                    phone: '+91 65432 10987',
                    position: 'Site Engineer',
                    experience: '5 years',
                    message: 'Experienced civil engineer looking for opportunities. Available for immediate joining.'
                },
                status: 'new',
                priority: 'medium',
                source: 'career_page',
                visitorId: 'visitor_' + Date.now() + '_4'
            },
            {
                id: generateId(),
                type: 'quote',
                formData: {
                    name: 'Kavya Singh',
                    email: 'kavya.singh@business.com',
                    phone: '+91 54321 09876',
                    service: 'Interior Design',
                    budget: '₹5-15 Lakhs',
                    timeline: 'Flexible',
                    message: 'Need complete interior design for new office space. 2000 sq ft area.'
                },
                status: 'completed',
                priority: 'low',
                source: 'referral',
                visitorId: 'visitor_' + Date.now() + '_5'
            }
        ];

        for (const submission of formSubmissions) {
            await client.query(
                `INSERT INTO form_submissions (
                    id, type, form_data, status, priority, source, visitor_id, created_at
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP)`,
                [
                    submission.id, submission.type, JSON.stringify(submission.formData),
                    submission.status, submission.priority, submission.source, submission.visitorId
                ]
            );
        }

        console.log('✅ Sample form submissions seeded successfully');
    } catch (error) {
        console.error('❌ Error seeding form submissions:', error);
        throw error;
    }
}

async function seedAnalytics(client) {
    try {
        const existingAnalytics = await client.query('SELECT COUNT(*) FROM analytics');
        if (parseInt(existingAnalytics.rows[0].count) > 0) {
            console.log('📊 Analytics data already exists, skipping...');
            return;
        }

        console.log('📊 Seeding analytics data...');

        const pages = ['/', '/projects', '/about', '/contact', '/career'];
        const elements = ['Contact Button', 'WhatsApp Button', 'Quote Form', 'Call Button'];
        
        // Generate last 30 days of data
        const now = new Date();
        for (let i = 0; i < 30; i++) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            
            // Generate 10-50 random events per day
            const eventsPerDay = Math.floor(Math.random() * 40) + 10;
            
            for (let j = 0; j < eventsPerDay; j++) {
                const eventTime = new Date(date);
                eventTime.setHours(Math.floor(Math.random() * 24));
                eventTime.setMinutes(Math.floor(Math.random() * 60));
                
                const visitorId = `visitor_${i}_${j}_${Math.random().toString(36).substr(2, 9)}`;
                const sessionId = `session_${i}_${j}_${Math.random().toString(36).substr(2, 9)}`;
                
                // Page view
                await client.query(
                    `INSERT INTO analytics (visitor_id, session_id, event_type, event_data, user_agent, ip_address, timestamp)
                     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                    [
                        visitorId,
                        sessionId,
                        'pageview',
                        JSON.stringify({ page: pages[Math.floor(Math.random() * pages.length)] }),
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                        `192.168.1.${Math.floor(Math.random() * 255)}`,
                        eventTime
                    ]
                );
                
                // Random chance for other events
                if (Math.random() > 0.7) {
                    const clickTime = new Date(eventTime.getTime() + Math.random() * 600000); // Within 10 minutes
                    await client.query(
                        `INSERT INTO analytics (visitor_id, session_id, event_type, event_data, user_agent, ip_address, timestamp)
                         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                        [
                            visitorId,
                            sessionId,
                            'click',
                            JSON.stringify({
                                element: elements[Math.floor(Math.random() * elements.length)],
                                location: pages[Math.floor(Math.random() * pages.length)]
                            }),
                            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                            `192.168.1.${Math.floor(Math.random() * 255)}`,
                            clickTime
                        ]
                    );
                }
                
                if (Math.random() > 0.9) {
                    const whatsappTime = new Date(eventTime.getTime() + Math.random() * 1200000); // Within 20 minutes
                    await client.query(
                        `INSERT INTO analytics (visitor_id, session_id, event_type, event_data, user_agent, ip_address, timestamp)
                         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                        [
                            visitorId,
                            sessionId,
                            'whatsapp_redirect',
                            JSON.stringify({
                                message: 'Hi B4Brothers! I\'m interested in your services.',
                                formData: null
                            }),
                            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                            `192.168.1.${Math.floor(Math.random() * 255)}`,
                            whatsappTime
                        ]
                    );
                }
            }
        }

        console.log('✅ Sample analytics data seeded successfully');
    } catch (error) {
        console.error('❌ Error seeding analytics:', error);
        throw error;
    }
}

async function seedNews(client) {
    try {
        const existingNews = await client.query('SELECT COUNT(*) FROM news');
        if (parseInt(existingNews.rows[0].count) > 0) {
            console.log('📰 News articles already exist, skipping...');
            return;
        }

        console.log('📰 Seeding news articles...');

        const newsArticles = [
            {
                id: generateId(),
                title: 'B4 Brothers Completes Largest Commercial Project in Salt Lake',
                content: 'We are proud to announce the successful completion of our largest commercial project to date - a 20-storey office tower in Salt Lake, Kolkata. The project, spanning 50,000 sq ft, features modern amenities and has achieved LEED Gold certification.\n\nThe building incorporates cutting-edge sustainable technologies and has been pre-leased to 95% capacity even before completion. This achievement marks a significant milestone in our commitment to delivering world-class commercial infrastructure.',
                excerpt: 'B4 Brothers successfully completes 20-storey LEED Gold certified office tower in Salt Lake, marking our largest commercial project.',
                category: 'project_update',
                isPublished: true,
                publishDate: new Date('2024-01-15'),
                tags: ['commercial', 'leed-certified', 'salt-lake', 'milestone'],
                readTime: 3,
                views: 1250
            },
            {
                id: generateId(),
                title: 'New Sustainable Construction Practices Adopted',
                content: 'B4 Brothers is leading the way in sustainable construction practices across West Bengal. We have recently adopted new eco-friendly technologies and materials that reduce our carbon footprint by 40%.\n\nOur latest projects now feature rainwater harvesting systems, solar panels, and energy-efficient building materials. These initiatives not only help the environment but also provide long-term cost savings for our clients.',
                excerpt: 'B4 Brothers adopts new sustainable construction practices, reducing carbon footprint by 40% in latest projects.',
                category: 'company_news',
                isPublished: true,
                publishDate: new Date('2024-01-10'),
                tags: ['sustainability', 'eco-friendly', 'innovation', 'environment'],
                readTime: 4,
                views: 890
            },
            {
                id: generateId(),
                title: 'Heritage Building Restoration Wins Conservation Award',
                content: 'Our recent heritage building restoration project in Central Kolkata has been recognized with the Regional Heritage Conservation Award. The 1920s landmark building was restored to its original glory while incorporating modern safety features.\n\nThe project involved meticulous research, period-correct materials, and specialized craftsmen to ensure historical authenticity. The building now serves as a cultural heritage center and stands as a testament to our expertise in heritage conservation.',
                excerpt: 'B4 Brothers heritage restoration project wins Regional Heritage Conservation Award for maintaining historical authenticity.',
                category: 'company_news',
                isPublished: true,
                publishDate: new Date('2023-12-20'),
                tags: ['heritage', 'conservation', 'award', 'restoration'],
                readTime: 5,
                views: 2100
            }
        ];

        for (const article of newsArticles) {
            await client.query(
                `INSERT INTO news (
                    id, title, content, excerpt, category, is_published, publish_date,
                    tags, read_time, views, created_at
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, CURRENT_TIMESTAMP)`,
                [
                    article.id, article.title, article.content, article.excerpt,
                    article.category, article.isPublished, article.publishDate,
                    JSON.stringify(article.tags), article.readTime, article.views
                ]
            );
        }

        console.log('✅ Sample news articles seeded successfully');
    } catch (error) {
        console.error('❌ Error seeding news:', error);
        throw error;
    }
}

// Run seeding if called directly
if (require.main === module) {
    seedDatabase();
}

module.exports = seedDatabase;
