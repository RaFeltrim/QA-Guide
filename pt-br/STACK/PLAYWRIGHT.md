**Guia Completo — Playwright (Testes E2E)**

Visão geral
- `Playwright` é um framework de testes end-to-end para aplicações web modernas. Suporta todos os navegadores modernos e oferece execução confiável e paralela.

Instalação & requisitos
- Instale via npm: `npm init playwright@latest`
- Requisitos: Node.js 14 ou superior

Estrutura de projetos e arquivos
- Convenção de pastas:
  - `tests/` — arquivos de teste
  - `tests/pages/` — Page Object Models
  - `tests/specs/` — arquivos de teste
  - `tests/fixtures/` — dados de teste
  - `tests/utils/` — funções auxiliares
  - `playwright.config.ts` — configuração do Playwright
  - `tests/reports/` — relatórios gerados

Setup Rápido
```bash
# Inicializar Playwright no projeto
npm init playwright@latest

# Ou instalar como dependência
npm install --save-dev @playwright/test

# Instalar navegadores suportados
npx playwright install
```

Formato de um teste básico
```typescript
import { test, expect } from '@playwright/test';

test('deve exibir mensagem de boas-vindas', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page.locator('h1')).toContainText('Example Domain');
});
```

Page Object Model (exemplo completo)
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

Teste completo usando Page Object
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

Execução local
- Modo UI (debug): `npx playwright test --ui`
- Headless: `npx playwright test`
- Spec específico: `npx playwright test tests/login.spec.ts`

Integração com CI
- No pipeline (GitHub Actions):
  - Instalar dependências: `npm ci`
  - Instalar navegadores: `npx playwright install --with-deps`
  - Executar testes: `npx playwright test`
  - Publicar relatórios: `playwright-report/`

Golden tip
- Use `await expect(locator).toBeVisible()` ao invés de `await page.waitForSelector()`. O mecanismo de auto-wait do Playwright é mais confiável.

Exemplo de uso correto:
```typescript
// ✅ Bom - Auto-waiting
await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
const message = await page.locator('[data-testid="success-message"]').textContent();

// ❌ Ruim - Wait explícito
await page.waitForSelector('[data-testid="success-message"]');
const message = await page.locator('[data-testid="success-message"]').textContent();
```

Boas práticas e convenções
- Use atributos `data-testid` para seletores estáveis
- Crie Page Objects para interações complexas
- Utilize grupos com `test.describe()` para organizar testes
- Aproveite a execução paralela nativa
- Use tracing para debugar falhas: `npx playwright show-trace trace.zip`

Checklist antes do push
- Validar seletores usam `data-testid`
- Confirmar testes passam em múltiplos navegadores
- Verificar cobertura de cenários críticos