**Guia Completo — Cypress (Testes E2E)**

Visão geral
- `Cypress` é uma ferramenta de testes end-to-end para aplicações web modernas. Permite escrever testes rápidos, confiáveis e fáceis de depurar.

Instalação & requisitos
- Instale via npm: `npm install cypress --save-dev`
- Requisitos: Node.js 12 ou superior

Estrutura de projetos e arquivos
- Convenção de pastas:
  - `cypress/fixtures/` — dados de teste reutilizáveis
  - `cypress/integration/` — arquivos de teste (specs)
  - `cypress/pages/` — Page Objects para interações
  - `cypress/support/` — comandos customizados e configurações
  - `cypress/reports/` — relatórios gerados

Setup Rápido
```bash
# Instalar Cypress como dependência de desenvolvimento
npm install cypress --save-dev

# Abrir Cypress pela primeira vez (cria estrutura padrão)
npx cypress open
```

Formato de um teste básico
```javascript
describe('Meu Primeiro Teste', () => {
  it('deve visitar a página inicial', () => {
    cy.visit('https://example.com')
    cy.contains('h1', 'Example Domain')
  })
})
```

Page Object Model (exemplo completo)
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

Teste completo usando Page Object
```javascript
import LoginPage from '../pages/LoginPage'

describe('Funcionalidade de Login', () => {
  beforeEach(() => {
    LoginPage.visit()
  })

  it('deve fazer login com credenciais válidas', () => {
    LoginPage.login('usuario@exemplo.com', 'senha123')
    cy.url().should('include', '/dashboard')
    cy.get('[data-cy=welcome-message]').should('be.visible')
  })

  it('deve mostrar erro com credenciais inválidas', () => {
    LoginPage.login('invalido@exemplo.com', 'senhaerrada')
    cy.get(LoginPage.errorMessage).should('contain', 'Credenciais inválidas')
  })
})
```

Execução local
- Abrir Cypress UI: `npx cypress open`
- Executar em headless: `npx cypress run`
- Executar spec específico: `npx cypress run --spec "cypress/integration/login.spec.js"`

Integração com CI
- No pipeline (GitHub Actions / Jenkins):
  - Instalar dependências: `npm ci`
  - Executar testes: `npx cypress run`
  - Publicar artefatos: screenshots, vídeos e relatórios

Golden tip
- Use `cy.intercept()` ao invés de `cy.wait()` para requisições de rede. É mais confiável e rápido pois intercepta e mocka respostas em vez de esperar tempos fixos.

Exemplo de uso correto:
```javascript
// ✅ Bom - Interceptando requisições
cy.intercept('POST', '/api/login').as('loginRequest')
cy.get('[data-cy=submit]').click()
cy.wait('@loginRequest').then((interception) => {
  expect(interception.response.statusCode).to.eq(200)
})

// ❌ Ruim - Esperas fixas
cy.get('[data-cy=submit]').click()
cy.wait(2000)
```

Boas práticas e convenções
- Use atributos `data-cy` para seletores estáveis
- Crie Page Objects para interações complexas
- Mantenha testes pequenos e focados
- Use `beforeEach` para setup consistente
- Limpe estado entre testes quando necessário

Checklist antes do push
- Validar que seletores usam `data-cy`
- Confirmar que testes passam localmente
- Verificar cobertura dos cenários críticos