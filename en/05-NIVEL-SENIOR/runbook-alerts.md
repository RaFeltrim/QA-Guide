# Runbook de Alertas — Nível Sênior

Objetivo: guiar triagem inicial e ações imediatas quando um alerta crítico é acionado.

## Dados do alerta
- Nome do alerta: {alert_name}
- Severidade: {critical|major|minor}
- Métrica/condição: {descrição da condição}
- Origem: {CI/Grafana/Logs/APM}
- Horário do alerta: {timestamp}

## Passos de triagem imediata (0–15 minutos)
1. Confirmar se o alerta é válido (verificar dashboards e logs).
2. Identificar escopo afetado (serviço/endpoint/feature).
3. Verificar deploys recentes (últimas 24h) e PRs relacionados.
4. Capturar evidências: logs relevantes, traces, screenshots, IDs de deploy.
5. Se crítico: notificar on-call + abrir incidente (link para template de incidente).

## Ações de mitigação (15–60 minutos)
- Aplicar rollback rápido se houver correlação direta com deploys recentes e políticas permitirem.
- Isolar serviço afetado / fechar circuit breaker.
- Acionar time responsável e atribuir ownership.

## Comunicação
- Canal: {Slack/Teams — canal de incidentes}
- Mensagem inicial (exemplo): "Alerta {alert_name} - serviço {svc} afetado. Status: investigando. Evidências: {link}"

## Post-mortem e follow-up
- Registrar incident post-mortem se o impacto > threshold.
- Identificar ações corretivas e responsáveis.
- Atualizar dashboards/thresholds para reduzir ruídos.

## Contatos e responsáveis
- Nome — time — contato
