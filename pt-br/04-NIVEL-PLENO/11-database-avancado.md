# 11 — Database Avançado para Testers

Conteúdo essencial:
- Entender schemas, chaves primárias/estrangeiras e índices
- Estratégias de testes com transações e rollback
- Fixtures e seeds: como manter dados consistentes
- Otimização de queries para evitar testes lentos

## Princípios

- Isolar dados de teste (schemas de teste, bancos temporários ou docker-compose).
- Uso de fixtures versionadas (`fixtures/sql/` ou `fixtures/json/`).

## Estratégias de teste

- Testes unitários: mock de camada de persistência.
- Testes de integração: banco em memória ou container com dados seed.
- Testes de contrato: validar contratos entre serviços e DB migrations.

## Boas práticas

- Seed determinístico para testes automatizados.
- Rodar rollback/cleanup entre testes para evitar flakiness.

## Ferramentas úteis

- `pytest` fixtures, `factory_boy` para dados, `docker-compose` para infra local.

## Exemplos de queries e scripts de preparação/rollback

Query exemplo (fixtures/seed_test_data.sql):

```sql
INSERT INTO users (id, email, name) VALUES (100, 'qa.seed@example.com', 'QA Seed');
```

# 11 — Database Avançado para Testers

Conteúdo essencial:
- Entender schemas, chaves primárias/estrangeiras e índices
- Estratégias de testes com transações e rollback
- Fixtures e seeds: como manter dados consistentes
- Otimização de queries para evitar testes lentos

## Princípios

- Isolar dados de teste (schemas de teste, bancos temporários ou containers).
- Usar fixtures versionadas (`fixtures/sql/` ou `fixtures/json/`).

## Estratégias de teste

- Unit: mock da camada de persistência.
- Integração: banco em memória ou container com dados seed.
- Contrato: validar contratos entre serviços e migrations.

## Boas práticas

- Seed determinístico para testes automatizados.
- Rollback/cleanup entre testes para evitar flakiness.

## Ferramentas úteis

- `pytest` fixtures, `factory_boy`, `docker-compose` para infra local.

## Exemplos

SQL (fixtures/seed_test_data.sql):

```sql
INSERT INTO users (id, email, name) VALUES (100, 'qa.seed@example.com', 'QA Seed');
```

Rollback:

```sql
DELETE FROM users WHERE email LIKE '%@example.com';
```

Python (exemplo simplify):

```python
import sqlite3

def prepare(db='test.db'):
	conn = sqlite3.connect(db)
	cur = conn.cursor()
	cur.execute("INSERT INTO users(id,email,name) VALUES (100,'qa.seed@example.com','QA Seed')")
	conn.commit()
	conn.close()

def rollback(db='test.db'):
	conn = sqlite3.connect(db)
	cur = conn.cursor()
	cur.execute("DELETE FROM users WHERE email LIKE '%@example.com'")
	conn.commit()
	conn.close()

if __name__ == '__main__':
	prepare()
```

Documente o uso desses scripts e garanta que sejam idempotentes quando possível.
- [ ] Fixtures versionadas

- [ ] Rollbacks automatizados
