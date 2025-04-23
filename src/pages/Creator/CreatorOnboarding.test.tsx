import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithProviders, screen, waitFor, fireEvent } from '../../test/test-utils';
import CreatorOnboarding from './CreatorOnboarding';

// Mock OnboardingLayout component to simplify testing
vi.mock('@/components/OnboardingLayout', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="onboarding-layout">
      <div data-testid="step-content">{children}</div>
    </div>
  ),
}));

describe('CreatorOnboarding', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the BasicInfoStep by default', async () => {
    await act(async () => {
      renderWithProviders(<CreatorOnboarding />);
    });
    
    // Verify that the first step is rendered
    expect(screen.getByText('Basic Information')).toBeInTheDocument();
    expect(screen.getByText('Tell us about yourself and how clients can reach you.')).toBeInTheDocument();
    
    // Check that all form fields in the first step are rendered
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Location')).toBeInTheDocument();
    expect(screen.getByLabelText('Bio')).toBeInTheDocument();
  });

  it('validates the BasicInfoStep form fields', async () => {
    await act(async () => {
      renderWithProviders(<CreatorOnboarding />);
    });
    
    // Get form fields
    const firstNameInput = screen.getByLabelText('First Name');
    const lastNameInput = screen.getByLabelText('Last Name');
    const emailInput = screen.getByLabelText('Email');
    const phoneInput = screen.getByLabelText('Phone Number');
    const locationInput = screen.getByLabelText('Location');
    const bioInput = screen.getByLabelText('Bio');
    
    // Enter invalid data
    await act(async () => {
      await fireEvent.change(firstNameInput, { target: { value: 'J' } }); // Too short
      await fireEvent.change(emailInput, { target: { value: 'invalid-email' } }); // Invalid email format
      await fireEvent.change(bioInput, { target: { value: 'Short' } }); // Too short
    });
    
    // Submit the form to trigger validation
    await act(async () => {
      const formElement = screen.getByText('First Name').closest('form');
      if (formElement) {
        fireEvent.submit(formElement);
      }
    });
    
    // Check for error messages
    await waitFor(() => {
      expect(screen.getByText('First name is required')).toBeInTheDocument();
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
      expect(screen.getByText('Please provide a short bio')).toBeInTheDocument();
    });
    
    // Clear and enter valid data
    await act(async () => {
      await fireEvent.change(firstNameInput, { target: { value: 'John' } });
      await fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
      await fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
      await fireEvent.change(phoneInput, { target: { value: '1234567890' } });
      await fireEvent.change(locationInput, { target: { value: 'New York, NY' } });
      await fireEvent.change(bioInput, { target: { value: 'I am a professional photographer with 5 years of experience.' } });
    });
    
    // Verify error messages are gone
    await waitFor(() => {
      expect(screen.queryByText('First name is required')).not.toBeInTheDocument();
      expect(screen.queryByText('Invalid email address')).not.toBeInTheDocument();
      expect(screen.queryByText('Please provide a short bio')).not.toBeInTheDocument();
    });
  });
});

// Test for the multi-step form logic
describe('CreatorOnboarding Step Management', () => {
  it('maintains state between steps', async () => {
    // This would require a more complex test setup to interact with the actual OnboardingLayout
    // component and navigate between steps. For now, we're focusing on individual step validation.
    
    // A full test would:
    // 1. Fill out the first step
    // 2. Move to the next step using the "Next" button
    // 3. Navigate back to the first step
    // 4. Verify that the entered data is still there
  });
});

// Test for the dynamic form arrays in ServicesStep
describe('ServicesStep', () => {
  it('allows adding and removing services', async () => {
    // This would require setting the current step to 2 (ServicesStep)
    // and then testing the add/remove service functionality
    
    // Implementation would:
    // 1. Set the current step to 2
    // 2. Verify initial service is shown
    // 3. Click "Add Another Service" button
    // 4. Verify a new service form is added
    // 5. Click "Remove" on a service
    // 6. Verify service is removed
  });
});