## Estrutura de Casos de Teste

Este documento descreve o formato recomendado para casos de teste e mostra exemplos preenchidos que usam os templates em `gabarito/templates`.

- **Objetivo:** Padronizar casos de teste para facilitar leitura, execução e rastreabilidade.
- **Onde usar:** Testes manuais, roteiros de E2E, evidências para QA e revisão por pares.

**Campos mínimos obrigatórios (ordem sugerida):**

- Título: resumo curto e único.
- ID: padrão legível (ex: `JUN-DB-001`).
- Pré-condições: ambiente, dados e passos prévios.
- Passos: passos numerados e claros.
- Dados de teste: valores utilizados (fixtures ou exemplos).
- Resultado esperado: critério de aceitação mensurável.
- Critérios de passagem/falha: quando marcar como passado/failed.
- Observações/Evidências: anexos, screenshots, logs.
- Tags/Componentes: para triagem e execução em pipelines.

Use o template de caso de teste em [gabarito/templates/test-case.md](../gabarito/templates/test-case.md#L1) para criar novos casos. Abaixo há um exemplo completo preenchido.

---

### Exemplo preenchido: `JUN-API-001` — Criar usuário via API

- Título: Criar usuário com dados válidos — endpoint `POST /users`
- ID: JUN-API-001
- Pré-condições:
  - Servidor de testes rodando em `https://api-staging.local`
  - Base de dados com estado limpo (fixture `usuarios-teste.json` carregada)
- Passos:
  1. Fazer requisição `POST /users` com payload JSON (ver Dados de teste).
  2. Validar resposta HTTP `201 Created`.
  3. Fazer `GET /users/{id}` retornado e validar campos.
- Dados de teste:
  - {
    "name": "Ana QA",
    "email": "ana.qa+teste@example.com",
    "role": "tester"
  }
- Resultado esperado:
  - Código 201; body contém `id`, `created_at` e campos iguais aos enviados.
- Critério de passagem:
  - Todos os passos sem erros; evidência: resposta JSON anexada.
- Observações/Evidências:
  - Anexar `response.json` e captura do request no Postman/Insomnia.
  - Teste automatizável: sim — mapear para `tests/api/test_create_user.py`.
  
---

### Boas práticas rápidas

- Prefira passos atômicos e verificáveis.
- Referencie fixtures sob `fixtures/` para dados reutilizáveis.
- Quando possível, indique tempo estimado de execução.
- Use tags para permitir execução por filter (ex: `@smoke`, `@regression`, `@db`).

### Como ligar um caso de teste a um gabarito/automação

1. Crie o caso no formato do template em [gabarito/templates/test-case.md](../gabarito/templates/test-case.md#L1).
2. Adicione dados reutilizáveis em `fixtures/` e referencie-os no campo `Dados de teste`.
3. Marque o case com tags correspondentes aos pipelines (`smoke`, `ci`, `e2e`).
4. Para cada caso com automatização planejada, adicione uma referência ao arquivo de teste automatizado (ex: `gabarito/exemplos-codigo/tests/test_validador_pytest.py`).

### Exercício prático (nível Júnior)

- Tarefa: converter o caso `JUN-API-001` em um teste automatizado PyTest simples que chama o endpoint (use o fixture `usuarios-teste.json` como payload de base). Entregáveis: arquivo `tests/test_jun_api_001.py` e um PR com o case preenchido em `03-NIVEL-JUNIOR/09-estrutura-casos-teste.md` (link para o arquivo de teste).

---

Referências: template de caso de teste — [gabarito/templates/test-case.md](../gabarito/templates/test-case.md#L1); templates de bug-report — [gabarito/templates/bug-report.md](../gabarito/templates/bug-report.md#L1).
# Estrutura de Casos de Teste (Júnior)

Formato padrão: ID, título, pré-requisitos, passos, resultado esperado, severidade, evidências.


Template reutilizável

Use o template central em [gabarito/templates/test-case.md](../gabarito/templates/test-case.md#L1) para padronizar os casos.

Exemplo de uso rápido:

- ID: QA-002-TC-0005
- Título: Recuperação de senha - e2e
- Pré-condições: Conta de teste com email confirmado
- Passos:
  1. Acessar `/forgot-password`
  2. Informar email da conta de teste
  3. Seguir link do email simulado
- Resultado Esperado: Usuário consegue redefinir senha e autenticar

Armazene os casos em `tests/cases/` ou em uma planilha compartilhada, referenciando o ID do caso no relatório de bugs.

