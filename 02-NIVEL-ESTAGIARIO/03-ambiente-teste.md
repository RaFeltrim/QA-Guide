# Ambiente de Teste

- Checklist de setup local
- Ambientes comuns: dev, staging, homolog
- Gerenciamento de dados de teste (mascaramento, fixtures)
- Troubleshooting comum
# Ambiente de Teste


Configuração mínima para ambientes locais e de integração (staging). Incluir informações sobre variáveis, seed de dados e rollback.

Exemplo simples de `docker-compose` para um serviço web + db (local):

```yaml
version: '3.8'
services:
	app:
		build: .
		ports:
			- "8000:8000"
		environment:
			- DATABASE_URL=postgres://postgres:postgres@db:5432/testdb
		depends_on:
			- db
	db:
		image: postgres:14
		environment:
			POSTGRES_DB: testdb
			POSTGRES_USER: postgres
			POSTGRES_PASSWORD: postgres
		ports:
			- "5432:5432"
```

Script de seed (exemplo):

```
python scripts/db_seed.py --env=local
```

Coloque scripts de setup/rollback em `scripts/` e documente variáveis de ambiente necessárias.

