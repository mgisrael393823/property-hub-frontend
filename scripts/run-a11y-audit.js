#!/usr/bin/env node

/**
 * Comprehensive A11y Audit Script
 * 
 * This script runs a thorough accessibility audit on the application
 * by checking multiple pages with different tools.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Ensure reports directory exists
const reportsDir = path.join(process.cwd(), 'reports', 'a11y');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

// Terminal colors
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  bold: '\x1b[1m'
};

// Pages to test
const pages = [
  { name: 'Home', path: '/' },
  { name: 'Search', path: '/search' },
  { name: 'Creator Profile', path: '/creator/1' },
  { name: 'Creator Dashboard', path: '/creator-dashboard' },
  { name: 'Manager Dashboard', path: '/manager-dashboard' },
  { name: 'Project Creation', path: '/projects/new' }
];

// Main audit function
async function runAccessibilityAudit() {
  console.log(`${colors.bold}${colors.cyan}=====================================${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}     ACCESSIBILITY AUDIT TOOLKIT     ${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}=====================================${colors.reset}\n`);
  
  // Check if server is running
  try {
    console.log(`${colors.blue}Checking if development server is running...${colors.reset}`);
    execSync('curl -s http://localhost:5173 > /dev/null');
    console.log(`${colors.green}✓ Development server is running${colors.reset}\n`);
  } catch (error) {
    console.log(`${colors.red}✗ Development server is not running${colors.reset}`);
    console.log(`${colors.yellow}Please start the development server with 'npm run dev' and try again${colors.reset}\n`);
    process.exit(1);
  }
  
  // Main menu
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  console.log(`${colors.bold}Available Audit Options:${colors.reset}`);
  console.log(`${colors.cyan}1. Run ESLint with accessibility rules${colors.reset}`);
  console.log(`${colors.cyan}2. Run Lighthouse audit on all pages${colors.reset}`);
  console.log(`${colors.cyan}3. Run Pa11y checks on all pages${colors.reset}`);
  console.log(`${colors.cyan}4. Run Comprehensive audit (all of the above)${colors.reset}`);
  console.log(`${colors.cyan}5. Exit${colors.reset}\n`);
  
  rl.question(`${colors.yellow}Select an option (1-5): ${colors.reset}`, async (answer) => {
    switch (answer) {
      case '1':
        await runEslintChecks();
        break;
      case '2':
        await runLighthouseChecks();
        break;
      case '3':
        await runPa11yChecks();
        break;
      case '4':
        await runEslintChecks();
        await runLighthouseChecks();
        await runPa11yChecks();
        break;
      case '5':
        console.log(`${colors.blue}Exiting...${colors.reset}`);
        process.exit(0);
        break;
      default:
        console.log(`${colors.red}Invalid option. Exiting.${colors.reset}`);
        process.exit(1);
    }
    
    rl.close();
    
    console.log(`\n${colors.green}${colors.bold}Accessibility audit complete!${colors.reset}`);
    console.log(`${colors.green}Reports saved to: ${colors.reset}${colors.bold}${reportsDir}${colors.reset}\n`);
  });
}

// ESLint checks
async function runEslintChecks() {
  console.log(`\n${colors.bold}${colors.blue}Running ESLint with a11y rules...${colors.reset}`);
  
  try {
    execSync('npx eslint --ext .tsx,.ts src/ --quiet --format json > reports/a11y/eslint-a11y.json', { stdio: 'inherit' });
    console.log(`${colors.green}✓ ESLint checks completed${colors.reset}`);
    console.log(`${colors.green}  Report saved to: ${colors.reset}reports/a11y/eslint-a11y.json`);
  } catch (error) {
    console.log(`${colors.red}✗ ESLint checks failed${colors.reset}`);
    console.log(`${colors.yellow}  See ESLint output for details${colors.reset}`);
  }
}

// Lighthouse checks
async function runLighthouseChecks() {
  console.log(`\n${colors.bold}${colors.blue}Running Lighthouse accessibility audits...${colors.reset}`);
  
  for (const page of pages) {
    console.log(`${colors.cyan}Auditing ${page.name}...${colors.reset}`);
    
    try {
      const outputPath = path.join(reportsDir, `lighthouse-${page.name.toLowerCase().replace(/\s+/g, '-')}.json`);
      execSync(
        `npx lighthouse http://localhost:5173${page.path} --only-categories=accessibility --output=json --output-path=${outputPath} --quiet`,
        { stdio: 'inherit' }
      );
      console.log(`${colors.green}✓ Lighthouse audit for ${page.name} completed${colors.reset}`);
      console.log(`${colors.green}  Report saved to: ${colors.reset}${outputPath}`);
    } catch (error) {
      console.log(`${colors.red}✗ Lighthouse audit for ${page.name} failed${colors.reset}`);
    }
  }
}

// Pa11y checks
async function runPa11yChecks() {
  console.log(`\n${colors.bold}${colors.blue}Running Pa11y accessibility checks...${colors.reset}`);
  
  for (const page of pages) {
    console.log(`${colors.cyan}Checking ${page.name}...${colors.reset}`);
    
    try {
      const outputPath = path.join(reportsDir, `pa11y-${page.name.toLowerCase().replace(/\s+/g, '-')}.json`);
      execSync(
        `npx pa11y http://localhost:5173${page.path} --reporter json > ${outputPath}`,
        { stdio: 'inherit' }
      );
      console.log(`${colors.green}✓ Pa11y check for ${page.name} completed${colors.reset}`);
      console.log(`${colors.green}  Report saved to: ${colors.reset}${outputPath}`);
    } catch (error) {
      console.log(`${colors.red}✗ Pa11y check for ${page.name} failed${colors.reset}`);
    }
  }
}

// Run the audit
runAccessibilityAudit();