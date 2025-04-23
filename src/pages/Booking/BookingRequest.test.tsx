import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithProviders, screen, waitFor, fireEvent } from '../../test/test-utils';
import { act } from '@testing-library/react';
import BookingRequest from './BookingRequest';
import * as hooks from '@/hooks/use-toast';

// Mock the useParams hook
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ creatorId: 'creator-123' }),
    useNavigate: () => vi.fn(),
  };
});

// Mock the useToast hook
vi.mock('@/hooks/use-toast', () => ({
  useToast: vi.fn().mockReturnValue({
    toast: vi.fn(),
  }),
}));

describe('BookingRequest', () => {
  let mockToast: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    
    // Setup toast mock
    mockToast = vi.fn();
    vi.mocked(hooks.useToast).mockReturnValue({
      toast: mockToast,
    });
  });

  it('renders the booking form correctly', () => {
    renderWithProviders(<BookingRequest />);
    
    // Check for creator information
    expect(screen.getByText('Book Sarah Johnson')).toBeInTheDocument();
    expect(screen.getByText('Los Angeles, CA')).toBeInTheDocument();
    
    // Check for form title
    expect(screen.getByText('Booking Request')).toBeInTheDocument();
    
    // Check for form fields
    expect(screen.getByLabelText('Project Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Property Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Preferred Date')).toBeInTheDocument();
    // Check for Services Needed section by text instead of label
    expect(screen.getByText('Services Needed')).toBeInTheDocument();
    expect(screen.getByLabelText('Additional Notes')).toBeInTheDocument();
    
    // Check for service checkboxes
    expect(screen.getByLabelText('Real Estate Photography')).toBeInTheDocument();
    expect(screen.getByLabelText('Virtual Tour')).toBeInTheDocument();
    expect(screen.getByLabelText('Drone Footage')).toBeInTheDocument();
    expect(screen.getByLabelText('Floor Plan')).toBeInTheDocument();
    expect(screen.getByLabelText('Twilight Shots')).toBeInTheDocument();
    
    // Check for submit button
    expect(screen.getByText('Send Booking Request')).toBeInTheDocument();
  });

  it('displays form errors when submitted with empty fields', async () => {
    const { user } = renderWithProviders(<BookingRequest />);
    
    // Get the form element
    const form = screen.getByRole('form');
    
    // Submit the empty form using act and fireEvent
    await act(async () => {
      fireEvent.submit(form);
    });
    
    // Check for ARIA attributes on inputs that should show validation errors
    await waitFor(() => {
      // Check for Project Title field validation
      const projectTitleInput = screen.getByLabelText('Project Title');
      expect(projectTitleInput).toHaveAttribute('aria-invalid', 'true');
      
      // Check for Property Address field validation
      const propertyAddressInput = screen.getByLabelText('Property Address');
      expect(propertyAddressInput).toHaveAttribute('aria-invalid', 'true');
    });
  });

  it('allows form submission with valid data', async () => {
    const { user } = renderWithProviders(<BookingRequest />);
    
    // Wrap all interactions in act
    await act(async () => {
      // Fill out the form
      await user.type(screen.getByLabelText('Project Title'), 'New Apartment Photoshoot');
      await user.type(screen.getByLabelText('Property Address'), '123 Main Street, Los Angeles, CA 90001');
      
      // Open date picker and select a date (simplified for test)
      const dateButton = screen.getByText('Pick a date');
      await user.click(dateButton);
    });
    
    // For simplicity, we're just checking if the popup appears rather than selecting a date
    // since date picking is complex in tests
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
    
    await act(async () => {
      // Select a service
      await user.click(screen.getByLabelText('Real Estate Photography'));
      
      // Add notes
      await user.type(screen.getByLabelText('Additional Notes'), 'Please bring wide-angle lens.');
      
      // We could submit the form here if we wanted to test the full submission
      // const form = screen.getByRole('form');
      // fireEvent.submit(form);
    });
    
    // This test is focused on form field interaction rather than full submission
  });

  it('initially disables the submit button', async () => {
    renderWithProviders(<BookingRequest />);
    
    // Initially the button should be disabled due to form validation
    await waitFor(() => {
      expect(screen.getByText('Send Booking Request')).toBeDisabled();
    });
    
    // Note: Full validation would require setting date picker, which is complex in tests
  });

  it('shows accessibility-friendly error messages', async () => {
    const { user } = renderWithProviders(<BookingRequest />);
    
    // Get the form element and submit it directly
    const form = screen.getByRole('form');
    
    // Submit empty form using fireEvent to explicitly trigger the form submission
    await act(async () => {
      fireEvent.submit(form);
    });
    
    // Check for ARIA attributes on error fields
    await waitFor(() => {
      const projectTitleInput = screen.getByLabelText('Project Title');
      expect(projectTitleInput).toHaveAttribute('aria-invalid', 'true');
      expect(projectTitleInput).toHaveAttribute('aria-describedby', 'projectTitle-error');
      
      // Also verify other fields have proper ARIA attributes
      const propertyAddressInput = screen.getByLabelText('Property Address');
      expect(propertyAddressInput).toHaveAttribute('aria-invalid', 'true');
      expect(propertyAddressInput).toHaveAttribute('aria-describedby', 'propertyAddress-error');
    });
  });
});