# 04 — Pipeline CI/CD para Testes

Objetivo: descrever um pipeline básico com stages de build, test e deploy.

Exemplo de stages:
- build: instalar dependências, lint
- test: unit + integration + cobertura
- e2e: executar testes end-to-end em ambiente staging
- report: publicar relatórios e artefatos

Notas: usar artefatos para compartilhar builds; aplicar gates para aprovação manual quando necessário.
```markdown
# Pipeline CI/CD (Pleno)

Padrões para pipelines de CI/CD focados em qualidade, velocidade e observabilidade.

1. Estrutura recomendada

- `lint` → `unit` → `integration` → `e2e` (opcional) → `perf` → `package` → `deploy`.
- Separe jobs sensíveis (e2e, perf) para rodar em runners distintos e com triggers/conditions.
- Publique artifacts (reports, cobertura, logs) para diagnóstico.

2. Matriz e paralelismo

- Use `matrix` para testar múltiplos runtimes/versões e browsers.
- Paralelize testes rápidos e use grouping para dividir grandes test suites.

3. Estratégias de otimização

- Cache de dependências e build outputs.
- Test split por tag (`@smoke`, `@regression`) para PR vs release.
- Pré-build de imagens/containers para reduzir tempo de setup.

4. Resiliência e flakiness

- Documente testes intermitentes e aplique retries limitados com alertas.
- Fallbacks: runs noturnos de full-regression que geram relatórios para investigação.

5. Observabilidade

- Gere JUnit/Allure reports e cobertura em artifacts.
- Integre notificações (Slack/Teams) com links para artifacts e run IDs.

6. Exemplo simplificado (GitHub Actions)

```yaml
name: CI
on: [push, pull_request]
jobs:
  unit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Python
        uses: actions/setup-python@v4
      - name: Install
        run: pip install -r requirements.txt
      - name: Run unit tests
        run: pytest -q --junitxml=artifacts/unit-junit.xml

  e2e:
    runs-on: ubuntu-latest
    needs: unit
    if: github.event_name == 'push' || github.event.pull_request.head.ref == 'main'
    steps:
      - uses: actions/checkout@v4
      - name: Run Cypress
        run: npm run cypress:run -- --record

  publish:
    runs-on: ubuntu-latest
    needs: [unit, e2e]
    steps:
      - name: Upload artifacts
        uses: actions/upload-artifact@v4
        with:
          name: reports
          path: artifacts/
```

Checklist (aceitação)

- [ ] Artifacts JUnit/coverage publicados
- [ ] Matrix documentada e testada
- [ ] Retries e flakiness catalogados
- [ ] Custo e tempo balanceados (paralelismo)

Referências: `03-NIVEL-JUNIOR/08-estrategia-funneling.md`, `04-NIVEL-PLENO/02-performance-k6.md`.

```
# Pipeline CI/CD (Pleno)

Como compor stages: unit → integration → e2e → perf e publicar artifacts.


Exemplo de GitHub Actions com matrix e artifacts

```yaml
name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: [3.10, 3.11]
        os: [ubuntu-latest]
    steps:
      - uses: actions/checkout@v3
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: ${{ matrix.python-version }}
      - name: Install
        run: python -m pip install -r requirements.txt
      - name: Run tests
        run: python -m pytest -q
      - name: Upload coverage
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: coverage-report
          path: coverage.xml
```

Armazene artifacts críticos (logs, coverage, results) para investigação de falhas em PRs.

