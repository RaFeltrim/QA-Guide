# Testes Manuais — Guia Rápido

Objetivo: ensinar o processo de executação de testes manuais e reportar resultados.

- Preparação: pré-condições, ambiente, dados
- Execução: passos claros, evidências (prints, logs)
- Critério de passagem/falha
- Registro: como documentar em ferramenta (ex.: Jira)

Exercício: executar 3 casos funcionais simples e capturar evidências.
# Testes Manuais — Guia Prático para Estagiários

## Seção 1 – Conceito e por que importa

Testes manuais são a forma inicial e essencial de verificar se uma funcionalidade atende ao comportamento esperado. Para estagiários, o foco é executar casos de teste com precisão, identificar e documentar comportamentos incorretos e fornecer evidências claras que permitam a reprodução do problema.

Por que importa:
- Feedback rápido sobre funcionalidades novas
- Ajuda a identificar requisitos incompletos ou ambíguos
- Gera evidências úteis para desenvolvedores e PO

## Seção 2 – Exemplo prático: Caso de Teste de Login

### Contexto
Aplicação web simples com página de login (`/login`). Usuário de teste: `qa+teste1@example.com` / senha `Senha123!`.

### Caso de Teste: Login com sucesso
- **ID:** TC_EST_LOGIN_001
- **Pré-condição:** Usuário `qa+teste1@example.com` existe no ambiente de teste
- **Passos:**
	1. Abrir o navegador e acessar `https://app.exemplo.local/login`
	2. Preencher o campo **Email** com `qa+teste1@example.com`
	3. Preencher o campo **Senha** com `Senha123!`
	4. Clicar no botão **Entrar**
	5. Aguardar redirecionamento para `/dashboard`
- **Resultado esperado:** Usuário é redirecionado para `/dashboard` e o nome do usuário aparece no header.

### Evidências a coletar
- Screenshot da tela de login antes do submit
- Screenshot do dashboard após login
- Console do navegador caso haja erro (capture a aba Console)

## Seção 3 – Exercícios (práticos e com critérios claros)

### Exercício 1: Executar o caso de teste de Login
- **O que fazer:** Execute o `TC_EST_LOGIN_001`, colete evidências e registre o resultado em um arquivo `estagiario-entrega.md`.
- **Critério de aceitação:** arquivo contém 1) passo a passo executado, 2) 2 screenshots (antes/depois), 3) status (Pass/Fail) e 4) observações se falhar.

### Exercício 2: Caso de teste - Campo Obrigatório
- **O que fazer:** Criar um caso de teste que valide que o campo senha é obrigatório.
- **Critério de aceitação:** caso de teste documentado com ID, passos, resultado esperado e uma execução mostrando a mensagem de validação.

### Exercício 3: Reportar um bug simples
- **O que fazer:** Se durante a execução você encontrar um comportamento inesperado (ex.: botão não responde), abra um bug usando o template em `gabarito/bug_report_template.md` e anexe evidências.
- **Critério de aceitação:** Bug criado com título, ambiente, passos para reproduzir, resultado esperado/observado e pelo menos 1 evidência (screenshot ou log).

## Seção 4 – Dicas práticas e soft skills

- Documente sempre os passos exatamente como foram executados (inclua valores de campos).
- Ao coletar screenshots, anote o horário e o ambiente (staging/local).
- Seja objetivo nas descrições: prefira "Ao clicar em Entrar nada acontece" a "Sistema com problema".
- Comunicação: descreva o impacto do bug em termos de usuário (ex.: "Usuário não consegue finalizar compra").

## Seção 5 – Referências / Próximos passos

- Template de bug report: `gabarito/bug_report_template.md`
- Template de checklist: `gabarito/checklist_template.md`
- Próximo documento recomendado: `02-NIVEL-ESTAGIARIO/02-bug-reports.md` (vamos detalhar exemplos preenchidos)

---

> Nota: siga sempre as políticas de segurança e não exponha dados reais em ambientes públicos — prefira fixtures em `fixtures/`.

