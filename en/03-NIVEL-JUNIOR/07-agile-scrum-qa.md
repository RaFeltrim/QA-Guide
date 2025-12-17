# Agile / Scrum para QA (Júnior)

## Seção 1 – Por que QA participa em todas as cerimônias

QA não é apenas executar testes: é garantir que o incremento entregue atenda critérios de qualidade. Participar das cerimônias assegura alinhamento com produto, visibilidade de riscos e oportunidades de prevenção.

## Seção 2 – Checklist: Planning

- **Antes do Planning**:
	- [ ] Ler os tickets propostos e anexar dúvidas/observações
	- [ ] Identificar dependências e riscos técnicos

- **Durante o Planning**:
	- [ ] Apresentar critérios de aceite propostos para cada história
	- [ ] Sugerir cenários de teste críticos (happy path + 2 edge cases)
	- [ ] Estimar esforço de teste (horas) e indicar necessidade de automação

- **Saída do Planning**:
	- [ ] Tickets com critérios de aceite claros
	- [ ] Lista de pré-condições e dados necessários
	- [ ] Responsável QA definido para cada história

## Seção 3 – Checklist: Daily

- **Objetivo:** comunicar progresso, bloqueios e riscos.
- **QA debe dizer**:
	- [ ] O que foi testado desde ontem
	- [ ] O que será testado hoje
	- [ ] Bloqueios (ambiente, dados, dependências)
	- [ ] Caso de regressão detectado (sim/não)

## Seção 4 – Checklist: Refinement

- **Antes do Refinement**:
	- [ ] Ler história e anexar critérios adicionais
	- [ ] Preparar perguntas de negócio e técnicas

- **Durante o Refinement**:
	- [ ] Questionar critérios vagos: "Como validar X?" "Quando considerar como aceito?"
	- [ ] Sugerir cenários não óbvios e riscos de regressão

## Seção 5 – Checklist: Review (Demo)

- **Objetivo:** validar que o incremento atende critérios de aceite e não introduz regressões.
- **Antes da Review**:
	- [ ] Executar smoke tests básicos na build entregue
	- [ ] Preparar evidências (screenshots, logs) das funcionalidades testadas

- **Durante a Review**:
	- [ ] Verificar critérios de aceite em tela
	- [ ] Reportar imediatamente quaisquer falhas que bloqueiem a entrega

## Seção 6 – Checklist: Retrospective

- **Objetivo:** melhorar processos e reduzir bugs futuros.
- **Contribuições do QA**:
	- [ ] Trazer dados (número de bugs, causas comuns, flakiness)
	- [ ] Propor ações concretas (mais automação, melhoria de ambientes, checklist de PR)
	- [ ] Comprometer-se com uma ação de melhoria (owner + prazo)

## Seção 7 – Templates rápidos

- **Critério de Aceite (exemplo):**
	- Dado que o usuário X está cadastrado
	- Quando ele fizer Y
	- Então o sistema deve responder Z (HTTP 200) e registrar A no banco

- **Cenário de Teste Rápido (exemplo):**
	- ID: TC_REF_001
	- Pré-condição: usuário cadastrado em `fixtures/usuarios-teste.json`
	- Passos: 1) Acessar /login; 2) Preencher email; 3) Preencher senha; 4) Clicar Entrar
	- Resultado esperado: redirecionamento para /dashboard

## Seção 8 – Dicas práticas

- Leve sempre evidências para a Review: uma imagem vale mil palavras.
- Em Planning, priorize testar o fluxo mais crítico (ex.: checkout) antes de perfilar casos menores.
- Use o Refinement para reduzir ambiguidade e prevenir retrabalho.

---

> Observação: esses checklists devem ser adaptados à realidade do time; comece com esse padrão e itere conforme o time envelhece.

