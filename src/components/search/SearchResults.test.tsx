import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithProviders, screen, waitFor } from '../../test/test-utils';
import { SearchResults } from './SearchResults';
import * as asyncDataHook from '@/hooks/use-async-data';
import * as mobileHook from '@/hooks/use-mobile';

// Mock the hooks
vi.mock('@/hooks/use-async-data', async () => {
  const actual = await vi.importActual('@/hooks/use-async-data');
  return {
    ...actual,
    useAsyncData: vi.fn(),
  };
});

vi.mock('@/hooks/use-mobile', async () => {
  return {
    useMobile: vi.fn(),
  };
});

// Mock the child components
vi.mock('@/components/CreatorCard', () => ({
  default: ({ name }: { name: string }) => <div data-testid="creator-card">{name}</div>,
}));

vi.mock('./ServiceCard', () => ({
  ServiceCard: ({ title }: { title: string }) => <div data-testid="service-card">{title}</div>,
}));

vi.mock('@/components/skeletons', () => ({
  SearchResultsSkeleton: ({ view }: { view: string }) => <div data-testid="search-skeleton">Loading {view}...</div>,
}));

describe('SearchResults', () => {
  const mockCreators = [
    {
      id: '1',
      name: 'Alex Johnson',
      location: 'Los Angeles, CA',
      services: ['Photography', 'Virtual Tours'],
      imageUrl: 'https://example.com/alex.jpg',
      workSamples: [{ url: 'https://example.com/sample1.jpg', type: 'image' }],
      rating: 4.9,
      responseTime: '< 2h',
      verified: true,
    },
    {
      id: '2',
      name: 'Sofia Martinez',
      location: 'Miami, FL',
      services: ['Videography', 'Drone'],
      imageUrl: 'https://example.com/sofia.jpg',
      workSamples: [{ url: 'https://example.com/sample2.jpg', type: 'image' }],
      rating: 4.7,
      responseTime: '< 24h',
      verified: true,
    },
  ];

  const mockServices = [
    {
      id: '1',
      title: 'Drone Videography',
      coverImage: 'https://example.com/drone.jpg',
      availableCreators: 12,
      tags: ['Aerial', '4K', 'Commercial'],
    },
    {
      id: '2',
      title: 'Interior Photography',
      coverImage: 'https://example.com/interior.jpg',
      availableCreators: 8,
      tags: ['HDR', 'Virtual Staging'],
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    // Default mock for useMobile hook
    vi.mocked(mobileHook.useMobile).mockReturnValue(false);
  });

  it('renders loading state when data is loading', () => {
    // Mock loading state
    vi.mocked(asyncDataHook.useAsyncData).mockReturnValue({
      data: null,
      loading: true,
      error: null,
      refetch: vi.fn(),
    });

    renderWithProviders(<SearchResults view="creators" />);
    
    expect(screen.getByTestId('search-skeleton')).toBeInTheDocument();
    expect(screen.getByText('Loading creators...')).toBeInTheDocument();
  });

  it('renders error state when there is an error', async () => {
    // Mock error state
    vi.mocked(asyncDataHook.useAsyncData).mockReturnValue({
      data: null,
      loading: false,
      error: new Error('Failed to fetch data'),
      refetch: vi.fn(),
    });

    renderWithProviders(<SearchResults view="creators" />);
    
    expect(screen.getByText('Error loading results')).toBeInTheDocument();
    expect(screen.getByText('We couldn\'t load the search results. Please try again.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });

  it('renders creator cards when viewing creators', async () => {
    // Mock successful data fetch for creators
    vi.mocked(asyncDataHook.useAsyncData).mockReturnValue({
      data: mockCreators,
      loading: false,
      error: null,
      refetch: vi.fn(),
    });

    renderWithProviders(<SearchResults view="creators" />);
    
    await waitFor(() => {
      expect(screen.getByText('2 Creators Available')).toBeInTheDocument();
    });
    
    // Check for creator cards
    expect(screen.getAllByTestId('creator-card')).toHaveLength(2);
    expect(screen.getByText('Alex Johnson')).toBeInTheDocument();
    expect(screen.getByText('Sofia Martinez')).toBeInTheDocument();
  });

  it('renders service cards when viewing services', async () => {
    // Mock successful data fetch for services
    vi.mocked(asyncDataHook.useAsyncData).mockReturnValue({
      data: mockServices,
      loading: false,
      error: null,
      refetch: vi.fn(),
    });

    renderWithProviders(<SearchResults view="services" />);
    
    await waitFor(() => {
      expect(screen.getByText('Browse Services')).toBeInTheDocument();
    });
    
    // Check for service cards
    expect(screen.getAllByTestId('service-card')).toHaveLength(2);
    expect(screen.getByText('Drone Videography')).toBeInTheDocument();
    expect(screen.getByText('Interior Photography')).toBeInTheDocument();
  });

  it('renders empty state when no results are found', async () => {
    // Mock empty data
    vi.mocked(asyncDataHook.useAsyncData).mockReturnValue({
      data: [],
      loading: false,
      error: null,
      refetch: vi.fn(),
    });

    renderWithProviders(<SearchResults view="creators" />);
    
    await waitFor(() => {
      expect(screen.getByText('No creators found')).toBeInTheDocument();
      expect(screen.getByText('Try adjusting your filters to see more results')).toBeInTheDocument();
    });
  });

  it('renders sorting dropdown for desktop', async () => {
    // Mock data for creators
    vi.mocked(asyncDataHook.useAsyncData).mockReturnValue({
      data: mockCreators,
      loading: false,
      error: null,
      refetch: vi.fn(),
    });
    
    // Mock desktop view
    vi.mocked(mobileHook.useMobile).mockReturnValue(false);

    renderWithProviders(<SearchResults view="creators" />);
    
    // Should show the desktop select element
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    
    // Should not show the mobile dialog button
    expect(screen.queryByRole('button', { name: /sort/i })).not.toBeInTheDocument();
  });

  it('renders sorting dialog button for mobile', async () => {
    // Mock data for creators
    vi.mocked(asyncDataHook.useAsyncData).mockReturnValue({
      data: mockCreators,
      loading: false,
      error: null,
      refetch: vi.fn(),
    });
    
    // Mock mobile view
    vi.mocked(mobileHook.useMobile).mockReturnValue(true);

    renderWithProviders(<SearchResults view="creators" />);
    
    // Should show the mobile dialog button
    await waitFor(() => {
      const sortButton = screen.getByRole('button', { name: /sort/i });
      expect(sortButton).toBeInTheDocument();
    });
    
    // Should not show the desktop select element
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
  });
});