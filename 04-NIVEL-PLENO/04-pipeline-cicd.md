# 04 — Pipeline CI/CD para Testes
# 04 — Pipeline CI/CD para Testes

Objetivo: descrever um pipeline básico com stages de build, test e deploy, além de práticas para otimização e observabilidade.

## Exemplo de stages
- build: instalar dependências, lint
- test: unit + integration + cobertura
- e2e: executar testes end-to-end em ambiente staging
- report: publicar relatórios e artefatos

Notas: usar artefatos para compartilhar builds; aplicar gates para aprovação manual quando necessário.

## Estrutura recomendada

- `lint` → `unit` → `integration` → `e2e` (opcional) → `perf` → `package` → `deploy`.
- Separe jobs sensíveis (e2e, perf) para runners distintos e com triggers/conditions.
- Publique artifacts (reports, cobertura, logs) para diagnóstico.

## Matriz e paralelismo

- Use `matrix` para testar múltiplos runtimes/versões e browsers.
- Paralelize testes rápidos e use grouping para dividir grandes test suites.

## Estratégias de otimização

- Cache de dependências e build outputs.
- Test split por tag (`@smoke`, `@regression`) para PR vs release.
- Pré-build de imagens/containers para reduzir tempo de setup.

## Observabilidade e resiliência

- Gere JUnit/Allure reports e cobertura em artifacts.
- Integre notificações (Slack/Teams) com links para artifacts e run IDs.
- Documente testes intermitentes e aplique retries limitados com alertas.

## Exemplo simplificado (GitHub Actions)

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

## Checklist (aceitação)

- [ ] Artifacts JUnit/coverage publicados
- [ ] Matrix documentada e testada
- [ ] Retries e flakiness catalogados
- [ ] Custo e tempo balanceados (paralelismo)

Referências: [03-NIVEL-JUNIOR/08-estrategia-funneling.md](../03-NIVEL-JUNIOR/08-estrategia-funneling.md), [04-NIVEL-PLENO/02-performance-k6.md](02-performance-k6.md).
          path: coverage.xml
```

Armazene artifacts críticos (logs, coverage, results) para investigação de falhas em PRs.

