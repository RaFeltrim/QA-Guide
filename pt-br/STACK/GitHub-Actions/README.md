# GitHub Actions - Guia Prático

## 🚀 Setup Rápido

Nenhum setup necessário - GitHub Actions está integrado ao GitHub!

Criar arquivo `.github/workflows/ci.yml`:

```yaml
name: CI Pipeline
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'
      - run: npm ci
      - run: npm test
```

## 📂 Estrutura de Pastas

```
.github/
└── workflows/        # Workflows de CI/CD
    ├── ci.yml        # Pipeline principal
    ├── deploy.yml    # Deploy pipeline
    └── scheduled.yml # Testes agendados
```

## 💻 Hello World

`.github/workflows/hello-world.yml`:
```yaml
name: Hello World Workflow
on: [push]
jobs:
  greet:
    runs-on: ubuntu-latest
    steps:
      - name: Say Hello
        run: echo "Hello, World!"
```

## 🔥 Cenário Real: Pipeline Completo de QA

`.github/workflows/qa-pipeline.yml`:
```yaml
name: QA Pipeline
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  # Testes unitários
  unit-tests:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16.x, 18.x]
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm ci
      - run: npm test

  # Testes Cypress
  cypress-tests:
    needs: unit-tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '16'
      - run: npm ci
      - name: Run Cypress tests
        uses: cypress-io/github-action@v5
        with:
          build: npm run build
          start: npm start

  # Testes de API com Postman
  postman-tests:
    needs: unit-tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install Newman
        run: npm install -g newman
      - name: Run Postman collection
        run: newman run postman/collections/api-tests.json -e postman/environments/test.json

  # Testes de performance com k6
  performance-tests:
    needs: [cypress-tests, postman-tests]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Run k6 load test
        run: |
          docker run --rm -v $(pwd):/scripts grafana/k6 run /scripts/performance/scripts/load-test.js
```

## 💡 Dica de Ouro

**Use `strategy.matrix` para testar múltiplas configurações com o mesmo workflow.**

```yaml
# ❌ Ruim - Workflows duplicados
jobs:
  test-node-16:
    # ...
  test-node-18:
    # ...

# ✅ Bom - Matrix strategy
jobs:
  test:
    strategy:
      matrix:
        node-version: [16.x, 18.x]
        os: [ubuntu-latest, windows-latest]
    runs-on: ${{ matrix.os }}
    steps:
      - uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
```