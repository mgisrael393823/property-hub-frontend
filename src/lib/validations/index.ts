import * as z from 'zod';

// Common validation patterns
const PHONE_REGEX = /^\+?[0-9]{10,15}$/;
const URL_REGEX = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/;

// Shared field validations
const nameValidation = z.string().min(2, "Must be at least 2 characters");
const emailValidation = z.string().email("Please enter a valid email address");
const phoneValidation = z.string().regex(PHONE_REGEX, "Please enter a valid phone number");
const passwordValidation = z.string()
  .min(8, "Password must be at least 8 characters")
  .regex(PASSWORD_REGEX, "Password must contain at least one uppercase letter, one lowercase letter, and one number");
const urlValidation = z.string().regex(URL_REGEX, "Please enter a valid URL").optional();
const addressValidation = z.string().min(5, "Please enter a complete address");

// Authentication schemas
export const loginSchema = z.object({
  email: emailValidation,
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  name: nameValidation,
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: z.string(),
  role: z.enum(['creator', 'manager']),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

// Booking schemas
export const bookingSchema = z.object({
  projectTitle: z.string().min(1, "Project title is required"),
  propertyAddress: addressValidation,
  preferredDate: z.date({
    required_error: "Please select a date",
  }),
  services: z.array(z.string()).min(1, "Please select at least one service"),
  notes: z.string().optional(),
});

// Project schemas
export const projectSchema = z.object({
  title: z.string().min(2, "Project title must be at least 2 characters"),
  address: addressValidation,
  contentTypes: z.array(z.string()).min(1, "Select at least one content type"),
  description: z.string().min(10, "Please provide more details about the project"),
  budget: z.string({ required_error: "Please select a budget range" }),
  timeline: z.date({ required_error: "Please select a target date" }),
});

// Creator onboarding schemas
export const basicInfoSchema = z.object({
  firstName: nameValidation,
  lastName: nameValidation,
  email: emailValidation,
  phone: phoneValidation,
  location: z.string().min(2, "Location is required"),
  bio: z.string().min(10, "Please provide a short bio")
});

export const portfolioSchema = z.object({
  images: z.array(z.string()).min(1, "At least one image is required")
});

export const serviceSchema = z.object({
  name: z.string().min(2, "Service name is required"),
  description: z.string(),
  price: z.number().min(1, "Price is required")
});

export const servicesSchema = z.object({
  services: z.array(serviceSchema).min(1, "At least one service is required")
});

export const equipmentSchema = z.object({
  equipment: z.array(
    z.object({
      name: z.string().min(2, "Equipment name is required"),
      owned: z.boolean().default(true)
    })
  )
});

export const availabilitySchema = z.object({
  availableDays: z.array(z.string()).min(1, "Please select at least one day"),
  startTime: z.string(),
  endTime: z.string()
});

export const verificationSchema = z.object({
  idDocument: z.string().min(1, "ID document is required"),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  })
});

// Manager onboarding schemas
export const managerInfoSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  firstName: nameValidation,
  lastName: nameValidation,
  email: emailValidation,
  phone: phoneValidation,
  position: z.string().min(2, "Position is required"),
});

export const propertySchema = z.object({
  name: z.string().min(2, "Property name is required"),
  address: addressValidation,
  type: z.enum(['multifamily', 'commercial', 'residential', 'other']),
  units: z.number().optional(),
});

export const propertiesSchema = z.object({
  properties: z.array(propertySchema).min(1, "At least one property is required")
});

// Search schemas
export const searchFiltersSchema = z.object({
  services: z.array(z.string()).optional(),
  location: z.string().optional(),
  availability: z.date().optional(),
  priceRange: z.object({
    min: z.number().optional(),
    max: z.number().optional(),
  }).optional(),
  rating: z.number().min(1).max(5).optional(),
});

// Application schemas
export const applicationSchema = z.object({
  coverLetter: z.string().min(20, "Please write a more detailed cover letter"),
  proposedPrice: z.number().min(1, "Please enter a valid price"),
  startDate: z.date({
    required_error: "Start date is required",
  }),
  endDate: z.date({
    required_error: "End date is required",
  }),
}).refine((data) => data.endDate > data.startDate, {
  message: "End date must be after start date",
  path: ["endDate"],
});

// User profile schema
export const profileUpdateSchema = z.object({
  name: nameValidation,
  email: emailValidation,
  phone: phoneValidation.optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  website: urlValidation,
  avatar: z.string().optional(),
});