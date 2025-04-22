import { toast } from '@/components/ui/use-toast';

/**
 * Error types for the application
 */
export enum ErrorType {
  API = 'API_ERROR',
  AUTH = 'AUTH_ERROR',
  NETWORK = 'NETWORK_ERROR',
  VALIDATION = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  PERMISSION = 'PERMISSION_ERROR',
  UNKNOWN = 'UNKNOWN_ERROR',
}

/**
 * AppError class for standardized error handling
 */
export class AppError extends Error {
  type: ErrorType;
  status?: number;
  details?: Record<string, any>;

  constructor(
    message: string,
    type: ErrorType = ErrorType.UNKNOWN,
    status?: number,
    details?: Record<string, any>
  ) {
    super(message);
    this.name = 'AppError';
    this.type = type;
    this.status = status;
    this.details = details;
  }

  /**
   * Factory method to create an API error
   */
  static api(message: string, status?: number, details?: Record<string, any>): AppError {
    return new AppError(message, ErrorType.API, status, details);
  }

  /**
   * Factory method to create an auth error
   */
  static auth(message: string = 'Authentication failed'): AppError {
    return new AppError(message, ErrorType.AUTH, 401);
  }

  /**
   * Factory method to create a network error
   */
  static network(message: string = 'Network connection error'): AppError {
    return new AppError(message, ErrorType.NETWORK);
  }

  /**
   * Factory method to create a validation error
   */
  static validation(message: string, details?: Record<string, any>): AppError {
    return new AppError(message, ErrorType.VALIDATION, 400, details);
  }

  /**
   * Factory method to create a not found error
   */
  static notFound(message: string = 'Resource not found'): AppError {
    return new AppError(message, ErrorType.NOT_FOUND, 404);
  }

  /**
   * Factory method to create a permission error
   */
  static permission(message: string = 'You do not have permission to perform this action'): AppError {
    return new AppError(message, ErrorType.PERMISSION, 403);
  }
}

/**
 * Function to handle errors and display appropriate toast notifications
 */
export function handleError(error: unknown, fallbackMessage: string = 'An unexpected error occurred'): void {
  console.error('Error caught by handler:', error);

  // Default error message and variant
  let message = fallbackMessage;
  let variant: 'default' | 'destructive' = 'destructive';

  // Handle AppError instances
  if (error instanceof AppError) {
    message = error.message;

    // Handle specific error types
    switch (error.type) {
      case ErrorType.AUTH:
        // Redirect to login for auth errors
        if (window.location.pathname !== '/login') {
          message = 'Please log in to continue';
          setTimeout(() => {
            window.location.href = '/login';
          }, 1500);
        }
        break;

      case ErrorType.NETWORK:
        message = 'Network connection issue. Please check your internet connection.';
        break;

      case ErrorType.VALIDATION:
        // Handle validation errors (e.g. form errors)
        // No redirect needed, just show the message
        break;

      case ErrorType.NOT_FOUND:
        // Could redirect to 404 page for not found errors
        break;

      case ErrorType.PERMISSION:
        // Handle permission errors
        break;

      default:
        // Handle other AppError types
        break;
    }
  } else if (error instanceof Error) {
    // Handle standard Error instances
    message = error.message || fallbackMessage;
  }

  // Display toast notification
  toast({
    title: 'Error',
    description: message,
    variant: variant,
  });
}

/**
 * Async try-catch wrapper for error handling
 */
export async function tryCatch<T>(
  promise: Promise<T>,
  fallbackMessage: string = 'An unexpected error occurred'
): Promise<[T | null, AppError | null]> {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    const appError = error instanceof AppError 
      ? error 
      : new AppError(
          error instanceof Error ? error.message : fallbackMessage,
          ErrorType.UNKNOWN
        );
    
    return [null, appError];
  }
}

export default {
  AppError,
  ErrorType,
  handleError,
  tryCatch,
};