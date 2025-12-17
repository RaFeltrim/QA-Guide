# Cypress Example

Instalação rápida:

```bash
cd gabarito/exemplos-codigo/cypress-example
npm init -y
npm install cypress --save-dev
npx cypress open
```

Estrutura mínima incluída neste exemplo:
- `cypress/pages/LoginPage.js` — Page Object
- `cypress/integration/login.spec.js` — teste de exemplo

Adapte `baseUrl` em `cypress.json` ou passe `CYPRESS_baseUrl` no ambiente.
