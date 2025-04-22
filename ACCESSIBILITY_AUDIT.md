# Property Hub Accessibility Audit Checklist

## WCAG 2.1 AA Compliance Checklist

### 1. Perceivable
- [ ] **Color Contrast (1.4.3)**
  - [ ] Text has sufficient contrast ratio (4.5:1 for normal text, 3:1 for large text)
  - [ ] UI components and graphical objects have 3:1 contrast against adjacent colors
  - [ ] Tools: Contrast checker, Chrome DevTools, Color Oracle for color blindness simulation

- [ ] **Text Alternatives (1.1.1)**
  - [ ] All non-text content has text alternatives 
  - [ ] Images have appropriate alt text
  - [ ] Icon buttons have accessible names
  - [ ] Decorative images have empty alt attributes

- [ ] **Adaptable Content (1.3.1)**
  - [ ] Semantic HTML is used (headings, landmarks, lists)
  - [ ] Tables have proper headers and structure
  - [ ] Form controls are properly labeled

- [ ] **Distinguishable Content (1.4.4, 1.4.10)**
  - [ ] Text can be resized to 200% without loss of content or function
  - [ ] Interface is responsive and reflows on zoom
  - [ ] No horizontal scrolling at 320px width viewport

### 2. Operable
- [ ] **Keyboard Accessibility (2.1.1, 2.1.2)**
  - [ ] All functionality is operable with a keyboard
  - [ ] No keyboard traps
  - [ ] Custom components (dropdowns, modals) are keyboard accessible
  - [ ] Focus management for dialogs and popovers

- [ ] **Focus Indicators (2.4.7)**
  - [ ] Focus indicators are visible and have sufficient contrast
  - [ ] No focus indicator has been removed (outline: none)
  - [ ] Custom focus styles match brand while remaining visible

- [ ] **Focus Order (2.4.3)**
  - [ ] Focus order is logical and follows DOM structure
  - [ ] Focus order follows visual layout
  - [ ] Modals trap focus appropriately

- [ ] **Timing (2.2.1)**
  - [ ] No essential time limits or ability to adjust/extend time limits
  - [ ] Auto-updating content can be paused or adjusted

### 3. Understandable
- [ ] **Readable (3.1.1)**
  - [ ] Page language is specified (lang attribute)
  - [ ] Text is readable and understandable

- [ ] **Predictable (3.2.1, 3.2.2)**
  - [ ] Navigation is consistent
  - [ ] Components behave predictably
  - [ ] No unexpected changes on focus or input

- [ ] **Input Assistance (3.3.1, 3.3.2, 3.3.3)**
  - [ ] Error messages are descriptive
  - [ ] Form validation provides clear feedback
  - [ ] Labels or instructions for user input

### 4. Robust
- [ ] **Compatible (4.1.1, 4.1.2, 4.1.3)**
  - [ ] Valid HTML with no duplicate IDs
  - [ ] ARIA roles, states, and properties are used correctly
  - [ ] Status messages can be programmatically determined

## Priority Pages for Testing

1. Homepage
2. Search results
3. Creator profile
4. Booking form
5. Creator dashboard
6. Manager dashboard
7. Project creation form

## Automated Testing

- Run Lighthouse accessibility audit on all priority pages
- Use axe DevTools on each page
- Document all failures with screenshots in GitHub issues
- Test with screen readers (VoiceOver on Mac, NVDA on Windows)

## Manual Testing Checklist

- [ ] Keyboard navigation test on all interactive elements
- [ ] Screen reader testing of main user flows
- [ ] Color blindness simulation (Deuteranopia, Protanopia, Tritanopia)
- [ ] Test at 200% zoom
- [ ] Test with text-only zoom (browser settings)
- [ ] Mobile screen reader testing (VoiceOver on iOS, TalkBack on Android)

## Priority Fixes

1. **Critical (P0)** - Blocks users from completing essential tasks:
   - Form inputs without labels
   - Interactive elements not keyboard accessible
   - Missing alt text on informative images
   - Insufficient color contrast on key UI elements
   - Focus traps

2. **High (P1)** - Creates significant barriers:
   - Unclear form validation
   - Missing ARIA landmarks/regions
   - Missing focus indicators
   - Missing page titles
   - Improper heading structure

3. **Medium (P2)** - Creates barriers for some users:
   - Links with poor descriptions
   - Content that doesn't reflow properly
   - Elements that appear on hover only

## Documentation Format for Issues

```
## Page: [Page Name]
### Issue: [Brief Description]
- WCAG Criterion: [e.g., 1.4.3 Contrast]
- Priority: [P0/P1/P2]
- Description: [Detailed description of the issue]
- Location: [Specific element or component]
- Screenshot: [If applicable]
- Recommendation: [Suggested fix]
```

## Tools to Use

- Lighthouse (Chrome DevTools)
- axe DevTools (Chrome extension)
- WAVE Web Accessibility Evaluation Tool
- Color Oracle (color blindness simulator)
- Chrome DevTools Accessibility panel
- Keyboard testing
- Screen readers (VoiceOver, NVDA)