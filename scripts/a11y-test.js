/**
 * Accessibility testing script using axe-core
 * 
 * This script can be run in the browser console on any page to perform
 * a quick accessibility audit using axe-core.
 * 
 * Usage:
 * 1. Copy this entire script
 * 2. Open the page you want to test in Chrome
 * 3. Open the developer console (F12 or Cmd+Opt+I)
 * 4. Paste and run this script
 * 5. Results will be printed in the console
 */

// Function to load axe-core from CDN
function loadAxe() {
  return new Promise((resolve, reject) => {
    // Check if axe is already loaded
    if (window.axe) {
      resolve(window.axe);
      return;
    }

    // Create script element
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.7.0/axe.min.js';
    script.onload = () => resolve(window.axe);
    script.onerror = () => reject(new Error('Failed to load axe-core'));
    
    // Add to document
    document.head.appendChild(script);
  });
}

// Function to run axe and display results
async function runA11yTest() {
  try {
    console.log('Loading axe-core...');
    const axe = await loadAxe();
    
    console.log('Running accessibility tests...');
    const results = await axe.run();
    
    // Display summary
    console.group('Accessibility Test Results');
    console.log(`Page: ${window.location.href}`);
    console.log(`Violations: ${results.violations.length}`);
    console.log(`Passes: ${results.passes.length}`);
    console.log(`Incomplete: ${results.incomplete.length}`);
    console.log(`Inapplicable: ${results.inapplicable.length}`);
    console.groupEnd();
    
    // Display violations in detail
    if (results.violations.length > 0) {
      console.group('Violations (WCAG Failures)');
      
      results.violations.forEach((violation, index) => {
        console.group(`${index + 1}. ${violation.id}: ${violation.help}`);
        console.log(`Impact: ${violation.impact}`);
        console.log(`WCAG: ${violation.tags.filter(tag => tag.includes('wcag')).join(', ')}`);
        console.log(`Description: ${violation.description}`);
        console.log(`Help: ${violation.helpUrl}`);
        
        console.group('Affected Elements:');
        violation.nodes.forEach(node => {
          console.log(node.html);
          console.log('Element:', node.target);
          console.log('Fix suggestion:', node.failureSummary);
          
          // Highlight elements in the page
          const elements = node.target.map(selector => 
            document.querySelector(selector)
          ).filter(Boolean);
          
          if (elements.length > 0) {
            console.log('DOM Elements:', elements);
            elements.forEach(el => {
              const originalOutline = el.style.outline;
              el.style.outline = '3px solid red';
              setTimeout(() => {
                el.style.outline = originalOutline;
              }, 5000);
            });
          }
          
          console.log('---');
        });
        console.groupEnd(); // Affected Elements
        console.groupEnd(); // Violation
      });
      
      console.groupEnd(); // Violations
    } else {
      console.log('🎉 No accessibility violations found!');
    }
    
    // Return the full results for further processing
    return results;
    
  } catch (error) {
    console.error('Error running accessibility test:', error);
  }
}

// Run the test
runA11yTest().then(results => {
  // Store results in a global variable for further inspection
  window.a11yResults = results;
  console.log('Full results stored in window.a11yResults');
});