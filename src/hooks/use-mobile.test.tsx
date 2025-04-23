import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useMobile, useActiveBreakpoint, BREAKPOINTS } from './use-mobile';

describe('mobile hooks', () => {
  // Save the original window.innerWidth and matchMedia
  let originalInnerWidth: number;
  
  beforeEach(() => {
    originalInnerWidth = window.innerWidth;
    
    // Clear all mock implementations
    vi.clearAllMocks();
  });
  
  afterEach(() => {
    // Restore the original window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: originalInnerWidth,
    });
  });
  
  // Helper function to simulate window resize
  const simulateResize = (width: number) => {
    // Set innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: width,
    });
    
    // Dispatch resize event
    window.dispatchEvent(new Event('resize'));
  };
  
  describe('useMobile', () => {
    it('should return true when viewport is below the specified breakpoint', async () => {
      // Set viewport width below 'md' breakpoint
      await act(async () => {
        simulateResize(BREAKPOINTS.md - 1);
      });
      
      let result;
      await act(async () => {
        result = renderHook(() => useMobile('md'));
      });
      
      expect(result.result.current).toBe(true);
    });
    
    it('should return false when viewport is at or above the specified breakpoint', async () => {
      // Set viewport width at 'md' breakpoint
      await act(async () => {
        simulateResize(BREAKPOINTS.md);
      });
      
      let result;
      await act(async () => {
        result = renderHook(() => useMobile('md'));
      });
      
      expect(result.result.current).toBe(false);
      
      // Set viewport width above 'md' breakpoint
      await act(async () => {
        simulateResize(BREAKPOINTS.md + 1);
      });
      
      expect(result.result.current).toBe(false);
    });
    
    it('should update when window is resized', async () => {
      // Start with viewport width above 'md' breakpoint
      await act(async () => {
        simulateResize(BREAKPOINTS.md + 100);
      });
      
      let result;
      await act(async () => {
        result = renderHook(() => useMobile('md'));
      });
      
      // Initially should be false (not mobile)
      expect(result.result.current).toBe(false);
      
      // Resize to below 'md' breakpoint
      await act(async () => {
        simulateResize(BREAKPOINTS.md - 100);
      });
      
      // Should now be true (mobile)
      expect(result.result.current).toBe(true);
    });
    
    it('should accept different breakpoints', async () => {
      // Set viewport width between 'sm' and 'md' breakpoints
      await act(async () => {
        simulateResize((BREAKPOINTS.sm + BREAKPOINTS.md) / 2);
      });
      
      // Using 'sm' breakpoint (should be false - above sm)
      let resultSm;
      await act(async () => {
        resultSm = renderHook(() => useMobile('sm'));
      });
      expect(resultSm.result.current).toBe(false);
      
      // Using 'md' breakpoint (should be true - below md)
      let resultMd;
      await act(async () => {
        resultMd = renderHook(() => useMobile('md'));
      });
      expect(resultMd.result.current).toBe(true);
      
      // Using 'lg' breakpoint (should be true - below lg)
      let resultLg;
      await act(async () => {
        resultLg = renderHook(() => useMobile('lg'));
      });
      expect(resultLg.result.current).toBe(true);
    });
    
    it('should use md as default breakpoint', async () => {
      // Set viewport width below 'md' breakpoint
      await act(async () => {
        simulateResize(BREAKPOINTS.md - 1);
      });
      
      let result;
      await act(async () => {
        result = renderHook(() => useMobile());
      });
      
      expect(result.result.current).toBe(true);
    });
  });
  
  describe('useActiveBreakpoint', () => {
    it('should return xs for the smallest screen', async () => {
      await act(async () => {
        simulateResize(BREAKPOINTS.sm - 1);
      });
      
      let result;
      await act(async () => {
        result = renderHook(() => useActiveBreakpoint());
      });
      
      expect(result.result.current).toBe('xs');
    });
    
    it('should return sm for small screens', async () => {
      await act(async () => {
        simulateResize(BREAKPOINTS.sm);
      });
      
      let result;
      await act(async () => {
        result = renderHook(() => useActiveBreakpoint());
      });
      
      expect(result.result.current).toBe('sm');
      
      await act(async () => {
        simulateResize(BREAKPOINTS.md - 1);
      });
      
      expect(result.result.current).toBe('sm');
    });
    
    it('should return md for medium screens', async () => {
      await act(async () => {
        simulateResize(BREAKPOINTS.md);
      });
      
      let result;
      await act(async () => {
        result = renderHook(() => useActiveBreakpoint());
      });
      
      expect(result.result.current).toBe('md');
    });
    
    it('should return lg for large screens', async () => {
      await act(async () => {
        simulateResize(BREAKPOINTS.lg);
      });
      
      let result;
      await act(async () => {
        result = renderHook(() => useActiveBreakpoint());
      });
      
      expect(result.result.current).toBe('lg');
    });
    
    it('should return xl for extra large screens', async () => {
      await act(async () => {
        simulateResize(BREAKPOINTS.xl);
      });
      
      let result;
      await act(async () => {
        result = renderHook(() => useActiveBreakpoint());
      });
      
      expect(result.result.current).toBe('xl');
    });
    
    it('should return 2xl for the largest screens', async () => {
      await act(async () => {
        simulateResize(BREAKPOINTS['2xl']);
      });
      
      let result;
      await act(async () => {
        result = renderHook(() => useActiveBreakpoint());
      });
      
      expect(result.result.current).toBe('2xl');
    });
    
    it('should update when window is resized', async () => {
      await act(async () => {
        simulateResize(BREAKPOINTS.sm);
      });
      
      let result;
      await act(async () => {
        result = renderHook(() => useActiveBreakpoint());
      });
      
      // Initially should be 'sm'
      expect(result.result.current).toBe('sm');
      
      // Resize to 'lg'
      await act(async () => {
        simulateResize(BREAKPOINTS.lg);
      });
      
      // Should now be 'lg'
      expect(result.result.current).toBe('lg');
    });
  });
});