# Flakiness in E2E: How to Reduce

## Introduction

Flaky tests are every QA's nightmare. They fail intermittently without code changes, causing loss of confidence in the test suite and wasting valuable time. Let's explore practical strategies to drastically reduce them.

## What are Flaky Tests?

Flaky tests are those that:
- Pass and fail randomly
- Without changes in production code
- Same environment and test data
- Inconsistent behavior over time

**Example:**
```javascript
// Flaky test - fails 30% of the time
it('should show success message', () => {
  cy.visit('/signup');
  cy.get('#name').type('John');
  cy.get('#email').type('john@test.com');
  cy.get('#submit').click();
  // Sometimes the message appears, sometimes not
  cy.contains('Registration completed successfully!').should('be.visible');
});
```

## Main Causes

### 1. Timing Issues
- **Fixed sleeps:** `cy.wait(2000)` 
- **Race conditions:** Elements loading asynchronously
- **Short timeouts:** System slower than expected

### 2. Shared State
- **Contaminated test data:** Duplicate IDs
- **Persistent cookies/sessions:** Previous states affecting
- **Non-reset database:** Accumulated records

### 3. External Dependencies
- **Third-party APIs:** Variable availability
- **Unstable mocked services:** Inconsistent configurations
- **Unstable network:** Variable latency

### 4. Fragile Selectors
- **Dynamic IDs/classes:** Automatically generated
- **Complex XPath:** Break with small changes
- **Position-based selectors:** Structural fragility

## Prevention Strategies

### 1. Complete Isolation
```javascript
// Before: Tests sharing state
describe('User Registration', () => {
  it('creates user', () => {
    // Uses fixed email
    cy.get('#email').type('user@test.com');
  });
  
  it('validates existing user', () => {
    // Depends on previous test
  });
});

// After: Complete isolation
describe('User Registration', () => {
  const uniqueEmail = `user_${Date.now()}@test.com`;
  
  it('creates user', () => {
    cy.get('#email').type(uniqueEmail);
  });
  
  it('validates existing user', () => {
    // Create own user for test
    const anotherEmail = `user2_${Date.now()}@test.com`;
    cy.get('#email').type(anotherEmail);
  });
});
```

### 2. Explicit Waits
```javascript
// Before: Fixed sleep
cy.visit('/page');
cy.wait(3000); // Arbitrary wait
cy.get('#button').click();

// After: Conditional wait
cy.visit('/page');
cy.get('#button').should('be.visible').click();
```

### 3. Rigorous Teardown
```javascript
// Hooks for cleanup
beforeEach(() => {
  // Test setup
  cy.visit('/');
});

afterEach(() => {
  // Post-test cleanup
  cy.clearCookies();
  cy.clearLocalStorage();
  // Reset database state if needed
});
```

## Detection Techniques

### 1. Continuous Monitoring
- **Flakiness dashboards:** % of intermittent failures
- **Automatic alerts:** Notification when flakiness > 5%
- **Execution history:** Failure patterns identified

### 2. Intelligent Re-execution
```bash
# Automatically rerun failed tests
npx cypress run --spec "cypress/integration/flaky-test.js" --retries 2
```

### 3. Detailed Logs
```javascript
// Add context to logs
it('should process payment', function() {
  cy.log(`Starting test: ${this.test.title}`);
  cy.log(`Timestamp: ${new Date().toISOString()}`);
  // ... test steps
  cy.log('Test completed successfully');
});
```

## Correction Process

### 1. Identification
- Collect failure history
- Group by similar patterns
- Prioritize by occurrence frequency

### 2. Analysis
- Reproduce manually
- Check detailed logs
- Identify exact failure point

### 3. Correction
- Apply appropriate strategies
- Extensively test fix
- Document implemented solution

### 4. Monitoring
- Monitor for 2-3 weeks
- Verify flakiness reduction
- Adjust if needed

## Common Mistakes

❌ **Ignoring flakiness:** "Just run it again"
❌ **Not investigating root cause:** Superficial patches
❌ **Lack of isolation:** Persistent shared state
❌ **Inadequate waits:** Bad sleeps or timeouts
❌ **Fragile selectors:** Unstable XPath and classes

## Best Practices

✅ **Robust design:** Independent and isolated tests
✅ **Intelligent waits:** Conditional waits
✅ **Stable selectors:** Dedicated attributes for tests
✅ **Continuous monitoring:** Early detection
✅ **Clear documentation:** Solution records

## Stability Checklist

- [ ] Completely independent tests
- [ ] Explicit waits instead of sleeps
- [ ] Stable and semantic selectors
- [ ] Complete teardown after each test
- [ ] Unique test data per execution
- [ ] Mock external dependencies
- [ ] Detailed logs for debugging
- [ ] Flakiness monitoring configured

## Analysis Template

```markdown
## Flakiness Analysis - Checkout Test

**Failure Pattern:** Intermittent failure (30% of executions)
**Recent Occurrences:** Dec 15, 16, 18, 2025

**Identified Cause:** Race condition in cart loading

**Applied Solution:**
```javascript
// Before
cy.visit('/checkout');
cy.get('#finalize-purchase').click();

// After
cy.visit('/checkout');
cy.get('#cart-items').should('have.length.greaterThan', 0);
cy.get('#finalize-purchase').should('be.enabled').click();
```

**Result:** 0 failures in 50 consecutive executions
**Responsible:** QA Mary
**Date:** Dec 18, 2025
```

## Conclusion

Eliminating flaky tests requires technical discipline and structured process. The key is to prevent before correcting, and to continuously monitor after the solution. Remember: a flaky test is worse than no test.

📚 **Want to dive deeper?** Check out our complete guides on [Cypress](../../STACK/CYPRESS.md) and [Playwright](../../STACK/PLAYWRIGHT.md), plus [practical exercises](../../exercicios/pleno.md#debug-de-testes-flaky).

#QA #TestAutomation #FlakyTests #Cypress #E2E