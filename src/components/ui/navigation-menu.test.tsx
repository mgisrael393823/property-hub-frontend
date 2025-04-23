import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from './navigation-menu';

describe('NavigationMenu', () => {
  it('renders navigation menu with items', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink 
              href="#home"
              className="block py-2 px-3"
            >
              Home
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink 
              href="#about"
              className="block py-2 px-3"
            >
              About
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );

    // Check for links
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
  });

  it('renders navigation menu with dropdown', async () => {
    const user = userEvent.setup();

    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="p-4">
                <h3 className="font-medium">Products List</h3>
                <ul className="mt-2 space-y-2">
                  <li>Product 1</li>
                  <li>Product 2</li>
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );

    // Check that trigger is rendered
    const trigger = screen.getByRole('button', { name: 'Products' });
    expect(trigger).toBeInTheDocument();

    // Note: Testing the opening of the dropdown is challenging because it uses Radix's portals
    // In a real situation, we could use a more complex setup to test this
  });

  it('applies custom className to navigation menu', () => {
    render(
      <NavigationMenu className="test-class">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="#link">Link</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );

    // Check for the custom class
    const menuElement = screen.getByRole('navigation');
    expect(menuElement).toHaveClass('test-class');
  });

  it('applies custom className to menu list', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList className="list-class">
          <NavigationMenuItem>
            <NavigationMenuLink href="#link">Link</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );

    // Get the list - this is less reliable since Radix UI might change class names
    // In real tests we'd use a more reliable way to identify this
    const list = screen.getByRole('list');
    expect(list).toHaveClass('list-class');
  });

  it('renders a link with correct attributes', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="#test-link"
              className="test-link-class"
              target="_blank"
              aria-label="Test Link"
            >
              Link Text
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );

    // Check for the link with correct attributes
    const link = screen.getByRole('link', { name: 'Link Text' });
    expect(link).toHaveAttribute('href', '#test-link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('aria-label', 'Test Link');
    expect(link).toHaveClass('test-link-class');
  });
});