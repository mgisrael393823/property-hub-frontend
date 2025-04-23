// Common Types for ZeroVacancy

// User Types
export type UserRole = 'creator' | 'manager' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

// Creator Types
export interface Creator extends User {
  role: 'creator';
  portfolioItems: PortfolioItem[];
  bio: string;
  location: string;
  services: Service[];
  tags: string[];
  availability: Availability;
  averageRating?: number;
  reviewCount?: number;
  hourlyRate?: number;
  featuredWork?: PortfolioItem;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  createdAt: string;
  propertyType?: string;
  serviceType?: string;
}

export interface Service {
  id: string;
  name: string;
  description?: string;
  price?: number;
  duration?: string;
}

export interface Availability {
  availableDays: ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday')[];
  bookedDates: string[]; // ISO date strings
  leadTime: number; // days
  noticeRequired: number; // days
}

// Manager Types
export interface Manager extends User {
  role: 'manager';
  company: string;
  position?: string;
  properties?: Property[];
}

export interface Property {
  id: string;
  name: string;
  address: string;
  type: 'multifamily' | 'commercial' | 'residential' | 'other';
  units?: number;
}

// Project Types
export type ProjectStatus = 'draft' | 'open' | 'in_progress' | 'completed' | 'cancelled';

export interface Project {
  id: string;
  title: string;
  description: string;
  managerId: string;
  propertyId?: string;
  budget: {
    min: number;
    max: number;
  };
  timeline: {
    deadline: string; // ISO date string
    startDate?: string; // ISO date string
  };
  status: ProjectStatus;
  services: string[]; // service ids
  applications: Application[];
  createdAt: string;
  updatedAt: string;
}

// Application Types
export type ApplicationStatus = 'pending' | 'accepted' | 'rejected' | 'withdrawn';

export interface Application {
  id: string;
  projectId: string;
  creatorId: string;
  coverLetter: string;
  proposedPrice: number;
  availability: {
    startDate: string; // ISO date string
    endDate: string; // ISO date string
  };
  status: ApplicationStatus;
  createdAt: string;
}

// Booking Types
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  creatorId: string;
  managerId: string;
  propertyId: string;
  services: Service[];
  date: string; // ISO date string
  duration: number; // in hours
  specialRequirements?: string;
  status: BookingStatus;
  payment?: Payment;
  deliverables?: Deliverable[];
  createdAt: string;
  updatedAt: string;
}

// Payment Types
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  stripePaymentId?: string;
  createdAt: string;
  updatedAt: string;
}

// Deliverable Types
export type DeliverableStatus = 'pending' | 'uploaded' | 'approved' | 'rejected';

export interface Deliverable {
  id: string;
  bookingId: string;
  title: string;
  description?: string;
  fileUrl: string;
  fileType: string;
  status: DeliverableStatus;
  feedback?: string;
  createdAt: string;
  updatedAt: string;
}

// Review Types
export interface Review {
  id: string;
  bookingId: string;
  creatorId: string;
  managerId: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
}

// Notification Types
export type NotificationType = 
  | 'project_application'
  | 'application_status'
  | 'booking_request'
  | 'booking_confirmation'
  | 'payment_received'
  | 'deliverable_uploaded'
  | 'review_received'
  | 'message_received';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  relatedId?: string; // ID of related entity (booking, project, etc.)
  createdAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Search and Filter Types
export interface CreatorSearchFilters {
  services?: string[];
  location?: string;
  availability?: string; // ISO date string
  priceRange?: {
    min?: number;
    max?: number;
  };
  rating?: number; // minimum rating
}

export interface ProjectSearchFilters {
  services?: string[];
  status?: ProjectStatus[];
  budgetRange?: {
    min?: number;
    max?: number;
  };
  deadline?: string; // ISO date string (filter for before this date)
}
