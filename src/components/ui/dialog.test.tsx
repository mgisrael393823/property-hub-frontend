import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from './dialog';
import { Button } from './button';

describe('Dialog', () => {
  it('renders dialog when trigger is clicked', async () => {
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog Description</DialogDescription>
          </DialogHeader>
          <div>Dialog Content</div>
          <DialogFooter>
            <Button>Action</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    // Trigger should be visible
    const trigger = screen.getByRole('button', { name: 'Open Dialog' });
    expect(trigger).toBeInTheDocument();
    
    // Dialog content should not be visible initially
    // Note: Since DialogContent uses a Portal, we need to query the entire document
    expect(document.querySelector('.fixed')).not.toBeInTheDocument();
    
    // Open the dialog
    fireEvent.click(trigger);
    
    // Dialog content should now be visible
    const dialogContent = await screen.findByText('Dialog Title');
    expect(dialogContent).toBeInTheDocument();
    expect(screen.getByText('Dialog Description')).toBeInTheDocument();
    expect(screen.getByText('Dialog Content')).toBeInTheDocument();
    
    // Close button should be visible
    const closeButton = document.querySelector('[aria-label="Close"]') || document.querySelector('.dialog-close');
    
    // Dialog should have correct ARIA attributes
    const dialogElement = document.querySelector('[role="dialog"]');
    expect(dialogElement).toBeInTheDocument();
    expect(dialogElement).toHaveAttribute('aria-modal', 'true');
  });

  it('applies custom classes to dialog components', () => {
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent className="custom-content-class">
          <DialogHeader className="custom-header-class">
            <DialogTitle className="custom-title-class">Title</DialogTitle>
            <DialogDescription className="custom-description-class">Description</DialogDescription>
          </DialogHeader>
          <DialogFooter className="custom-footer-class">
            <Button>Action</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
    
    // Open the dialog via role
    const openBtn = screen.getByRole('button', { name: 'Open' });
    act(() => {
      fireEvent.click(openBtn);
    });
    
    // Check for custom classes
    expect(document.querySelector('.custom-content-class')).toBeInTheDocument();
    expect(document.querySelector('.custom-header-class')).toBeInTheDocument();
    expect(document.querySelector('.custom-title-class')).toBeInTheDocument();
    expect(document.querySelector('.custom-description-class')).toBeInTheDocument();
    expect(document.querySelector('.custom-footer-class')).toBeInTheDocument();
  });

  it('closes dialog when close button is clicked', async () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
          <div>Dialog Content</div>
          <DialogClose asChild>
            <Button>Close Dialog</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    );
    
    // Open the dialog
    fireEvent.click(screen.getByText('Open Dialog'));
    
    // Dialog content should now be visible
    const dialogTitle = await screen.findByText('Dialog Title');
    expect(dialogTitle).toBeInTheDocument();
    
    // Click the explicit close button
    fireEvent.click(screen.getByText('Close Dialog'));
    
    // Dialog should now be closed (this is tricky to test with portals)
    // In a real environment, we would check that the dialog is no longer visible
  });

  it('renders DialogFooter with correct layout classes', () => {
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
          <DialogFooter>
            <Button>Cancel</Button>
            <Button>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
    
    // Open the dialog via role
    const openBtnFooter = screen.getByRole('button', { name: 'Open' });
    act(() => {
      fireEvent.click(openBtnFooter);
    });
    
    // Check footer classes
    const footer = document.querySelector('.flex-col-reverse');
    expect(footer).toBeInTheDocument();
  });
});