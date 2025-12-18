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
  - `tests/fixtures/` — dados de teste
  - `playwright.config.ts` — configuração do Playwright

Formato de um teste básico
```typescript
import { test, expect } from '@playwright/test';

test('deve exibir mensagem de boas-vindas', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Bem-vindo');
});
```

Page Object Model (exemplo)
```typescript
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('[data-testid="email"]');
    this.passwordInput = page.locator('[data-testid="password"]');
    this.submitButton = page.locator('[data-testid="login-button"]');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
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

// ❌ Ruim - Wait explícito
await page.waitForSelector('[data-testid="success-message"]');
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