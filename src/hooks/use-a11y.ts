import { useCallback, useEffect, useRef } from 'react';

interface A11yNavigationProps {
  onEscape?: () => void;
}

/**
 * Hook for managing accessibility in navigation and interactive components
 */
export function useA11yNavigation(props?: A11yNavigationProps) {
  const { onEscape } = props || {};
  
  /**
   * Traps focus within the provided element ref
   * Useful for modals, dialogs, and other components that need focus containment
   */
  const trapFocus = useCallback((elementRef: React.RefObject<HTMLElement>) => {
    return (e: React.KeyboardEvent) => {
      // Handle escape key if provided
      if (e.key === 'Escape' && onEscape) {
        onEscape();
        return;
      }
      
      // If not Tab key, do nothing
      if (e.key !== 'Tab' || !elementRef.current) return;
      
      // Get all focusable elements
      const focusableElements = elementRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length === 0) return;
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      // If shift + tab and on first element, move to last element
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } 
      // If tab and on last element, move to first element
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };
  }, [onEscape]);
  
  /**
   * Announces a message to screen readers
   */
  const announceToScreenReader = useCallback((message: string, politeness: 'polite' | 'assertive' = 'polite') => {
    // Create or get the announcer element
    let announcer = document.getElementById('a11y-announcer');
    
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.id = 'a11y-announcer';
      announcer.className = 'sr-only';
      document.body.appendChild(announcer);
    }
    
    // Set the appropriate aria-live attribute
    announcer.setAttribute('aria-live', politeness);
    
    // Clear the announcer first (for some screen readers)
    announcer.textContent = '';
    
    // Set the message after a small delay (helps with some screen readers)
    setTimeout(() => {
      if (announcer) {
        announcer.textContent = message;
      }
    }, 50);
  }, []);
  
  /**
   * Focuses on the first element with an error
   * Useful after form validation
   */
  const focusOnFirstError = useCallback(() => {
    const firstError = document.querySelector('[aria-invalid="true"]') as HTMLElement;
    if (firstError) {
      firstError.focus();
      
      // Also announce the error to screen readers
      const errorMessage = firstError.getAttribute('aria-errormessage');
      if (errorMessage) {
        announceToScreenReader(`Error: ${errorMessage}`, 'assertive');
      }
    }
  }, [announceToScreenReader]);
  
  /**
   * Detects if user is navigating with keyboard
   * Useful for conditionally showing focus styles
   */
  const useKeyboardNavigation = () => {
    const [isKeyboardUser, setIsKeyboardUser] = useState(false);
    
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          setIsKeyboardUser(true);
        }
      };
      
      const handleMouseDown = () => {
        setIsKeyboardUser(false);
      };
      
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('mousedown', handleMouseDown);
      
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('mousedown', handleMouseDown);
      };
    }, []);
    
    return isKeyboardUser;
  };
  
  /**
   * Checks if high contrast mode is active
   */
  const useHighContrastMode = () => {
    const [isHighContrast, setIsHighContrast] = useState(false);
    
    useEffect(() => {
      // Check for high contrast mode
      const checkHighContrast = () => {
        const isHighContrastMode = window.matchMedia('(forced-colors: active)').matches;
        setIsHighContrast(isHighContrastMode);
      };
      
      checkHighContrast();
      
      // Add listener for changes (e.g., user toggles OS settings)
      const mediaQuery = window.matchMedia('(forced-colors: active)');
      mediaQuery.addEventListener('change', checkHighContrast);
      
      return () => {
        mediaQuery.removeEventListener('change', checkHighContrast);
      };
    }, []);
    
    return isHighContrast;
  };
  
  return {
    trapFocus,
    announceToScreenReader,
    focusOnFirstError,
    useKeyboardNavigation,
    useHighContrastMode
  };
}

export default useA11yNavigation;