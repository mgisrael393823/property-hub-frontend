// This file describes the structure of mock data files needed for the application
// Create these files in src/lib/mockData/ directory

/**
 * File: mockData/creators.ts
 * Description: Sample creators with profiles and portfolio items
 * 
 * Expected structure:
 */

/*
import { Creator } from '../types';

// Sample creators array
export const creators: Creator[] = [
  {
    id: 'creator-1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    role: 'creator',
    bio: 'Professional photographer with 8+ years specializing in real estate and architectural photography.',
    location: 'Chicago, IL',
    services: [
      {
        id: 'service-1',
        name: 'Real Estate Photography',
        description: 'Professional photography for residential and commercial properties',
        price: 250,
      },
      {
        id: 'service-2',
        name: 'Drone Photography',
        description: 'Aerial photography and video for properties',
        price: 350,
      }
    ],
    tags: ['real-estate', 'architecture', 'drone', 'commercial'],
    availability: {
      availableDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      bookedDates: ['2025-05-01', '2025-05-15'],
      leadTime: 3,
      noticeRequired: 2
    },
    averageRating: 4.8,
    reviewCount: 24,
    hourlyRate: 150,
    portfolioItems: [
      {
        id: 'portfolio-1',
        title: 'Downtown Office Building',
        description: 'Complete interior and exterior shoot for a 20-story office building',
        imageUrl: '/images/portfolio/downtown-office.jpg',
        tags: ['office', 'commercial', 'exterior', 'interior'],
        createdAt: '2024-12-15T10:00:00Z',
        propertyType: 'commercial',
        serviceType: 'photography'
      },
      // More portfolio items...
    ],
    createdAt: '2024-01-15T10:00:00Z',
  },
  // More creators...
];

// Helper functions
export function getCreators() {
  return creators;
}

export function getCreatorById(id: string) {
  return creators.find(creator => creator.id === id);
}

export function searchCreators(filters: any) {
  // Implement filtering logic
  return creators.filter(creator => {
    // Filter by services
    if (filters.services && filters.services.length > 0) {
      if (!creator.services.some(service => filters.services.includes(service.id))) {
        return false;
      }
    }
    
    // Filter by location
    if (filters.location) {
      if (!creator.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
    }
    
    // Filter by price range
    if (filters.priceRange) {
      if (
        (filters.priceRange.min && creator.hourlyRate < filters.priceRange.min) ||
        (filters.priceRange.max && creator.hourlyRate > filters.priceRange.max)
      ) {
        return false;
      }
    }
    
    // Filter by rating
    if (filters.rating) {
      if (creator.averageRating < filters.rating) {
        return false;
      }
    }
    
    return true;
  });
}
*/

/**
 * File: mockData/projects.ts
 * Description: Sample project briefs
 * 
 * Expected structure:
 */

/*
import { Project, ProjectStatus } from '../types';

// Sample projects array
export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Downtown Office Photography',
    description: 'We need professional photography for our downtown office. Looking for interior and exterior shots, plus drone footage of the surrounding area.',
    managerId: 'manager-1',
    propertyId: 'property-1',
    budget: {
      min: 500,
      max: 1000
    },
    timeline: {
      deadline: '2025-06-30T00:00:00Z',
      startDate: '2025-06-01T00:00:00Z'
    },
    status: 'open' as ProjectStatus,
    services: ['photography', 'drone'],
    applications: [],
    createdAt: '2025-04-10T12:00:00Z',
    updatedAt: '2025-04-10T12:00:00Z'
  },
  // More projects...
];

// Helper functions
export function getProjects() {
  return projects;
}

export function getProjectById(id: string) {
  return projects.find(project => project.id === id);
}

export function getProjectsByManagerId(managerId: string) {
  return projects.filter(project => project.managerId === managerId);
}

export function updateProject(id: string, data: Partial<Project>) {
  const projectIndex = projects.findIndex(project => project.id === id);
  
  if (projectIndex === -1) {
    return null;
  }
  
  projects[projectIndex] = {
    ...projects[projectIndex],
    ...data,
    updatedAt: new Date().toISOString()
  };
  
  return projects[projectIndex];
}
*/

/**
 * File: mockData/applications.ts
 * Description: Sample project applications
 * 
 * Expected structure:
 */

/*
import { Application, ApplicationStatus } from '../types';
import { projects } from './projects';

// Sample applications array
export const applications: Application[] = [
  {
    id: 'application-1',
    projectId: 'project-1',
    creatorId: 'creator-1',
    coverLetter: 'I\'m very interested in this project and have extensive experience photographing office spaces. My portfolio includes similar projects for major corporate clients.',
    proposedPrice: 750,
    availability: {
      startDate: '2025-06-05T00:00:00Z',
      endDate: '2025-06-15T00:00:00Z'
    },
    status: 'pending' as ApplicationStatus,
    createdAt: '2025-04-12T14:30:00Z'
  },
  // More applications...
];

// Add applications to projects
applications.forEach(application => {
  const project = projects.find(p => p.id === application.projectId);
  if (project) {
    project.applications.push(application);
  }
});

// Helper functions
export function getApplications() {
  return applications;
}

export function getApplicationById(id: string) {
  return applications.find(application => application.id === id);
}

export function getApplicationsByProjectId(projectId: string) {
  return applications.filter(application => application.projectId === projectId);
}

export function getApplicationsByCreatorId(creatorId: string) {
  return applications.filter(application => application.creatorId === creatorId);
}

export function updateApplication(id: string, data: Partial<Application>) {
  const applicationIndex = applications.findIndex(application => application.id === id);
  
  if (applicationIndex === -1) {
    return null;
  }
  
  applications[applicationIndex] = {
    ...applications[applicationIndex],
    ...data,
  };
  
  return applications[applicationIndex];
}
*/

/**
 * File: mockData/bookings.ts
 * Description: Sample bookings
 * 
 * Expected structure:
 */

/*
import { Booking, BookingStatus } from '../types';

// Sample bookings array
export const bookings: Booking[] = [
  {
    id: 'booking-1',
    creatorId: 'creator-1',
    managerId: 'manager-1',
    propertyId: 'property-1',
    services: [
      {
        id: 'service-1',
        name: 'Real Estate Photography',
        price: 250,
      },
      {
        id: 'service-2',
        name: 'Drone Photography',
        price: 350,
      }
    ],
    date: '2025-05-15T10:00:00Z',
    duration: 3, // hours
    specialRequirements: 'Please bring wide-angle lens and drone. We especially need roof and exterior shots.',
    status: 'confirmed' as BookingStatus,
    payment: {
      id: 'payment-1',
      bookingId: 'booking-1',
      amount: 600,
      currency: 'USD',
      status: 'pending',
      createdAt: '2025-04-12T15:00:00Z',
      updatedAt: '2025-04-12T15:00:00Z',
    },
    deliverables: [],
    createdAt: '2025-04-12T15:00:00Z',
    updatedAt: '2025-04-12T15:00:00Z',
  },
  // More bookings...
];

// Helper functions
export function getBookings() {
  return bookings;
}

export function getBookingById(id: string) {
  return bookings.find(booking => booking.id === id);
}

export function getBookingsByCreatorId(creatorId: string) {
  return bookings.filter(booking => booking.creatorId === creatorId);
}

export function getBookingsByManagerId(managerId: string) {
  return bookings.filter(booking => booking.managerId === managerId);
}

export function updateBooking(id: string, data: Partial<Booking>) {
  const bookingIndex = bookings.findIndex(booking => booking.id === id);
  
  if (bookingIndex === -1) {
    return null;
  }
  
  bookings[bookingIndex] = {
    ...bookings[bookingIndex],
    ...data,
    updatedAt: new Date().toISOString()
  };
  
  return bookings[bookingIndex];
}
*/

/**
 * File: mockData/managers.ts
 * Description: Sample property managers
 * 
 * Expected structure:
 */

/*
import { Manager } from '../types';

// Sample managers array
export const managers: Manager[] = [
  {
    id: 'manager-1',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    role: 'manager',
    company: 'Skyline Properties',
    position: 'Marketing Director',
    properties: [
      {
        id: 'property-1',
        name: 'Riverfront Towers',
        address: '123 River St, Chicago, IL',
        type: 'multifamily',
        units: 200
      },
      {
        id: 'property-2',
        name: 'Commerce Center',
        address: '456 Business Ave, Chicago, IL',
        type: 'commercial',
      }
    ],
    createdAt: '2024-02-10T09:00:00Z',
  },
  // More managers...
];

// Helper functions
export function getManagers() {
  return managers;
}

export function getManagerById(id: string) {
  return managers.find(manager => manager.id === id);
}

export function getManagerByEmail(email: string) {
  return managers.find(manager => manager.email === email);
}

export function getPropertiesByManagerId(managerId: string) {
  const manager = getManagerById(managerId);
  return manager ? manager.properties : [];
}
*/

/**
 * File: mockData/users.ts
 * Description: Sample users (both creators and managers)
 * 
 * Expected structure:
 */

/*
import { User } from '../types';
import { creators } from './creators';
import { managers } from './managers';

// Combine creators and managers into users array
export const users: User[] = [
  ...creators,
  ...managers
];

// Helper functions
export function getUsers() {
  return users;
}

export function getUserById(id: string) {
  return users.find(user => user.id === id);
}

export function getUserByEmail(email: string) {
  return users.find(user => user.email === email);
}

export function authenticateUser(email: string, password: string) {
  // In a real app, this would verify the password
  // For mock data, just return the user if email exists
  return users.find(user => user.email === email);
}
*/

/**
 * File: mockData/notifications.ts
 * Description: Sample notifications
 * 
 * Expected structure:
 */

/*
import { Notification, NotificationType } from '../types';

// Sample notifications array
export const notifications: Notification[] = [
  {
    id: 'notification-1',
    userId: 'creator-1',
    type: 'application_status' as NotificationType,
    title: 'Application Accepted',
    message: 'Your application for Downtown Office Photography has been accepted',
    read: false,
    actionUrl: '/projects/project-1',
    relatedId: 'application-1',
    createdAt: '2025-04-14T10:00:00Z',
  },
  {
    id: 'notification-2',
    userId: 'manager-1',
    type: 'project_application' as NotificationType,
    title: 'New Application',
    message: 'Alex Johnson has applied to your Downtown Office Photography project',
    read: true,
    actionUrl: '/manager-dashboard/projects/project-1/applicants',
    relatedId: 'application-1',
    createdAt: '2025-04-12T14:30:00Z',
  },
  // More notifications...
];

// Helper functions
export function getNotifications() {
  return notifications;
}

export function getNotificationsByUserId(userId: string) {
  return notifications.filter(notification => notification.userId === userId);
}

export function getUnreadNotificationsByUserId(userId: string) {
  return notifications.filter(notification => notification.userId === userId && !notification.read);
}

export function markNotificationAsRead(id: string) {
  const notificationIndex = notifications.findIndex(notification => notification.id === id);
  
  if (notificationIndex === -1) {
    return null;
  }
  
  notifications[notificationIndex] = {
    ...notifications[notificationIndex],
    read: true,
  };
  
  return notifications[notificationIndex];
}

export function createNotification(notification: Omit<Notification, 'id' | 'createdAt'>) {
  const newNotification: Notification = {
    ...notification,
    id: `notification-${notifications.length + 1}`,
    createdAt: new Date().toISOString(),
  };
  
  notifications.push(newNotification);
  
  return newNotification;
}
*/

/**
 * File: mockData/deliverables.ts
 * Description: Sample deliverable files
 * 
 * Expected structure:
 */

/*
import { Deliverable, DeliverableStatus } from '../types';
import { bookings } from './bookings';

// Sample deliverables array
export const deliverables: Deliverable[] = [
  {
    id: 'deliverable-1',
    bookingId: 'booking-1',
    title: 'Exterior Photos - Final Edit',
    description: 'Complete set of exterior photos, color corrected and edited',
    fileUrl: '/files/deliverables/exterior-photos.zip',
    fileType: 'application/zip',
    status: 'uploaded' as DeliverableStatus,
    createdAt: '2025-05-16T15:00:00Z',
    updatedAt: '2025-05-16T15:00:00Z',
  },
  // More deliverables...
];

// Add deliverables to bookings
deliverables.forEach(deliverable => {
  const booking = bookings.find(b => b.id === deliverable.bookingId);
  if (booking) {
    booking.deliverables = booking.deliverables || [];
    booking.deliverables.push(deliverable);
  }
});

// Helper functions
export function getDeliverables() {
  return deliverables;
}

export function getDeliverableById(id: string) {
  return deliverables.find(deliverable => deliverable.id === id);
}

export function getDeliverablesByBookingId(bookingId: string) {
  return deliverables.filter(deliverable => deliverable.bookingId === bookingId);
}

export function updateDeliverableStatus(id: string, status: DeliverableStatus) {
  const deliverableIndex = deliverables.findIndex(deliverable => deliverable.id === id);
  
  if (deliverableIndex === -1) {
    return null;
  }
  
  deliverables[deliverableIndex] = {
    ...deliverables[deliverableIndex],
    status,
    updatedAt: new Date().toISOString()
  };
  
  return deliverables[deliverableIndex];
}
*/

/**
 * File: mockData/reviews.ts
 * Description: Sample reviews
 * 
 * Expected structure:
 */

/*
import { Review } from '../types';

// Sample reviews array
export const reviews: Review[] = [
  {
    id: 'review-1',
    bookingId: 'booking-1',
    creatorId: 'creator-1',
    managerId: 'manager-1',
    rating: 5,
    comment: 'Excellent work! Alex delivered high-quality photos that perfectly captured our property. Very professional and responsive throughout the process.',
    createdAt: '2025-05-20T14:00:00Z',
  },
  // More reviews...
];

// Helper functions
export function getReviews() {
  return reviews;
}

export function getReviewById(id: string) {
  return reviews.find(review => review.id === id);
}

export function getReviewsByCreatorId(creatorId: string) {
  return reviews.filter(review => review.creatorId === creatorId);
}

export function getReviewsByManagerId(managerId: string) {
  return reviews.filter(review => review.managerId === managerId);
}

export function getReviewsByBookingId(bookingId: string) {
  return reviews.filter(review => review.bookingId === bookingId);
}

export function createReview(review: Omit<Review, 'id' | 'createdAt'>) {
  const newReview: Review = {
    ...review,
    id: `review-${reviews.length + 1}`,
    createdAt: new Date().toISOString(),
  };
  
  reviews.push(newReview);
  
  return newReview;
}
*/
