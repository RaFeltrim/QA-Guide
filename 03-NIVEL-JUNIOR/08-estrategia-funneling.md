# Estratégia de Funneling / Pirâmide aplicada ao CI (Júnior)

## Seção 1 – Conceito e por que importa

A estratégia de "funneling" (ou funil) aplica a pirâmide de testes ao pipeline: muitos testes rápidos e baratos na base (unit), menos testes de integração no meio, e poucos E2E caros no topo. Objetivo: feedback rápido aos devs e manter o tempo de CI aceitável.

Benefícios práticos:
- Reduz tempo médio de execução do CI
- Fornece feedback rápido durante desenvolvimento
- Melhora confiança ao liberar alterações

## Seção 2 – Como dividir os testes

- Unitários: rápidos (<100ms por teste), rodam em todo PR
- Integração/componente: testes contra DB/serviços mockados, rodam em PRs maiores ou em base branch
- E2E: rodam em merge para main/master, nightly ou em jobs manuais; também em PRs críticos

## Seção 3 – Exemplos de marcação e execução seletiva

pytest (Python): use marcas (`-m`) para categorizar

```bash
pytest -m unit
pytest -m integration
pytest -m e2e
```

Jest (JS): use `test.only` em dev ou organize pastas `__tests__/unit` e `__tests__/e2e` e rode com padrões de path.

```bash
npm test -- tests/unit
```

## Seção 4 – Exemplo de workflow otimizado (GitHub Actions)

1) Job `unit-tests` — roda rápido em todos os PRs

```yaml
name: CI
on: [push, pull_request]
jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Python
        uses: actions/setup-python@v4
        with: { python-version: '3.10' }
      - name: Install deps
        run: pip install -r requirements.txt
      - name: Run unit tests
        run: pytest -m unit -q
```

2) Job `integration` — opcional em PRs, obrigatório em branch main

```yaml
  integration-tests:
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: pip install -r requirements.txt
      - run: pytest -m integration -q
```

3) Job `e2e` — rodar em merge, nightly ou workflow_dispatch

```yaml
  e2e:
    if: github.event_name == 'workflow_dispatch' || (github.event_name == 'push' && github.ref == 'refs/heads/main')
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node
        uses: actions/setup-node@v3
        with: { node-version: '18' }
      - run: npm ci
      - name: Run E2E (Cypress)
        run: npx cypress run
```

## Seção 5 – Matrix e paralelização

Use `strategy.matrix` para validar em múltiplas versões (ex.: Node/Python) e `parallel`/sharding para distribuir testes longos.

Exemplo de matrix simples:

```yaml
strategy:
  matrix:
    python-version: [3.9, 3.10]
    os: [ubuntu-latest]
```

Para particionar testes, use ações como `split-tests` (ou plugins do Jest/pytest-xdist):

```yaml
- name: Run tests in parallel
  run: pytest -n auto -m unit
```

## Seção 6 – Dicas para reduzir tempo de CI

- Cache de dependências (pip cache, npm cache, actions/cache)
- Cache de build/artifacts entre jobs
- Executar apenas os testes afetados por mudanças de código (test selection via path or test-impact)
- Rodar smoke tests rápidos no PR para capturar problemas óbvios
- Mover testes flaky para jobs assíncronos e registrar flakiness (dashboard)

## Seção 7 – Estratégia para testes flaky

- Marcar como `flaky` e executar re-tries automáticos no CI com limite baixo (ex.: 1 retry)
- Registrar flakiness e investigar causas (infra, timeouts, dependências)
- Evitar false positives como critérios de bloqueio para merge, preferir bloqueios em regressões consistentes

## Seção 8 – Exemplo de comandos úteis para devs

```bash
# rodar apenas testes unitários
pytest -m unit

# rodar somente testes afetados (algumas ferramentas detectam changed files)
pytest --last-failed

# rodar testes em paralelo
pytest -n auto
```

## Seção 9 – Exercícios (prática)

1. Configure um workflow mínimo que rode `pytest -m unit` em PRs e `pytest -m integration` apenas na `main`.
2. Adicione cache para dependências e meça redução de tempo.
3. Simule um teste flaky e configure retry apenas para o job de e2e.

Critério de aceitação: workflows executam e a soma do tempo dos jobs unitários é < 10 minutos (ajustável por projeto).

## Seção 10 – Referências / Próximos passos

- Documentos relacionados: `01-FUNDAMENTOS/03-piramide-testes.md`, `03-NIVEL-JUNIOR/05-ci-github-actions.md`
- Ferramentas úteis: `pytest-xdist`, `cypress`, `jest --runInBand` (para debugging), `actions/cache`, `split-tests` actions

---

> Observação: cada projeto precisa ajustar thresholds e proporções do funil. Use métricas (tempo de CI, flakiness rate) para iterar.
# Estratégia de Funneling (Júnior)

Explicação da pirâmide aplicada ao pipeline: quando rodar testes rápidos vs lentos e como otimizar o tempo de CI.

> TODO: incluir exemplos de configuração de jobs e matrix.
