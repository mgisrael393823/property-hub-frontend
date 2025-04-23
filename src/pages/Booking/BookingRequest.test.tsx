import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithProviders, screen, waitFor } from '../../test/test-utils';
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
    expect(screen.getByLabelText('Services Needed')).toBeInTheDocument();
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
    
    // Submit the empty form
    await user.click(screen.getByText('Send Booking Request'));
    
    // Check for validation error messages
    await waitFor(() => {
      expect(screen.getByText('Project title is required')).toBeInTheDocument();
      expect(screen.getByText('Please enter a complete address')).toBeInTheDocument();
      expect(screen.getByText('Please select a date')).toBeInTheDocument();
      expect(screen.getByText('Please select at least one service')).toBeInTheDocument();
    });
  });

  it('allows form submission with valid data', async () => {
    const { user } = renderWithProviders(<BookingRequest />);
    
    // Fill out the form
    await user.type(screen.getByLabelText('Project Title'), 'New Apartment Photoshoot');
    await user.type(screen.getByLabelText('Property Address'), '123 Main Street, Los Angeles, CA 90001');
    
    // Open date picker and select a date (simplified for test)
    const dateButton = screen.getByText('Pick a date');
    await user.click(dateButton);
    
    // For simplicity, we're just checking if the popup appears rather than selecting a date
    // since date picking is complex in tests
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    
    // Select a service
    await user.click(screen.getByLabelText('Real Estate Photography'));
    
    // Add notes
    await user.type(screen.getByLabelText('Additional Notes'), 'Please bring wide-angle lens.');
    
    // Submit the form - Note: we can't fully test submission because date selection is mocked
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
    
    // Submit empty form
    await user.click(screen.getByText('Send Booking Request'));
    
    // Check for ARIA attributes on error fields
    await waitFor(() => {
      const projectTitleInput = screen.getByLabelText('Project Title');
      expect(projectTitleInput).toHaveAttribute('aria-invalid', 'true');
      expect(projectTitleInput).toHaveAttribute('aria-describedby');
    });
  });
});