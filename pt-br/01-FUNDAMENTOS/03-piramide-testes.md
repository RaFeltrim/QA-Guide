# 03 — Pirâmide de Testes

Visão e recomendações práticas para balancear cobertura, custo e velocidade de feedback.

## Conceito
A pirâmide de testes indica que a maior parte dos testes deve ser unitária (rápida e barata),
seguidos por integrações e um número reduzido de E2E. Objetivo: feedback rápido com custo controlado.

## Diagrama ASCII (exemplo)

```
      [ E2E ]    <- 5%  (fluxos críticos)
     /       \
    [ Int ]    <- 15% (integrações)
   /         \
 [ Unit ]     <- 80% (testes unitários)
```

Recomendação prática: proporção aproximada de **70–85% unit**, **10–25% integração**, **0–10% E2E**,
ajustada conforme risco do produto.

## Execução em CI — exemplo de pipeline

1. **unit-tests** (rápido, em cada commit)
2. **integration-tests** (merge / nightly com cadastro/semente de dados)
3. **e2e** (pull request principal, nightly ou release)

Snippet de etapas (YAML simplificado):

```yaml
jobs:
  unit:
    steps: [checkout, setup, run: pytest -q]
  integration:
    needs: unit
    steps: [checkout, setup, run: pytest -m integration]
  e2e:
    needs: integration
    steps: [checkout, setup, run: npm run e2e:headless]
```

## Boas práticas
- Garanta testes unitários determinísticos e com mocks adequados.
- Use dados seed para integrações e isole ambientes.
- Evite tornar E2E dependentes de terceiros (use stubs/mocks quando possível).
```markdown
# 03 — Pirâmide de Testes

Visão e recomendações práticas para balancear cobertura, custo e velocidade de feedback.

## Conceito
A pirâmide de testes indica que a maior parte dos testes deve ser unitária (rápida e barata),
seguidos por integrações e um número reduzido de E2E. Objetivo: feedback rápido com custo controlado.

## Diagrama ASCII (exemplo)

```
      [ E2E ]    <- 5%  (fluxos críticos)
     /       \
    [ Int ]    <- 15% (integrações)
   /         \
 [ Unit ]     <- 80% (testes unitários)
```

Recomendação prática: proporção aproximada de **70–85% unit**, **10–25% integração**, **0–10% E2E**,
ajustada conforme risco do produto.

## Execução em CI — exemplo de pipeline

1. **unit-tests** (rápido, em cada commit)
2. **integration-tests** (merge / nightly com cadastro/semente de dados)
3. **e2e** (pull request principal, nightly ou release)

Snippet de etapas (YAML simplificado):

```yaml
jobs:
  unit:
    steps: [checkout, setup, run: pytest -q]
  integration:
    needs: unit
    steps: [checkout, setup, run: pytest -m integration]
  e2e:
    needs: integration
    steps: [checkout, setup, run: npm run e2e:headless]
```

## Boas práticas
- Garanta testes unitários determinísticos e com mocks adequados.
- Use dados seed para integrações e isole ambientes.
- Evite tornar E2E dependentes de terceiros (use stubs/mocks quando possível).

```
# 03 — Pirâmide de Testes

Descrição da pirâmide (unitários → integração → e2e) e justificativa de investimento.

- Exemplos de cobertura esperada
- Boas práticas para equilibrar custo x risco
```markdown
# Pirâmide de Testes

Uma visão básica da pirâmide (ou funil) de testes: muitos testes rápidos e isolados na base (unit),
testes de integração no meio e poucos testes de interface/end-to-end no topo. A ideia é obter
feedback rápido enquanto mantém confiança nas entregas.

- O que: definição simples e proporções recomendadas.
- Por que: reduzir tempo de feedback e custo de manutenção.
- Quando usar: ao projetar pipelines de CI para priorizar testes rápidos.

> Nota de Integração: este arquivo foi mantido como versão introdutória. Para uma
> explicação aplicada ao pipeline, otimizações e exemplos, veja
> `03-NIVEL-JUNIOR/08-estrategia-funneling.md`.

```
# Pirâmide de Testes

Explicação da pirâmide/funil de testes, proporções e por que priorizar testes rápidos.

> TODO: incluir gráfico ASCII e recomendações de execução em CI.
