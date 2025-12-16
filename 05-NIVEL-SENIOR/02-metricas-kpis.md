# 02 — Métricas e KPIs

Objetivo: selecionar métricas acionáveis que apoiem decisões de produto e engenharia.

- Exemplos: tempo médio de resolução, taxa de regressão, defeitos por release, cobertura crítica, MTTR
- Dashboards: combinar métricas qualitativas e quantitativas
- Cuidado: evitar métricas localizadas que gerem comportamento indesejado
- Ação: definir thresholds e playbooks quando métricas ultrapassam limites

Exercício: criar um dashboard com 5 KPIs e descrever as ações a tomar para cada alerta.
# Métricas e KPIs (Sênior)

Definições de métricas estratégicas: MTTR, ROI de automação, coverage trending, flakiness.


Exemplos de dashboards e queries (exemplo rápido)

- Dashboard "Qualidade por Release":
	- Defeitos por release (abertos vs críticos)
	- Taxa de regressão por release
	- Tempo médio de correção (MTTR)

- Dashboard "Pipeline Health":
	- Tempo médio de execução de CI (unit+integration)
	- % de jobs flaky
	- Coverage trend (por módulo)

Exemplo de query SQL (defeitos por release, simplificada):

```sql
SELECT release_tag,
			 COUNT(*) FILTER (WHERE severity='critical') AS critical_count,
			 COUNT(*) AS total_count
FROM issues
WHERE created_at >= now() - INTERVAL '90 days'
GROUP BY release_tag
ORDER BY release_tag DESC;
```

Interpretação rápida: usar rolling windows (7/30/90 dias) para identificar regressões e alertar quando tendências pioram.

