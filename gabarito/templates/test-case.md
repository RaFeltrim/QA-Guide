# Template: Test Case

- **ID:** TC-0001
- **Título:** Descrição sucinta do caso
- **Pré-condições:** (ex.: usuário criado, token válido)
- **Dados de entrada:** (ex.: email, senha, payload)
- **Passos:**
  1. Passo 1
  2. Passo 2
  3. Passo 3
- **Resultado esperado:** (descrição clara)
- **Resultado obtido:** (preencher após execução)
- **Critério de aceitação:** (pass/fail rules)
- **Prioridade:** Baixa/Média/Alta
- **Tipo:** Manual/Automatizado
- **Tags / Componentes:** (ex.: login, API, UI)

Bom para usar em repositórios de casos e ao gerar automações.
# Template de Caso de Teste

- **ID:**
- **Título:**
- **Pré-condições:**
- **Dados de teste / Fixtures:**
- **Passos:**
- **Resultado esperado:**
- **Resultado observado:**
- **Severidade:** (Alta / Média / Baixa)
- **Evidências:** (screenshots, logs, HAR)
- **Observações:**

## Exemplo Preenchido

- **ID:** TC_EST_LOGIN_001
- **Título:** Login com sucesso
- **Pré-condições:** Usuário `qa+teste1@example.com` cadastrado
- **Dados de teste / Fixtures:** `fixtures/usuarios-teste.json`
- **Passos:**
  1. Abrir `https://app.exemplo.local/login`
  2. Preencher Email: `qa+teste1@example.com`
  3. Preencher Senha: `Senha123!`
  4. Clicar em Entrar
- **Resultado esperado:** Redirecionar para `/dashboard` e mostrar nome do usuário no header
- **Resultado observado:** (preencher após execução)
- **Severidade:** Alta
- **Evidências:** `evidencias/TC_EST_LOGIN_001_before.png`, `evidencias/TC_EST_LOGIN_001_after.png`
- **Observações:**

> Use este template para todos os casos do nível Estagiário. Mantém rastreabilidade e facilita revisão.
