# 01 — Shift-Left Estratégico

Objetivo: desenhar e implementar estratégias para antecipar qualidade no ciclo de produto.

- Definição: QA envolvido desde discovery até release
- Práticas: testes em ambientes de design, revisão de requisitos, definição de contratos
- ROI: medir redução de defeitos em produção e tempo de correção
- Implantação: pilotos por squad, evangelismo técnico, métricas de adoção

Exercício: desenhar um plano de adoção shift-left para uma feature crítica (cronograma, stakeholders, métricas).
```markdown
# Shift Left Estratégico (Sênior)

Visão estratégica para líderes que desejam implantar práticas de Shift Left em produto/org.

1. Objetivos

- Reduzir custo de correção, aumentar velocidade de entrega e elevar qualidade desde design.

2. Roadmap (exemplo 3 meses)

- Mês 1: Diagnóstico, quick-wins (ex.: critérios de aceite claros).
- Mês 2: Integração CI e automação de testes críticos.
- Mês 3: Métricas, dashboards e treinamento de times.

3. Governança

- Políticas de qualidade, KPIs e revisão trimestral.

Checklist

- [ ] Roadmap documentado
- [ ] Métricas e dashboards definidos
- [ ] Programa de treinamento

```
# Shift-Left em QA — Nível Sênior

Este documento aborda a estratégia Shift-Left aplicada à qualidade de software, responsabilidades, KPIs e um roadmap de adoção para times.

1. Conceito e objetivos

- Shift-Left: mover atividades de qualidade para as fases iniciais do ciclo de desenvolvimento (requisitos, design, codificação).
- Objetivos: detectar defeitos mais cedo, reduzir custo de correção, aumentar confiança para deploys contínuos.

2. Principais práticas

- Revisões de requisitos e histórias com QA presente.
- Testes de contrato e integração executados antes de E2E.
- Testes automatizados executados em PR (unit + integration) com gate para merge.
- Test-first / Specification by example e uso de BDD quando aplicável.
- Pipelines com estágios claros e políticas de quality gate.

3. Papel do QA Sênior

- Definir estratégia de teste em nível de produto e pipeline.
- Mentorar times em qualidade de código, design para testabilidade e automação.
- Coordenar iniciativas de shift-left: revisão de requisitos, definição de contratos, definição de SLAs de performance.

4. KPIs recomendados (exemplos)

- Tempo médio para detecção de bug (MTTD) — meta: reduzir 50% em 6 meses.
- Tempo médio de correção (MTTR) — meta: reduzir para < 48h para bugs críticos.
- % de cobertura de testes críticos (unit + integration) — meta: 80% nas áreas core.
- Taxa de regressão em produção — meta: < 1% por release.
- Tempo de feedback do CI (unit+integration) — meta: < 10 minutos.

5. LGPD e conformidade

- Garantir anonimização/sintetização de dados de teste.
- Definir políticas para uso de dados reais em testes (consentimento, justificativa legal, acesso restrito).
- Auditoria de logs e trilhas de auditoria para testes que usam dados sensíveis.

6. Roadmap de adoção (exemplo 3-6 meses)

- Mês 1: diagnóstico (gap analysis), definir KPIs e quick wins (linters, pre-commit, unit gates).
- Mês 2: implementar gates de unit/integration no CI; treinar times em review de requisitos.
- Mês 3: adicionar testes de contrato e integração automatizada; criar biblioteca de fixtures sintéticas.
- Mês 4–6: estabilizar E2E, executar performance em pipelines agendados, medir KPIs e ajustar SLAs.

7. Checklist de rollout

- Documentar KPIs e metas.
- Definir quality gates e automatizar no CI.
- Criar catálogo de pipelines e responsáveis.
- Treinar times e documentar processos (runbooks).

8. Exercício prático (Sênior)

- Objetivo: criar um plano de adoção Shift-Left para um produto hipotético, incluindo KPIs, riscos e plano de mitigação.
- Entregável: `05-NIVEL-SENIOR/plan-shift-left.md` com ações por sprint (4 sprints) e responsáveis.

Referências: `03-NIVEL-JUNIOR/05-ci-github-actions.md`, `04-NIVEL-PLENO/03-pipeline-patterns.md`.
# Shift Left (Sênior)

Visão estratégica de adoção Shift Left, roadmap e métricas de sucesso.

> TODO: desenvolver plano de 6 meses e KPIs.
