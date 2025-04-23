import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAsyncData } from './use-async-data';

// Mock the error handler function
vi.mock('@/lib/error/errorHandler', () => ({
  handleError: vi.fn(),
}));

describe('useAsyncData', () => {
  // Reset mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return initial state correctly', async () => {
    const initialData = { test: 'data' };
    const asyncFn = vi.fn().mockResolvedValue({ test: 'resolved' });
    
    const { result } = renderHook(() => useAsyncData(asyncFn, { initialData, runImmediately: false }));
    
    expect(result.current.data).toEqual(initialData);
    expect(result.current.loading).toBe(false); // Not loading because runImmediately is false
    expect(result.current.error).toBeNull();
    expect(typeof result.current.refetch).toBe('function');
  });
  
  it('should handle successful async function execution', async () => {
    const resolvedData = { test: 'resolved' };
    const asyncFn = vi.fn().mockResolvedValue(resolvedData);
    const onSuccess = vi.fn();
    
    const { result } = renderHook(() => 
      useAsyncData(asyncFn, { onSuccess, runImmediately: false })
    );
    
    // Initially loading is false
    expect(result.current.loading).toBe(false);
    
    // Trigger fetch manually
    await act(async () => {
      result.current.refetch();
    });
    
    // Wait for the async function to resolve
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual(resolvedData);
    });
    
    // Check the data is updated
    expect(result.current.error).toBeNull();
    expect(onSuccess).toHaveBeenCalledWith(resolvedData);
    expect(asyncFn).toHaveBeenCalledTimes(1);
  });
  
  it('should handle async function errors', async () => {
    const testError = new Error('Test error');
    const asyncFn = vi.fn().mockRejectedValue(testError);
    const onError = vi.fn();
    const errorFallback = { test: 'fallback' };
    
    const { result } = renderHook(() => 
      useAsyncData(asyncFn, { onError, errorFallback, runImmediately: false })
    );
    
    // Trigger fetch manually and expect error
    await expect(result.current.refetch()).rejects.toThrow('Test error');
    
    // Wait for the async function to reject
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    // Check error handling
    expect(result.current.error).toEqual(testError);
    expect(result.current.data).toEqual(errorFallback);
    expect(onError).toHaveBeenCalledWith(testError);
    
    // Check that handleError was called
    const { handleError } = await import('@/lib/error/errorHandler');
    expect(handleError).toHaveBeenCalledWith(testError);
  });
  
  it('should refetch data when refetch is called', async () => {
    const resolvedData = { test: 'resolved' };
    const asyncFn = vi.fn().mockResolvedValue(resolvedData);
    
    const { result } = renderHook(() => useAsyncData(asyncFn, { runImmediately: false }));
    
    // First fetch
    await act(async () => {
      result.current.refetch();
    });
    
    // Wait for initial load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual(resolvedData);
    });
    
    // Reset the mock to track the next call
    asyncFn.mockClear();
    
    // Call refetch again
    await act(async () => {
      result.current.refetch();
    });
    
    // Wait for the second load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    // Check that asyncFn was called again
    expect(asyncFn).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(resolvedData);
  });
  
  it('should refetch when dependencies change', async () => {
    const resolvedData1 = { test: 'resolved1' };
    const resolvedData2 = { test: 'resolved2' };
    const asyncFn = vi.fn()
      .mockResolvedValueOnce(resolvedData1)
      .mockResolvedValueOnce(resolvedData2);
    
    const dependency = { value: 1 };
    
    const { result, rerender } = renderHook(
      (props) => useAsyncData(asyncFn, { dependencies: [props.value] }),
      { initialProps: { value: dependency.value } }
    );
    
    // Wait for initial load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.data).toEqual(resolvedData1);
    
    // Change the dependency and rerender
    await act(async () => {
      dependency.value = 2;
      rerender({ value: dependency.value });
    });
    
    // Wait for the second load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual(resolvedData2);
    });
    
    expect(asyncFn).toHaveBeenCalledTimes(2);
  });
});