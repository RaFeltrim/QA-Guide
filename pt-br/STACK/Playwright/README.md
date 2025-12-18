# Playwright - Guia Prático

## 🚀 Setup Rápido

```bash
# Inicializar Playwright no projeto
npm init playwright@latest

# Ou instalar como dependência
npm install --save-dev @playwright/test

# Instalar navegadores suportados
npx playwright install
```

## 📂 Estrutura de Pastas

```
tests/
├── pages/             # Page Object Models
│   ├── LoginPage.ts
│   └── HomePage.ts
├── specs/             # Arquivos de teste
│   ├── login.spec.ts
│   └── checkout.spec.ts
├── fixtures/          # Dados de teste
│   └── test-data.json
├── utils/             # Funções auxiliares
│   └── helpers.ts
└── playwright.config.ts  # Configuração do Playwright
```

## 💻 Hello World

Criar arquivo `tests/hello-world.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test('deve exibir mensagem de boas-vindas', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page.locator('h1')).toContainText('Example Domain');
});
```

Executar:
```bash
npx playwright test tests/hello-world.spec.ts
```

## 🔥 Cenário Real: Login

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

**Teste** - `tests/specs/login.spec.ts`:
```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Funcionalidade de Login', () => {
  test('deve fazer login com credenciais válidas', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('usuario@exemplo.com', 'senha123');
    
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.locator('[data-testid="welcome-message"]')).toBeVisible();
  });

  test('deve mostrar erro com credenciais inválidas', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('invalido@exemplo.com', 'senhaerrada');
    
    await loginPage.assertErrorMessage('Credenciais inválidas');
  });
});
```

## 💡 Dica de Ouro

**Use `await expect(locator).toBeVisible()` em vez de `await page.waitForSelector()` para asserções.**

```typescript
// ❌ Ruim - Espera explícita
await page.waitForSelector('[data-testid="success-message"]');
const message = await page.locator('[data-testid="success-message"]').textContent();

// ✅ Bom - Auto-waiting
await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
const message = await page.locator('[data-testid="success-message"]').textContent();
```