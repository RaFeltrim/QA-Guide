# Gabarito — Estagiário

Este gabarito apresenta respostas esperadas e exemplos comentados para os exercícios do nível Estagiário.

## Gabarito Exercício 1 — Execução do Caso de Teste de Login

**Arquivo esperado:** `estagiario-entrega.md`

- Passo a passo: registrado com as mesmas instruções do `TC_EST_LOGIN_001`
- Evidências: duas screenshots (antes/depois)
- Status: `Pass` se redirecionado para `/dashboard`, `Fail` caso contrário
- Observações: se `Fail`, anexar console.log e descrever comportamento

## Gabarito Exercício 2 — Caso de teste de campo obrigatório

**Caso de Teste Exemplo:**

- **ID:** TC_EST_SENHA_002
- **Título:** Senha é obrigatória no login
- **Pré-condição:** Página de login aberta
- **Passos:**
  1. Acessar `/login`
  2. Preencher Email: `qa+teste1@example.com`
  3. Deixar o campo Senha vazio
  4. Clicar em Entrar
- **Resultado esperado:** Mensagem de validação "Senha é obrigatória" e formulário não enviado

**Como validar:** Screenshot mostrando a mensagem de validação.

## Gabarito Exercício 3 — Reportar bug simples

Use o template em `gabarito/templates/bug-report.md`. Exemplo de preenchimento rápido (se o botão Entrar não responder):

- **Título:** [Login] Botão Entrar não responde - Usuário não consegue acessar
- **ID:** BR_EST_LOGIN_001
- **Prioridade:** Alta
- **Ambiente:** Staging — Chrome 120 / Windows 10
- **Versos do build:** build-2025-12-16 (a1b2c3d)
- **Passos para reproduzir:** (copiar do caso de teste)
- **Resultado esperado:** Redirecionamento para `/dashboard`
- **Resultado observado:** Clique não dispara requisição; erro JS no console `loginHandler is not a function`
- **Evidências:** `evidencias/BR_EST_LOGIN_001_before.png`, `evidencias/BR_EST_LOGIN_001_after.png`, `evidencias/BR_EST_LOGIN_001_console.txt`

### Por que esta resposta está correta

1. Passos reproduzíveis e claros permitem debug
2. Evidências (screenshots + console) mostram o problema e apontam causa provável
3. Severidade Alta justifica priorização

---

## Checklist de Correção (para revisão do dev)

- [ ] Bug reproduzido localmente pelo dev
- [ ] Testes unitários relacionados adicionados/ajustados
- [ ] Fix revisado em PR com referência ao ID do bug
- [ ] QA re-executou o caso após o deploy do fix

> Use este gabarito como referência ao corrigir e validar bugs reportados por estagiários.
