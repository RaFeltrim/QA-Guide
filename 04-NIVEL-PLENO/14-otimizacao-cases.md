# 14 — Otimização de Casos de Teste

Objetivos: reduzir volume manual mantendo cobertura.

- Parametrização de casos para cobrir múltiplas entradas
- Geração em massa (data-driven testing) com JSON/CSV
- Revisão periódica: eliminar casos redundantes

Exercício: transformar 10 casos manuais em 2 casos parametrizados com `pytest`.
```markdown
# Otimização de Casos e Suites (Pleno)

Como reduzir tempo total de execução mantendo cobertura efetiva.

Táticas

- Priorize por risco e uso real (feature usage analytics).
- Identifique duplicações e consolide casos redundantes.
- Mantenha um conjunto de smoke tests curtos para PRs.

Ferramentas

- Test impact analysis, coverage reports e analytics de execução.

Checklist

- [ ] Suite de smoke para PRs
- [ ] Full-regression periódica
- [ ] Relatórios de impacto de teste

```
# Otimização de Casos de Teste (Pleno)

Estratégias para reduzir duplicidade, parametrizar casos e melhorar performance das suites.

> TODO: exemplos práticos e scripts de análise de cobertura.
