import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose
} from './sheet';
import { Button } from './button';

// Mock the portal implementation since it's not available in the testing environment
vi.mock('@radix-ui/react-dialog', async () => {
  const actual = await vi.importActual('@radix-ui/react-dialog');
  return {
    ...actual,
    Portal: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  };
});

describe('Sheet', () => {
  it('renders sheet with content when trigger is clicked', () => {
    render(
      <Sheet>
        <SheetTrigger asChild>
          <Button>Open Sheet</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
            <SheetDescription>Sheet Description</SheetDescription>
          </SheetHeader>
          <div>Sheet Content</div>
          <SheetFooter>
            <Button>Action</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );

    // Trigger should be visible
    const trigger = screen.getByRole('button', { name: 'Open Sheet' });
    expect(trigger).toBeInTheDocument();
    
    // Sheet content should not be visible initially
    expect(screen.queryByText('Sheet Title')).not.toBeInTheDocument();
    
    // Open the sheet
    fireEvent.click(trigger);
    
    // Sheet content should now be visible
    expect(screen.getByText('Sheet Title')).toBeInTheDocument();
    expect(screen.getByText('Sheet Description')).toBeInTheDocument();
    expect(screen.getByText('Sheet Content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });

  it('closes sheet when close button is clicked', () => {
    render(
      <Sheet>
        <SheetTrigger asChild>
          <Button>Open Sheet</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
          </SheetHeader>
          <div>Sheet Content</div>
          <SheetClose asChild>
            <Button>Close Sheet</Button>
          </SheetClose>
        </SheetContent>
      </Sheet>
    );

    // Open the sheet
    fireEvent.click(screen.getByRole('button', { name: 'Open Sheet' }));
    
    // Sheet content should be visible
    expect(screen.getByText('Sheet Title')).toBeInTheDocument();
    
    // Close the sheet using the close button
    fireEvent.click(screen.getByRole('button', { name: 'Close Sheet' }));
    
    // Sheet content should no longer be visible
    expect(screen.queryByText('Sheet Title')).not.toBeInTheDocument();
  });

  it('renders with custom side position', () => {
    render(
      <Sheet>
        <SheetTrigger asChild>
          <Button>Open Sheet</Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Left-sided Sheet</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );

    // Open the sheet
    fireEvent.click(screen.getByRole('button', { name: 'Open Sheet' }));
    
    // Content should be visible
    expect(screen.getByText('Left-sided Sheet')).toBeInTheDocument();
    
    // Check for the left-side specific class
    const sheetContent = screen.getByText('Left-sided Sheet').closest('[class*="border-r"]');
    expect(sheetContent).toBeInTheDocument();
  });

  it('renders SheetFooter with correct layout classes', () => {
    render(
      <Sheet>
        <SheetTrigger asChild>
          <Button>Open Sheet</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetFooter>
            <Button>Cancel</Button>
            <Button>Save</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );

    // Open the sheet
    fireEvent.click(screen.getByRole('button', { name: 'Open Sheet' }));
    
    // Find the footer
    const buttons = screen.getAllByRole('button').filter(btn => 
      btn.textContent === 'Cancel' || btn.textContent === 'Save'
    );
    expect(buttons).toHaveLength(2);
    
    // Check that the footer exists with the expected layout class
    const footer = buttons[0].closest('div');
    expect(footer).toHaveClass('flex');
  });
});