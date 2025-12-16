# Gabarito — Nível Pleno

Mapeamento de entregáveis e gabaritos automatizados para exercícios do nível Pleno.

1) E2E (Cypress)

- Exemplos de specs de referência: `gabarito/exemplos-codigo/cypress/cart.spec.js`, `gabarito/exemplos-codigo/cypress/checkout.spec.js`, `gabarito/exemplos-codigo/cypress/orders.spec.js`.
- Como executar (na raiz `QA-Guide`):

```bash
npm ci
npm run e2e:headless
```

2) Performance (k6)

- Script de referência: `gabarito/exemplos-codigo/k6/load_items_test.js` — simula GET /items e POST /items.
- Executar localmente (k6 deve estar instalado):

```bash
k6 run --out json=results.json gabarito/exemplos-codigo/k6/load_items_test.js
```

3) Pipeline e integração

- Exemplo de pipeline de referência: `.github/workflows/ci.yml` (ver `04-NIVEL-PLENO/03-pipeline-patterns.md`).

4) Critérios para gabaritos Pleno

- E2E: specs devem ser idempotentes e usar `cy.intercept` para serviços externos quando possível.
- Perf: thresholds definidos e artefatos `results.json` gerados.
- Pipeline: jobs separados por stage e upload de artefatos (JUnit, results.json, videos).

5) Exemplos de entrega

- `gabarito/exemplos-codigo/cypress/*.js` — specs de exemplo.
- `gabarito/exemplos-codigo/k6/load_items_test.js` — script de carga.
- `gabarito/exemplos-codigo/README.md` — instruções para executar os exemplos.
