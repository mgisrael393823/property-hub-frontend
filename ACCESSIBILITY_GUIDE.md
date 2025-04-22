# Accessibility Testing and Implementation Guide

This guide provides practical steps for testing, identifying, and fixing accessibility issues in the Property Hub frontend codebase. It's designed to help developers integrate accessibility best practices into their workflow.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Testing for Accessibility](#testing-for-accessibility)
3. [Common Issues and Fixes](#common-issues-and-fixes)
4. [Design System Components](#design-system-components)
5. [Keyboard Navigation](#keyboard-navigation)
6. [Screen Reader Support](#screen-reader-support)
7. [Testing Resources](#testing-resources)

## Quick Start

```bash
# Install accessibility testing tools
npm install

# Run ESLint with accessibility rules
npm run a11y:lint

# Run Pa11y accessibility checks (requires dev server running)
npm run a11y:check

# Run comprehensive accessibility audit
npm run a11y:full
```

### Accessibility Checklist for PRs

Before submitting a PR, make sure your changes meet these requirements:

- [ ] Components pass ESLint a11y rules
- [ ] Interactive elements are keyboard accessible
- [ ] Text has sufficient color contrast
- [ ] Images have alt text
- [ ] Forms have proper labels
- [ ] No content flashes or auto-updates unexpectedly
- [ ] No keyboard traps
- [ ] Focus states are visible

## Testing for Accessibility

### Manual Testing

1. **Keyboard Navigation**: 
   - Tab through your component to ensure all interactive elements are focusable
   - Verify focus indicators are visible
   - Ensure you can activate all controls with Enter/Space

2. **Screen Reader Testing**:
   - On macOS: Turn on VoiceOver (Command + F5) and navigate through your component
   - On Windows: Use NVDA or Windows Narrator
   - Verify all content and state changes are announced

3. **Color Contrast**:
   - Use browser DevTools to check contrast ratios
   - Text should have 4.5:1 contrast with background
   - Large text (18pt or 14pt bold) should have 3:1 contrast

### Automated Testing

1. **ESLint with jsx-a11y**:
   ```bash
   npm run a11y:lint
   ```

2. **Pa11y for WCAG testing**:
   ```bash
   npm run a11y:check
   ```

3. **Jest with jest-axe** (in component tests):
   ```tsx
   import { axe, toHaveNoViolations } from 'jest-axe';
   
   expect.extend(toHaveNoViolations);
   
   it('should pass accessibility tests', async () => {
     const { container } = render(<YourComponent />);
     const results = await axe(container);
     expect(results).toHaveNoViolations();
   });
   ```

## Common Issues and Fixes

### 1. Missing Accessible Names

#### Problem:
```jsx
<button onClick={handleNotifications}>
  <BellIcon />
</button>
```

#### Solution:
```jsx
<button 
  onClick={handleNotifications}
  aria-label="Notifications"
>
  <BellIcon />
</button>
```

### 2. Color Contrast Issues

#### Problem:
```jsx
<p className="text-gray-300">Low contrast text</p>
```

#### Solution:
```jsx
<p className="text-gray-700">Higher contrast text</p>
```

### 3. Non-semantic HTML

#### Problem:
```jsx
<div onClick={handleClick} className="btn">Click me</div>
```

#### Solution:
```jsx
<button onClick={handleClick} className="btn">Click me</button>
```

### 4. Form Labels

#### Problem:
```jsx
<div>
  <span>Name</span>
  <input type="text" />
</div>
```

#### Solution:
```jsx
<div>
  <label htmlFor="name">Name</label>
  <input id="name" type="text" />
</div>
```

### 5. Missing Alt Text

#### Problem:
```jsx
<img src="/logo.png" />
```

#### Solution:
```jsx
<img src="/logo.png" alt="Property Hub Logo" />
```
For decorative images that should be ignored by screen readers:
```jsx
<img src="/decorative.png" alt="" />
```

## Design System Components

Our codebase includes accessible versions of common UI components. Use these instead of creating your own:

- `AccessibleCard`: Card component with proper keyboard and screen reader support
- `use-a11y` hook: Utilities for accessibility features

Example:

```jsx
import { AccessibleCard } from '@/components/a11y/AccessibleCard';
import { useA11yNavigation } from '@/hooks/use-a11y';

function MyComponent() {
  const { announceToScreenReader } = useA11yNavigation();
  
  const handleSave = () => {
    saveItem();
    announceToScreenReader("Item saved successfully");
  };
  
  return (
    <AccessibleCard
      id="my-card-1"
      title="My Card"
      description="This is an accessible card"
      imageUrl="/image.jpg"
      imageAlt="Description of image"
      tags={["Tag 1", "Tag 2"]}
      onSave={handleSave}
    />
  );
}
```

## Keyboard Navigation

### Focus Management

Use the `trapFocus` utility for modals and dialogs:

```jsx
import { useA11yNavigation } from '@/hooks/use-a11y';
import { useRef } from 'react';

function Modal({ onClose, children }) {
  const modalRef = useRef(null);
  const { trapFocus } = useA11yNavigation({ onEscape: onClose });
  
  return (
    <div 
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      onKeyDown={trapFocus(modalRef)}
      className="modal"
    >
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  );
}
```

### Skip Links

Add a skip link for keyboard users to bypass navigation:

```jsx
<a 
  href="#main-content" 
  className="skip-link sr-only focus:not-sr-only"
>
  Skip to main content
</a>

{/* Later in the markup */}
<main id="main-content">
  {/* Content here */}
</main>
```

## Screen Reader Support

### Live Regions

Use live regions to announce dynamic changes:

```jsx
import { useA11yNavigation } from '@/hooks/use-a11y';

function Notifications() {
  const { announceToScreenReader } = useA11yNavigation();
  
  const handleNewNotification = (message) => {
    // Update UI
    updateNotifications(message);
    
    // Announce to screen readers
    announceToScreenReader(`New notification: ${message}`);
  };
  
  // Rest of component
}
```

### ARIA States

Communicate state changes with ARIA attributes:

```jsx
function Accordion({ title, children, isExpanded, onToggle }) {
  return (
    <div>
      <button 
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls="accordion-content"
      >
        {title}
      </button>
      <div 
        id="accordion-content"
        hidden={!isExpanded}
      >
        {children}
      </div>
    </div>
  );
}
```

## Testing Resources

- [WAVE Browser Extension](https://wave.webaim.org/extension/): Quick visual feedback on accessibility issues
- [axe DevTools](https://www.deque.com/axe/devtools/): Browser extension for detailed audits
- [Lighthouse](https://developers.google.com/web/tools/lighthouse): Built into Chrome DevTools
- [Color Contrast Analyzer](https://developer.paciellogroup.com/resources/contrastanalyser/): Desktop app for checking contrast

### Screen Readers for Testing

- macOS: VoiceOver (Command + F5)
- Windows: NVDA (free download) or Windows Narrator
- Mobile: VoiceOver (iOS) or TalkBack (Android)

## Resources for Learning

- [MDN Accessibility Guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [A11Y Project Checklist](https://www.a11yproject.com/checklist/)
- [Web Accessibility Initiative (WAI)](https://www.w3.org/WAI/)
- [Inclusive Components](https://inclusive-components.design/)