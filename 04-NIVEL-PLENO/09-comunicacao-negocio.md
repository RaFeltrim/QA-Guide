# 09 — Comunicação com o Negócio

Objetivo: posicionar QA como ponte entre produto e engenharia.

- Falar a língua do produto: impacto, risco, ROI
- Traduzir bugs técnicos em impacto de negócio
- Relatórios concisos para stakeholders (executive summary)

Exercício: preparar um resumo de qualidade para o último release em até 3 bullets.
```markdown
# Comunicação e Soft Skills para Negócio (Pleno)

Como traduzir problemas técnicos em impacto de negócio, priorizar testes por risco e negociar
decisões com stakeholders. Este material reúne práticas de comunicação e exercícios de soft
skills aplicadas ao dia a dia de um QA pleno.

Seções rápidas:

- **Traduzir técnico → negócio:** como quantificar impacto (ex.: perda de receita, clientes afetados),
  preparar um resumo de risco e propostas de mitigação.
- **Priorização por risco:** matriz de risco simples (impacto x probabilidade) e exemplos práticos.
- **Negociação e influência:** técnicas para apresentar trade-offs e obter decisões executáveis.
- **Templates e roteiros:** mensagens curtas para PM/PO, checklist de reunião e roteiro de demo.

Exercícios práticos:

1. Dado um bug que afeta validação de CNPJ no cadastro, escreva um e-mail/PR description com:
   - Resumo do problema
   - Impacto estimado
   - Critério de aceitação proposto
   - Opção de rollback / mitigação
2. Simulação de priorização: agrupe 6 problemas fictícios por prioridade usando a matriz de risco.

> Nota de Integração: este arquivo consolidou conteúdo de:
> - `04-NIVEL-PLENO/10-soft-skills-qa.md` (absorvido)

Links relacionados:

- Veja também `05-NIVEL-SENIOR/04-comunicacao-lideranca.md` para progressão a liderança.

```
# Comunicação com Negócio (Pleno)

Como traduzir problemas técnicos em impacto de negócio e priorizar testes com base em risco.


Exemplos de comunicações e templates

Template de resumo para stakeholders (1 slide):
- Objetivo da entrega
- Situação atual (OK / risco / bloqueado)
- Métricas-chave (test coverage, regressões, erros críticos)
- Próximos passos e responsáveis

Email curto para notificar release:

```
Assunto: Release <tag> - status e observações

Resumo: Deploy planejado para <data>. Testes smoke OK em staging.
Riscos: <lista>
Ação: rollback plan disponível em <link>

Atenciosamente,
Equipe QA
```

