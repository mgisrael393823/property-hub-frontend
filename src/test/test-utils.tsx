import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

// Interface for wrapped render options
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  route?: string;
}

/**
 * Custom render function that wraps components with necessary providers
 * @param ui - The React component to render
 * @param options - Additional render options
 * @returns The rendered component with testing utilities
 */
export function renderWithProviders(
  ui: ReactElement,
  { route = '/', ...renderOptions }: CustomRenderOptions = {}
) {
  // Set up window location for the test
  window.history.pushState({}, 'Test page', route);

  // Create user event instance for simulating user interactions
  const user = userEvent.setup();

  // Create a wrapper with all providers
  const AllProviders = ({ children }: { children: React.ReactNode }) => {
    return (
      <BrowserRouter>
        {children}
      </BrowserRouter>
    );
  };

  // Return the rendered component with additional testing utilities
  return {
    user,
    ...render(ui, { wrapper: AllProviders, ...renderOptions })
  };
}

/**
 * Helper function to create a mock response for fetch
 */
export function createMockResponse(data: any, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data)),
  };
}

/**
 * Mocks the fetch function for testing API calls
 */
export function setupFetchMock(responseData: any, status = 200) {
  global.fetch = vi.fn().mockResolvedValue(createMockResponse(responseData, status));
}

/**
 * Restore the fetch mock
 */
export function clearFetchMock() {
  if (global.fetch && typeof (global.fetch as any).mockRestore === 'function') {
    (global.fetch as any).mockRestore();
  }
}

// Re-export everything from testing-library for convenience
export * from '@testing-library/react';