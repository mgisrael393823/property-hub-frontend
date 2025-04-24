import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility function', () => {
  it('should merge class names correctly', () => {
    // Basic class merging
    expect(cn('foo', 'bar')).toBe('foo bar');
    
    // With conditional classes
    expect(cn('foo', 'bar', false && 'baz')).toBe('foo bar');
    
    // With null or undefined values
    expect(cn('foo', null, undefined, 'bar')).toBe('foo bar');
    
    // With array of classes
    expect(cn('foo', ['bar', 'baz'])).toBe('foo bar baz');
  });
  
  it('should merge Tailwind classes correctly', () => {
    // Should merge and override conflicting Tailwind classes
    expect(cn('px-4 py-2', 'px-6')).toBe('py-2 px-6');
    
    // Should merge multiple utility variants
    expect(cn('text-red-500', 'hover:text-blue-500')).toBe('text-red-500 hover:text-blue-500');
    
    // Should handle responsive variants
    expect(cn('w-full', 'md:w-auto')).toBe('w-full md:w-auto');
    
    // Should handle arbitrary values
    expect(cn('grid grid-cols-[1fr,auto]', 'md:grid-cols-[1fr,1fr]')).toBe(
      'grid grid-cols-[1fr,auto] md:grid-cols-[1fr,1fr]'
    );
  });
  
  it('should handle complex class combinations', () => {
    const isPrimary = true;
    const isDanger = false;
    const isLarge = true;
    
    const result = cn(
      'btn',
      isPrimary && 'btn-primary',
      isDanger && 'btn-danger',
      isLarge ? 'btn-lg' : 'btn-md',
      isPrimary && isDanger && 'btn-primary-danger'
    );
    
    expect(result).toBe('btn btn-primary btn-lg');
  });
  
  it('should handle object syntax for conditional classes', () => {
    const result = cn('base', {
      'is-active': true,
      'is-disabled': false,
      'has-error': true,
    });
    
    expect(result).toBe('base is-active has-error');
  });
});