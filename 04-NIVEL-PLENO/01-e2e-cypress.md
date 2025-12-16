```markdown
# E2E com Cypress (Pleno)

Resumo: este documento apresenta boas práticas para criação de testes E2E com Cypress, estrutura
de testes, gestão de flakiness e integração com pipelines CI.

1. Estrutura do projeto

- Coloque specs em `cypress/e2e/` por feature.
- Use `cy.intercept()` para stubs/fakes quando possível; reserve E2E completas para fluxos críticos.

2. Boas práticas

- Testes pequenos e determinísticos por spec.
- Evite dependência entre testes (use `beforeEach` para preparar estado).
- Use tags/labels (`@smoke`, `@regression`) para controlar runs no CI.

3. Redução de flakiness

- Esperas explícitas são desencorajadas; prefira assertions com timeout.
- Capture screenshots e vídeos no CI para debugar falhas intermitentes.

4. Exemplos rápidos

```js
// exemplo: cypress/e2e/cadastro_cnpj.spec.js
describe('Cadastro com CNPJ', () => {
  beforeEach(() => cy.visit('/cadastro'))
  it('@smoke valida campo cnpj', () => {
    cy.get('#cnpj').type('11.222.333/0001-81')
    cy.get('#submit').click()
    cy.contains('Cadastro realizado').should('exist')
  })
})
```

5. Integração CI

- Run rápido: `--env grepTags=@smoke` para smoke tests em PRs.
- Full run em release pipeline com retry limitado para testes flakey conhecidos.

6. Checklist de aceitação

- [ ] Tests idempotentes
- [ ] Logs e screenshots configurados
- [ ] Timeouts razoáveis e retrys documentados

Links relacionados: `04-NIVEL-PLENO/02-performance-k6.md`, `03-NIVEL-JUNIOR/08-estrategia-funneling.md`.

```
# E2E com Cypress — Nível Pleno

Este guia apresenta práticas recomendadas para testes end-to-end usando Cypress, exemplos de estrutura de testes, configuração mínima e um exercício prático para o nível Pleno.

Visão geral rápida:

- Quando usar E2E: validação de fluxos críticos, integrações entre serviços e regressão de alto impacto.
- Estratégia recomendada: poucos E2E estáveis + muitos testes de integração e unitários.

Configuração mínima (resumo)

- Instalação via `npm`:

```bash
npm init -y
npm install cypress --save-dev
```

- Estrutura sugerida:

- `cypress/fixtures/` — dados reutilizáveis
- `cypress/integration/` — spec files (fluxos E2E)
- `cypress/support/` — comandos customizados e hooks

Exemplo básico de spec (`cypress/integration/login.spec.js`):

```js
describe('Fluxo de login', () => {
  it('faz login com credenciais válidas', () => {
    cy.visit('/login')
    cy.get('[data-cy=email]').type('ana.qa+teste@example.com')
    cy.get('[data-cy=password]').type('SenhaForte123!')
    cy.get('[data-cy=submit]').click()
    cy.url().should('include', '/dashboard')
    cy.get('[data-cy=welcome]').should('contain', 'Bem-vinda')
  })
})
```

Boas práticas Pleno

- Use `data-cy` para selecionar elementos com estabilidade.
- Evite flakiness: espere por elementos ou use intercepts (`cy.intercept`) para controlar dependências externas.
- Isolar testes: limpar estado entre testes (`cy.request('POST', '/testing/reset')`) ou usar snapshots controlados.
- Parallelização: configure CI com divisão de specs por arquivo e caching de navegador.

Integração com CI (snippet GitHub Actions)

```yaml
name: e2e
on: [push, pull_request]
jobs:
  cypress:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install
        run: npm ci
      - name: Start app
        run: npm run start:test &
      - name: Run Cypress
        run: npx cypress run --record --key ${{ secrets.CYPRESS_RECORD_KEY }}
```

Exercício prático (nível Pleno)

- Objetivo: criar um conjunto de 3 specs E2E para o fluxo de compra (adicionar ao carrinho, checkout, histórico de pedidos).
- Entregáveis:
  - `cypress/integration/cart.spec.js`
  - `cypress/integration/checkout.spec.js`
  - `cypress/integration/orders.spec.js`
  - README curto com comandos para executar localmente (`npm run e2e`) e variáveis de ambiente necessárias.

Critérios de aceitação

- Specs executam localmente com `npm run e2e` em menos de 3 minutos (cada) em ambiente de teste.
- Uso de `cy.intercept` para stubs de serviços externos quando aplicável.
- Testes idempotentes e limpos (podem rodar várias vezes sem poluir dados).

Referências internas: `03-NIVEL-JUNIOR/05-ci-github-actions.md`, `gabarito/templates/test-case.md`.
# E2E com Cypress (Pleno)

Padrões: Page Object Model, fixtures, testes confiáveis e desacoplados.

> TODO: adicionar exemplos avançados e padrões de retry.
