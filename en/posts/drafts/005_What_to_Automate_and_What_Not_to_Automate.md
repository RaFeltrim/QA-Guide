# What to Automate and What Not to Automate

## Introduction

Test automation is one of the most valuable skills for modern QAs, but not all tests should be automated. Knowing what to automate is as important as knowing how to do it.

## Automation Criteria

### 1. Execution Frequency
**Automate when:**
- Test is executed in multiple cycles
- Part of regular regression
- Validated in multiple environments

**Don't automate when:**
- Test is unique/ad-hoc
- Exploratory testing
- Initial feature validation

### 2. Test Case Stability
**Automate when:**
- Flow is consistent
- Few expected changes
- Low risk of frequent breaking

**Don't automate when:**
- UI in constant change
- Feature in active development
- Unstable requirements

### 3. Technical Complexity
**Automate when:**
- Repetitive process
- Parameterizable data
- Predictable scenarios

**Don't automate when:**
- Needs human judgment
- Subjective visual validation
- Usability testing

## Decision Matrix

| Test Type | Frequency | Stability | Complexity | Automate? |
|-----------|-----------|-----------|------------|-----------|
| **Login** | High | High | Low | ✅ Yes |
| **Checkout** | High | Medium | Medium | ✅ Yes |
| **Exploratory** | Low | Low | High | ❌ No |
| **Accessibility** | Medium | High | High | ⚠️ Partial |
| **Visual** | Medium | Medium | Medium | ⚠️ Carefully |
| **API** | High | High | Low | ✅ Yes |
| **Performance** | Medium | High | High | ✅ Yes |
| **Usability** | Low | Low | High | ❌ No |

## What to Automate (High Priority)

### 1. Regression Tests
- Critical business flows
- Stable functionalities
- Scenarios repeated in releases

**Example:**
```javascript
// Automated login test
describe('Login', () => {
  it('should allow login with valid credentials', () => {
    cy.visit('/login');
    cy.get('#email').type('user@test.com');
    cy.get('#password').type('password123');
    cy.get('#submit').click();
    cy.url().should('include', '/dashboard');
  });
});
```

### 2. API Tests
- Stable contracts
- Data validations
- System integrations

**Example:**
```javascript
// User API test
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response contains user data", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('id');
    pm.expect(jsonData).to.have.property('name');
});
```

### 3. Performance Tests
- Consistent loads
- Defined SLAs
- Comparative metrics

## What Not to Automate (Low Priority)

### 1. Exploratory Tests
- Discovery of non-obvious bugs
- Human creativity and intuition
- Validation of unexpected edge cases

### 2. Usability Tests
- Subjective visual perception
- User experience
- Emotional feedback

### 3. Ad-hoc Tests
- Point validations
- Investigation of specific bugs
- Rapid experimentation

## Implementation Strategy

### Phase 1: Start with Basics
1. **Smoke tests** - Quick verification
2. **Critical flows** - Main user paths
3. **Stable APIs** - Well-defined contracts

### Phase 2: Gradually Expand
1. **Complete regression** - Expanded coverage
2. **Integration tests** - Between systems
3. **Basic performance** - Standard loads

### Phase 3: Optimize and Evolve
1. **Suite maintenance** - Continuous refactoring
2. **Parallelization** - Faster execution
3. **Advanced reporting** - Better insights

## Common Mistakes

❌ **Automate everything:** Waste time with maintenance
❌ **Ignore stability:** Suite constantly breaking
❌ **Don't consider ROI:** Cost greater than benefit
❌ **Choose wrong tools:** Incompatibility with stack
❌ **Lack of standards:** Inconsistent and hard-to-maintain code

## Best Practices

✅ **Start small:** Prove value before scaling
✅ **Measure ROI:** Time saved vs time invested
✅ **Maintain standards:** Clean and reusable code
✅ **Review periodically:** Remove obsolete tests
✅ **Train the team:** Distributed technical capacity

## Decision Checklist

- [ ] Identify execution frequency
- [ ] Evaluate flow stability
- [ ] Consider technical complexity
- [ ] Calculate potential ROI
- [ ] Choose appropriate tool
- [ ] Define coding standards
- [ ] Plan continuous maintenance

## Evaluation Template

```markdown
## Automation Assessment - Registration Flow

**Frequency:** High (executed daily)
**Stability:** Medium (monthly changes)
**Complexity:** Low (simple data)

**Estimated ROI:**
- Manual time: 5 min/execution × 20 executions = 100 min/week
- Automation time: 2 hours development + 30 min maintenance/month
- Savings: ~90% time after first month

**Decision:** ✅ Automate

**Responsible:** QA John
**Deadline:** 3 days for implementation
```

## Conclusion

The key to a successful automation strategy is balancing opportunities with technical realities. Not everything needs to be automated, but everything can be evaluated for automation.

📚 **Want complete templates?** Check out our [automation criteria](../../modelos/README.md#critérios-de-automação) and [practical exercises](../../exercicios/pleno.md#seleção-de-casos-para-automação).

#QA #TestAutomation #SoftwareTesting #Strategy