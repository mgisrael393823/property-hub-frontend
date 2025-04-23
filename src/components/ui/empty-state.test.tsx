import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { EmptyState } from './empty-state';
import { AlertCircle, Search, RefreshCw, Plus } from 'lucide-react';

describe('EmptyState', () => {
  it('renders with default props', () => {
    render(<EmptyState title="No items found" />);
    
    // Check that title is rendered
    expect(screen.getByText('No items found')).toBeInTheDocument();
    
    // Default icon (Plus) should be rendered
    // This is tricky to test directly since the icon is a SVG, 
    // but we can check for the component's class which would indicate it's presence
    const svgIcon = document.querySelector('svg');
    expect(svgIcon).toBeInTheDocument();
  });
  
  it('renders with description', () => {
    render(
      <EmptyState 
        title="No items found" 
        description="Try adjusting your filters to see more results." 
      />
    );
    
    expect(screen.getByText('No items found')).toBeInTheDocument();
    expect(screen.getByText('Try adjusting your filters to see more results.')).toBeInTheDocument();
  });
  
  it('renders with action button', () => {
    const mockOnClick = vi.fn();
    
    render(
      <EmptyState 
        title="No items found" 
        action={{
          label: "Clear filters",
          onClick: mockOnClick,
        }}
      />
    );
    
    const button = screen.getByRole('button', { name: 'Clear filters' });
    expect(button).toBeInTheDocument();
    
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
  
  it('renders with secondary action button', () => {
    const mockPrimaryAction = vi.fn();
    const mockSecondaryAction = vi.fn();
    
    render(
      <EmptyState 
        title="No items found" 
        action={{
          label: "Clear filters",
          onClick: mockPrimaryAction,
        }}
        secondaryAction={{
          label: "Start over",
          onClick: mockSecondaryAction,
        }}
      />
    );
    
    const primaryButton = screen.getByRole('button', { name: 'Clear filters' });
    const secondaryButton = screen.getByRole('button', { name: 'Start over' });
    
    expect(primaryButton).toBeInTheDocument();
    expect(secondaryButton).toBeInTheDocument();
    
    fireEvent.click(secondaryButton);
    expect(mockSecondaryAction).toHaveBeenCalledTimes(1);
    expect(mockPrimaryAction).not.toHaveBeenCalled();
  });
  
  it('renders with custom icon', () => {
    render(
      <EmptyState 
        title="No items found" 
        icon={<AlertCircle data-testid="custom-icon" />}
      />
    );
    
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });
  
  it('renders different styles based on type', () => {
    // Render different types of empty states
    const { rerender } = render(
      <EmptyState 
        title="Empty state"
        type="empty"
      />
    );
    
    // Check specific classes or attributes for the empty type
    let container = screen.getByText('Empty state').closest('div');
    expect(container).toHaveClass('bg-gray-50');
    
    // Test error type
    rerender(
      <EmptyState 
        title="Error state"
        type="error"
      />
    );
    
    container = screen.getByText('Error state').closest('div');
    expect(container).toHaveClass('bg-red-50');
    
    // Test no-results type
    rerender(
      <EmptyState 
        title="No results"
        type="no-results"
      />
    );
    
    // For no-results, the background should be gray
    container = screen.getByText('No results').closest('div');
    expect(container).toHaveClass('bg-gray-50');
    
    // Test loading-error type
    rerender(
      <EmptyState 
        title="Loading error"
        type="loading-error"
      />
    );
    
    container = screen.getByText('Loading error').closest('div');
    expect(container).toHaveClass('bg-yellow-50');
  });
  
  it('renders with action icon', () => {
    render(
      <EmptyState 
        title="No items found" 
        action={{
          label: "Refresh",
          onClick: vi.fn(),
          icon: <RefreshCw data-testid="action-icon" />,
        }}
      />
    );
    
    expect(screen.getByTestId('action-icon')).toBeInTheDocument();
  });
  
  it('applies custom className', () => {
    render(
      <EmptyState 
        title="No items found" 
        className="custom-class"
      />
    );
    
    const container = screen.getByText('No items found').closest('div');
    expect(container).toHaveClass('custom-class');
  });
});