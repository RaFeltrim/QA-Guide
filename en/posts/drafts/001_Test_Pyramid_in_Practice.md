# Test Pyramid in Practice

## Introduction

The test pyramid is one of the most fundamental concepts in QA, but its practical application isn't always clear. In this post, we'll explore how to effectively apply the test pyramid in real projects.

## What is the Test Pyramid?

The test pyramid is a model that suggests the ideal proportion of different types of tests in a software project:

1. **Base: Unit Tests** - Test individual units of code
2. **Middle: Integration Tests** - Validate interaction between components
3. **Top: End-to-End (E2E) Tests** - Test complete user flows

## Practical Application

### 1. Start with the Base

Unit tests should represent the largest part of your test suite (70%). They are:
- Fast to execute
- Easy to maintain
- Specific in identifying problems

**Practical example:**
```javascript
// Unit test for discount calculation function
test('should calculate discount correctly', () => {
  const result = calculateDiscount(100, 10);
  expect(result).toBe(90);
});
```

### 2. Build the Middle

Integration tests represent about 20% of tests. They verify:
- Interactions between modules
- Calls to external APIs
- Database connections

**Practical example:**
```javascript
// API integration test
test('should return active users', async () => {
  const response = await api.get('/users?status=active');
  expect(response.status).toBe(200);
  expect(response.data).toBeInstanceOf(Array);
});
```

### 3. Complete with E2E

E2E tests should represent about 10% of tests. Focus on:
- Critical user flows
- Complete system integrations
- End-to-end scenarios

**Practical example:**
```javascript
// E2E test for purchase flow
describe('Purchase Flow', () => {
  it('should complete a purchase successfully', () => {
    cy.visit('/login');
    cy.get('#email').type('user@test.com');
    cy.get('#password').type('password123');
    cy.get('#login-btn').click();
    cy.contains('Products').should('be.visible');
    // ... continuation of flow
  });
});
```

## Common Mistakes

❌ **Testing everything in E2E:** This makes the suite slow and fragile
❌ **Ignoring unit tests:** Problems are found too late
❌ **No integration tests:** Communication failures between components go unnoticed

## Benefits of the Correct Approach

✅ **Fast feedback:** Problems identified earlier in the cycle
✅ **Easier maintenance:** Smaller tests are easier to fix
✅ **Reduced cost:** Bugs found before reaching production
✅ **Increased confidence:** Coverage across multiple layers

## Implementation Checklist

- [ ] Identify the layers of your application
- [ ] Set up environment for unit tests
- [ ] Establish code coverage standards
- [ ] Implement integration tests for critical APIs
- [ ] Automate main E2E flows
- [ ] Monitor test suite health

## Conclusion

Correctly applying the test pyramid isn't about following an arbitrary rule, but rather about creating an efficient and sustainable quality strategy. Start with small implementations and evolve as the team matures.

📚 **Want to dive deeper?** Check out our complete guide on [Test Pyramid](../../01-FUNDAMENTOS/03-piramide-testes.md) and [practical exercises](../../exercicios/junior.md#test-pyramid).

#QA #TestPyramid #SoftwareTesting #Automation