# 11 — Database Avançado para Testers

Conteúdo essencial:
- Entender schemas, chaves primárias/estrangeiras e índices
- Estratégias de testes com transações e rollback
- Fixtures e seeds: como manter dados consistentes
- Otimização de queries para evitar testes lentos

Exercício: criar um script que popula a base com dados de testes e limpa após execução.
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


Exemplos de queries e scripts de preparação/rollback

Query exemplo: inserir dados de teste e verificar integridade

```sql
-- fixtures/seed_test_data.sql
INSERT INTO users (id, email, name) VALUES (100, 'qa.seed@example.com', 'QA Seed');
```

Rollback exemplo:

```sql
DELETE FROM users WHERE email LIKE '%@example.com';
```

Script de preparação/rollback em Python (exemplo):

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

