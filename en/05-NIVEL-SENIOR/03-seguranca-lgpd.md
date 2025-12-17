# Segurança e LGPD

Objetivo: práticas essenciais para testes com dados sensíveis e conformidade com LGPD.

## Pontos-chave

- Anonimização: mascarar PII em datasets de teste ou usar dados sintéticos.
- Minimização: limitar o conjunto de dados reais e justificar acesso quando necessário.
- Gestão de secrets: não versionar credenciais; usar vaults e rotinas de rotação.

## Checklist rápido

- Usar dados sintéticos quando possível.
- Auditar acessos a datasets e logs de uso.
- Definir políticas de retenção e descarte de dados de teste.

Referências: [SECURITY_SECRETS_GUIDE.md](../../CNPJ-Docs/SECURITY_SECRETS_GUIDE.md) e guidelines internas de segurança.
# 03 — Segurança & LGPD

Objetivo: garantir que práticas de teste respeitem privacidade e segurança.

- LGPD: mascaramento/anonimização de dados de produção em fixtures
- Segurança: testes de penetração, análise de dependências, scanning SAST/DAST
- Processos: gerenciamento de secrets, acesso mínimo a dados sensíveis
- Compliance: documentação e trilha de auditoria para testes que usam dados reais

## Política resumida
- Nunca executar testes automatizados contra dados de produção sem aprovação formal.
- Quando for necessário usar dados reais para reproduzir um problema, aplicar processo de autorização, mascaramento e auditoria (registro de quem acessou, por que e por quanto tempo).
- Preferir dados sintetizados ou gerados a partir de modelos para testes de rotina.

## Exemplo de pipeline para anonimização (alto nível)
1. Exportar subset autorizado e versionado (somente campos necessários).
2. Aplicar transformação determinística para campos identificáveis (hashs com salt por ambiente) e aleatória para campos sensíveis (nomes, telefones) usando biblioteca confiável.
3. Validar integridade relacional (FKs) e dados obrigatórios.
4. Importar para ambiente de teste isolado.
5. Registrar a operação em log de auditoria e remover export temporário da storage.

## Script de anonimização (exemplo em Python, simplificado)

```python
# scripts/anonymize_bulk.py (exemplo)
import csv
from hashlib import sha256
from faker import Faker

fake = Faker('pt_BR')

def anonymize_row(row):
    row['email'] = sha256((row['email']+'|SALT').encode()).hexdigest() + '@anonym.local'
    row['name'] = fake.name()
    row['phone'] = fake.phone_number()
    return row

with open('export.csv', newline='', encoding='utf8') as inp, open('export_anonym.csv','w',newline='',encoding='utf8') as out:
    reader = csv.DictReader(inp)
    writer = csv.DictWriter(out, fieldnames=reader.fieldnames)
    writer.writeheader()
    for r in reader:
        writer.writerow(anonymize_row(r))
```

## Boas práticas
- Use salts distintos por ambiente e mantenha-os em vault com acesso restrito.
- Automatize validações de integridade e execute testes de sanity após import.
- Mantenha retenção curta dos arquivos exportados e garanta logs de auditoria.
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


Políticas e exemplos de anonimização de massa

Política resumida
- Nunca executar testes automatizados contra dados de produção sem aprovação formal.
- Quando for necessário usar dados reais para reproduzir um problema, aplicar processo de autorização, mascaramento e auditoria (registro de quem acessou, por que e por quanto tempo).
- Preferir dados sintetizados ou gerados a partir de modelos para testes de rotina.

Exemplo de pipeline para anonimização (alto nível)
1. Exportar subset autorizado e versionado (somente campos necessários).
2. Aplicar transformação determinística para campos identificáveis (hashs com salt por ambiente) e aleatória para campos sensíveis (nomes, telefones) usando biblioteca confiável.
3. Validar integridade relacional (FKs) e dados obrigatórios.
4. Importar para ambiente de teste isolado.
5. Registrar a operação em log de auditoria e remover export temporário da storage.

Script de anonimização (exemplo em Python, simplificado)

```python
# scripts/anonymize_bulk.py (exemplo)
import csv
from hashlib import sha256
from faker import Faker

fake = Faker('pt_BR')

def anonymize_row(row):
	row['email'] = sha256((row['email']+'|SALT').encode()).hexdigest() + '@anonym.local'
	row['name'] = fake.name()
	row['phone'] = fake.phone_number()
	return row

with open('export.csv', newline='', encoding='utf8') as inp, open('export_anonym.csv','w',newline='',encoding='utf8') as out:
	reader = csv.DictReader(inp)
	writer = csv.DictWriter(out, fieldnames=reader.fieldnames)
	writer.writeheader()
	for r in reader:
		writer.writerow(anonymize_row(r))
```

Boas práticas
- Use salts distintos por ambiente e mantenha-os em vault com acesso restrito.
- Automatize validações de integridade e execute testes de sanity após import.
- Mantenha retenção curta dos arquivos exportados e garanta logs de auditoria.

