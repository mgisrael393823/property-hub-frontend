import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchFilters } from './SearchFilters';
import * as useMobileHook from '@/hooks/use-mobile';

describe('SearchFilters', () => {
  // Mock the useMobile hook
  const mockUseMobile = vi.spyOn(useMobileHook, 'useMobile');

  beforeEach(() => {
    // Default to desktop view
    mockUseMobile.mockReturnValue(false);
  });

  it('renders creator filters when view is creators', () => {
    render(<SearchFilters view="creators" />);
    
    // Check for creator-specific filters
    expect(screen.getByPlaceholderText('Enter ZIP code')).toBeInTheDocument();
    expect(screen.getByText('Photography')).toBeInTheDocument();
    expect(screen.getByText('Videography')).toBeInTheDocument();
    expect(screen.getByText('Price Range')).toBeInTheDocument();
    expect(screen.getByText('Availability')).toBeInTheDocument();
    expect(screen.getByText('Verified Only')).toBeInTheDocument();
    
    // Confirm service-specific filters are not present
    expect(screen.queryByText('Property Type')).not.toBeInTheDocument();
    expect(screen.queryByText('Content Type')).not.toBeInTheDocument();
    expect(screen.queryByText('Use Case')).not.toBeInTheDocument();
  });

  it('renders service filters when view is services', () => {
    render(<SearchFilters view="services" />);
    
    // Check for service-specific filters
    expect(screen.getByText('Property Type')).toBeInTheDocument();
    expect(screen.getByText('Multifamily')).toBeInTheDocument();
    expect(screen.getByText('Content Type')).toBeInTheDocument();
    expect(screen.getByText('Interior')).toBeInTheDocument();
    expect(screen.getByText('Use Case')).toBeInTheDocument();
    expect(screen.getByText('Social Media')).toBeInTheDocument();
    
    // Confirm creator-specific filters are not present
    expect(screen.queryByText('Price Range')).not.toBeInTheDocument();
    expect(screen.queryByText('Availability')).not.toBeInTheDocument();
    expect(screen.queryByText('Verified Only')).not.toBeInTheDocument();
  });

  it('renders mobile version with custom styling and icons', () => {
    // Mock mobile view
    mockUseMobile.mockReturnValue(true);
    
    render(<SearchFilters view="creators" />);
    
    // Mobile view should have icons
    const icons = document.querySelectorAll('.h-4.w-4');
    expect(icons.length).toBeGreaterThan(0);
    
    // Check for mobile-specific section headers
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Price Range')).toBeInTheDocument();
    expect(screen.getByText('Availability')).toBeInTheDocument();
    expect(screen.getByText('Quality Filters')).toBeInTheDocument();
  });

  it('updates date when calendar is used', () => {
    render(<SearchFilters view="creators" />);
    
    // Get the date selector button
    const dateButton = screen.getByText('Select date');
    expect(dateButton).toBeInTheDocument();
    
    // Click the date button to open the calendar popover
    fireEvent.click(dateButton);
    
    // Calendar should be visible
    // Look for a day in the calendar (e.g., "15")
    const dayButton = screen.getByRole('gridcell', { name: '15' });
    expect(dayButton).toBeInTheDocument();
    
    // Click on day 15
    fireEvent.click(dayButton);
    
    // Date button should now display the selected date (format varies by locale)
    // We'll just check that it's not "Select date" anymore
    expect(screen.queryByText('Select date')).not.toBeInTheDocument();
  });

  it('shows price range slider with default value', () => {
    render(<SearchFilters view="creators" />);
    
    // Find the slider
    const slider = screen.getByRole('slider');
    expect(slider).toBeInTheDocument();
    
    // Default value should be $500
    expect(screen.getByText('$500')).toBeInTheDocument();
    
    // Verify range text is displayed
    expect(screen.getByText('$0')).toBeInTheDocument();
    expect(screen.getByText('$2000+')).toBeInTheDocument();
    
    // Note: Testing actual slider interactions is complex as it uses 
    // a third-party component with custom DOM manipulation.
    // For a complete test, we would need to mock the slider implementation
    // or use a more advanced approach to simulate dragging.
  });
});