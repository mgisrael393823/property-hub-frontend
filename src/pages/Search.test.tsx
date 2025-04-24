import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen, act, waitFor, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '@/test/test-utils';
import Search from './Search';
import * as useMobileHook from '@/hooks/use-mobile';
import * as React from 'react';

// Mock the drawer component
vi.mock('@/components/ui/drawer', () => ({
  Drawer: ({ children, open, onOpenChange }: { 
    children: React.ReactNode; 
    open?: boolean; 
    onOpenChange?: (open: boolean) => void;
  }) => (
    <div data-testid="mock-drawer" data-open={open}>
      {children}
    </div>
  ),
  DrawerTrigger: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="drawer-trigger">{children}</div>
  ),
  DrawerContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="drawer-content">{children}</div>
  ),
  DrawerHeader: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="drawer-header">{children}</div>
  ),
  DrawerTitle: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="drawer-title">{children}</div>
  ),
  DrawerDescription: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DrawerFooter: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="drawer-footer">{children}</div>
  ),
  DrawerClose: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="drawer-close">{children}</div>
  ),
}));

// Mock the navigation component
vi.mock('@/components/Navigation', () => ({
  default: () => <div data-testid="navigation">Navigation</div>
}));

// Mock the search results component
vi.mock('@/components/search/SearchResults', () => ({
  SearchResults: ({ view }: { view: string }) => (
    <div data-testid="search-results" data-view={view}>
      Search Results for {view}
    </div>
  )
}));

// Mock the search filters component
vi.mock('@/components/search/SearchFilters', () => ({
  SearchFilters: ({ view }: { view: string }) => (
    <div data-testid="search-filters" data-view={view}>
      Filters for {view}
    </div>
  )
}));

describe('Search Page', () => {
  // Default mobile hook mock to desktop view
  const mockUseMobile = vi.spyOn(useMobileHook, 'useMobile');

  beforeEach(() => {
    // Reset the mock before each test
    mockUseMobile.mockReturnValue(false);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders the search page with default creator view', async () => {
    await act(async () => {
      renderWithProviders(<Search />);
    });

    // Verify page structure
    expect(screen.getByRole('heading', { name: 'Find Creators' })).toBeInTheDocument();
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('search-filters')).toBeInTheDocument();
    expect(screen.getByTestId('search-results')).toBeInTheDocument();
    
    // Verify default view is creators
    expect(screen.getByTestId('search-results').getAttribute('data-view')).toBe('creators');
    expect(screen.getByTestId('search-filters').getAttribute('data-view')).toBe('creators');
  });

  it('toggles between creators and services view', async () => {
    await act(async () => {
      renderWithProviders(<Search />);
    });
    
    // Find the view toggle buttons by role
    const toggleButtons = screen.getAllByRole('radio');
    const creatorsToggle = toggleButtons[0]; // First toggle button is creators
    const servicesToggle = toggleButtons[1]; // Second toggle button is services
    
    // Initial state should be creators
    expect(screen.getByTestId('search-results').getAttribute('data-view')).toBe('creators');
    expect(creatorsToggle).toHaveAttribute('data-state', 'on');
    expect(servicesToggle).toHaveAttribute('data-state', 'off');
    
    // Click services toggle
    await act(async () => {
      fireEvent.click(servicesToggle);
    });
    
    // View should change to services
    await waitFor(() => {
      expect(screen.getByTestId('search-results').getAttribute('data-view')).toBe('services');
      expect(screen.getByTestId('search-filters').getAttribute('data-view')).toBe('services');
      expect(screen.getByRole('heading', { name: 'Browse Services' })).toBeInTheDocument();
    });
    
    // Click creators toggle
    await act(async () => {
      fireEvent.click(creatorsToggle);
    });
    
    // View should change back to creators
    await waitFor(() => {
      expect(screen.getByTestId('search-results').getAttribute('data-view')).toBe('creators');
      expect(screen.getByTestId('search-filters').getAttribute('data-view')).toBe('creators');
      expect(screen.getByRole('heading', { name: 'Find Creators' })).toBeInTheDocument();
    });
  });

  it('shows filters as sidebar in desktop view', async () => {
    // Mock desktop view
    mockUseMobile.mockReturnValue(false);
    
    await act(async () => {
      renderWithProviders(<Search />);
    });
    
    // Filters should be displayed in sidebar (not in a drawer)
    expect(screen.getByTestId('search-filters')).toBeInTheDocument();
    expect(screen.queryByText('Filters')).not.toBeInTheDocument(); // No filters button
    expect(screen.queryByText('Search Filters')).not.toBeInTheDocument(); // No drawer title
  });

  it('shows filters in drawer on mobile view', async () => {
    // Mock mobile view
    mockUseMobile.mockReturnValue(true);
    
    await act(async () => {
      renderWithProviders(<Search />);
    });
    
    // Drawer trigger should be present
    const drawerTrigger = screen.getByTestId('drawer-trigger');
    expect(drawerTrigger).toBeInTheDocument();
    
    // Click the drawer trigger
    await act(async () => {
      fireEvent.click(drawerTrigger);
    });
    
    // Mock drawer should show content after clicking button
    expect(screen.getByTestId('drawer-content')).toBeInTheDocument();
    expect(screen.getByTestId('drawer-title')).toBeInTheDocument();
    expect(screen.getByTestId('search-filters')).toBeInTheDocument();
    expect(screen.getByTestId('drawer-footer')).toBeInTheDocument();
    expect(screen.getByTestId('drawer-close')).toBeInTheDocument();
  });
});