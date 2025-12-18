# Cypress - Practical Guide

## 🚀 Quick Setup

```bash
# Install Cypress as a development dependency
npm install cypress --save-dev

# Open Cypress for the first time (creates default structure)
npx cypress open
```

## 📂 Folder Structure

```
cypress/
├── fixtures/           # Reusable test data (JSON, CSV)
│   └── users.json
├── integration/        # E2E tests (specs)
│   └── login.spec.js
├── pages/             # Page Objects for interactions
│   └── LoginPage.js
├── support/           # Custom commands and configurations
│   ├── commands.js
│   └── index.js
└── reports/           # Generated reports
    └── mochawesome.json
```

## 💻 Hello World

Create file `cypress/integration/hello_world.spec.js`:

```javascript
describe('My First Test', () => {
  it('should visit the home page', () => {
    cy.visit('https://example.com')
    cy.contains('h1', 'Example Domain')
  })
})
```

Run:
```bash
npx cypress run --spec "cypress/integration/hello_world.spec.js"
```

## 🔥 Real Scenario: Login

**Page Object** - `cypress/pages/LoginPage.js`:
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

**Test** - `cypress/integration/login.spec.js`:
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

## 💡 Golden Tip

**Use `cy.intercept()` instead of `cy.wait()` for network requests.**

```javascript
// ❌ Bad - Fixed wait
cy.get('[data-cy=submit]').click()
cy.wait(2000)

// ✅ Good - Intercept and wait for response
cy.intercept('POST', '/api/login').as('loginRequest')
cy.get('[data-cy=submit]').click()
cy.wait('@loginRequest').then((interception) => {
  expect(interception.response.statusCode).to.eq(200)
})
```