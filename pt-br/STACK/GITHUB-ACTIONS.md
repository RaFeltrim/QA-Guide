**Guia Completo — GitHub Actions (CI/CD)**

Visão geral
- `GitHub Actions` é a plataforma de CI/CD integrada ao GitHub. Permite automatizar builds, testes e deployments diretamente no repositório.

Estrutura de workflows
- Pasta: `.github/workflows/`
- Arquivos YAML com definição de jobs
- Gatilhos: push, pull_request, schedule, release

Setup Rápido

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

Estrutura de Pastas

```
.github/
└── workflows/        # Workflows de CI/CD
    ├── ci.yml        # Pipeline principal
    ├── deploy.yml    # Deploy pipeline
    └── scheduled.yml # Testes agendados
```

Hello World

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

Formato básico de workflow
```yaml
name: Pipeline CI
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

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

Workflow com múltiplas ferramentas
```yaml
name: Pipeline CI Completo
on: [push, pull_request]

jobs:
  # Testes unitários
  testes-unitarios:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16.x, 18.x]
    steps:
      - uses: actions/checkout@v3
      - name: Usar Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm ci
      - run: npm test

  # Testes Cypress
  testes-cypress:
    needs: testes-unitarios
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '16'
      - run: npm ci
      - name: Executar Cypress
        uses: cypress-io/github-action@v5
        with:
          build: npm run build
          start: npm start

  # Testes Postman
  testes-postman:
    needs: testes-unitarios
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Instalar Newman
        run: npm install -g newman
      - name: Executar testes Postman
        run: newman run colecao.json -e ambiente.json

  # Testes k6
  testes-performance:
    needs: [testes-cypress, testes-postman]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Executar teste k6
        run: |
          docker run --rm -v ${PWD}:/scripts grafana/k6 run /scripts/performance/script.js
```

Cenário Real: Pipeline Completo de QA

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

Estratégias de execução
- Paralelismo: `strategy.matrix` para testar múltiplas configurações
- Dependências: `needs` para definir ordem de execução
- Condições: `if` para controlar execução (ex: apenas em main)

Exemplo de matriz de testes
```yaml
strategy:
  matrix:
    # Testar múltiplas versões
    node-version: [16.x, 18.x]
    os: [ubuntu-latest, windows-latest]
    # Testar múltiplos navegadores (para E2E)
    browser: [chrome, firefox]
```

Publicação de artefatos
```yaml
- name: Upload resultados de testes
  uses: actions/upload-artifact@v3
  if: always()  # Sempre executar, mesmo em falhas
  with:
    name: relatorios-testes
    path: |
      relatorios/
      screenshots/
      videos/
```

Golden tip
- Use `strategy.matrix` para maximizar cobertura com código mínimo.

Exemplo de uso correto:
```yaml
# ✅ Bom - Matriz para múltiplos ambientes
strategy:
  matrix:
    node-version: [16.x, 18.x]
    os: [ubuntu-latest, windows-latest]

# ❌ Ruim - Workflows duplicados
# Workflow separado para cada combinação
```

Dica de Ouro
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

Boas práticas e convenções
- Use `actions/checkout@v3` como primeiro step
- Prefira actions oficiais do GitHub quando disponíveis
- Use `if: failure()` para steps de debug
- Arquive artefatos importantes com `upload-artifact`
- Use `secrets` para informações sensíveis

Checklist antes do push
- Validar sintaxe YAML
- Confirmar actions usadas são mantidas
- Verificar uso adequado de secrets