// Dummy Data Seed Script for B4 Brothers Backend
const mongoose = require('mongoose');
require('dotenv').config();

// Import all models (assuming they're in a models directory)
const Project = require('../models/Project');
const Testimonial = require('../models/Testimonial');
const FormSubmission = require('../models/FormSubmission');
const Analytics = require('../models/Analytics');
const News = require('../models/News');

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/b4brothers', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log('📁 Connected to MongoDB for seeding');

        // Seed projects
        await seedProjects();
        
        // Seed testimonials
        await seedTestimonials();
        
        // Seed form submissions
        await seedFormSubmissions();
        
        // Seed analytics data
        await seedAnalytics();
        
        // Seed news/blog posts
        await seedNews();
        
        console.log('✅ Database seeding completed successfully!');
        
    } catch (error) {
        console.error('❌ Seeding failed:', error);
    } finally {
        await mongoose.disconnect();
        console.log('📁 Database connection closed');
    }
}

async function seedProjects() {
    try {
        const existingProjects = await Project.countDocuments();
        if (existingProjects > 0) {
            console.log('🏗️ Projects already exist, skipping...');
            return;
        }

        const projects = [
            {
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

        await Project.insertMany(projects);
        console.log('🏗️ Sample projects seeded successfully');
    } catch (error) {
        console.error('❌ Error seeding projects:', error);
    }
}

async function seedTestimonials() {
    try {
        const existingTestimonials = await Testimonial.countDocuments();
        if (existingTestimonials > 0) {
            console.log('💬 Testimonials already exist, skipping...');
            return;
        }

        const testimonials = [
            {
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

        await Testimonial.insertMany(testimonials);
        console.log('💬 Sample testimonials seeded successfully');
    } catch (error) {
        console.error('❌ Error seeding testimonials:', error);
    }
}

async function seedFormSubmissions() {
    try {
        const existingSubmissions = await FormSubmission.countDocuments();
        if (existingSubmissions > 0) {
            console.log('📋 Form submissions already exist, skipping...');
            return;
        }

        const formSubmissions = [
            {
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

        await FormSubmission.insertMany(formSubmissions);
        console.log('📋 Sample form submissions seeded successfully');
    } catch (error) {
        console.error('❌ Error seeding form submissions:', error);
    }
}

async function seedAnalytics() {
    try {
        const existingAnalytics = await Analytics.countDocuments();
        if (existingAnalytics > 0) {
            console.log('📊 Analytics data already exists, skipping...');
            return;
        }

        const analyticsData = [];
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
                analyticsData.push({
                    visitorId,
                    sessionId,
                    eventType: 'pageview',
                    eventData: {
                        page: pages[Math.floor(Math.random() * pages.length)]
                    },
                    timestamp: eventTime,
                    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`
                });
                
                // Random chance for other events
                if (Math.random() > 0.7) {
                    analyticsData.push({
                        visitorId,
                        sessionId,
                        eventType: 'click',
                        eventData: {
                            element: elements[Math.floor(Math.random() * elements.length)],
                            location: pages[Math.floor(Math.random() * pages.length)]
                        },
                        timestamp: new Date(eventTime.getTime() + Math.random() * 600000), // Within 10 minutes
                        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                        ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`
                    });
                }
                
                if (Math.random() > 0.9) {
                    analyticsData.push({
                        visitorId,
                        sessionId,
                        eventType: 'whatsapp_redirect',
                        eventData: {
                            message: 'Hi B4Brothers! I\'m interested in your services.',
                            formData: null
                        },
                        timestamp: new Date(eventTime.getTime() + Math.random() * 1200000), // Within 20 minutes
                        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                        ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`
                    });
                }
            }
        }

        await Analytics.insertMany(analyticsData);
        console.log('📊 Sample analytics data seeded successfully');
    } catch (error) {
        console.error('❌ Error seeding analytics:', error);
    }
}

async function seedNews() {
    try {
        const existingNews = await News.countDocuments();
        if (existingNews > 0) {
            console.log('📰 News articles already exist, skipping...');
            return;
        }

        const newsArticles = [
            {
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
                title: 'Heritage Building Restoration Wins Conservation Award',
                content: 'Our recent heritage building restoration project in Central Kolkata has been recognized with the Regional Heritage Conservation Award. The 1920s landmark building was restored to its original glory while incorporating modern safety features.\n\nThe project involved meticulous research, period-correct materials, and specialized craftsmen to ensure historical authenticity. The building now serves as a cultural heritage center and stands as a testament to our expertise in heritage conservation.',
                excerpt: 'B4 Brothers heritage restoration project wins Regional Heritage Conservation Award for maintaining historical authenticity.',
                category: 'company_news',
                isPublished: true,
                publishDate: new Date('2023-12-20'),
                tags: ['heritage', 'conservation', 'award', 'restoration'],
                readTime: 5,
                views: 2100
            },
            {
                title: '5 Tips for Planning Your Dream Home Construction',
                content: 'Building your dream home is an exciting journey, but proper planning is crucial for success. Here are our top 5 tips:\n\n1. Set a realistic budget with 10-15% contingency\n2. Choose the right location considering future development\n3. Hire experienced architects and contractors\n4. Focus on functionality along with aesthetics\n5. Plan for future needs and expansion\n\nAt B4 Brothers, we guide our clients through every step of the construction process, ensuring their dream home becomes a reality within budget and timeline.',
                excerpt: 'Expert tips from B4 Brothers on planning your dream home construction project for best results.',
                category: 'tips',
                isPublished: true,
                publishDate: new Date('2024-01-05'),
                tags: ['home-construction', 'planning', 'tips', 'advice'],
                readTime: 6,
                views: 1680
            },
            {
                title: 'Construction Industry Trends 2024',
                content: 'The construction industry is evolving rapidly with new technologies and sustainable practices. Key trends for 2024 include:\n\n- Smart home automation becoming standard\n- Increased focus on energy efficiency\n- Use of eco-friendly building materials\n- Integration of IoT in construction management\n- Modular and prefabricated construction methods\n\nB4 Brothers stays ahead of these trends to provide cutting-edge solutions to our clients.',
                excerpt: 'Explore the latest construction industry trends for 2024 and how B4 Brothers is adapting to deliver modern solutions.',
                category: 'industry_news',
                isPublished: true,
                publishDate: new Date('2024-01-01'),
                tags: ['trends', 'technology', 'industry', '2024'],
                readTime: 4,
                views: 945
            }
        ];

        await News.insertMany(newsArticles);
        console.log('📰 Sample news articles seeded successfully');
    } catch (error) {
        console.error('❌ Error seeding news:', error);
    }
}

// Run seeding if called directly
if (require.main === module) {
    seedDatabase();
}

module.exports = seedDatabase;
