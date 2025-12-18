**Complete Guide — Cypress (E2E Testing)**

Overview
- `Cypress` is an end-to-end testing framework for modern web applications. It allows writing fast, reliable, and easy-to-debug tests.

Installation & Requirements
- Install via npm: `npm install cypress --save-dev`
- Requirements: Node.js 12 or higher

Project Structure
- Folder convention:
  - `cypress/fixtures/` — reusable test data
  - `cypress/integration/` — test files (specs)
  - `cypress/pages/` — Page Objects for interactions
  - `cypress/support/` — custom commands and configurations
  - `cypress/reports/` — generated reports

Quick Setup
```bash
# Install Cypress as a development dependency
npm install cypress --save-dev

# Open Cypress for the first time (creates default structure)
npx cypress open
```

Basic Test Format
```javascript
describe('My First Test', () => {
  it('should visit the home page', () => {
    cy.visit('https://example.com')
    cy.contains('h1', 'Example Domain')
  })
})
```

Page Object Model (complete example)
```javascript
class LoginPage {
  constructor() {
    this.emailInput = '[data-cy=email]'
    this.passwordInput = '[data-cy=password]'
    this.submitButton = '[data-cy=login-btn]'
    this.errorMessage = '[data-cy=error-msg]'
  }

  visit() {
    cy.visit('/login')
    return this
  }

  fillEmail(email) {
    cy.get(this.emailInput).type(email)
    return this
  }

  fillPassword(password) {
    cy.get(this.passwordInput).type(password)
    return this
  }

  submit() {
    cy.get(this.submitButton).click()
    return this
  }

  login(email, password) {
    this.fillEmail(email)
    this.fillPassword(password)
    this.submit()
    return this
  }
}

export default new LoginPage()
```

Complete Test Using Page Object
```javascript
import LoginPage from '../pages/LoginPage'

describe('Login Feature', () => {
  beforeEach(() => {
    LoginPage.visit()
  })

  it('should login with valid credentials', () => {
    LoginPage.login('user@example.com', 'password123')
    cy.url().should('include', '/dashboard')
    cy.get('[data-cy=welcome-message]').should('be.visible')
  })

  it('should show error with invalid credentials', () => {
    LoginPage.login('invalid@example.com', 'wrongpassword')
    cy.get(LoginPage.errorMessage).should('contain', 'Invalid credentials')
  })
})
```

Local Execution
- Open Cypress UI: `npx cypress open`
- Run headless: `npx cypress run`
- Run specific spec: `npx cypress run --spec "cypress/integration/login.spec.js"`

CI Integration
- In pipeline (GitHub Actions / Jenkins):
  - Install dependencies: `npm ci`
  - Run tests: `npx cypress run`
  - Publish artifacts: screenshots, videos, and reports

Golden Tip
- Use `cy.intercept()` instead of `cy.wait()` for network requests. It's more reliable and faster because it intercepts and mocks responses instead of waiting fixed times.

Correct Usage Example:
```javascript
// ✅ Good - Intercepting requests
cy.intercept('POST', '/api/login').as('loginRequest')
cy.get('[data-cy=submit]').click()
cy.wait('@loginRequest').then((interception) => {
  expect(interception.response.statusCode).to.eq(200)
})

// ❌ Bad - Fixed waits
cy.get('[data-cy=submit]').click()
cy.wait(2000)
```

Best Practices and Conventions
- Use `data-cy` attributes for stable selectors
- Create Page Objects for complex interactions
- Keep tests small and focused
- Use `beforeEach` for consistent setup
- Clean state between tests when necessary

Pre-push Checklist
- Validate selectors use `data-cy`
- Confirm tests pass locally
- Verify critical scenario coverage