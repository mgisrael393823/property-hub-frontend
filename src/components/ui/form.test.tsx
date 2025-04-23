import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen, waitFor } from '../../test/test-utils';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  useFormField,
} from './form';
import { useForm } from 'react-hook-form';
import { Input } from './input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const testSchema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters'),
});

type TestFormValues = z.infer<typeof testSchema>;

const TestForm = () => {
  const form = useForm<TestFormValues>({
    resolver: zodResolver(testSchema),
    defaultValues: {
      username: '',
    },
  });

  const onSubmit = vi.fn();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} data-testid="test-form">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input data-testid="username-input" placeholder="Enter username" {...field} />
              </FormControl>
              <FormDescription>
                Your unique username for the application
              </FormDescription>
              <FormMessage data-testid="form-message" />
            </FormItem>
          )}
        />
        <button type="submit" data-testid="submit-button">Submit</button>
      </form>
    </Form>
  );
};

describe('Form', () => {
  it('renders form components correctly', async () => {
    const { user } = renderWithProviders(<TestForm />);
    
    // Check that the form elements are rendered
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByTestId('username-input')).toBeInTheDocument();
    expect(screen.getByText('Your unique username for the application')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('displays validation error when input is invalid', async () => {
    const { user } = renderWithProviders(<TestForm />);
    
    // Enter a value that fails validation (less than 2 characters)
    await user.type(screen.getByTestId('username-input'), 'a');
    
    // Submit the form
    await user.click(screen.getByTestId('submit-button'));
    
    // Check that the error message is displayed - use waitFor to wait for React state updates
    await waitFor(() => {
      expect(screen.getByText('Username must be at least 2 characters')).toBeInTheDocument();
    });
  });

  it('does not display error when input is valid', async () => {
    const { user } = renderWithProviders(<TestForm />);
    
    // Enter a value that passes validation
    await user.type(screen.getByTestId('username-input'), 'validusername');
    
    // Submit the form
    await user.click(screen.getByTestId('submit-button'));
    
    // Check that the error message is not displayed - use waitFor to handle React state updates
    await waitFor(() => {
      expect(screen.queryByText('Username must be at least 2 characters')).not.toBeInTheDocument();
    });
  });

  it('applies error styling when validation fails', async () => {
    const { user } = renderWithProviders(<TestForm />);
    
    // Enter invalid input and submit
    await user.type(screen.getByTestId('username-input'), 'a');
    await user.click(screen.getByTestId('submit-button'));
    
    // Check that the label has error styling (text-destructive class) - use waitFor
    await waitFor(() => {
      const label = screen.getByText('Username');
      expect(label).toHaveClass('text-destructive');
    });
  });
});