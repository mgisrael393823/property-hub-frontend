import { useState, useCallback } from 'react';
import { handleError } from '@/lib/error/errorHandler';
import { AppError } from '@/lib/error/errorHandler';

interface UseOptimisticMutationOptions<T, U> {
  onSuccess?: (result: U, input: T) => void;
  onError?: (error: unknown, input: T) => void;
  optimisticUpdate?: (input: T) => void;
  rollback?: (input: T) => void;
}

/**
 * A hook for optimistic mutations with built-in error handling
 * 
 * @param mutationFn - The async function to execute
 * @param options - Configuration options
 * @returns The mutate function, loading state, error, and reset function
 * 
 * @example
 * const { mutate, loading, error } = useOptimisticMutation(
 *   (id: string) => api.projects.delete(id),
 *   {
 *     optimisticUpdate: (id) => setProjects(prev => prev.filter(p => p.id !== id)),
 *     rollback: () => refetch(), // Refetch if the mutation fails
 *   }
 * );
 */
export function useOptimisticMutation<T, U = unknown>(
  mutationFn: (input: T) => Promise<U>,
  options: UseOptimisticMutationOptions<T, U> = {}
) {
  const {
    onSuccess,
    onError,
    optimisticUpdate,
    rollback,
  } = options;

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const reset = useCallback(() => {
    setError(null);
  }, []);

  const mutate = useCallback(async (input: T) => {
    setLoading(true);
    setError(null);

    // Apply optimistic update if provided
    if (optimisticUpdate) {
      try {
        optimisticUpdate(input);
      } catch (err) {
        console.error('Error during optimistic update:', err);
      }
    }

    try {
      const result = await mutationFn(input);
      
      if (onSuccess) {
        onSuccess(result, input);
      }
      
      return result;
    } catch (err) {
      console.error('Error in mutation:', err);
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      
      // If we have a rollback function, execute it
      if (rollback) {
        try {
          rollback(input);
        } catch (rollbackErr) {
          console.error('Error during rollback:', rollbackErr);
        }
      }
      
      // Use our error handler to display a toast
      if (err instanceof AppError || err instanceof Error) {
        handleError(err);
      } else {
        handleError(new Error('An unknown error occurred during mutation'));
      }
      
      if (onError) {
        onError(err, input);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, [mutationFn, onSuccess, onError, optimisticUpdate, rollback]);

  return { mutate, loading, error, reset };
}

export default useOptimisticMutation;