# 03 — Segurança & LGPD

Objetivo: garantir que práticas de teste respeitem privacidade e segurança.

- LGPD: mascaramento/anonimização de dados de produção em fixtures
- Segurança: testes de penetração, análise de dependências, scanning SAST/DAST
- Processos: gerenciamento de secrets, acesso mínimo a dados sensíveis
- Compliance: documentação e trilha de auditoria para testes que usam dados reais

Exercício: criar checklist de requisitos de LGPD para um pipeline de testes que use dados de produção.
```markdown
# Segurança e LGPD (Sênior)

Políticas e práticas para garantir conformidade legal e segurança de dados em atividades de QA.

Pontos-chave

- Não usar dados reais em ambientes de teste sem anonimização.
- Políticas de retenção e logging compatíveis com LGPD.

Governança

- Defina papéis e responsabilidades para dados sensíveis.
- Auditoria regular de acessos e pipelines que processam dados.

Checklist

- [ ] Dados sensíveis anonimizado em fixtures
- [ ] Auditoria de acesso configurada

```
# Segurança e LGPD (Sênior)

Práticas para garantir conformidade em testes: mascaramento, consentimento e logs minimizados.

> TODO: incluir políticas e exemplos de anonimização de massa.
