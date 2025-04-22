import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary?: () => void;
  title?: string;
  showHome?: boolean;
  showDetails?: boolean;
}

/**
 * A reusable error fallback component to display when an error occurs
 */
const ErrorFallback = ({
  error,
  resetErrorBoundary,
  title = 'Something went wrong',
  showHome = true,
  showDetails = false
}: ErrorFallbackProps) => {
  return (
    <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-gray-50 rounded-lg p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="h-6 w-6 text-red-600" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        
        <p className="text-gray-500 mb-6">
          {error?.message || 'An unexpected error occurred. Please try again.'}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {resetErrorBoundary && (
            <Button 
              onClick={resetErrorBoundary} 
              className="flex items-center gap-2"
              variant="default"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          )}
          
          {showHome && (
            <Button 
              onClick={() => window.location.href = '/'}
              className="flex items-center gap-2"
              variant="outline"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
          )}
        </div>

        {showDetails && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md text-left">
            <p className="text-xs font-mono text-gray-600 break-all">
              {error?.stack?.split('\n').slice(0, 3).join('\n')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorFallback;