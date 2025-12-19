# Carousel Template

## Standard Structure

Slide 1: Title + Hook
Slides 2-6: Main points (1 per slide)
Slide 7: Practical example
Slide 8: Call to action + credits

---

## Filled Example

### Slide 1
# Flaky Tests: How to Reduce Instability?

💡 Are your automated tests failing randomly? You're not crazy!

### Slide 2
## What are flaky tests?

🧪 Tests that fail intermittently
❌ Even without code changes
⏰ Cause time and confidence loss
💸 Significant financial impact

### Slide 3
## Main causes

⏰ **Inadequate wait times**
🔄 **Unstable external dependencies**
💾 **Shared state between tests**
🌐 **Network issues**
🖥️ **Environment differences**

### Slide 4
## Prevention strategies

🛡️ **Complete test isolation**
⏱️ **Explicit wait instead of sleep**
🧹 **Rigorous teardown**
🔒 **Mock external services**
📋 **Consistent selector patterns**

### Slide 5
## Detection techniques

📊 **Continuous monitoring**
🔁 **Automatic re-execution**
📝 **Detailed logs**
🔔 **Alerts for flakiness > 5%**

### Slide 6
## Correction process

1️⃣ Identify failure patterns
2️⃣ Classify by frequency
3️⃣ Prioritize the most critical
4️⃣ Fix in order of impact
5️⃣ Monitor after correction

### Slide 7
## Practical example

**Before (flaky):**
```javascript
cy.visit('/login')
cy.wait(2000) // Fixed wait
cy.get('#email').type('user@test.com')
cy.get('#password').type('123456')
cy.get('#submit').click()
cy.contains('Dashboard') // Can fail due to timing
```

**After (stable):**
```javascript
cy.visit('/login')
cy.get('#email').should('be.visible').type('user@test.com')
cy.get('#password').should('be.visible').type('123456')
cy.get('#submit').should('be.enabled').click()
cy.contains('Dashboard', {timeout: 10000}) // Explicit wait
```

### Slide 8
## Want to eliminate flaky tests from your project?

📘 Access our complete E2E testing guide in the [QA-Guide](../../STACK/CYPRESS.md)

#QA #TestAutomation #Cypress #FlakyTests #SoftwareTesting

---

## Creation tips

✅ Keep text concise (maximum 3 lines per slide)
✅ Use emojis strategically for engagement
✅ Include visual examples when possible
✅ End with clear and specific CTA
✅ Use relevant hashtags (3-5 hashtags)