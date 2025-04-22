import React from 'react';
import { Link, useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, AlertTriangle, RefreshCw } from 'lucide-react';
import { ROUTES } from '@/lib/constants';

/**
 * Generic error page for handling router errors
 */
const ErrorPage = () => {
  const error = useRouteError();
  
  let errorMessage = 'An unexpected error occurred';
  let statusCode = 500;
  
  // Extract error information if it's a route error
  if (isRouteErrorResponse(error)) {
    statusCode = error.status;
    errorMessage = error.data?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="h-10 w-10 text-red-500" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Something went wrong</h1>
        <h2 className="text-xl font-medium text-gray-800 mb-4">Error {statusCode}</h2>
        
        <p className="text-gray-500 mb-8">
          {errorMessage}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={() => window.location.reload()}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
          
          <Button 
            onClick={() => window.history.back()}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          
          <Link to={ROUTES.HOME}>
            <Button className="flex items-center gap-2 w-full">
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;