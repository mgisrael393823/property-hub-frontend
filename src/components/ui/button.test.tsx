import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: 'Click me' });
    await user.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders different button variants', () => {
    const { rerender } = render(<Button variant="default">Default</Button>);
    let button = screen.getByRole('button', { name: 'Default' });
    
    // Default variant should have specific classes
    expect(button).toHaveClass('bg-primary');
    
    // Test outline variant
    rerender(<Button variant="outline">Outline</Button>);
    button = screen.getByRole('button', { name: 'Outline' });
    expect(button).toHaveClass('border');
    expect(button).toHaveClass('bg-background');
    
    // Test ghost variant
    rerender(<Button variant="ghost">Ghost</Button>);
    button = screen.getByRole('button', { name: 'Ghost' });
    expect(button).toHaveClass('hover:bg-accent');
    
    // Test destructive variant
    rerender(<Button variant="destructive">Destructive</Button>);
    button = screen.getByRole('button', { name: 'Destructive' });
    expect(button).toHaveClass('bg-destructive');
  });

  it('renders different button sizes', () => {
    const { rerender } = render(<Button size="default">Default Size</Button>);
    let button = screen.getByRole('button', { name: 'Default Size' });
    
    // Default size class check
    expect(button).toHaveClass('h-10');
    
    // Test sm size
    rerender(<Button size="sm">Small</Button>);
    button = screen.getByRole('button', { name: 'Small' });
    expect(button).toHaveClass('h-9');
    
    // Test lg size
    rerender(<Button size="lg">Large</Button>);
    button = screen.getByRole('button', { name: 'Large' });
    expect(button).toHaveClass('h-11');
    
    // Test icon size
    rerender(<Button size="icon">Icon</Button>);
    button = screen.getByRole('button', { name: 'Icon' });
    expect(button).toHaveClass('h-10');
    expect(button).toHaveClass('w-10');
  });

  it('applies custom className', () => {
    render(<Button className="my-custom-class">Custom Class</Button>);
    const button = screen.getByRole('button', { name: 'Custom Class' });
    expect(button).toHaveClass('my-custom-class');
  });

  it('forwards refs correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref Button</Button>);
    
    expect(ref.current).not.toBeNull();
    expect(ref.current?.textContent).toBe('Ref Button');
  });

  it('renders as different element when asChild is true', () => {
    render(
      <Button asChild>
        <a href="#test">Link Button</a>
      </Button>
    );
    
    const link = screen.getByRole('link', { name: 'Link Button' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#test');
    
    // Should have button styling classes
    expect(link).toHaveClass('inline-flex');
    expect(link).toHaveClass('items-center');
  });

  it('renders as disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    
    const button = screen.getByRole('button', { name: 'Disabled' });
    expect(button).toBeDisabled();
  });
});