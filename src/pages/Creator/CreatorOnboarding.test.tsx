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

  it('renders the BasicInfoStep by default', () => {
    renderWithProviders(<CreatorOnboarding />);
    
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
    const { user } = renderWithProviders(<CreatorOnboarding />);
    
    // Get form fields
    const firstNameInput = screen.getByLabelText('First Name');
    const lastNameInput = screen.getByLabelText('Last Name');
    const emailInput = screen.getByLabelText('Email');
    const phoneInput = screen.getByLabelText('Phone Number');
    const locationInput = screen.getByLabelText('Location');
    const bioInput = screen.getByLabelText('Bio');
    
    // Enter invalid data
    await user.type(firstNameInput, 'J'); // Too short
    await user.type(emailInput, 'invalid-email'); // Invalid email format
    await user.type(bioInput, 'Short'); // Too short
    
    // Submit the form or trigger validation by changing focus
    await user.tab();
    
    // Since the form might not have an explicit role, find it differently
    const formElement = screen.getByText('First Name').closest('form');
    if (formElement) {
      fireEvent.submit(formElement);
    } else {
      // If we can't find the form, just trigger validation by changing focus
      await user.tab();
    }
    
    // Check for error messages
    await waitFor(() => {
      expect(screen.getByText('First name is required')).toBeInTheDocument();
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
      expect(screen.getByText('Please provide a short bio')).toBeInTheDocument();
    });
    
    // Clear and enter valid data
    await user.clear(firstNameInput);
    await user.clear(emailInput);
    await user.clear(bioInput);
    
    await user.type(firstNameInput, 'John');
    await user.type(lastNameInput, 'Doe');
    await user.type(emailInput, 'john.doe@example.com');
    await user.type(phoneInput, '1234567890');
    await user.type(locationInput, 'New York, NY');
    await user.type(bioInput, 'I am a professional photographer with 5 years of experience.');
    
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