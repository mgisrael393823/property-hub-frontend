// Routes
export const ROUTES = {
  // Public routes
  HOME: "/",
  SEARCH: "/search",
  CREATOR: "/creator",
  CREATOR_PROFILE: "/creator/:id",
  LOGIN: "/login",
  REGISTER: "/register",
  
  // Booking routes
  BOOKING: "/booking",
  BOOKING_REQUEST: "/booking/:creatorId",
  
  // Project routes
  PROJECTS: "/projects",
  NEW_PROJECT: "/projects/new",
  PROJECT_BRIEF: "/projects/:id",
  PROJECT_APPLICANTS: "/manager-dashboard/projects/:projectId/applicants",
  
  // Dashboard routes
  CREATOR_DASHBOARD: "/creator-dashboard",
  MANAGER_DASHBOARD: "/manager-dashboard",
  ADMIN_DASHBOARD: "/admin-dashboard",
  
  // Onboarding routes
  CREATOR_ONBOARDING: "/onboarding/creator",
  MANAGER_ONBOARDING: "/onboarding/manager",
  
  // User routes
  PROFILE: "/profile",
  SETTINGS: "/settings",
  
  // Error routes
  NOT_FOUND: "*"
};

// Content Types
export const CONTENT_TYPES = [
  { id: "photography", label: "Photography" },
  { id: "drone", label: "Drone" },
  { id: "videoTour", label: "Video Tour" },
  { id: "virtualStaging", label: "Virtual Staging" },
  { id: "reelsSocial", label: "Reels/Social Content" },
];

// Budget Ranges
export const BUDGET_RANGES = [
  { value: "500-1000", label: "$500 - $1,000" },
  { value: "1000-2000", label: "$1,000 - $2,000" },
  { value: "2000-5000", label: "$2,000 - $5,000" },
  { value: "5000+", label: "$5,000+" },
];

// Status Enums
export const PROJECT_STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  CANCELLED: "cancelled"
} as const;

export const APPLICATION_STATUS = {
  NEW: "new",
  ACCEPTED: "accepted",
  REJECTED: "rejected"
} as const;

export const PAYMENT_STATUS = {
  PAID: "paid",
  PENDING: "pending",
  REFUNDED: "refunded",
  FAILED: "failed"
} as const;

// Services
export const BOOKING_SERVICES = [
  { id: "photos", label: "Real Estate Photography" },
  { id: "virtual-tour", label: "Virtual Tour" },
  { id: "drone", label: "Drone Footage" },
  { id: "floor-plan", label: "Floor Plan" },
  { id: "twilight", label: "Twilight Shots" },
];

// User roles
export const USER_ROLES = [
  { value: "creator", label: "Creator" },
  { value: "manager", label: "Property Manager" },
  { value: "admin", label: "Administrator" },
];

// Authentication constants
export const AUTH = {
  TOKEN_KEY: "zero_vacancy_auth_token",
  USER_KEY: "zero_vacancy_user",
};