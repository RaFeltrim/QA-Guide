# KPIs e Métricas para QA — Nível Sênior

Este documento define KPIs acionáveis, fórmulas e exemplos de metas para monitorar a qualidade e o impacto das práticas de QA.

1) Visão geral

- Objetivo: medir eficácia, velocidade de feedback e impacto em produção.
- Uso: acompanhamento executivo e operacional; definir SLAs e targets por produto.

2) Métricas-chave (com fórmulas)

- Cobertura de Testes Críticos (unit + integration)
  - Fórmula: (linhas/branches/funcões cobertas em áreas críticas) / (total de linhas/branches/funcões nas áreas críticas) * 100%
  - Meta sugerida: >= 80% nas áreas core.

- Tempo de Feedback do CI (CI Feedback Time)
  - Fórmula: tempo médio desde o push/PR até o resultado dos jobs de unit+integration.
  - Meta: < 10 minutos.

- Defeitos Encontrados em Produção / Release
  - Fórmula: número de bugs critic/major em produção por release.
  - Meta: < 1 defeito crítico por release.

- Mean Time To Detect (MTTD)
  - Fórmula: média do tempo entre introdução de defeito e sua detecção.
  - Meta: reduzir 50% em 6 meses (baseline inicial necessária).

- Mean Time To Resolve (MTTR)
  - Fórmula: média do tempo entre a detecção e a correção/deploy da correção.
  - Meta: < 48 horas para bugs críticos.

- Rate de Regressão (Regression Rate)
  - Fórmula: número de regressões encontradas por release / número total de releases.
  - Meta: < 1%.

- Tempo Médio de Execução de Suíte (Test Suite Runtime)
  - Fórmula: soma do tempo de execução dos testes relevantes (unit/integration/e2e) por run.
  - Meta: unit+integration < 10 minutos; E2E reduzidos e executados seletivamente.

- Disponibilidade dos Jobs do CI (CI Job Success Rate)
  - Fórmula: runs bem-sucedidas / runs totais * 100% (em window de 30/90 dias).
  - Meta: > 95%.

3) Métricas operacionais e de observabilidade

- Latência P95/P99 por endpoint crítico — coletar via APM / k6 / logs.
- Erros por minuto (5xx rate) — monitorar via logs/monitoramento.
- Tempo de implantação (Lead time for changes) — tempo desde commit até deploy em produção.

4) Fonte de dados e dashboards sugeridos

- GitHub Actions / CI provider: coleta de tempos de jobs, artefatos e JUnit reports.
- SonarQube / Coverage tools: cobertura, duplicação, hotspots.
- Grafana + Prometheus / APM (NewRelic, Datadog): latência, erros, throughput.
- Centralizar relatórios em dashboard por produto com metas e alertas.

5) Como instrumentar e calcular (passos práticos)

1. Definir áreas críticas do código (módulos/serviços).
2. Configurar geração de cobertura (cobertura de unit e integration) e coletar por build.
3. Extrair tempos de CI via logs/integração da API do CI.
4. Correlacionar incidentes de produção com commits/PRs (tagging e tracing).
5. Agregar métricas em um dashboard e definir alertas (ex.: se regressão > 0.5% enviar alerta).

6) Targets e níveis de alerta (exemplo)

- Verde: todos os targets atingidos (ex.: cobertura >= 80%, MTTD < X)
- Amarelo: degradação leve — investigação necessária (ex.: CI success rate 90–95%)
- Vermelho: intervenção imediata (ex.: regressão > 1%, MTTD alto)

7) Exemplos de relatórios periódicos

- Relatório semanal: CI feedback time, failures por job, cobertura por área.
- Relatório mensal: MTTD, MTTR, defeitos em produção por severidade, tendências de cobertura.

8) Exercício prático (Sênior)

- Objetivo: configurar um dashboard (Grafana) mínimo que mostre 5 métricas críticas (CI feedback time, coverage, 5xx rate, MTTD, MTTR) e criar um runbook para alertas.
- Entregáveis:
  - `05-NIVEL-SENIOR/grafana-dashboard.json` (esqueleto ou export)
  - `05-NIVEL-SENIOR/runbook-alerts.md` com passos de triagem e responsáveis.

Referências: `04-NIVEL-PLENO/03-pipeline-patterns.md`, `05-NIVEL-SENIOR/01-shift-left.md`.
