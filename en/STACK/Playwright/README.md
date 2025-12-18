# Playwright - Practical Guide

## 🚀 Quick Setup

```bash
# Initialize Playwright in the project
npm init playwright@latest

# Or install as dependency
npm install --save-dev @playwright/test

# Install supported browsers
npx playwright install
```

## 📂 Folder Structure

```
tests/
├── pages/             # Page Object Models
│   ├── LoginPage.ts
│   └── HomePage.ts
├── specs/             # Test files
│   ├── login.spec.ts
│   └── checkout.spec.ts
├── fixtures/          # Test data
│   └── test-data.json
├── utils/             # Helper functions
│   └── helpers.ts
└── playwright.config.ts  # Playwright configuration
```

## 💻 Hello World

Create file `tests/hello-world.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test('should display welcome message', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page.locator('h1')).toContainText('Example Domain');
});
```

Run:
```bash
npx playwright test tests/hello-world.spec.ts
```

## 🔥 Real Scenario: Login

**Page Object** - `tests/pages/LoginPage.ts`:
```typescript
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('[data-testid="email"]');
    this.passwordInput = page.locator('[data-testid="password"]');
    this.submitButton = page.locator('[data-testid="login-button"]');
    this.errorMessage = page.locator('[data-testid="error-message"]');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async assertErrorMessage(message: string) {
    await expect(this.errorMessage).toContainText(message);
  }
}
```

**Test** - `tests/specs/login.spec.ts`:
```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Feature', () => {
  test('should login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('user@example.com', 'password123');
    
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.locator('[data-testid="welcome-message"]')).toBeVisible();
  });

  test('should show error with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('invalid@example.com', 'wrongpassword');
    
    await loginPage.assertErrorMessage('Invalid credentials');
  });
});
```

## 💡 Golden Tip

**Use `await expect(locator).toBeVisible()` instead of `await page.waitForSelector()` for assertions.**

```typescript
// ❌ Bad - Explicit wait
await page.waitForSelector('[data-testid="success-message"]');
const message = await page.locator('[data-testid="success-message"]').textContent();

// ✅ Good - Auto-waiting
await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
const message = await page.locator('[data-testid="success-message"]').textContent();
```