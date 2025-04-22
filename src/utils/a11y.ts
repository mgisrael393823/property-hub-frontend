/**
 * Accessibility testing utilities
 * This file provides functions to help with accessibility testing
 */

// Initialize axe only in development mode
export const initializeA11yTesting = () => {
  if (process.env.NODE_ENV !== 'production') {
    import('@axe-core/react').then(({ default: reactAxe }) => {
      reactAxe(React, ReactDOM, 1000, {
        rules: [
          // Include specific rules or customize existing ones
          { id: 'color-contrast', enabled: true },
          { id: 'landmark-one-main', enabled: true },
          { id: 'region', enabled: true }
        ]
      });
      console.log('Accessibility testing initialized with axe-core');
    });
  }
};

// Utility to check if high contrast mode is active
export const isHighContrastMode = (): boolean => {
  // Most reliable way to detect high contrast mode is through media query
  return window.matchMedia('(forced-colors: active)').matches;
};

// Helper to announce messages to screen readers
export const announceToScreenReader = (message: string): void => {
  const announcer = document.getElementById('a11y-announcer');
  
  if (announcer) {
    announcer.textContent = message;
  } else {
    // Create announcer if it doesn't exist
    const newAnnouncer = document.createElement('div');
    newAnnouncer.id = 'a11y-announcer';
    newAnnouncer.setAttribute('aria-live', 'polite');
    newAnnouncer.setAttribute('aria-atomic', 'true');
    newAnnouncer.className = 'sr-only';
    newAnnouncer.textContent = message;
    document.body.appendChild(newAnnouncer);
  }
};

// Helper to focus on first error for keyboard users
export const focusOnFirstError = (): void => {
  const firstError = document.querySelector('[aria-invalid="true"]');
  if (firstError && firstError instanceof HTMLElement) {
    firstError.focus();
  }
};

// Trap focus in modal/dialog
export const trapFocus = (element: HTMLElement): () => void => {
  const focusableElements = element.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    
    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  };
  
  element.addEventListener('keydown', handleKeyDown);
  
  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleKeyDown);
  };
};

// Export types for accessibility props
export interface A11yProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-controls'?: string;
  'aria-expanded'?: boolean;
  'aria-hidden'?: boolean;
  'aria-live'?: 'polite' | 'assertive' | 'off';
  role?: string;
  tabIndex?: number;
}