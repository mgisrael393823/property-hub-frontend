# Next Tests Implementation Plan

## Priority Components for Testing

### UI Component Tests

1. **Modal Component** (`src/components/ui/modal.test.tsx`)
   - Test rendering with default props
   - Test custom className
   - Test title and description rendering
   - Test open/close functionality
   - Test click outside behavior
   - Test keyboard accessibility (Escape key)

2. **Dialog Component** (`src/components/ui/dialog.test.tsx`)
   - Test rendering with default props
   - Test trigger functionality
   - Test close button
   - Test content rendering
   - Test accessibility attributes (aria-modal, aria-labelledby)

### Page Component Tests

1. **CreatorProfile** (`src/pages/CreatorProfile.test.tsx`)
   - Test page sections render correctly
   - Test loading states
   - Test error handling
   - Test booking button interaction
   - Test portfolio section

2. **Search Page** (`src/pages/Search.test.tsx`)
   - Test filters functionality
   - Test view switching (creators vs services)
   - Test results rendering
   - Test loading and error states
   - Test empty results handling

## Test Coverage Implementation

1. **Install Coverage Tools**
   ```bash
   npm install -D @vitest/coverage-v8
   ```

2. **Update package.json Scripts**
   ```json
   "test:coverage": "vitest run --coverage"
   ```

3. **Configure Coverage Thresholds in Vitest Config**
   ```typescript
   // vitest.config.ts
   coverage: {
     provider: 'v8',
     reporter: ['text', 'json', 'html'],
     include: ['src/**/*.{ts,tsx}'],
     exclude: [
       'src/**/*.d.ts',
       'src/test/**',
       'src/vite-env.d.ts',
       'src/main.tsx',
     ],
     thresholds: {
       branches: 70,
       functions: 75,
       lines: 75,
       statements: 75,
     }
   }
   ```

4. **Generate Initial Coverage Report**
   - Run `npm run test:coverage`
   - Identify gaps in coverage
   - Prioritize low-coverage areas for next test implementations

## Integration Testing Plan

1. **User Flow: Project Creation**
   - Test complete flow from project form to submission
   - Test validation and error handling
   - Mock API responses for form submission

2. **User Flow: Creator Search and Booking**
   - Test search filtering
   - Test creator selection
   - Test booking form submission

## Next Steps

1. ✅ Implement Dialog component tests - DONE
2. ✅ Implement Search page tests - DONE  
3. ✅ Implement SearchViewToggle tests - DONE
4. ✅ Implement SearchFilters tests - DONE
5. ✅ Implement Sheet component tests (referred to as "Modal" in plan) - DONE
6. ✅ Implement CreatorProfile page tests - DONE
7. Set up coverage reporting
8. Begin integration tests for key user flows