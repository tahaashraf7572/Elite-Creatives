/* =====================================================
   ELITE CREATIVES — CONTENT DATA
===================================================== */

const SERVICES = [
  { name: "Real Estate Photography", desc: "HDR-bracketed interiors and exteriors, color-graded to a single cinematic standard.", icon: "fa-camera" },
  { name: "Luxury Property Films", desc: "Director-led walkthrough films scored and edited like a feature trailer.", icon: "fa-clapperboard" },
  { name: "Drone Cinematography", desc: "FAA-licensed aerial reveals capturing scale, land, and neighborhood context.", icon: "fa-helicopter" },
  { name: "Matterport 3D Tours", desc: "Fully navigable digital twins with dollhouse view and measurement-accurate floor plans.", icon: "fa-cube" },
  { name: "Virtual Staging", desc: "Photoreal furniture and decor placed into vacant rooms within 48 hours.", icon: "fa-couch" },
  { name: "Floor Plans", desc: "2D and 3D architectural floor plans delivered print- and web-ready.", icon: "fa-draw-polygon" },
  { name: "Agent Branding", desc: "Signature portraits, brand films, and content libraries built around you.", icon: "fa-user-tie" },
  { name: "Social Media Reels", desc: "Vertical-first cutdowns engineered for Instagram, TikTok, and Reels retention.", icon: "fa-mobile-screen" },
];

const PORTFOLIO = [
  { title: "Belmont Hill Estate", location: "Beverly Hills, CA", type: "photo", tall: true, img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=900&auto=format&fit=crop" },
  { title: "The Azure Penthouse", location: "Miami, FL", type: "drone", tall: false, img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=900&auto=format&fit=crop" },
  { title: "Hawthorne Residence", location: "Aspen, CO", type: "video", tall: false, img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=900&auto=format&fit=crop" },
  { title: "Marina Bay Villa", location: "Dubai, UAE", type: "3d", tall: true, img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=900&auto=format&fit=crop" },
  { title: "Lakeside Modern", location: "Lake Tahoe, NV", type: "photo", tall: false, img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=900&auto=format&fit=crop" },
  { title: "Skyline Loft", location: "Manhattan, NY", type: "video", tall: false, img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=900&auto=format&fit=crop" },
  { title: "Kensington Manor", location: "London, UK", type: "drone", tall: false, img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=900&auto=format&fit=crop" },
  { title: "Desert Modern Retreat", location: "Scottsdale, AZ", type: "3d", tall: false, img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=900&auto=format&fit=crop" },
];

const WHY_US = [
  { icon: "fa-bolt", title: "Fast Delivery", desc: "48-hour turnaround on photography, 5 days on full cinematic film packages." },
  { icon: "fa-film", title: "Cinematic Quality", desc: "Color science and pacing borrowed from feature film and automotive advertising." },
  { icon: "fa-crown", title: "Luxury Branding", desc: "Every frame composed to match the caliber of the property and the agent's name." },
  { icon: "fa-user-shield", title: "Dedicated Project Manager", desc: "One point of contact from booking to final delivery, every time." },
  { icon: "fa-wand-magic-sparkles", title: "AI-Powered Editing", desc: "Machine-assisted color grading and sky replacement, finished by human editors." },
  { icon: "fa-earth-americas", title: "Nationwide Coverage", desc: "Vetted crews in 45+ metro markets, dispatched under one studio standard." },
];

const TESTIMONIALS = [
  { quote: "Elite Creatives doesn't shoot listings. They direct them. Our $40M estate sold in nine days off the film alone.", author: "Vanessa Cole", role: "Founder, Cole Luxury Group" },
  { quote: "The most cinematic real estate work I've commissioned — and I've worked with agencies in three countries.", author: "Marcus Lindqvist", role: "Principal Broker, Nordic Estates" },
  { quote: "Their Matterport tours convert better than our open houses. Buyers walk in already sold.", author: "Priya Anand", role: "Senior Agent, Anand & Co." },
  { quote: "White-glove from the first call to final delivery. This is what a $50K media partner feels like.", author: "James Whitfield", role: "Director, Whitfield Realty" },
];

const PRICING = [
  {
    name: "Essential", tagline: "For standard listings", price: 1200, featured: false,
    features: ["25 HDR photographs", "Twilight exterior shot", "48-hour delivery", "Online gallery"]
  },
  {
    name: "Professional", tagline: "For competitive markets", price: 2400, featured: false,
    features: ["40 HDR photographs", "90-second cinematic film", "Drone aerial package", "Social media cutdowns", "Floor plan"]
  },
  {
    name: "Luxury", tagline: "For premium estates", price: 4500, featured: true, badge: "Most Booked",
    features: ["Full photography + film suite", "Matterport 3D tour", "Virtual staging (5 rooms)", "Agent brand portrait session", "Dedicated project manager"]
  },
  {
    name: "Elite", tagline: "For trophy properties", price: 8500, featured: false,
    features: ["Multi-day cinematic production", "Helicopter aerial cinematography", "Full digital twin + dollhouse view", "Custom-scored hero film", "White-glove concierge service"]
  },
];

const GROWTH_TIPS = [
  { icon: "fa-chart-line", title: "List With Cinematic Media First", desc: "Listings with professional film see significantly longer view times and more saved searches." },
  { icon: "fa-clock", title: "Publish Within 48 Hours", desc: "Momentum compounds — early high-quality media drives the strongest opening-week traffic." },
  { icon: "fa-users", title: "Lead With Vertical Video", desc: "Reels and shorts built from your shoot extend reach well beyond your existing buyer list." },
  { icon: "fa-handshake", title: "Brand Every Listing", desc: "Consistent visual branding across your portfolio builds recognition that outlasts any single sale." },
];

const CHAT_RESPONSES = {
  pricing: "Our packages range from $1,200 (Essential) to $8,500 (Elite). The Luxury package at $4,500 is our most booked option for premium estates. Want me to open the pricing section?",
  booking: "You can reserve a production day directly on this page — scroll to 'Book Your Production Day,' pick a date on the calendar, and confirm your details.",
  services: "We cover photography, cinematic films, drone cinematography, Matterport 3D tours, virtual staging, floor plans, agent branding, and social reels — all under one studio.",
  default: "I can help with pricing, booking a shoot, or our services. What would you like to know?",
};
