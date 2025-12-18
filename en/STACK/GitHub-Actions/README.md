# GitHub Actions - Practical Guide

## 🚀 Quick Setup

No setup required - GitHub Actions is integrated with GitHub!

Create file `.github/workflows/ci.yml`:

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

## 📂 Folder Structure

```
.github/
└── workflows/        # CI/CD Workflows
    ├── ci.yml        # Main pipeline
    ├── deploy.yml    # Deployment pipeline
    └── scheduled.yml # Scheduled tests
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

## 🔥 Real Scenario: Complete QA Pipeline

`.github/workflows/qa-pipeline.yml`:
```yaml
name: QA Pipeline
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  # Unit tests
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

  # Cypress tests
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

  # API tests with Postman
  postman-tests:
    needs: unit-tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install Newman
        run: npm install -g newman
      - name: Run Postman collection
        run: newman run postman/collections/api-tests.json -e postman/environments/test.json

  # Performance tests with k6
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

## 💡 Golden Tip

**Use `strategy.matrix` to test multiple configurations with the same workflow.**

```yaml
# ❌ Bad - Duplicate workflows
jobs:
  test-node-16:
    # ...
  test-node-18:
    # ...

# ✅ Good - Matrix strategy
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