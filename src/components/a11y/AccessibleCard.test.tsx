import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { AccessibleCard } from './AccessibleCard';
import { vi } from 'vitest';

// Add the custom matcher
expect.extend(toHaveNoViolations);

describe('AccessibleCard', () => {
  const mockProps = {
    id: 'test-card-1',
    title: 'Test Card Title',
    description: 'This is a test card description',
    imageUrl: 'https://example.com/image.jpg',
    imageAlt: 'A descriptive alt text for the image',
    tags: ['Photography', 'Virtual Tours'],
    onClick: vi.fn(),
    onSave: vi.fn(),
    onContact: vi.fn(),
  };

  it('should render correctly with all props', () => {
    render(<AccessibleCard {...mockProps} />);
    
    // Check that content is rendered
    expect(screen.getByText('Test Card Title')).toBeInTheDocument();
    expect(screen.getByText('This is a test card description')).toBeInTheDocument();
    expect(screen.getByAltText('A descriptive alt text for the image')).toBeInTheDocument();
    expect(screen.getByText('Photography')).toBeInTheDocument();
    expect(screen.getByText('Virtual Tours')).toBeInTheDocument();
    
    // Check that buttons are rendered
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('should call onClick when card is clicked', () => {
    render(<AccessibleCard {...mockProps} />);
    
    // Find the clickable area (div with role="button")
    const clickableArea = screen.getByRole('button', { 
      name: 'Test Card Title This is a test card description' 
    });
    fireEvent.click(clickableArea);
    
    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('should be keyboard accessible', () => {
    render(<AccessibleCard {...mockProps} />);
    
    // Find the clickable area
    const clickableArea = screen.getByRole('button', { 
      name: 'Test Card Title This is a test card description' 
    });
    
    // Clear the spy before testing Enter key
    mockProps.onClick.mockClear();
    // Test Enter key
    fireEvent.keyDown(clickableArea, { key: 'Enter' });
    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
    
    // Clear the spy before testing Space key
    mockProps.onClick.mockClear();
    // Test Space key
    fireEvent.keyDown(clickableArea, { key: ' ' });
    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('should show as saved when isSaved is true', () => {
    render(<AccessibleCard {...mockProps} isSaved={true} />);
    
    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(screen.getByLabelText('Remove from saved items')).toBeInTheDocument();
  });

  it('should pass accessibility tests', async () => {
    const { container } = render(<AccessibleCard {...mockProps} />);
    
    // Run axe accessibility tests
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes', () => {
    render(<AccessibleCard {...mockProps} />);
    
    // Check that the clickable area has proper aria-labelledby
    const clickableArea = screen.getByRole('button', {
      name: 'Test Card Title This is a test card description'
    });
    expect(clickableArea).toHaveAttribute('aria-labelledby', 'card-title-test-card-1 card-description-test-card-1');
    
    // Check that the buttons have proper aria-labels
    expect(screen.getByLabelText('Save to your collection')).toBeInTheDocument();
    expect(screen.getByLabelText('Contact about Test Card Title')).toBeInTheDocument();
  });

  it('should render without onClick handler as non-interactive', () => {
    // Clone props without onClick
    const propsWithoutClick = { ...mockProps };
    delete propsWithoutClick.onClick;
    
    const { queryByRole } = render(<AccessibleCard {...propsWithoutClick} />);
    
    // Should not have role="button" for the container
    expect(
      queryByRole('button', {
        name: 'Test Card Title This is a test card description'
      })
    ).not.toBeInTheDocument();
    
    // But the actual buttons should still be there
    expect(screen.getByLabelText('Save to your collection')).toBeInTheDocument();
    expect(screen.getByLabelText('Contact about Test Card Title')).toBeInTheDocument();
  });
});