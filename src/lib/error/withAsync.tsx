import React, { useState, useEffect } from 'react';
import { EmptyState } from '@/components/ui/empty-state';
import { LoadingState } from '@/components/ui/loading-state';
import { RefreshCw } from 'lucide-react';
import { handleError } from './errorHandler';

interface WithAsyncProps<T> {
  asyncFn: () => Promise<T>;
  loadingComponent?: React.ReactNode;
  errorComponent?: (error: Error, retry: () => void) => React.ReactNode;
  children: (data: T) => React.ReactNode;
  dependencies?: React.DependencyList;
}

/**
 * Higher-order component for handling asynchronous data fetching
 * with loading, error, and success states
 */
export function WithAsync<T>({
  asyncFn,
  loadingComponent,
  errorComponent,
  children,
  dependencies = [],
}: WithAsyncProps<T>): JSX.Element {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await asyncFn();
      setData(result);
    } catch (err) {
      console.error('Error in WithAsync:', err);
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      
      // Use our error handler to display a toast
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  if (loading) {
    return loadingComponent ? (
      <>{loadingComponent}</>
    ) : (
      <div className="w-full py-20 flex items-center justify-center">
        <LoadingState text="Loading..." />
      </div>
    );
  }

  if (error) {
    if (errorComponent) {
      return <>{errorComponent(error, fetchData)}</>;
    }
    
    return (
      <EmptyState
        type="loading-error"
        title="Failed to load data"
        description={error.message || "There was an error loading the data. Please try again."}
        action={{
          label: "Retry",
          onClick: fetchData,
          icon: <RefreshCw className="h-4 w-4" />,
        }}
      />
    );
  }

  if (!data) {
    return (
      <EmptyState
        type="no-results"
        title="No data available"
        description="There's currently no data to display."
        action={{
          label: "Refresh",
          onClick: fetchData,
          icon: <RefreshCw className="h-4 w-4" />,
        }}
      />
    );
  }

  return <>{children(data)}</>;
}

export default WithAsync;