import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchViewToggle } from './SearchViewToggle';

describe('SearchViewToggle', () => {
  const mockOnViewChange = vi.fn();

  it('renders with the correct view selected', () => {
    // Test creators view
    render(<SearchViewToggle view="creators" onViewChange={mockOnViewChange} />);
    
    // Find toggle items - the buttons themselves have the data-state attribute
    const creatorsToggle = screen.getByRole('radio', { name: 'Find Creators' });
    const servicesToggle = screen.getByRole('radio', { name: 'Find Services' });
    
    // Creators should be visually selected
    expect(creatorsToggle).toHaveAttribute('data-state', 'on');
    expect(servicesToggle).toHaveAttribute('data-state', 'off');
    
    // Re-render with services view
    render(<SearchViewToggle view="services" onViewChange={mockOnViewChange} />);
    
    // Services should be visually selected
    const servicesToggleUpdated = screen.getAllByRole('radio', { name: 'Find Services' })[1]; // Get the second instance after re-render
    const creatorsToggleUpdated = screen.getAllByRole('radio', { name: 'Find Creators' })[1]; // Get the second instance after re-render
    
    expect(servicesToggleUpdated).toHaveAttribute('data-state', 'on');
    expect(creatorsToggleUpdated).toHaveAttribute('data-state', 'off');
  });

  it('calls onViewChange when toggling views', () => {
    render(<SearchViewToggle view="creators" onViewChange={mockOnViewChange} />);
    
    // Find toggle items
    const servicesToggle = screen.getByRole('radio', { name: 'Find Services' });
    
    // Click services toggle
    fireEvent.click(servicesToggle);
    
    // onViewChange should be called with "services"
    expect(mockOnViewChange).toHaveBeenCalledWith('services');
    
    // Reset mock and test the other direction
    mockOnViewChange.mockReset();
    
    // Re-render with services view
    render(<SearchViewToggle view="services" onViewChange={mockOnViewChange} />);
    
    // Find toggle items (second instances after re-render)
    const creatorsToggle = screen.getAllByRole('radio', { name: 'Find Creators' })[1];
    
    // Click creators toggle
    fireEvent.click(creatorsToggle);
    
    // onViewChange should be called with "creators"
    expect(mockOnViewChange).toHaveBeenCalledWith('creators');
  });

  it('renders with correct icons', () => {
    render(<SearchViewToggle view="creators" onViewChange={mockOnViewChange} />);
    
    // Check that we have the expected icons (Users and Grid2X2)
    // Since we can't easily check the specific icon component, we'll check that we have 
    // exactly two icon elements with the expected classes
    const icons = document.querySelectorAll('.h-4.w-4');
    expect(icons.length).toBe(2);
  });
});