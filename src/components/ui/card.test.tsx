import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './card';

describe('Card and Card Components', () => {
  it('renders Card with children', () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('applies custom className to Card', () => {
    render(<Card className="test-card">Card Content</Card>);
    const card = screen.getByText('Card Content');
    expect(card).toHaveClass('test-card');
    // Should also have the default card classes
    expect(card).toHaveClass('rounded-lg');
    expect(card).toHaveClass('border');
  });

  it('renders CardHeader with children', () => {
    render(<CardHeader>Header Content</CardHeader>);
    expect(screen.getByText('Header Content')).toBeInTheDocument();
  });

  it('renders CardFooter with children', () => {
    render(<CardFooter>Footer Content</CardFooter>);
    expect(screen.getByText('Footer Content')).toBeInTheDocument();
  });

  it('renders CardTitle with correct heading element', () => {
    render(<CardTitle>Card Title</CardTitle>);
    
    // By default, it should render as an h3
    const title = screen.getByText('Card Title');
    expect(title.tagName).toBe('H3');
    
    // Should have the correct classes
    expect(title).toHaveClass('text-2xl');
    expect(title).toHaveClass('font-semibold');
  });

  it('renders CardDescription with children', () => {
    render(<CardDescription>Card Description</CardDescription>);
    expect(screen.getByText('Card Description')).toBeInTheDocument();
    
    // Check classes
    const description = screen.getByText('Card Description');
    expect(description).toHaveClass('text-sm');
    expect(description).toHaveClass('text-muted-foreground');
  });

  it('renders CardContent with children', () => {
    render(<CardContent>Content Area</CardContent>);
    expect(screen.getByText('Content Area')).toBeInTheDocument();
  });

  it('renders a complete Card with all components', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Complete Card Title</CardTitle>
          <CardDescription>This is a card description</CardDescription>
        </CardHeader>
        <CardContent>This is the main content</CardContent>
        <CardFooter>This is the footer</CardFooter>
      </Card>
    );

    // Check that all parts are rendered
    expect(screen.getByText('Complete Card Title')).toBeInTheDocument();
    expect(screen.getByText('This is a card description')).toBeInTheDocument();
    expect(screen.getByText('This is the main content')).toBeInTheDocument();
    expect(screen.getByText('This is the footer')).toBeInTheDocument();
  });

  it('forwards refs correctly', () => {
    const cardRef = React.createRef<HTMLDivElement>();
    const contentRef = React.createRef<HTMLDivElement>();
    
    render(
      <Card ref={cardRef}>
        <CardContent ref={contentRef}>Content with ref</CardContent>
      </Card>
    );
    
    expect(cardRef.current).not.toBeNull();
    expect(contentRef.current).not.toBeNull();
    expect(contentRef.current?.textContent).toBe('Content with ref');
  });

  it('allows customization of CardTitle element', () => {
    render(<CardTitle as="h2">H2 Title</CardTitle>);
    
    const title = screen.getByText('H2 Title');
    expect(title.tagName).toBe('H2');
  });
});