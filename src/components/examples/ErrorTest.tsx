import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { AppError, ErrorType } from '@/lib/error/errorHandler';
import ErrorBoundary from '@/lib/error/ErrorBoundary';
import { EmptyState } from '@/components/ui/empty-state';
import { AlertTriangle, Bug, Server, ShieldAlert, Wifi, Loader } from 'lucide-react';
import WithAsync from '@/lib/error/withAsync';
import api from '@/lib/api';
import useAsyncData from '@/hooks/use-async-data';

// Component that will throw a render error
const BuggyComponent = ({ shouldThrow = false }) => {
  if (shouldThrow) {
    throw new Error('This is a simulated render error');
  }
  
  return <div>This component works correctly when not throwing</div>;
};

// Simulated async functions for testing
const simulateApiRequest = async (errorType?: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (errorType) {
    if (errorType === 'auth') {
      throw AppError.auth('Simulated authentication error');
    } else if (errorType === 'network') {
      throw AppError.network('Simulated network error');
    } else if (errorType === 'validation') {
      throw AppError.validation('Simulated validation error', { field: 'This field has an error' });
    } else if (errorType === 'notFound') {
      throw AppError.notFound('Simulated 404 error');
    } else if (errorType === 'permission') {
      throw AppError.permission('Simulated permission error');
    } else {
      throw new Error('Generic error');
    }
  }
  
  return { success: true, message: 'Data loaded successfully' };
};

// Error test card component
const ErrorTestCard = ({ title, description, icon, children }: {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <Card className="mb-6">
    <CardHeader>
      <div className="flex items-center gap-2">
        {icon}
        <CardTitle>{title}</CardTitle>
      </div>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      {children}
    </CardContent>
  </Card>
);

/**
 * ErrorTest component to showcase different error handling patterns
 */
const ErrorTest = () => {
  const [shouldThrow, setShouldThrow] = useState(false);
  const [errorType, setErrorType] = useState<string | undefined>();
  
  // Example of using the useAsyncData hook
  const { data, loading, error, refetch } = useAsyncData(
    () => simulateApiRequest(errorType),
    { 
      dependencies: [errorType],
      initialData: { success: false, message: 'Not loaded yet' }
    }
  );

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-4">Error Handling Test Page</h1>
      <p className="text-gray-600 mb-6">
        This page demonstrates different error handling patterns in the application.
      </p>
      
      <ErrorTestCard 
        title="Error Boundary" 
        description="Test React error boundaries for component render errors"
        icon={<Bug className="h-5 w-5 text-red-500" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <ErrorBoundary>
              <BuggyComponent shouldThrow={shouldThrow} />
            </ErrorBoundary>
          </div>
          <div>
            <Button 
              variant={shouldThrow ? "default" : "outline"}
              onClick={() => setShouldThrow(!shouldThrow)}
            >
              {shouldThrow ? "Fix Component" : "Break Component"}
            </Button>
          </div>
        </div>
      </ErrorTestCard>
      
      <ErrorTestCard 
        title="API Error Handling" 
        description="Test handling of different API error types"
        icon={<Server className="h-5 w-5 text-blue-500" />}
      >
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => setErrorType(undefined)}>
              Success
            </Button>
            <Button variant="outline" size="sm" onClick={() => setErrorType('auth')}>
              Auth Error
            </Button>
            <Button variant="outline" size="sm" onClick={() => setErrorType('network')}>
              Network Error
            </Button>
            <Button variant="outline" size="sm" onClick={() => setErrorType('validation')}>
              Validation Error
            </Button>
            <Button variant="outline" size="sm" onClick={() => setErrorType('notFound')}>
              Not Found
            </Button>
            <Button variant="outline" size="sm" onClick={() => setErrorType('permission')}>
              Permission Error
            </Button>
            <Button variant="outline" size="sm" onClick={() => setErrorType('generic')}>
              Generic Error
            </Button>
          </div>
          
          <Card className="p-4 bg-gray-50">
            <CardTitle className="text-sm font-medium mb-2">Result:</CardTitle>
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader className="h-4 w-4 animate-spin" />
                <span>Loading...</span>
              </div>
            ) : error ? (
              <div className="text-red-500 text-sm">
                <span className="font-medium">Error:</span> {error.message}
              </div>
            ) : (
              <pre className="text-xs p-2 bg-gray-100 rounded">
                {JSON.stringify(data, null, 2)}
              </pre>
            )}
          </Card>
        </div>
      </ErrorTestCard>
      
      <ErrorTestCard 
        title="WithAsync HOC" 
        description="Test the WithAsync higher-order component"
        icon={<Wifi className="h-5 w-5 text-green-500" />}
      >
        <div>
          <WithAsync
            asyncFn={() => simulateApiRequest(errorType)}
            dependencies={[errorType]}
          >
            {(data) => (
              <div className="p-4 bg-green-50 rounded-md">
                <p className="font-medium text-green-800">Data loaded successfully:</p>
                <pre className="text-xs p-2 bg-white rounded mt-2">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
            )}
          </WithAsync>
        </div>
      </ErrorTestCard>
      
      <ErrorTestCard 
        title="Empty States" 
        description="Test different empty and error states"
        icon={<AlertTriangle className="h-5 w-5 text-yellow-500" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <EmptyState 
            type="empty"
            title="No items found"
            description="There are no items to display."
            action={{
              label: "Create Item",
              onClick: () => toast({ title: "Create action triggered" }),
            }}
          />
          
          <EmptyState 
            type="error"
            title="Something went wrong"
            description="We couldn't load your data. Please try again."
            action={{
              label: "Try Again",
              onClick: () => toast({ title: "Retry action triggered" }),
            }}
          />
        </div>
      </ErrorTestCard>
      
      <ErrorTestCard 
        title="Authentication Errors" 
        description="Test authentication error handling"
        icon={<ShieldAlert className="h-5 w-5 text-purple-500" />}
      >
        <Button 
          variant="outline"
          onClick={() => {
            toast({
              title: 'Authentication test',
              description: 'This would normally redirect to login page'
            });
          }}
        >
          Simulate Auth Error
        </Button>
      </ErrorTestCard>
    </div>
  );
};

export default ErrorTest;