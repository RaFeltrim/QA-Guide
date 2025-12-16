# Bug Reports — Template e Boas Práticas

Campos essenciais:
- Título claro e conciso
- Ambiente (browser, versão, OS)
- Passos para reproduzir
- Resultado esperado vs resultado observado
- Evidências (logs, screenshots)
- Severidade e prioridade sugerida

Exemplo e template simples no final do arquivo.
# Bug Reports — Como escrever e exemplos preenchidos

## Seção 1 – Conceito e por que importa

Um bug report bem escrito permite que desenvolvedores reproduzam, priorizem e corrijam um problema com rapidez. Para estagiários, o objetivo é ser completo, objetivo e fornecer evidências suficientes (screenshots, logs, passos) para reproduzir o defeito.

Um bom bug report reduz ciclo de correção e evita retrabalho.

## Seção 2 – Template (resumo)

Use o template em `gabarito/bug_report_template.md`. Campos essenciais:

- Título
- ID
- Prioridade
- Ambiente
- Versão / commit
- Passos para reproduzir
- Resultado esperado
- Resultado observado
- Evidências (screenshots, logs)
- Observações / hipóteses

## Seção 3 – Exemplo preenchido (Caso 1)

**Título:** Botão "Entrar" não responde na página de login

**ID:** BR_EST_LOGIN_001

**Prioridade:** Alta

**Ambiente:** Staging — Windows 10, Chrome 120.0.6045.0

**Versão do build / commit:** build-2025-12-16 (commit: a1b2c3d)

## Passos para reproduzir
1. Acessar `https://app.exemplo.local/login`
2. Preencher o campo Email com `qa+teste1@example.com`
3. Preencher o campo Senha com `Senha123!`
4. Clicar no botão **Entrar**

## Resultado esperado

Usuário é autenticado e redirecionado para `/dashboard` (HTTP 200), nome do usuário aparece no header.

## Resultado observado

Clique no botão **Entrar** não dispara nenhuma requisição; UI permanece na página de login sem feedback (nenhum erro visível).

## Evidências

- Screenshot antes do submit: `evidencias/BR_EST_LOGIN_001_before.png`
- Screenshot após clicar: `evidencias/BR_EST_LOGIN_001_after.png`
- Console do navegador: erro JS `TypeError: loginHandler is not a function` (ver console.log anexado)

## Observações / hipóteses

- Possível falha de bundling (handler não definido) ou erro de build que removeu a função.

## Passos de mitigação temporária

- Recomendar rollback para build anterior onde o login funcionava.

---

## Seção 4 – Exemplo preenchido (Caso 2: Validação de formulário)

**Título:** Campo "Data de Nascimento" aceita texto inválido

**ID:** BR_EST_FORM_002

**Prioridade:** Média

**Ambiente:** Staging — macOS Ventura, Safari 17

**Versão do build / commit:** build-2025-12-16 (commit: a1b2c3d)

## Passos para reproduzir
1. Acessar `/cadastro`
2. Preencher Nome: `Teste QA`
3. Preencher Data de Nascimento: `31/02/2000`
4. Clicar em **Salvar**

## Resultado esperado

Validação de formato e data rejeita o input com mensagem de erro: "Data inválida" e não envia formulário.

## Resultado observado

Formulário é enviado; servidor retorna 400 em endpoint `/api/usuarios` e registro não é criado — porém mensagem para o usuário é genérica: "Erro ao salvar".

## Evidências

- Request/Response interceptados (HAR): `evidencias/BR_EST_FORM_002_har.json`
- Screenshot da mensagem genérica: `evidencias/BR_EST_FORM_002_msg.png`

## Observações / hipóteses

- Validação apenas no backend, falta validação no frontend; UX ruim (usuário não entende o que errou).

## Passos de mitigação temporária

- Adicionar validação simples no frontend para evitar submissões inválidas; comunicar workaround para o time de produto.

---

## Seção 5 – Checklist para abrir um bug (rápido)

- [ ] Título claro e específico
- [ ] Passos para reproduzir completos e ordenados
- [ ] Resultado esperado descrito
- [ ] Resultado observado descrito
- [ ] Ambiente e versão informados
- [ ] Evidências anexadas (screenshots, logs, HAR)
- [ ] Severidade/impacto indicado
- [ ] Reprodutibilidade (sempre/ocasional/único) indicada
- [ ] Hipótese de causa (se houver)

## Seção 6 – Critérios de severidade (sugestão)

- **Crítico / Alta:** Sistema indisponível, perda de dados, bloqueio de fluxo crítico (pagamento/login)
- **Média:** Funcionalidade degradada, workaround disponível, impacto limitado
- **Baixa:** Problema estético, texto incorreto, baixa frequência

## Seção 7 – Exercícios (prática guiada → independente)

### Exercício A (guiado)

- **Enunciado:** Execute o `TC_EST_LOGIN_001` (veja `01-testes-manuais.md`). Se o botão não responder, preencha um bug report usando o template e os critérios acima.
- **Critério de aceitação:** Bug report criado no formato do template com todas as caixas do checklist marcadas.

### Exercício B (autônomo)

- **Enunciado:** Simule uma falha de validação (ex.: inserir `31/02/2000`) e abra um bug. Proponha a severidade e um passo de mitigação.
- **Critério de aceitação:** Bug criado com evidências (HAR ou screenshots), severidade justificada e passo de mitigação sugerido.

## Seção 8 – Dicas finais

- Sempre verifique se o bug é reproduzível em outro navegador/ambiente antes de marcar como crítico.
- Ao anexar logs, remova tokens e dados sensíveis (use `fixtures/` para dados de exemplo).
- Use um título padronizado: `[Área] Resumo curto - impacto` (ex.: `[Login] Botão Entrar não responde - Usuário não consegue acessar`)

## Referências

- Template: `gabarito/bug_report_template.md`
- Checklist geral: `gabarito/checklist_template.md`

