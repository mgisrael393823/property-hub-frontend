# Contributing to ZeroVacancy

Thank you for your interest in contributing to the ZeroVacancy platform! This document outlines our development process, coding standards, and guidelines for working with this codebase.

## Project Structure

ZeroVacancy follows a feature-based folder structure inspired by the Next.js App Router pattern, but implemented with React Router DOM:

```
src/
├── app/                      # Route-based pages
│   ├── creator/              # Creator-related routes
│   │   ├── [id]/             # Dynamic route for creator profiles
│   │   └── onboarding/       # Creator onboarding flow
│   ├── manager/              # Manager-related routes
│   ├── projects/             # Project-related routes
│   ├── booking/              # Booking-related routes
│   └── ...                   # Other route-based pages
├── components/
│   ├── ui/                   # Reusable UI primitives
│   ├── layout/               # Navigation, layout components
│   ├── cards/                # Card components (CreatorCard, ProjectCard)
│   ├── forms/                # Form components
│   └── dashboards/           # Dashboard-specific components
├── hooks/                    # Custom React hooks
├── lib/                      # Utilities and helpers
│   ├── constants.ts          # Route constants, enums, etc.
│   ├── utils.ts              # Helper functions
│   ├── api.ts                # API client
│   ├── types.ts              # TypeScript types/interfaces
│   └── mockData/             # Mock data for development
└── styles/                   # Global styles
```

## Development Workflow

### Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env.local` file based on `.env.example`
4. Start the development server: `npm run dev`

### Branch Naming

- Feature branches: `feature/descriptive-name`
- Bug fixes: `fix/issue-description`
- Refactoring: `refactor/component-name`
- Documentation: `docs/what-was-documented`

### Commit Messages

We follow the Conventional Commits specification:

- `feat:` for new features
- `fix:` for bug fixes
- `refactor:` for code changes that neither fix bugs nor add features
- `docs:` for documentation changes
- `style:` for formatting, missing semicolons, etc.
- `test:` for tests
- `chore:` for build process or auxiliary tool changes

### Pull Request Process

1. Create a branch from `main`
2. Make your changes
3. Ensure all tests pass: `npm run test`
4. Submit a PR with a clear description of changes
5. Reference any relevant issues with `#issue-number`

## Coding Standards

### TypeScript

- Always define types for props, state, and function parameters
- Prefer interfaces for object shapes that will be extended
- Use type aliases for unions, intersections, and utility types
- Avoid `any` whenever possible

```typescript
// Good
interface ButtonProps {
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
}

// Avoid
const Button = (props: any) => {
  // ...
}
```

### React Components

- Use functional components with hooks
- Prefer named exports for components
- Use destructuring for props
- Organize imports alphabetically

```typescript
// Good
export function Button({ variant, children, onClick }: ButtonProps) {
  return (
    <button className={`btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}

// Avoid
const Button = (props) => {
  return (
    <button className={`btn-${props.variant}`} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
export default Button;
```

### Styling

- Use Tailwind's utility classes instead of custom CSS when possible
- Follow the shadcn/ui component patterns
- Maintain consistent spacing, typography, and color tokens
- Ensure responsiveness for all components

```tsx
// Good
<button className="rounded-md bg-primary text-white px-4 py-2 hover:bg-primary-dark">
  Click Me
</button>

// Avoid
<button style={{ backgroundColor: '#3B82F6', color: 'white', padding: '8px 16px' }}>
  Click Me
</button>
```

### State Management

- Use React Query for server state (data fetching)
- Use local state (useState, useReducer) for UI state
- Consider context for cross-component state sharing
- Keep state as close to where it's needed as possible

### Code Formatting

- We use ESLint and Prettier
- Run `npm run lint` to check for issues
- Run `npm run format` to automatically format code

## Testing

- Write tests for critical components and utilities
- Test user interactions and edge cases
- Run tests before submitting a PR: `npm run test`

## Documentation

- Document complex functions and components with JSDoc comments
- Keep README and other documentation up to date
- Document API integrations and business logic
- Include examples for custom hooks and utilities

## Accessibility

- Ensure all components meet WCAG standards
- Use semantic HTML elements
- Provide proper ARIA attributes
- Test keyboard navigation
- Maintain sufficient color contrast

## Performance

- Avoid unnecessary re-renders
- Memoize expensive calculations
- Lazy load components when appropriate
- Optimize images and assets
- Monitor bundle size

## Error Handling

### Component Errors

- Wrap route components with ErrorBoundary to prevent the entire app from crashing
- Provide useful fallback UIs that help users recover from errors
- Use the EmptyState component for no-data states and recoverable errors
- Log errors to the console in development and to monitoring in production

```tsx
// Good
<ErrorBoundary>
  <UserProfile userId={userId} />
</ErrorBoundary>

// Better
<ErrorBoundary
  fallback={
    <EmptyState
      type="error"
      title="Could not load profile"
      description="There was a problem loading this user profile."
      action={{
        label: "Try Again",
        onClick: () => window.location.reload(),
      }}
    />
  }
>
  <UserProfile userId={userId} />
</ErrorBoundary>
```

### API and Async Errors

- Use the provided error handling utilities in `/lib/error/errorHandler.ts`
- Prefer the `useAsyncData` hook or `WithAsync` HOC for data fetching
- For mutations, use `useOptimisticMutation` hook with proper rollback
- Always categorize errors appropriately using AppError types
- Never expose raw error messages from the backend to users

```tsx
// Good
const { data, loading, error } = useAsyncData(
  () => api.creators.getById(id),
  { dependencies: [id] }
);

// Also good
<WithAsync asyncFn={() => api.creators.getById(id)} dependencies={[id]}>
  {(creator) => <CreatorProfile creator={creator} />}
</WithAsync>

// For mutations
const { mutate, loading } = useOptimisticMutation(
  (data) => api.projects.update(id, data),
  {
    optimisticUpdate: (data) => updateLocalState(data),
    rollback: () => resetLocalState(),
  }
);
```

### Form Errors

- Use Zod for schema validation with appropriate error messages
- Display field-level errors beneath each input
- Show a summary of errors at the top of the form for accessibility
- Use proper ARIA attributes to link error messages to inputs

## Questions and Support

If you have questions or need help, please:

1. Check existing documentation
2. Search for similar issues
3. Ask in the project's discussion forum
4. Reach out to the maintainers

Thank you for contributing to ZeroVacancy!
