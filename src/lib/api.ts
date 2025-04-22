// API client for ZeroVacancy

import { ApiResponse, PaginatedResponse, User } from './types';
import { toast } from '@/components/ui/use-toast';
import { 
  MOCK_CREATORS, 
  MOCK_PROJECTS, 
  MOCK_APPLICANTS, 
  MOCK_BOOKINGS, 
  MOCK_PAYMENTS,
  MOCK_NOTIFICATIONS
} from './mockData';
import { AppError, ErrorType, handleError } from './error/errorHandler';

// Base API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '30000');
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';
const MOCK_API_DELAY = parseInt(import.meta.env.VITE_MOCK_API_DELAY || '500');
const AUTH_TOKEN_KEY = import.meta.env.VITE_AUTH_TOKEN_KEY || 'zero_vacancy_auth_token';

// Use our standardized AppError class instead of a custom ApiError
// This enhances the error with additional context and standardized handling

// Helper to simulate API delay for development
const mockDelay = () => new Promise(resolve => setTimeout(resolve, MOCK_API_DELAY));

// Get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

// Generic API request function
async function apiRequest<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  
  // Use mock data if flag is set
  if (USE_MOCK_DATA) {
    return handleMockRequest<T>(endpoint, options);
  }
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);
  
  try {
    // Add auth token to headers if available
    const token = getAuthToken();
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    // Handle non-JSON responses
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      // Handle non-JSON responses like text, images, etc.
      const text = await response.text();
      try {
        // Try to parse as JSON anyway in case content-type is wrong
        data = JSON.parse(text);
      } catch {
        // If it's not JSON, use the text as is
        data = { message: text };
      }
    }
    
    if (!response.ok) {
      // Handle 401 Unauthorized specifically
      if (response.status === 401) {
        // Clear stored auth data
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(import.meta.env.VITE_AUTH_USER_KEY || 'zero_vacancy_user');
        
        // Redirect to login if not already there
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
        
        throw AppError.auth(data.message || 'Authentication failed');
      }
      
      if (response.status === 404) {
        throw AppError.notFound(data.message || 'Resource not found');
      }
      
      if (response.status === 403) {
        throw AppError.permission(data.message || 'Permission denied');
      }
      
      if (response.status === 400) {
        throw AppError.validation(data.message || 'Validation error', data.errors || {});
      }
      
      // Generic API error for other status codes
      throw AppError.api(
        data.message || 'An error occurred', 
        response.status,
        { endpoint, status: response.status, data }
      );
    }
    
    return data;
  } catch (error) {
    // If it's already an AppError, just rethrow it
    if (error instanceof AppError) {
      throw error;
    }
    
    // Handle specific error types
    if (error.name === 'AbortError') {
      throw AppError.api('Request timeout', 408, { endpoint });
    }
    
    // Handle fetch errors (like CORS, network issues, etc.)
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw AppError.network(`Network error when accessing ${endpoint}: ${error.message}`);
    }
    
    // Generic error handling
    throw AppError.api(
      error.message || 'Unknown API error', 
      500, 
      { endpoint, error: String(error) }
    );
  }
}

// Mock API handler for development
async function handleMockRequest<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  await mockDelay();
  
  const method = options.method || 'GET';
  let mockResponse: any;
  
  // Handle authentication endpoints
  if (endpoint === '/auth/login' && method === 'POST') {
    const body = JSON.parse(options.body as string);
    
    // Mock successful login with test accounts
    if (body.email === 'creator@example.com' && body.password === 'password') {
      mockResponse = {
        status: 'success',
        data: {
          user: {
            id: '1',
            email: 'creator@example.com',
            name: 'Sarah Johnson',
            role: 'creator',
            createdAt: '2025-04-19T12:00:00Z'
          },
          token: 'mock_token_creator_123'
        }
      };
    } else if (body.email === 'manager@example.com' && body.password === 'password') {
      mockResponse = {
        status: 'success',
        data: {
          user: {
            id: '3',
            email: 'manager@example.com',
            name: 'John Property',
            role: 'manager',
            createdAt: '2025-04-19T12:00:00Z'
          },
          token: 'mock_token_manager_123'
        }
      };
    } else if (body.email === 'admin@example.com' && body.password === 'password') {
      mockResponse = {
        status: 'success',
        data: {
          user: {
            id: '5',
            email: 'admin@example.com',
            name: 'Admin User',
            role: 'admin',
            createdAt: '2025-04-19T12:00:00Z'
          },
          token: 'mock_token_admin_123'
        }
      };
    } else {
      throw new ApiError('Invalid email or password', 401);
    }
    
    return mockResponse as T;
  }
  
  // Handle registration endpoint
  if (endpoint === '/auth/register' && method === 'POST') {
    const body = JSON.parse(options.body as string);
    
    // Always return success for mock registration
    mockResponse = {
      status: 'success',
      data: {
        user: {
          id: '10',
          email: body.email,
          name: body.name,
          role: body.role,
          createdAt: new Date().toISOString()
        },
        token: `mock_token_${body.role}_${Date.now()}`
      }
    };
    
    return mockResponse as T;
  }
  
  // Handle me endpoint - current user
  if (endpoint === '/auth/me') {
    // Verify mock auth token exists
    const token = getAuthToken();
    if (!token) {
      throw new ApiError('Unauthorized', 401);
    }
    
    if (token.includes('creator')) {
      mockResponse = {
        status: 'success',
        data: {
          id: '1',
          email: 'creator@example.com',
          name: 'Sarah Johnson',
          role: 'creator',
          createdAt: '2025-04-19T12:00:00Z'
        }
      };
    } else if (token.includes('manager')) {
      mockResponse = {
        status: 'success',
        data: {
          id: '3',
          email: 'manager@example.com',
          name: 'John Property',
          role: 'manager',
          createdAt: '2025-04-19T12:00:00Z'
        }
      };
    } else if (token.includes('admin')) {
      mockResponse = {
        status: 'success',
        data: {
          id: '5',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'admin',
          createdAt: '2025-04-19T12:00:00Z'
        }
      };
    } else {
      throw new ApiError('Invalid token', 401);
    }
    
    return mockResponse as T;
  }
  
  // Parse the endpoint to determine what data to return
  if (endpoint.startsWith('/creators')) {
    if (endpoint === '/creators') {
      mockResponse = { 
        data: MOCK_CREATORS,
        status: 'success' 
      };
    } else {
      const id = endpoint.split('/')[2];
      const creator = MOCK_CREATORS.find(c => c.id === id);
      mockResponse = { 
        data: creator || null,
        status: creator ? 'success' : 'error'
      };
    }
  } 
  else if (endpoint.startsWith('/projects')) {
    if (endpoint === '/projects') {
      mockResponse = { 
        data: MOCK_PROJECTS,
        status: 'success' 
      };
    } else if (endpoint.includes('/applications')) {
      const projectId = endpoint.split('/')[2];
      const applications = MOCK_APPLICANTS.filter(app => app.id === projectId);
      mockResponse = { 
        data: applications,
        status: 'success' 
      };
    } else {
      const id = endpoint.split('/')[2];
      const project = MOCK_PROJECTS.find(p => p.id === id);
      mockResponse = { 
        data: project || null,
        status: project ? 'success' : 'error'
      };
    }
  }
  else if (endpoint.startsWith('/bookings')) {
    if (endpoint === '/bookings') {
      mockResponse = { 
        data: MOCK_BOOKINGS,
        status: 'success' 
      };
    } else {
      const id = endpoint.split('/')[2];
      const booking = MOCK_BOOKINGS.find(b => b.id === id);
      mockResponse = { 
        data: booking || null,
        status: booking ? 'success' : 'error' 
      };
    }
  }
  
  // Simulate error responses for testing
  if (endpoint.includes('error')) {
    if (endpoint.includes('auth')) {
      throw AppError.auth('Simulated authentication error');
    } else if (endpoint.includes('permission')) {
      throw AppError.permission('Simulated permission error');
    } else if (endpoint.includes('validation')) {
      throw AppError.validation('Simulated validation error', {
        field1: 'Field 1 error message',
        field2: 'Field 2 error message'
      });
    } else if (endpoint.includes('network')) {
      throw AppError.network('Simulated network error');
    } else {
      throw AppError.api('Simulated API error', 500, { 
        endpoint, 
        simulatedError: true 
      });
    }
  }
  
  if (!mockResponse) {
    throw AppError.notFound(`Resource not found: ${endpoint}`);
  }
  
  return mockResponse as T;
}

// API client with specific endpoints
export const api = {
  // Auth endpoints
  auth: {
    login: (credentials: { email: string; password: string }) => 
      apiRequest<ApiResponse<{ user: User; token: string }>>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
    
    register: (userData: { email: string; password: string; name: string; role: string }) => 
      apiRequest<ApiResponse<{ user: User; token: string }>>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      }),
    
    me: () => 
      apiRequest<ApiResponse<User>>('/auth/me'),
    
    logout: () => {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(import.meta.env.VITE_AUTH_USER_KEY || 'zero_vacancy_user');
      return Promise.resolve({ status: 'success' } as ApiResponse<null>);
    },
  },
  
  // Creator endpoints
  creators: {
    getAll: () => 
      apiRequest<ApiResponse<PaginatedResponse<any>>>('/creators'),
    
    getById: (id: string) => 
      apiRequest<ApiResponse<any>>(`/creators/${id}`),
    
    search: (filters: any) => 
      apiRequest<ApiResponse<PaginatedResponse<any>>>('/creators/search', {
        method: 'POST',
        body: JSON.stringify(filters),
      }),
    
    update: (id: string, data: any) => 
      apiRequest<ApiResponse<any>>(`/creators/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
  },
  
  // Project endpoints
  projects: {
    getAll: () => 
      apiRequest<ApiResponse<PaginatedResponse<any>>>('/projects'),
    
    getById: (id: string) => 
      apiRequest<ApiResponse<any>>(`/projects/${id}`),
    
    create: (data: any) => 
      apiRequest<ApiResponse<any>>('/projects', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    
    update: (id: string, data: any) => 
      apiRequest<ApiResponse<any>>(`/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    
    getApplications: (projectId: string) => 
      apiRequest<ApiResponse<PaginatedResponse<any>>>(`/projects/${projectId}/applications`),
  },
  
  // Application endpoints
  applications: {
    create: (data: any) => 
      apiRequest<ApiResponse<any>>('/applications', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    
    update: (id: string, data: any) => 
      apiRequest<ApiResponse<any>>(`/applications/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
  },
  
  // Booking endpoints
  bookings: {
    getAll: () => 
      apiRequest<ApiResponse<PaginatedResponse<any>>>('/bookings'),
    
    getById: (id: string) => 
      apiRequest<ApiResponse<any>>(`/bookings/${id}`),
    
    create: (data: any) => 
      apiRequest<ApiResponse<any>>('/bookings', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    
    update: (id: string, data: any) => 
      apiRequest<ApiResponse<any>>(`/bookings/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
  },
};

// Error handling middleware
export function handleApiError(error: unknown): void {
  // Use our centralized error handler
  handleError(error, 'An API error occurred. Please try again.');
}

export default api;