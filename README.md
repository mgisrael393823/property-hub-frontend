# ZeroVacancy - Real Estate Creator Marketplace

A two-sided marketplace connecting property managers with content creators for professional property photography, videos, and 3D tours.

## Project Overview

ZeroVacancy is a specialized platform built to streamline content production for multifamily and commercial property teams. The platform connects property managers and developers with verified local content creators — including photographers, drone operators, video editors, and 3D tour specialists.

### Core Features

- **Creator Discovery**: Visual-first search experience with filters
- **Project Posting**: Managers can post projects and receive applications
- **Direct Booking**: Property teams can book creators directly
- **Role-based Dashboards**: Specialized interfaces for creators, managers, and admins
- **Authentication**: Secure user authentication with role-based access control
- **Mock Data**: Development-ready with sample data for all features

## Getting Started

To run the project locally:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

### Test Accounts

For development purposes, you can use these test accounts:

- **Creator**: creator@example.com / password
- **Manager**: manager@example.com / password
- **Admin**: admin@example.com / password

## Project Structure

- `/src/app` - Main page components organized by route
- `/src/components` - Reusable UI components
- `/src/lib` - Utilities, API client, and type definitions
- `/src/lib/auth` - Authentication context and helpers
- `/src/pages` - Page-level components

## Tech Stack

- **Framework**: React + Vite
- **State Management**: React Context for authentication
- **Styling**: Tailwind CSS + shadcn/ui
- **Form Handling**: React Hook Form + Zod validation
- **Routing**: React Router DOM
- **Data Fetching**: React Query
- **TypeScript**: For type safety and better developer experience

## Current Status

The frontend implementation is nearly complete with all core UI components and workflows in place. Authentication and user roles are implemented with a mock API layer. Ready for backend integration.

See [PROJECT_STATUS.md](./PROJECT_STATUS.md) for detailed progress tracking.

## Development Guidelines

- Use the authentication context for user state management
- Protected routes are implemented for role-based access control
- Follow existing component patterns and project structure
- Use the mock API for development until backend is available

## Project info

**URL**: https://lovable.dev/projects/c2243a86-2684-45cf-83c0-fd4800f287e0