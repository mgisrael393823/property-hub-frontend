import { useState, useEffect, useCallback } from 'react';
import { handleError } from '@/lib/error/errorHandler';

interface UseAsyncDataOptions<T> {
  initialData?: T;
  errorFallback?: T;
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
  dependencies?: any[];
  runImmediately?: boolean;
}

/**
 * A hook for handling asynchronous data fetching with built-in error handling
 * 
 * @param asyncFn - The async function to execute
 * @param options - Configuration options
 * @returns The data, loading state, error, and a refetch function
 * 
 * @example
 * const { data, loading, error, refetch } = useAsyncData(() => api.creators.getAll());
 */
export function useAsyncData<T>(
  asyncFn: () => Promise<T>,
  options: UseAsyncDataOptions<T> = {}
) {
  const {
    initialData,
    errorFallback,
    onSuccess,
    onError,
    dependencies = [],
    runImmediately = true,
  } = options;

  const [data, setData] = useState<T | undefined>(initialData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await asyncFn();
      setData(result);
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      return result;
    } catch (err) {
      console.error('Error in useAsyncData:', err);
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      
      // If we have a fallback value, use it
      if (errorFallback !== undefined) {
        setData(errorFallback);
      }
      
      // Use our error handler to display a toast
      handleError(err);
      
      if (onError) {
        onError(err);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, [asyncFn, errorFallback, onSuccess, onError]);

  useEffect(() => {
    if (runImmediately) {
      fetchData().catch(e => {
        // Error is already handled in fetchData
        // This catch is just to prevent unhandled rejection warnings
      });
    } else {
      setLoading(false); // Initialize as not loading when not running immediately
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies]);

  // The refetch function allows manual re-fetching
  const refetch = useCallback(() => {
    return fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
}

export default useAsyncData;