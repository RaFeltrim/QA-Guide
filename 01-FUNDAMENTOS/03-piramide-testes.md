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
