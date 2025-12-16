# 07 — Governança Agile para QA

Objetivo: escalar práticas de QA mantendo agilidade e qualidade.

- Modelos: guilds, chapters e centros de excelência
- Processos: definição de padrões, templates e políticas de qualidade
- Métricas de governança: compliance de pipelines, tempo de entrega, qualidade por squad
- Riscos: burocracia vs autonomia — balancear via indicadores

Exercício: desenhar a estrutura organizacional mínima para suportar 10 squads.
```markdown
# Governança Agile (Sênior)

Políticas e estruturas para garantir que práticas ágeis e de qualidade escalem com governança adequada.

Componentes

- Comitê de qualidade (revisões trimestrais)
- Policys de deploy e checklist de segurança

Métricas e compliance

- SLA para correção crítica, auditoria de processos, compliance regulatória.

Checklist

- [ ] Comitê formado
- [ ] Policies documentadas

```
# Governança Agile (Sênior)

Como estruturar governança para múltiplas squads, indicadores e rituais de qualidade.


Exemplos de políticas e templates de governança

Policy: Acesso a dados de teste
- Objetivo: garantir mínimo privilégio e rastreabilidade
- Regras:
	- Acesso a dados sensíveis concedido por pedido formal e expira automaticamente.
	- Todos os acessos registrados com justificativa.

Template de política de deploy (resumo)
- Objetivo: padronizar deploys em ambientes críticos
- Requisitos:
	- PR aprovado por pelo menos 1 reviewer e 1 QA
	- Pipeline unit+integration passing
	- Smoke tests em staging OK
	- Rollback plan documentado

Rituais de governança
- Comitê trimestral de qualidade (revisões de políticas, incidentes and action items)
- Revisões mensais de compliance de pipelines

