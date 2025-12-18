**Complete Guide — Playwright (E2E Testing)**

Overview
- `Playwright` is an end-to-end testing framework for modern web applications. It supports all modern browsers and offers reliable and parallel execution.

Installation & Requirements
- Install via npm: `npm init playwright@latest`
- Requirements: Node.js 14 or higher

Project Structure
- Folder convention:
  - `tests/` — test files
  - `tests/pages/` — Page Object Models
  - `tests/specs/` — test files
  - `tests/fixtures/` — test data
  - `tests/utils/` — helper functions
  - `playwright.config.ts` — Playwright configuration
  - `tests/reports/` — generated reports

Quick Setup
```bash
# Initialize Playwright in the project
npm init playwright@latest

# Or install as dependency
npm install --save-dev @playwright/test

# Install supported browsers
npx playwright install
```

Basic Test Format
```typescript
import { test, expect } from '@playwright/test';

test('should display welcome message', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page.locator('h1')).toContainText('Example Domain');
});
```

Page Object Model (complete example)
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

Complete Test Using Page Object
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

Local Execution
- UI mode (debug): `npx playwright test --ui`
- Headless: `npx playwright test`
- Specific spec: `npx playwright test tests/login.spec.ts`

CI Integration
- In pipeline (GitHub Actions):
  - Install dependencies: `npm ci`
  - Install browsers: `npx playwright install --with-deps`
  - Run tests: `npx playwright test`
  - Publish reports: `playwright-report/`

Golden Tip
- Use `await expect(locator).toBeVisible()` instead of `await page.waitForSelector()`. Playwright's auto-wait mechanism is more reliable.

Correct Usage Example:
```typescript
// ✅ Good - Auto-waiting
await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
const message = await page.locator('[data-testid="success-message"]').textContent();

// ❌ Bad - Explicit wait
await page.waitForSelector('[data-testid="success-message"]');
const message = await page.locator('[data-testid="success-message"]').textContent();
```

Best Practices and Conventions
- Use `data-testid` attributes for stable selectors
- Create Page Objects for complex interactions
- Use groups with `test.describe()` to organize tests
- Leverage native parallel execution
- Use tracing to debug failures: `npx playwright show-trace trace.zip`

Pre-push Checklist
- Validate selectors use `data-testid`
- Confirm tests pass in multiple browsers
- Verify critical scenario coverage