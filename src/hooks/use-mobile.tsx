import { useState, useEffect } from 'react';

// Breakpoint sizes based on Tailwind defaults
export const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

type Breakpoint = keyof typeof BREAKPOINTS;

/**
 * Hook to detect if the current viewport is below a specified breakpoint
 * 
 * @param breakpoint The breakpoint to check against (default: 'md')
 * @returns Boolean indicating if the viewport is below the specified breakpoint
 * 
 * Example usage:
 * const isMobile = useMobile('md');
 * if (isMobile) {
 *   // Render mobile version
 * } else {
 *   // Render desktop version
 * }
 */
export function useMobile(breakpoint: Breakpoint = 'md'): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const breakpointValue = BREAKPOINTS[breakpoint];

    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpointValue);
    };

    // Check on mount and when window resizes
    window.addEventListener('resize', checkIsMobile);
    checkIsMobile();

    // Cleanup on unmount
    return () => window.removeEventListener('resize', checkIsMobile);
  }, [breakpoint]);

  return isMobile;
}

/**
 * Hook that returns the current active breakpoint name
 * 
 * @returns The current breakpoint name ('xs', 'sm', 'md', 'lg', 'xl', '2xl')
 * 
 * Example usage:
 * const activeBreakpoint = useActiveBreakpoint();
 * if (activeBreakpoint === 'xs' || activeBreakpoint === 'sm') {
 *   // Do something for mobile
 * }
 */
export function useActiveBreakpoint(): Breakpoint {
  const [activeBreakpoint, setActiveBreakpoint] = useState<Breakpoint>('xs');

  useEffect(() => {
    const determineBreakpoint = () => {
      const width = window.innerWidth;
      
      // Check from largest to smallest to find the current breakpoint
      if (width >= BREAKPOINTS['2xl']) return '2xl';
      if (width >= BREAKPOINTS.xl) return 'xl';
      if (width >= BREAKPOINTS.lg) return 'lg';
      if (width >= BREAKPOINTS.md) return 'md';
      if (width >= BREAKPOINTS.sm) return 'sm';
      return 'xs';
    };

    const onResize = () => {
      setActiveBreakpoint(determineBreakpoint());
    };

    // Check on mount and when window resizes
    window.addEventListener('resize', onResize);
    onResize();

    // Cleanup
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return activeBreakpoint;
}

/**
 * Legacy hook for backward compatibility
 * @returns Boolean indicating if the screen is mobile size
 */
export function useIsMobile() {
  return useMobile('md');
}

export default useMobile;