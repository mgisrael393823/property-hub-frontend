import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen } from '../../../test/test-utils';
import CreatorCard from './index';
import { CreatorCardProps } from './types';
import { ROUTES } from '@/lib/constants';

describe('CreatorCard', () => {
  const mockProps: CreatorCardProps = {
    id: 'creator-123',
    name: 'Jane Smith',
    location: 'New York, NY',
    services: ['Photography', 'Virtual Tours', 'Drone Footage'],
    imageUrl: 'https://example.com/jane-smith.jpg',
    workSamples: [
      { url: 'https://example.com/sample1.jpg', type: 'image' },
      { url: 'https://example.com/sample2.jpg', type: 'image' },
      { url: 'https://example.com/sample3.jpg', type: 'image' },
      { url: 'https://example.com/sample4.jpg', type: 'image' },
    ],
    rating: 4.8,
    responseTime: '< 2h',
    verified: true,
  };

  it('renders creator information correctly', () => {
    renderWithProviders(<CreatorCard {...mockProps} />);
    
    // Check that basic information is rendered
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('New York, NY')).toBeInTheDocument();
    expect(screen.getByText('4.8')).toBeInTheDocument();
    expect(screen.getByText('< 2h')).toBeInTheDocument();
    
    // Check that all services are rendered
    expect(screen.getByText('Photography')).toBeInTheDocument();
    expect(screen.getByText('Virtual Tours')).toBeInTheDocument();
    expect(screen.getByText('Drone Footage')).toBeInTheDocument();
    
    // Check for verified badge
    expect(screen.getByText('Verified')).toBeInTheDocument();
    
    // Check that avatar is rendered
    const avatar = screen.getByAltText('Jane Smith');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'https://example.com/jane-smith.jpg');
    
    // Check that work samples are rendered
    const workSamples = screen.getAllByAltText(/Work sample/);
    expect(workSamples).toHaveLength(4);
    
    // Check for action buttons
    expect(screen.getByText('View Profile')).toBeInTheDocument();
    expect(screen.getByText('Request Booking')).toBeInTheDocument();
  });
  
  it('renders correctly without work samples', () => {
    const propsWithoutSamples = {
      ...mockProps,
      workSamples: undefined,
    };
    
    renderWithProviders(<CreatorCard {...propsWithoutSamples} />);
    
    // Should render the avatar image in the top section
    const mainImage = screen.getByAltText('Jane Smith');
    expect(mainImage).toBeInTheDocument();
    expect(mainImage.closest('.col-span-2')).toBeInTheDocument(); // Should be a larger image
  });
  
  it('renders correctly without verified badge', () => {
    const propsNotVerified = {
      ...mockProps,
      verified: false,
    };
    
    renderWithProviders(<CreatorCard {...propsNotVerified} />);
    
    // Verified badge should not be present
    expect(screen.queryByText('Verified')).not.toBeInTheDocument();
  });
  
  it('renders with default values for optional props', () => {
    const minimalProps = {
      id: 'creator-123',
      name: 'Jane Smith',
      location: 'New York, NY',
      services: ['Photography'],
      imageUrl: 'https://example.com/jane-smith.jpg',
    };
    
    renderWithProviders(<CreatorCard {...minimalProps} />);
    
    // Component should render without errors
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    
    // Default values should be used
    // These are implementation details, so this depends on the component
    // For example, rating might not be visible if not provided
  });
  
  it('has correct links', () => {
    renderWithProviders(<CreatorCard {...mockProps} />);
    
    // Check View Profile link
    const viewProfileLink = screen.getByText('View Profile').closest('a');
    expect(viewProfileLink).toHaveAttribute('href', `${ROUTES.CREATOR}/${mockProps.id}`);
    
    // Check Request Booking link
    const requestBookingLink = screen.getByText('Request Booking').closest('a');
    expect(requestBookingLink).toHaveAttribute('href', `${ROUTES.BOOKING}/${mockProps.id}`);
  });
});