# Exemplos de Código — Gabaritos

Este diretório contém exemplos de código e testes usados como gabaritos para exercícios Júnior e Pleno.

Como executar os exemplos:

- Instale dependências Node:

```bash
npm ci
```

- Executar Cypress headless:

```bash
npm run e2e:headless
```

- Executar k6 (se instalado):

```bash
k6 run --out json=results.json gabarito/exemplos-codigo/k6/load_items_test.js
```

- Executar testes Python (validador CNPJ):

```bash
pytest gabarito/exemplos-codigo/tests/test_validador_pytest.py -q
```

Observações:

- Os exemplos Cypress assumem que a aplicação de teste está disponível em `http://localhost:3000` ou ajuste `baseUrl` em `cypress.json`.
- Os selectors usam `data-cy` para estabilidade; ajustar conforme a aplicação alvo.
