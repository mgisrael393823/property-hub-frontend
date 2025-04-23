# ZeroVacancy API Documentation

This document outlines the API endpoints that the ZeroVacancy frontend will integrate with. API route stubs are implemented in `src/app.ts` for local integration tests.
See the OpenAPI spec stubs under `docs/api/` (creators.yaml, projects.yaml, applications.yaml) for the base contracts used by the frontend.
For Phase 1, the frontend otherwise uses mock data from the `/src/lib/mockData` directory.

## API Architecture

- **Base URL**: `https://api.zerovacancy.example.com/v1` (placeholder)
- **Authentication**: JWT tokens sent via Authorization header
- **Content Type**: All requests and responses use JSON
- **Error Handling**: All endpoints return standardized error objects

## Authentication

### User Registration

```
POST /auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "User Name",
  "role": "creator" | "manager"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "name": "User Name",
      "role": "creator",
      "createdAt": "2025-04-19T12:00:00Z"
    },
    "token": "jwt_token_here"
  }
}
```

### User Login

```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "name": "User Name",
      "role": "creator",
      "createdAt": "2025-04-19T12:00:00Z"
    },
    "token": "jwt_token_here"
  }
}
```

## Creators

### List Creators

```
GET /creators
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

**Response:**
```json
{
  "status": "success",
  "data": {
    "data": [
      {
        "id": "creator_123",
        "name": "Creator Name",
        "email": "creator@example.com",
        "role": "creator",
        "bio": "Creator bio...",
        "location": "Chicago, IL",
        "services": ["photography", "drone"],
        "averageRating": 4.8,
        "reviewCount": 24,
        "hourlyRate": 150,
        "createdAt": "2025-04-19T12:00:00Z"
      }
    ],
    "total": 100,
    "page": 1,
    "limit": 10,
    "hasMore": true
  }
}
```

### Get Creator by ID

```
GET /creators/:id
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "creator_123",
    "name": "Creator Name",
    "email": "creator@example.com",
    "role": "creator",
    "bio": "Creator bio...",
    "location": "Chicago, IL",
    "services": ["photography", "drone"],
    "portfolioItems": [
      {
        "id": "portfolio_123",
        "title": "Corporate Headquarters Shoot",
        "description": "Full interior and exterior photography",
        "imageUrl": "https://example.com/image.jpg",
        "tags": ["office", "corporate", "architecture"],
        "createdAt": "2025-04-19T12:00:00Z"
      }
    ],
    "availability": {
      "availableDays": ["monday", "tuesday", "wednesday", "thursday", "friday"],
      "bookedDates": ["2025-05-01", "2025-05-15"],
      "leadTime": 3,
      "noticeRequired": 2
    },
    "averageRating": 4.8,
    "reviewCount": 24,
    "hourlyRate": 150,
    "createdAt": "2025-04-19T12:00:00Z"
  }
}
```

### Search Creators

```
POST /creators/search
```

**Request Body:**
```json
{
  "services": ["photography", "drone"],
  "location": "Chicago, IL",
  "availability": "2025-05-10",
  "priceRange": {
    "min": 100,
    "max": 300
  },
  "rating": 4
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "data": [
      {
        "id": "creator_123",
        "name": "Creator Name",
        "email": "creator@example.com",
        "role": "creator",
        "bio": "Creator bio...",
        "location": "Chicago, IL",
        "services": ["photography", "drone"],
        "averageRating": 4.8,
        "reviewCount": 24,
        "hourlyRate": 150,
        "createdAt": "2025-04-19T12:00:00Z"
      }
    ],
    "total": 5,
    "page": 1,
    "limit": 10,
    "hasMore": false
  }
}
```

## Projects

### List Projects

```
GET /projects
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

**Response:**
```json
{
  "status": "success",
  "data": {
    "data": [
      {
        "id": "project_123",
        "title": "Downtown Office Photography",
        "description": "Professional photography for our downtown office",
        "managerId": "manager_123",
        "budget": {
          "min": 500,
          "max": 1000
        },
        "timeline": {
          "deadline": "2025-06-30T00:00:00Z"
        },
        "status": "open",
        "services": ["photography", "drone"],
        "createdAt": "2025-04-19T12:00:00Z",
        "updatedAt": "2025-04-19T12:00:00Z"
      }
    ],
    "total": 50,
    "page": 1,
    "limit": 10,
    "hasMore": true
  }
}
```

### Get Project by ID

```
GET /projects/:id
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "project_123",
    "title": "Downtown Office Photography",
    "description": "Professional photography for our downtown office",
    "managerId": "manager_123",
    "propertyId": "property_123",
    "budget": {
      "min": 500,
      "max": 1000
    },
    "timeline": {
      "deadline": "2025-06-30T00:00:00Z"
    },
    "status": "open",
    "services": ["photography", "drone"],
    "createdAt": "2025-04-19T12:00:00Z",
    "updatedAt": "2025-04-19T12:00:00Z"
  }
}
```

### Create Project

```
POST /projects
```

**Request Body:**
```json
{
  "title": "Downtown Office Photography",
  "description": "Professional photography for our downtown office",
  "propertyId": "property_123",
  "budget": {
    "min": 500,
    "max": 1000
  },
  "timeline": {
    "deadline": "2025-06-30T00:00:00Z"
  },
  "services": ["photography", "drone"]
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "project_123",
    "title": "Downtown Office Photography",
    "description": "Professional photography for our downtown office",
    "managerId": "manager_123",
    "propertyId": "property_123",
    "budget": {
      "min": 500,
      "max": 1000
    },
    "timeline": {
      "deadline": "2025-06-30T00:00:00Z"
    },
    "status": "open",
    "services": ["photography", "drone"],
    "createdAt": "2025-04-19T12:00:00Z",
    "updatedAt": "2025-04-19T12:00:00Z"
  }
}
```

### Update Project

```
PUT /projects/:id
```

**Request Body:**
```json
{
  "title": "Updated Downtown Office Photography",
  "description": "Updated description...",
  "budget": {
    "min": 600,
    "max": 1200
  },
  "timeline": {
    "deadline": "2025-07-15T00:00:00Z"
  },
  "status": "cancelled"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "project_123",
    "title": "Updated Downtown Office Photography",
    "description": "Updated description...",
    "managerId": "manager_123",
    "propertyId": "property_123",
    "budget": {
      "min": 600,
      "max": 1200
    },
    "timeline": {
      "deadline": "2025-07-15T00:00:00Z"
    },
    "status": "cancelled",
    "services": ["photography", "drone"],
    "createdAt": "2025-04-19T12:00:00Z",
    "updatedAt": "2025-04-19T13:00:00Z"
  }
}
```

## Applications

### Get Applications for Project

```
GET /projects/:projectId/applications
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "data": [
      {
        "id": "application_123",
        "projectId": "project_123",
        "creatorId": "creator_123",
        "coverLetter": "I'm interested in this project...",
        "proposedPrice": 750,
        "availability": {
          "startDate": "2025-05-10T00:00:00Z",
          "endDate": "2025-05-20T00:00:00Z"
        },
        "status": "pending",
        "createdAt": "2025-04-19T12:00:00Z"
      }
    ],
    "total": 5,
    "page": 1,
    "limit": 10,
    "hasMore": false
  }
}
```

### Create Application

```
POST /applications
```

**Request Body:**
```json
{
  "projectId": "project_123",
  "coverLetter": "I'm interested in this project...",
  "proposedPrice": 750,
  "availability": {
    "startDate": "2025-05-10T00:00:00Z",
    "endDate": "2025-05-20T00:00:00Z"
  }
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "application_123",
    "projectId": "project_123",
    "creatorId": "creator_123",
    "coverLetter": "I'm interested in this project...",
    "proposedPrice": 750,
    "availability": {
      "startDate": "2025-05-10T00:00:00Z",
      "endDate": "2025-05-20T00:00:00Z"
    },
    "status": "pending",
    "createdAt": "2025-04-19T12:00:00Z"
  }
}
```

### Update Application Status

```
PUT /applications/:id
```

**Request Body:**
```json
{
  "status": "accepted"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "application_123",
    "projectId": "project_123",
    "creatorId": "creator_123",
    "coverLetter": "I'm interested in this project...",
    "proposedPrice": 750,
    "availability": {
      "startDate": "2025-05-10T00:00:00Z",
      "endDate": "2025-05-20T00:00:00Z"
    },
    "status": "accepted",
    "createdAt": "2025-04-19T12:00:00Z"
  }
}
```

## Bookings

### List Bookings

```
GET /bookings
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

**Response:**
```json
{
  "status": "success",
  "data": {
    "data": [
      {
        "id": "booking_123",
        "creatorId": "creator_123",
        "managerId": "manager_123",
        "propertyId": "property_123",
        "services": [
          {
            "id": "service_123",
            "name": "Photography",
            "price": 500
          }
        ],
        "date": "2025-05-15T10:00:00Z",
        "duration": 3,
        "specialRequirements": "Please bring wide-angle lens",
        "status": "confirmed",
        "createdAt": "2025-04-19T12:00:00Z",
        "updatedAt": "2025-04-19T12:00:00Z"
      }
    ],
    "total": 20,
    "page": 1,
    "limit": 10,
    "hasMore": true
  }
}
```

### Get Booking by ID

```
GET /bookings/:id
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "booking_123",
    "creatorId": "creator_123",
    "managerId": "manager_123",
    "propertyId": "property_123",
    "services": [
      {
        "id": "service_123",
        "name": "Photography",
        "price": 500
      }
    ],
    "date": "2025-05-15T10:00:00Z",
    "duration": 3,
    "specialRequirements": "Please bring wide-angle lens",
    "status": "confirmed",
    "payment": {
      "id": "payment_123",
      "bookingId": "booking_123",
      "amount": 500,
      "currency": "USD",
      "status": "pending"
    },
    "deliverables": [],
    "createdAt": "2025-04-19T12:00:00Z",
    "updatedAt": "2025-04-19T12:00:00Z"
  }
}
```

### Create Booking

```
POST /bookings
```

**Request Body:**
```json
{
  "creatorId": "creator_123",
  "propertyId": "property_123",
  "services": ["service_123", "service_456"],
  "date": "2025-05-15T10:00:00Z",
  "duration": 3,
  "specialRequirements": "Please bring wide-angle lens"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "booking_123",
    "creatorId": "creator_123",
    "managerId": "manager_123",
    "propertyId": "property_123",
    "services": [
      {
        "id": "service_123",
        "name": "Photography",
        "price": 500
      }
    ],
    "date": "2025-05-15T10:00:00Z",
    "duration": 3,
    "specialRequirements": "Please bring wide-angle lens",
    "status": "confirmed",
    "createdAt": "2025-04-19T12:00:00Z",
    "updatedAt": "2025-04-19T12:00:00Z"
  }
}
```

### Update Booking

```
PUT /bookings/:id
```

**Request Body:**
```json
{
  "date": "2025-05-20T10:00:00Z",
  "duration": 4,
  "status": "cancelled"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "booking_123",
    "creatorId": "creator_123",
    "managerId": "manager_123",
    "propertyId": "property_123",
    "services": [
      {
        "id": "service_123",
        "name": "Photography",
        "price": 500
      }
    ],
    "date": "2025-05-20T10:00:00Z",
    "duration": 4,
    "specialRequirements": "Please bring wide-angle lens",
    "status": "cancelled",
    "createdAt": "2025-04-19T12:00:00Z",
    "updatedAt": "2025-04-19T13:00:00Z"
  }
}
```

## File Uploads

### Upload File

```
POST /files/upload
```

**Request Body:**
```
FormData with file field
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "fileId": "file_123",
    "url": "https://storage.example.com/files/file_123.jpg",
    "filename": "office_exterior.jpg",
    "mimeType": "image/jpeg",
    "size": 2048576,
    "createdAt": "2025-04-19T12:00:00Z"
  }
}
```

### Upload Deliverable

```
POST /bookings/:id/deliverables
```

**Request Body:**
```json
{
  "title": "Office Exterior Photos",
  "description": "Final edited exterior photos",
  "fileId": "file_123"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "deliverable_123",
    "bookingId": "booking_123",
    "title": "Office Exterior Photos",
    "description": "Final edited exterior photos",
    "fileUrl": "https://storage.example.com/files/file_123.jpg",
    "fileType": "image/jpeg",
    "status": "uploaded",
    "createdAt": "2025-04-19T12:00:00Z",
    "updatedAt": "2025-04-19T12:00:00Z"
  }
}
```

## Payments

### Create Payment Intent

```
POST /payments/create-intent
```

**Request Body:**
```json
{
  "bookingId": "booking_123",
  "amount": 500,
  "currency": "USD"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "clientSecret": "pi_123_secret_456",
    "paymentId": "payment_123",
    "amount": 500,
    "currency": "USD"
  }
}
```

### Get Payment Status

```
GET /payments/:id
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "payment_123",
    "bookingId": "booking_123",
    "amount": 500,
    "currency": "USD",
    "status": "completed",
    "stripePaymentId": "pi_123",
    "createdAt": "2025-04-19T12:00:00Z",
    "updatedAt": "2025-04-19T12:30:00Z"
  }
}
```

## User Dashboard Data

### Creator Dashboard

```
GET /dashboard/creator
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "stats": {
      "completedBookings": 25,
      "pendingBookings": 3,
      "totalEarnings": 12500,
      "averageRating": 4.8
    },
    "recentBookings": [
      {
        "id": "booking_123",
        "propertyName": "Downtown Office",
        "date": "2025-05-15T10:00:00Z",
        "status": "confirmed",
        "amount": 500
      }
    ],
    "pendingApplications": [
      {
        "id": "application_123",
        "projectTitle": "Downtown Office Photography",
        "proposedPrice": 750,
        "status": "pending",
        "createdAt": "2025-04-19T12:00:00Z"
      }
    ]
  }
}
```

### Manager Dashboard

```
GET /dashboard/manager
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "stats": {
      "activeProjects": 3,
      "completedProjects": 12,
      "pendingBookings": 2,
      "totalSpent": 15000
    },
    "recentProjects": [
      {
        "id": "project_123",
        "title": "Downtown Office Photography",
        "status": "open",
        "applicationCount": 5,
        "createdAt": "2025-04-19T12:00:00Z"
      }
    ],
    "upcomingBookings": [
      {
        "id": "booking_123",
        "creatorName": "Creator Name",
        "propertyName": "Downtown Office",
        "date": "2025-05-15T10:00:00Z",
        "status": "confirmed"
      }
    ]
  }
}
```

## Notifications

### Get User Notifications

```
GET /notifications
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `read`: Filter by read status (optional, true/false)

**Response:**
```json
{
  "status": "success",
  "data": {
    "data": [
      {
        "id": "notification_123",
        "userId": "user_123",
        "type": "application_status",
        "title": "Application Accepted",
        "message": "Your application for Downtown Office Photography has been accepted",
        "read": false,
        "actionUrl": "/projects/project_123",
        "relatedId": "application_123",
        "createdAt": "2025-04-19T12:00:00Z"
      }
    ],
    "total": 15,
    "page": 1,
    "limit": 20,
    "hasMore": false
  }
}
```

### Mark Notification as Read

```
PUT /notifications/:id
```

**Request Body:**
```json
{
  "read": true
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "notification_123",
    "userId": "user_123",
    "type": "application_status",
    "title": "Application Accepted",
    "message": "Your application for Downtown Office Photography has been accepted",
    "read": true,
    "actionUrl": "/projects/project_123",
    "relatedId": "application_123",
    "createdAt": "2025-04-19T12:00:00Z"
  }
}
```

## Error Handling

All API endpoints return a standardized error response:

```json
{
  "status": "error",
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested resource was not found",
    "details": {
      "resourceId": "booking_999",
      "resourceType": "booking"
    }
  }
}
```

### Common Error Codes

- `INVALID_REQUEST`: The request is malformed or contains invalid data
- `RESOURCE_NOT_FOUND`: The requested resource was not found
- `UNAUTHORIZED`: Authentication is required
- `FORBIDDEN`: The authenticated user does not have permission
- `VALIDATION_ERROR`: The request data failed validation
- `SERVER_ERROR`: An unexpected server error occurred
- `DUPLICATE_RESOURCE`: A resource with the same unique constraints already exists

### HTTP Status Codes

The API uses standard HTTP status codes:

- `200 OK`: The request was successful
- `201 Created`: The resource was successfully created
- `400 Bad Request`: The request was invalid (validation errors)
- `401 Unauthorized`: Authentication is required or failed
- `403 Forbidden`: The authenticated user doesn't have permission
- `404 Not Found`: The requested resource was not found
- `409 Conflict`: The request conflicts with the current state
- `422 Unprocessable Entity`: The request data failed validation
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: An unexpected server error occurred

### Frontend Error Handling

The frontend handles these error types using a standardized error handling system:

1. **API Errors**: Errors from API requests are handled with the `AppError` class and displayed as toast notifications
2. **Authentication Errors**: Automatically redirect to login page
3. **Validation Errors**: Form-specific errors are displayed inline with form fields
4. **Network Errors**: Displayed as toast notifications with retry options
5. **Not Found Errors**: Redirect to 404 page
6. **Permission Errors**: Display permission-denied messages with guidance

#### Error Handling Example

```tsx
try {
  const result = await api.bookings.create(bookingData);
  // Handle success
} catch (error) {
  if (error instanceof AppError) {
    if (error.type === ErrorType.VALIDATION) {
      // Handle validation errors
      const fieldErrors = error.details || {};
      // Update form field errors
    } else if (error.type === ErrorType.AUTH) {
      // Redirect to login
      navigate('/login');
    } else {
      // Show generic error message
      handleError(error);
    }
  } else {
    // Fallback for unexpected errors
    handleError(error);
  }
}
```

The frontend includes utilities to streamline error handling:

- `useAsyncData` hook for data fetching with built-in error handling
- `WithAsync` HOC for declarative error handling
- `useOptimisticMutation` hook for handling mutations with rollback capability
- `ErrorBoundary` component for catching rendering errors
- `EmptyState` component for displaying empty and error states
