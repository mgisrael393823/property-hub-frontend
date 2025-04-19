
// Creator mock data
export const MOCK_CREATORS = [
  {
    id: "1",
    name: "Sarah Johnson",
    location: "Los Angeles, CA",
    services: ["Photography", "Virtual Tours", "Drone Footage"],
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    rating: 4.9,
    responseTime: "< 2h",
    verified: true,
    workSamples: [
      { url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d", type: "photography" },
      { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c", type: "photography" },
      { url: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154", type: "photography" },
      { url: "https://images.unsplash.com/photo-1600607688801-aaa01ded71c7", type: "photography" },
    ]
  },
  {
    id: "2",
    name: "Michael Chen",
    location: "San Francisco, CA",
    services: ["Photography", "Floor Plans", "Twilight Shots"],
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    rating: 4.7,
    responseTime: "< 24h",
    verified: true,
    workSamples: [
      { url: "https://images.unsplash.com/photo-1600566752355-fb33643d3e1e", type: "photography" },
      { url: "https://images.unsplash.com/photo-1600566752447-f5069cd92b39", type: "photography" },
      { url: "https://images.unsplash.com/photo-1600566752229-250ed79470f8", type: "photography" },
      { url: "https://images.unsplash.com/photo-1600566752354-c578a3e5d94c", type: "photography" },
    ]
  }
];

// Project mock data
export const MOCK_PROJECTS = [
  {
    id: "1",
    title: "Office Space Photography",
    budget: "$500 - $1,000",
    timeline: "April 30, 2025",
    address: "123 Business Ave, San Francisco, CA",
    description: "We need professional photographs of our newly renovated office space. Looking for someone who can capture the modern aesthetic and natural lighting. Must include wide-angle shots of common areas and detail shots of unique features.",
    contentTypes: ["Photography", "Virtual Staging"],
    attachments: ["floor-plan.pdf", "style-guide.pdf"],
  },
  {
    id: "2",
    title: "Luxury Condo Photography & Virtual Tour",
    budget: "$1,000 - $2,000",
    timeline: "May 15, 2025",
    address: "456 Skyview Drive, Los Angeles, CA",
    description: "Looking for a professional photographer to capture our luxury condo development. We need both interior and exterior shots, plus a virtual tour of our model unit.",
    contentTypes: ["Photography", "Virtual Tour", "Drone"],
    attachments: ["branding-guide.pdf"],
  }
];

// Application mock data
export const MOCK_APPLICANTS = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg",
    services: ["Photography", "Virtual Staging"],
    proposal: "I specialize in commercial real estate photography and have extensive experience with office spaces. My work focuses on capturing natural light and showing the potential of each space. I've worked with several property management firms in the Bay Area.",
    quote: "750",
    status: "new"
  },
  {
    id: "2",
    name: "Mike Chen",
    avatar: "/placeholder.svg",
    services: ["Photography"],
    proposal: "With 5 years of architectural photography experience, I can highlight the unique features of your office space. I use professional lighting equipment to ensure the best possible results.",
    quote: "850",
    status: "new"
  }
];

// Booking mock data
export const MOCK_BOOKINGS = [
  {
    id: "1",
    projectTitle: "Office Space Photography",
    propertyAddress: "123 Business Ave, San Francisco, CA",
    date: "2025-04-25",
    status: "pending",
    creatorName: "Sarah Johnson",
    creatorId: "1",
  },
  {
    id: "2",
    projectTitle: "Luxury Condo Drone Footage",
    propertyAddress: "456 Skyview Drive, Los Angeles, CA",
    date: "2025-05-10",
    status: "confirmed",
    creatorName: "Michael Chen",
    creatorId: "2",
  }
];

// Payment mock data
export const MOCK_PAYMENTS = [
  {
    id: "1",
    projectName: "Office Space Photography",
    creatorName: "Sarah Johnson",
    amount: 750,
    status: "paid",
    date: "2025-04-02",
  },
  {
    id: "2",
    projectName: "Luxury Condo Drone Footage",
    creatorName: "Michael Chen",
    amount: 950,
    status: "pending",
    date: "2025-04-15",
  }
];

// Reviews mock data
export const MOCK_REVIEWS = [
  {
    id: "1",
    creatorId: "1",
    clientName: "John Smith",
    clientAvatar: "/placeholder.svg",
    rating: 5,
    date: "2025-03-10",
    content: "Sarah did an incredible job capturing our office space. The photos really highlight the architectural details and natural lighting. Highly recommend!",
  },
  {
    id: "2",
    creatorId: "1",
    clientName: "Jennifer Lee",
    clientAvatar: "/placeholder.svg",
    rating: 4.5,
    date: "2025-02-22",
    content: "Great eye for detail and very professional. Delivered all the photos on time and was responsive throughout the process.",
  }
];

// Notification mock data
export const MOCK_NOTIFICATIONS = [
  {
    id: "1",
    title: "Booking Confirmed",
    message: "Your booking for Office Space Photography has been confirmed.",
    timestamp: "2h ago",
    read: false,
    type: "success",
  },
  {
    id: "2",
    title: "New Application",
    message: "Sarah Johnson has applied to your Luxury Condo project.",
    timestamp: "1d ago",
    read: true,
    type: "info",
  },
  {
    id: "3",
    title: "Payment Received",
    message: "You received a payment of $750 for Office Space Photography.",
    timestamp: "3d ago",
    read: true,
    type: "success",
  }
];
