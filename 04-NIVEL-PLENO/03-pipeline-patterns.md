# Padrões de Pipeline — Nível Pleno

Guia prático sobre padrões de pipeline CI/CD orientados a testes: como organizar jobs para unit, integration, e2e, perf e relatórios, otimizar tempo e garantir feedback rápido.

1) Princípios gerais

- Feedback rápido: falhas de unit/integration devem ser detectadas antes de E2E/perf.
- Fails fast: pare pipelines posteriores quando etapas críticas falharem.
- Reusabilidade: compartilhar artefatos (builds, imagens, pacotes) entre jobs.
- Idempotência: builds e testes devem poder rodar repetidas vezes sem poluir ambiente.

2) Estrutura recomendada (stages)

- Lint & Static Analysis
- Build / Package (gerar artefato reutilizável)
- Unit Tests (rápidos, paralelos)
- Integration Tests (com dependências isoladas / mocks)
- Contract Tests (se aplicável)
- E2E Tests (ambiente controlado, menor cardinalidade)
- Performance Tests (apenas em branches específicos / agendados)
- Publish / Deploy (após aprovação automática ou manual)

3) Estratégias de paralelização e divisão de specs

- Divida specs por arquivo e use matrix/strategies para paralelizar em CI.
- Exemplo: dividir specs Cypress por diretório e usar `cypress-parallel` ou `xdist` (pytest).
- Use caching (node_modules, pip cache, build cache) para reduzir tempo de setup.

4) Artefatos e rastreabilidade

- Sempre gere e publique artefatos (ex.: `build.tar`, imagens docker) para serem usados por etapas seguintes.
- Armazene relatórios de teste (JUnit/XML, JSON) como artefatos e publique na interface do CI.

5) Snippet exemplar GitHub Actions (orquestração básica)

```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    outputs:
      image: ${{ steps.build.outputs.image }}
    steps:
      - uses: actions/checkout@v3
      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: 18
      - name: Install
        run: npm ci
      - name: Run unit tests
        run: npm run test:unit -- --reporter=jest-junit
      - name: Upload junit
        uses: actions/upload-artifact@v3
        with:
          name: junit-unit
          path: junit.xml

  integration:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Restore node
        uses: actions/cache@v3
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
      - name: Run integration
        run: npm run test:integration -- --reporter=mocha-junit-reporter

  e2e:
    needs: integration
    runs-on: ubuntu-latest
    strategy:
      matrix:
        browser: [chrome, firefox]
    steps:
      - uses: actions/checkout@v3
      - name: Start app
        run: npm run start:test &
      - name: Run E2E
        run: npx cypress run --browser ${{ matrix.browser }} --record=false
      - name: Upload e2e artifacts
        uses: actions/upload-artifact@v3
        with:
          name: cypress-videos-${{ matrix.browser }}
          path: cypress/videos

  perf:
    if: github.event_name == 'schedule' || contains(github.ref, 'perf-')
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run k6 perf
        run: k6 run --out json=results.json scripts/load_test.js
      - name: Upload perf
        uses: actions/upload-artifact@v3
        with:
          name: k6-results
          path: results.json
```

6) Test Reports e qualidade do código

- Gere relatórios JUnit/XML e use parsers do CI para marcar falhas e mostrar histórico.
- Integre linters e cobertura de código (coverage) e falhe o job quando a cobertura cair abaixo do mínimo.

7) Dicas operacionais

- Use variáveis e segredos do CI para conexões de banco e keys.
- Para E2E, prefira ambientes efêmeros ou bases de dados isoladas por run.
- Configure retentativas curtas apenas em etapas não-determinísticas (não em unit tests).

8) Exercício prático (nível Pleno)

- Objetivo: criar um pipeline de exemplo em `.github/workflows/ci.yml` que implemente a estrutura acima, com uploads de artefatos e divisão de E2E por browser.
- Entregáveis:
  - `.github/workflows/ci.yml` funcional (exemplo) no repositório.
  - README com comandos para reproduzir localmente (`npm ci`, `npm run test:unit`, `npm run e2e`).

Critérios de aceitação

- Pipeline executável em GitHub Actions (sem segredos obrigatórios para paths não-sensíveis).
- Artifacts de teste e relatórios salvos e acessíveis pela UI do CI.

Referências: `04-NIVEL-PLENO/01-e2e-cypress.md`, `04-NIVEL-PLENO/02-performance-k6.md`, documentação do GitHub Actions.
