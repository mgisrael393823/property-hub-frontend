# Claude Code CLI Instructions for ZeroVacancy

## Project Overview
ZeroVacancy is a two-sided marketplace connecting real estate property managers with verified local content creators (photographers, videographers, drone operators, etc.). This platform streamlines content production workflows from discovery to payment.

## Instructions for Claude Code CLI

### Read These Files on Each New Session
1. **CLAUDE_CODE_INSTRUCTIONS.md** (this file) - General instructions and project context
2. **claude.md** - Detailed project structure and technical specifications
3. **PROJECT_STATUS.md** - Current project status, completed and pending tasks
4. **zero-vacancy-claudecode-master-build.md** - Master build document with feature roadmap

### Development Guidelines
- **Routing System**: We use React Router DOM with explicit route declarations
  - Our folder structure mimics Next.js-style paths (e.g., `/creator/[id]/`)
  - All routes must be explicitly defined in App.tsx or routes.ts
  - No implicit file-based routing is used
  - Route parameters use React Router syntax (`:id` not `[id]`)

- **Component Organization**:
  - Follow the feature-based organization pattern
  - Keep UI primitives in `/components/ui/`
  - Place page-specific components in feature directories
  - Dashboard components belong in their respective dashboard directories

- **State Management**:
  - Use React Query for server state (data fetching)
  - Use local state (useState, useReducer) for UI state
  - Consider context for cross-component state sharing

- **Styling**:
  - Use Tailwind CSS utility classes
  - Follow shadcn/ui component patterns
  - Maintain design tokens for consistency
  - Ensure mobile responsiveness

- **Forms**:
  - Use React Hook Form with Zod validation
  - Follow established form patterns from existing forms

### Task Workflow
1. Review the current status in PROJECT_STATUS.md
2. Update PROJECT_STATUS.md when starting a new task (mark as "In Progress")
3. Implement the requested feature following the guidelines above
4. Update PROJECT_STATUS.md when the task is complete (mark as "Completed")
5. Provide a summary of changes made and any considerations for future work

### Backend Integration (Phase 2 Priority)
When implementing backend functionality:
- Define clean API integration points
- Use React Query for data fetching, caching, and mutation
- Consider fallbacks to mockData when appropriate
- Handle loading, error, and success states consistently
- Add TypeScript interfaces for all API responses

### Code Quality Standards
- Write clean, self-documenting code
- Include TypeScript types for all props and functions
- Follow the existing component patterns
- Ensure responsive design on all new components
- Test all user flows and edge cases
