# 04 — Métricas de Qualidade

Este capítulo apresenta métricas acionáveis, fórmulas e exemplos práticos.

## Principais métricas
- **MTTR (Mean Time To Repair)**: tempo médio para corrigir um incidente.
  - Fórmula: `MTTR = (soma dos tempos de resolução) / (número de incidentes)`
  - Exemplo: 3 incidentes com tempos 2h, 4h, 6h → `MTTR = (2+4+6)/3 = 4h`

- **Taxa de regressão**: proporção de regressões por release.
  - Fórmula: `Taxa de regressão = regressões no release / total de deploys` (ou base histórica definida)
  - Exemplo: 2 regressões no release / 20 deploys no trimestre = 10%

- **Cobertura de testes**: % de linhas ou caminhos cobertos por testes.
  - Observação: cobertura alta não substitui casos de aceitação; priorize cobertura em pontos críticos.
  - Exemplo: `cobertura módulo pagamento = 82%`.

- **P95 / Latência**: tempo de resposta no percentil 95 — útil para SLAs.
  - Exemplo: `P95 = 350ms` para o endpoint `/checkout`.

- **Flakiness**: % de execução com resultados inconsistentes.
  - Fórmula: `Flakiness = (n de falhas intermitentes) / (n execuções)`.

## Dashboards e consultas sugeridas
- Painel mínimo: MTTR (por serviço), Taxa de regressão (por release), P95 latência, Cobertura por módulo, Test Flakiness.
- Ferramentas comuns: Grafana/Prometheus, Datadog, Jenkins reports, cobertura em SonarQube.

## Exemplos acionáveis
- Alertar quando `MTTR > 24h` em serviço crítico.
- Investigar quando `Flakiness > 5%` sobre testes de integração.
- Revisar regras quando taxa de regressão aumenta comparado ao release anterior.

## Boas práticas para métricas
- Defina uma janela de comparação (últimos 7/30 dias).
- Combine métricas técnicas e de negócio (ex.: P95 vs taxa de conversão).
- Evite métricas que incentivem comportamento negativo.
# 04 — Métricas de Qualidade
Este capítulo apresenta métricas acionáveis, fórmulas e exemplos práticos.

## Principais métricas
- **MTTR (Mean Time To Repair)**: tempo médio para corrigir um incidente.
  - Fórmula: `MTTR = (soma dos tempos de resolução) / (número de incidentes)`
  - Exemplo: 3 incidentes com tempos 2h, 4h, 6h → `MTTR = (2+4+6)/3 = 4h`

- **Taxa de regressão**: proporção de regressões por release.
  - Fórmula: `Taxa de regressão = regressões no release / total de deploys` (ou base histórica definida)
  - Exemplo: 2 regressões no release / 20 deploys no trimestre = 10%

- **Cobertura de testes**: % de linhas ou caminhos cobertos por testes.
  - Observação: cobertura alta não substitui casos de aceitação; priorize cobertura em pontos críticos.
  - Exemplo: `cobertura módulo pagamento = 82%`.

- **P95 / Latência**: tempo de resposta no percentil 95 — útil para SLAs.
  - Exemplo: `P95 = 350ms` para o endpoint `/checkout`.

- **Flakiness**: % de execução com resultados inconsistentes.
  - Fórmula: `Flakiness = (n de falhas intermitentes) / (n execuções)`.

## Dashboards e consultas sugeridas
- Painel mínimo: MTTR (por serviço), Taxa de regressão (por release), P95 latência, Cobertura por módulo, Test Flakiness.
- Ferramentas comuns: Grafana/Prometheus, Datadog, Jenkins reports, cobertura em SonarQube.

## Exemplos acionáveis
- Alertar quando `MTTR > 24h` em serviço crítico.
- Investigar quando `Flakiness > 5%` sobre testes de integração.
- Revisar regras quando taxa de regressão aumenta comparado ao release anterior.

## Boas práticas para métricas
- Defina uma janela de comparação (últimos 7/30 dias).
- Combine métricas técnicas e de negócio (ex.: P95 vs taxa de conversão).
- Evite métricas que incentivem comportamento negativo (ex.: ``reduzir número de issues abertas`` sem qualidade).

```
# 04 — Métricas de Qualidade

- Defeitos por release
- Taxa de regressão
- Cobertura de testes (com ressalvas)
- Tempo médio para resolução
- SLA / SLO para qualidade

Como escolher métricas acionáveis e evitar métricas viciadas.
# Métricas de Qualidade

Principais métricas: MTTR, cobertura, flakiness, P95, throughput.

> TODO: adicionar exemplos de como calcular e dashboards sugeridos.
