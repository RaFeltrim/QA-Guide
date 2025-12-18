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

Formato de um teste básico
```javascript
describe('Login Feature', () => {
  it('deve fazer login com credenciais válidas', () => {
    cy.visit('/login')
    cy.get('[data-cy=email]').type('user@example.com')
    cy.get('[data-cy=password]').type('password123')
    cy.get('[data-cy=submit]').click()
    cy.url().should('include', '/dashboard')
  })
})
```

Page Object Model (exemplo)
```javascript
class LoginPage {
  constructor() {
    this.emailInput = '[data-cy=email]'
    this.passwordInput = '[data-cy=password]'
    this.submitButton = '[data-cy=submit]'
  }

  visit() {
    cy.visit('/login')
    return this
  }

  login(email, password) {
    cy.get(this.emailInput).type(email)
    cy.get(this.passwordInput).type(password)
    cy.get(this.submitButton).click()
    return this
  }
}

export default new LoginPage()
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