# Banco de Dados para QA (Júnior)

## Seção 1 – Conceito e por que importa

Para um QA júnior, entender SQL e operações básicas de banco (CRUD) é essencial para preparar massa de testes, validar dados persistidos e executar limpezas seguras após testes. Saber executar consultas e usar transações reduz dependência do time de desenvolvimento e acelera validação de cenários end-to-end.

## Seção 2 – Comandos essenciais (CRUD)

Observação: sempre trabalhe em um ambiente de teste (staging/local) e nunca execute comandos destrutivos em produção.

- CREATE: criar tabelas/fixtures para testes

```sql
CREATE TABLE usuarios_test (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  nome VARCHAR(200),
  criado_em TIMESTAMP DEFAULT NOW()
);
```

- INSERT: popular massa de teste

```sql
INSERT INTO usuarios_test (email, nome) VALUES
('qa+teste1@example.com', 'QA Teste 1'),
('qa+teste2@example.com', 'QA Teste 2');
```

- SELECT: validar estado após operação

```sql
SELECT id, email, nome FROM usuarios_test WHERE email LIKE 'qa+%';
```

- UPDATE: alterar dados de teste COM condição

```sql
UPDATE usuarios_test
SET nome = 'QA Atualizado'
WHERE email = 'qa+teste1@example.com';
```

- DELETE: remover dados de teste COM condição

```sql
DELETE FROM usuarios_test
WHERE email LIKE 'qa+%';
```

## Seção 3 – Transações e segurança

Use transações para agrupar operações e permitir rollback em caso de erro:

```sql
BEGIN;
INSERT INTO usuarios_test (email, nome) VALUES ('qa+temp@example.com','Temp');
-- executar validações aqui
ROLLBACK; -- ou COMMIT; se tudo estiver OK
```

Dicas de segurança:
- Nunca execute `DELETE FROM tabela;` sem `WHERE` em ambientes compartilhados.
- Utilize um schema ou prefixos (`_test`) para isolar dados.
- Prefira truncar tabelas apenas em ambientes controlados e com backups.

## Seção 4 – Exemplos práticos (cenários de QA)

1) Preparar massa para teste de fluxo de compra:

```sql
BEGIN;
INSERT INTO usuarios_test (email,nome) VALUES ('qa+compra1@example.com','Comprador 1');
INSERT INTO pedidos_test (usuario_email, total, status) VALUES ('qa+compra1@example.com', 123.45, 'PENDENTE');
COMMIT;
```

2) Validar rollback após falha simulada:

```sql
BEGIN;
INSERT INTO usuarios_test (email,nome) VALUES ('qa+erro@example.com','Erro Teste');
-- forçar erro aqui (ex.: constraint violation)
ROLLBACK;
-- verificar que registro não existe
SELECT * FROM usuarios_test WHERE email = 'qa+erro@example.com'; -- deve retornar vazio
```

## Seção 5 – Exercícios (scaffolded)

### Exercício 1 — Básico (guiado)
- **Objetivo:** Criar tabela `produtos_test`, inserir 3 registros e selecionar produtos com preço > 100.
- **O que fazer:** Use `CREATE TABLE`, `INSERT` e `SELECT` conforme exemplos.
- **Critério de aceitação:** Script SQL com criação, inserts e seleção que retorna os produtos corretos.

### Exercício 2 — Intermediário (autonomia)
- **Objetivo:** Simular cenário de atualização de pedido: crie um pedido com status `PENDENTE`, atualize para `PAGO` e valide o histórico.
- **O que fazer:** Use transação para agrupar operações e comente cada passo.
- **Critério de aceitação:** Script que mostra antes/depois com `SELECT` e commit.

### Exercício 3 — Segurança e limpeza (autônomo)
- **Objetivo:** Escrever script seguro de limpeza que remove apenas registros `qa+%` e roda em transação.
- **O que fazer:** Criar script com `BEGIN; DELETE ... WHERE email LIKE 'qa+%'; COMMIT;`
- **Critério de aceitação:** Script documentado e testado localmente (não remove outros dados).

## Seção 6 – Dica de mercado / Soft skill

Na prática, documente os scripts e explique o porquê de cada `WHERE`. Em reuniões com devs, mostre o impacto esperado das operações (ex.: massa reduzida, tempo de execução). Evite linguagem técnica vazia — traduza para impacto de negócio quando necessário.

## Seção 7 – Referências / Próximos passos

- Fixtures úteis: `fixtures/usuarios-teste.json`, `fixtures/dados-api.json`
- Próximo documento recomendado: `03-NIVEL-JUNIOR/01-python-pytest.md` (implementar testes unitários para validadores)

---

> Observação: copie scripts para arquivos `.sql` e mantenha versão no controle de código. Nunca rode scripts sem revisar o `WHERE`.
# Banco de Dados para QA (Júnior)

Introdução a SQL CRUD para preparar massa de testes e validar dados. Exemplos de `SELECT`, `UPDATE`, `DELETE` e uso de transações.

> TODO: expandir com scripts e exemplos comentados conforme Insight 1.
