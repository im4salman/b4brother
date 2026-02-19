// src/export.js

import building from "../src/assets/building.svg";
import construction from "../src/assets/construction.svg";
import design from "../src/assets/design.svg";
import document from "../src/assets/document.svg";
import paint from "../src/assets/paint.svg";
import support from "../src/assets/support.svg";

import { IoDocumentTextSharp } from "react-icons/io5";
import { MdOutlineDesignServices } from "react-icons/md";
import { FaRegBuilding } from "react-icons/fa";
import { FaSitemap } from "react-icons/fa";

import client1 from "../src/assets/client1.png";
import client2 from "../src/assets/client2.png";
import client3 from "../src/assets/client3.png";

export const allservices = [
  {
    id: 1,
    icon: building,
    title: "Building Renovation",
    about:
      "Expert renovation services to upgrade and modernize existing structures, enhancing functionality and aesthetic appeal.",
    details: `Our Building Renovation service includes:
• Detailed structural assessment and planning
• Quality material upgrades and modern finishes
• Energy-efficient improvements
• Interior remodeling and space optimization
• Clear timeline and transparent pricing`,
    insights: [
      "⭐️ Over 45 renovation projects completed successfully",
      "⭐️ Average project delivery 10% ahead of schedule",
      "⭐️ Client satisfaction rating of 4.9/5",
    ],
    stats: [
      { label: "Projects Completed", value: 45 },
      { label: "On-time Delivery (%)", value: 90 },
      { label: "Customer Satisfaction (%)", value: 98 },
    ],
  },
  {
    id: 2,
    icon: construction,
    title: "Construction Services",
    about:
      "Complete construction services from planning to completion, with focus on quality workmanship and on-time delivery.",
    details: `Our Construction Services include:
• End-to-end project planning & scheduling
• Resource allocation & on-site management
• Safety compliance & quality control
• Vendor coordination & procurement
• Real-time progress tracking`,
    insights: [
      "✅ 40+ sites delivered nationwide",
      "✅ Zero safety incidents in last 3 years",
      "✅ Built 15M+ sqft of commercial space",
    ],
    stats: [
      { label: "Sites Delivered", value: 40 },
      { label: "Incident-Free Years", value: 3 }
    ],
  },
  {
    id: 3,
    icon: design,
    title: "Design & Planning",
    about:
      "Professional design and planning services to create functional, beautiful spaces that meet your specific requirements.",
    details: `Design & Planning covers:
• Conceptual sketches & feasibility studies
• 3D modeling & photorealistic renderings
• Structural & MEP coordination
• Sustainable material & system selection
• Permit drawings & regulatory approvals`,
    insights: [
      "💡 LEED-certified architects on team",
      "💡 VR walkthroughs before breaking ground",
      "💡 30% average cost savings via optimization",
    ],
    stats: [
      { label: "Designs Delivered", value: 35 },
      { label: "VR Walkthroughs Used", value: 75 },
      { label: "Cost Savings (%)", value: 30 },
    ],
  },
  {
    id: 4,
    icon: document,
    title: "Documentation",
    about:
      "Detailed documentation for all project stages, providing clear records and ensuring compliance with industry standards.",
    details: `Our Documentation service provides:
• Permit & regulatory submission packages
• Weekly progress reports & site logs
• BIM model updates & as-built drawings
• Material & equipment datasheets
• Final close-out manuals and warranties`,
    insights: [
      "📝 100% permit approval rate first submission",
      "📝 Digital+print records for audit readiness",
      "📝 Integrated client portal for document review",
    ],
    stats: [
      { label: "Permits Approved (%)", value: 100 },
      { label: "Reports Generated", value: 520 },
      { label: "BIM Updates", value: 45 },
    ],
  },
  {
    id: 5,
    icon: paint,
    title: "Interior Design",
    about:
      "Creative interior design services to craft comfortable and visually stunning spaces that reflect individual style.",
    details: `Interior Design includes:
• Space planning & furniture layouts
• Material, finish & color palette selection
• Lighting design & fixture specification
• Custom millwork & furnishings
• Styling, art curation & soft-goods`,
    insights: [
      "🎨 30+ residential and commercial projects",
      "🎨 Average project ROI uplift of 20%",
      "🎨 End-to-end styling by in-house design team",
    ],
    stats: [
      { label: "Projects Styled", value: 30 },
      { label: "ROI Uplift (%)", value: 20 },
      { label: "Art Curations", value: 200 },
    ],
  },
  {
    id: 6,
    icon: support,
    title: "Customer Support",
    about:
      "Dedicated customer support to assist with inquiries, provide updates, and ensure a smooth project experience from start to finish.",
    details: `Our Customer Support offers:
• Your own dedicated project manager
• 24/7 communication via phone, email & chat
• Monthly site walk-throughs & updates
• Warranty & maintenance scheduling
• Feedback sessions & continuous improvement`,
    insights: [
      "📞 98% satisfaction score on support tickets",
      "📞 <2-hour average response time",
      "📞 Post-project follow-up for quality assurance",
    ],
    stats: [
      { label: "Tickets Resolved (%)", value: 98 },
      { label: "Avg Response Time (hrs)", value: 2 },
      { label: "Follow-up Rate (%)", value: 100 },
    ],
  },
];

export const planning = [
  {
    icon: IoDocumentTextSharp,
    title: "Planning",
    about:
      "Detailed research and strategizing to establish project goals, requirements, and timelines for a successful outcome.",
  },
  {
    icon: MdOutlineDesignServices,
    title: "Design",
    about:
      "Crafting user-centered designs, wireframes, and mockups to create a visually appealing and functional interface.",
  },
  {
    icon: FaRegBuilding,
    title: "Building",
    about:
      "Developing the core functionalities and implementing features with clean, efficient code to bring the design to life.",
  },
  {
    icon: FaSitemap,
    title: "Finish",
    about:
      "Thorough testing, debugging, and deployment to ensure the project meets all specifications and functions seamlessly.",
  },
];

export const clients = [
  {
    image: client1,
    name: "Kamal Hussain",
    about:
      "An experienced constructor known for meticulous planning and project management, ensuring every construction project meets quality standards and deadlines.",
    post: "Client",
    rating: 5,        // ⭐⭐⭐⭐⭐
  },
  {
    image: client2,
    name: "Salman Hussain",
    about:
      "A visionary architect who blends modern design with sustainable practices to create innovative, environmentally friendly buildings.",
    post: "Architect",
    rating: 4,        // ⭐⭐⭐⭐
  },
  {
    image: client3,
    name: "Abbas Hussain",
    about:
      "A skilled builder with a strong focus on craftsmanship and attention to detail, dedicated to bringing architectural designs to life with precision.",
    post: "Builder",
    rating: 5,        // ⭐⭐⭐⭐⭐
  },
];
