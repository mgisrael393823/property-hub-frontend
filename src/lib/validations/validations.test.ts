import { describe, it, expect } from 'vitest';
import {
  loginSchema,
  registerSchema,
  bookingSchema,
  projectSchema,
  basicInfoSchema,
  portfolioSchema,
  serviceSchema,
  servicesSchema,
  availabilitySchema,
  searchFiltersSchema,
  applicationSchema,
  profileUpdateSchema
} from './index';

describe('Validation Schemas', () => {
  // Test login schema
  describe('loginSchema', () => {
    it('passes validation with valid data', () => {
      const validData = {
        email: 'test@example.com',
        password: 'password123',
      };
      
      const result = loginSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('fails validation with invalid email', () => {
      const invalidData = {
        email: 'not-an-email',
        password: 'password123',
      };
      
      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('email');
      }
    });

    it('fails validation with short password', () => {
      const invalidData = {
        email: 'test@example.com',
        password: 'pass', // Too short
      };
      
      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('password');
      }
    });
  });

  // Test booking schema
  describe('bookingSchema', () => {
    it('passes validation with valid data', () => {
      const validData = {
        projectTitle: 'Test Project',
        propertyAddress: '123 Main Street, New York, NY 10001',
        preferredDate: new Date(),
        services: ['photography', 'drone'],
        notes: 'Some notes',
      };
      
      const result = bookingSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('fails validation with empty project title', () => {
      const invalidData = {
        projectTitle: '',
        propertyAddress: '123 Main Street, New York, NY 10001',
        preferredDate: new Date(),
        services: ['photography', 'drone'],
        notes: 'Some notes',
      };
      
      const result = bookingSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('projectTitle');
      }
    });

    it('fails validation with incomplete address', () => {
      const invalidData = {
        projectTitle: 'Test Project',
        propertyAddress: '123', // Too short
        preferredDate: new Date(),
        services: ['photography', 'drone'],
        notes: 'Some notes',
      };
      
      const result = bookingSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('propertyAddress');
      }
    });

    it('fails validation with no services selected', () => {
      const invalidData = {
        projectTitle: 'Test Project',
        propertyAddress: '123 Main Street, New York, NY 10001',
        preferredDate: new Date(),
        services: [], // Empty array
        notes: 'Some notes',
      };
      
      const result = bookingSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('services');
      }
    });
  });

  // Test project schema
  describe('projectSchema', () => {
    it('passes validation with valid data', () => {
      const validData = {
        title: 'New Property Showcase',
        address: '456 Park Avenue, Chicago, IL 60601',
        contentTypes: ['photos', 'virtual-tour'],
        description: 'We need professional photos for our new apartment complex.',
        budget: '$500-1000',
        timeline: new Date(),
      };
      
      const result = projectSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('fails validation with short description', () => {
      const invalidData = {
        title: 'New Property Showcase',
        address: '456 Park Avenue, Chicago, IL 60601',
        contentTypes: ['photos', 'virtual-tour'],
        description: 'Too short', // Less than 10 characters
        budget: '$500-1000',
        timeline: new Date(),
      };
      
      const result = projectSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('description');
      }
    });
  });

  // Test application schema with date validation
  describe('applicationSchema', () => {
    it('passes validation with valid data', () => {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      
      const validData = {
        coverLetter: 'I am very interested in this project and have relevant experience.',
        proposedPrice: 500,
        startDate: today,
        endDate: tomorrow,
      };
      
      const result = applicationSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('fails validation when end date is before start date', () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      
      const invalidData = {
        coverLetter: 'I am very interested in this project and have relevant experience.',
        proposedPrice: 500,
        startDate: today,
        endDate: yesterday, // Before start date
      };
      
      const result = applicationSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        // Should have refinement error for endDate
        const endDateError = result.error.issues.find(issue => issue.path.includes('endDate'));
        expect(endDateError).toBeDefined();
      }
    });
  });

  // Test registerSchema password confirmation
  describe('registerSchema', () => {
    it('passes validation with matching passwords', () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password123',
        confirmPassword: 'Password123',
        role: 'creator',
      };
      
      const result = registerSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('fails validation with non-matching passwords', () => {
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password123',
        confirmPassword: 'DifferentPassword123',
        role: 'creator',
      };
      
      const result = registerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        // Should have refinement error for confirmPassword
        const confirmPasswordError = result.error.issues.find(issue => 
          issue.path.includes('confirmPassword')
        );
        expect(confirmPasswordError).toBeDefined();
      }
    });
  });
});