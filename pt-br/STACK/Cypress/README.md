# Cypress - Guia Prático

## 🚀 Setup Rápido

```bash
# Instalar Cypress como dependência de desenvolvimento
npm install cypress --save-dev

# Abrir Cypress pela primeira vez (cria estrutura padrão)
npx cypress open
```

## 📂 Estrutura de Pastas

```
cypress/
├── fixtures/           # Dados de teste reutilizáveis (JSON, CSV)
│   └── users.json
├── integration/        # Testes E2E (specs)
│   └── login.spec.js
├── pages/             # Page Objects para interações
│   └── LoginPage.js
├── support/           # Comandos customizados e configurações
│   ├── commands.js
│   └── index.js
└── reports/           # Relatórios gerados
    └── mochawesome.json
```

## 💻 Hello World

Criar arquivo `cypress/integration/hello_world.spec.js`:

```javascript
describe('Meu Primeiro Teste', () => {
  it('deve visitar a página inicial', () => {
    cy.visit('https://example.com')
    cy.contains('h1', 'Example Domain')
  })
})
```

Executar:
```bash
npx cypress run --spec "cypress/integration/hello_world.spec.js"
```

## 🔥 Cenário Real: Login

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

**Teste** - `cypress/integration/login.spec.js`:
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

## 💡 Dica de Ouro

**Use `cy.intercept()` em vez de `cy.wait()` para requisições de rede.**

```javascript
// ❌ Ruim - Espera fixa
cy.get('[data-cy=submit]').click()
cy.wait(2000)

// ✅ Bom - Intercepta e espera resposta
cy.intercept('POST', '/api/login').as('loginRequest')
cy.get('[data-cy=submit]').click()
cy.wait('@loginRequest').then((interception) => {
  expect(interception.response.statusCode).to.eq(200)
})
```