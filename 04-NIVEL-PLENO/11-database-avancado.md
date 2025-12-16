```markdown
# Database Avançado para QA (Pleno)

Resumo: estratégias para testar integrações com banco de dados, fixtures, rollbacks e testes de performance.

1. Princípios

- Isolar dados de teste (schemas de teste, bancos temporários ou docker-compose).
- Uso de fixtures versionadas (`fixtures/sql/` ou `fixtures/json/`).

2. Estratégias de teste

- Testes unitários: mock de camada de persistência.
- Testes de integração: banco em memória ou container com dados seed.
- Testes de contrato: validar contratos entre serviços e DB migrations.

3. Boas práticas

- Seed determinístico para testes automatizados.
- Rodar rollback/cleanup entre testes para evitar flakiness.

4. Ferramentas úteis

- `pytest` fixtures, `factory_boy` para dados, `docker-compose` para infra local.

Checklist

- [ ] Fixtures versionadas
- [ ] Rollbacks automatizados
- [ ] Dados sensíveis mascarados

```
# Banco de Dados Avançado (Pleno)

Índices, relações, transações e estratégias para validar integridade em testes.

> TODO: adicionar exemplos de queries e scripts de preparação/rollback.
