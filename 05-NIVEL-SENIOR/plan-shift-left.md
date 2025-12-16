# Plano de Adoção Shift-Left (4 Sprints)

Produto: Produto Hipotético X
Período: 4 sprints (2 semanas por sprint sugerido)

Resumo

Plano prático para mover qualidade para a esquerda cobrindo diagnóstico, gates CI, contratos, automação e estabilização.

Sprint 0 — Diagnóstico e Preparação (Semana 0-1)

- Objetivos:
  - Mapear áreas críticas e principais fluxos.
  - Medir baseline: cobertura, tempo de CI, número de incidentes recentes.
- Entregáveis:
  - `05-NIVEL-SENIOR/diagnostic-report.md` com gaps e prioridades.
  - Lista de áreas críticas e responsáveis (RAIDs simples).
- Responsáveis: Engenheiro de QA Sênior (Lead), Tech Lead, Product Owner.
- Critério de aceitação: diagnóstico aprovado em reunião de alinhamento.

Sprint 1 — Gates e Automação Básica (Semana 2-3)

- Objetivos:
  - Implementar quality gates de unit + integration no pipeline.
  - Automatizar linter e testes unitários em PRs.
- Entregáveis:
  - `.github/workflows/ci.yml` com gates unit/integration.
  - Documentação `runbooks/ci-gates.md`.
- Responsáveis: DevOps (pipeline), Eng QA (scripts/tests).
- Critério de aceitação: PR bloqueado no merge se unit/integration falharem; tempo de feedback < 15 minutos (meta inicial).

Sprint 2 — Contracts, Fixtures Sintéticas e Testes de Integração (Semana 4-5)

- Objetivos:
  - Introduzir contract tests para serviços críticos (Pact / contract testing).
  - Criar biblioteca de fixtures sintéticas e loader de testes.
- Entregáveis:
  - `contracts/` com pelo menos 2 contratos automatizados.
  - `fixtures/` com dados sintéticos e processo de geração (`scripts/generate_fixtures.py`).
- Responsáveis: Eng QA, Backend Lead.
- Critério de aceitação: contratos executáveis no CI e fixtures reutilizáveis documentadas.

Sprint 3 — E2E Selecionados, Performance Agendada, Métricas (Semana 6-7)

- Objetivos:
  - Selecionar e estabilizar E2E críticos (reduzir cardinalidade).
  - Agendar testes de performance (k6) noturnos/cron e integrar resultados.
  - Publicar dashboards com KPIs (CI feedback, coverage, MTTD).
- Entregáveis:
  - `cypress/integration/` com 3 specs críticos estabilizados.
  - Job agendado `perf` no CI e dashboard inicial.
- Responsáveis: Eng QA, SRE, Product.
- Critério de aceitação: E2E estáveis, perf runs gerando `results.json` como artefato e dashboard com 3 KPIs visíveis.

Sprint 4 — Estabilização e Transferência (Semana 8-9)

- Objetivos:
  - Remover blockers, documentar runbooks e treinar times.
  - Transferir propriedade operacional (quem monitora alertas, quem atua em incidentes).
- Entregáveis:
  - `05-NIVEL-SENIOR/plan-shift-left-execution.md` com owners por atividade.
  - Sessões de treinamento (2 x 1h) gravadas e slides.
- Responsáveis: Eng QA Sênior (owner), Engineering Managers.
- Critério de aceitação: times treinados + owners atribuídos + KPIs com baseline e metas definidas.

Riscos e Mitigações

- Risco: CI mais lento. Mitigação: paralelizar jobs e usar cache; executar E2E/perf apenas em branches agendados ou release.
- Risco: dependência de serviços externos. Mitigação: usar `cy.intercept`/mocks e contratos.
- Risco: uso de dados sensíveis. Mitigação: fixtures sintéticas e política de anonimização.

Checklist mínima por sprint

- Definir responsáveis e entregáveis.
- Criar/atualizar tickets no board com estimativas.
- Documentar resultados e aprovar em review de sprint.

Próximos passos imediatos

1. Validar plano com Product e Tech Lead.
2. Agendar Sprint 0 e definir time core.
3. Iniciar diagnóstico e gerar `diagnostic-report.md`.
