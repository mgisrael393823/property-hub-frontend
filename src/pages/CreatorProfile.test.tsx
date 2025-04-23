import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor, act } from '@testing-library/react';
import { renderWithProviders } from '@/test/test-utils';
import CreatorProfile from './CreatorProfile';
import * as useAsyncDataHook from '@/hooks/use-async-data';

// Mock react-router hooks
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: '1' }),
  };
});

// Mock the Navigation component
vi.mock('@/components/Navigation', () => ({
  default: () => <div data-testid="navigation">Navigation</div>,
}));

// Mock calendar to prevent rendering issues in tests
vi.mock('@/components/ui/calendar', () => ({
  Calendar: () => <div data-testid="calendar">Calendar</div>,
}));

describe('CreatorProfile', () => {
  // Mock creator data matching the structure in the component
  const mockCreator = {
    id: "1",
    name: "Sarah Johnson",
    rating: 4.9,
    responseTime: "< 2h",
    location: "Los Angeles, CA",
    serviceArea: "Greater Los Angeles Area",
    services: ["Real Estate Photography", "Virtual Tours"],
    equipment: ["Sony Alpha A7IV", "DJI Mavic 3 Pro"],
    tags: ["Fast Turnaround", "Licensed Drone Pilot"],
    avatarUrl: "https://example.com/avatar.jpg",
    bannerUrl: "https://example.com/banner.jpg",
    bio: "Professional photographer specializing in real estate",
    verified: true,
    portfolio: [
      {
        id: "1",
        imageUrl: "https://example.com/image1.jpg",
        title: "Modern Kitchen Design",
        type: "Interior"
      },
      {
        id: "2",
        imageUrl: "https://example.com/image2.jpg",
        title: "Luxury Home Exterior",
        type: "Exterior"
      }
    ],
    reviews: [
      {
        id: "1",
        author: "Michael Davis",
        authorImage: "https://example.com/michael.jpg",
        rating: 5,
        date: "2 weeks ago",
        text: "Great experience working with Sarah"
      }
    ],
    pricingPlans: [
      {
        name: "Standard",
        price: 249,
        description: "Perfect for smaller properties",
        features: ["Up to 25 photos", "1 property"]
      }
    ],
    availability: {
      nextAvailable: "Tomorrow",
      businessHours: "Mon-Fri: 8am-6pm"
    }
  };

  // Setup mock for useAsyncData
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', async () => {
    // Mock the hook to return loading state
    const mockUseAsyncData = vi.spyOn(useAsyncDataHook, 'useAsyncData');
    mockUseAsyncData.mockReturnValue({
      data: null,
      loading: true,
      error: null,
      refetch: vi.fn(),
    });

    await act(async () => {
      renderWithProviders(<CreatorProfile />);
    });

    // Check that loading skeleton elements are rendered
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
    
    // Look for skeleton elements
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
    
    // Sarah Johnson shouldn't be visible in loading state
    expect(screen.queryByText('Sarah Johnson')).not.toBeInTheDocument();
  });

  it('renders error state when data fetch fails', async () => {
    // Mock the hook to return error state
    const mockUseAsyncData = vi.spyOn(useAsyncDataHook, 'useAsyncData');
    const mockRefetch = vi.fn();
    mockUseAsyncData.mockReturnValue({
      data: null,
      loading: false,
      error: new Error('Failed to load creator'),
      refetch: mockRefetch,
    });

    await act(async () => {
      renderWithProviders(<CreatorProfile />);
    });

    // Check that error UI is rendered
    expect(screen.getByText('Error loading creator profile')).toBeInTheDocument();
    expect(screen.getByText('We couldn\'t load this creator\'s profile. Please try again.')).toBeInTheDocument();
    
    // Check that retry button exists
    const retryButton = screen.getByRole('button', { name: /retry/i });
    expect(retryButton).toBeInTheDocument();
    
    // Test retry functionality
    await act(async () => {
      retryButton.click();
    });
    
    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });

  it('renders creator profile successfully', async () => {
    // Mock the hook to return success state with data
    const mockUseAsyncData = vi.spyOn(useAsyncDataHook, 'useAsyncData');
    mockUseAsyncData.mockReturnValue({
      data: mockCreator,
      loading: false,
      error: null,
      refetch: vi.fn(),
    });

    await act(async () => {
      renderWithProviders(<CreatorProfile />);
    });

    // Check that creator profile content is rendered
    expect(screen.getByText('Sarah Johnson')).toBeInTheDocument();
    expect(screen.getByText('Los Angeles, CA')).toBeInTheDocument();
    expect(screen.getByText('4.9')).toBeInTheDocument();
    expect(screen.getByText('< 2h response')).toBeInTheDocument();
    
    // Check for services
    expect(screen.getByText('Real Estate Photography')).toBeInTheDocument();
    expect(screen.getByText('Virtual Tours')).toBeInTheDocument();

    // Check for booking button
    expect(screen.getByRole('button', { name: 'Request Booking' })).toBeInTheDocument();
    
    // Check for about section content
    expect(screen.getByText(/Professional photographer specializing in real estate/)).toBeInTheDocument();
    
    // Check for equipment list
    expect(screen.getByText('Sony Alpha A7IV')).toBeInTheDocument();
    expect(screen.getByText('DJI Mavic 3 Pro')).toBeInTheDocument();
    
    // Check for availability section
    expect(screen.getByText('Availability')).toBeInTheDocument();
    expect(screen.getByText('Next available: Tomorrow')).toBeInTheDocument();
    expect(screen.getByText('Mon-Fri: 8am-6pm')).toBeInTheDocument();
  });

  it('has tabs structure available', async () => {
    // Mock the hook to return success state with data
    const mockUseAsyncData = vi.spyOn(useAsyncDataHook, 'useAsyncData');
    mockUseAsyncData.mockReturnValue({
      data: mockCreator,
      loading: false,
      error: null,
      refetch: vi.fn(),
    });

    await act(async () => {
      renderWithProviders(<CreatorProfile />);
    });

    // Check that tabs structure exists
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Reviews')).toBeInTheDocument();
    
    // In a real browser environment, tabs would work
    // For testing purposes, we're just verifying they exist
    // and that the content is in the document (even if hidden)
  });

  it('displays pricing information correctly', async () => {
    // Mock the hook to return success state with data
    const mockUseAsyncData = vi.spyOn(useAsyncDataHook, 'useAsyncData');
    mockUseAsyncData.mockReturnValue({
      data: mockCreator,
      loading: false,
      error: null,
      refetch: vi.fn(),
    });

    await act(async () => {
      renderWithProviders(<CreatorProfile />);
    });

    // Check that pricing content is rendered
    expect(screen.getByRole('heading', { name: 'Pricing' })).toBeInTheDocument();
    expect(screen.getByText('Standard')).toBeInTheDocument();
    expect(screen.getByText('$249')).toBeInTheDocument();
    expect(screen.getByText('Perfect for smaller properties')).toBeInTheDocument();
    
    // Check for pricing features
    expect(screen.getByText('Up to 25 photos')).toBeInTheDocument();
    expect(screen.getByText('1 property')).toBeInTheDocument();
    
    // Check for select button
    expect(screen.getByRole('button', { name: 'Select Standard' })).toBeInTheDocument();
  });
});