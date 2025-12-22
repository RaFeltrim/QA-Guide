Você é um QA Engineer Sênior especialista em BDD, Gherkin e manutenção de suítes de teste em larga escala.

Estou trabalhando no projeto gherkin-project focado em CNPJ, e preciso que você revise e melhore os cenários de teste que escrevi.

Use a seguinte mentalidade: “manutenção de jardim”
→ reduzir ruído, consolidar testes repetitivos, priorizar valor de negócio, estabilidade e facilidade de remoção.

1) Contexto e princípios
Regras que você deve aplicar na revisão:

Foco em Valor: manter apenas cenários que cobrem regras de negócio relevantes ou bugs reais; eliminar “variações cosméticas”.

Eliminar Custo Passivo: cenários triviais, redundantes ou que testam o mesmo comportamento com dados pouco relevantes devem ser consolidados ou removidos.

Estabilidade: preferir exemplos determinísticos; identificar qualquer coisa com cheiro de flaky e sugerir como estabilizar.

Desapego: todo teste deve ter propósito claro e critério de remoção.

Considere que o arquivo gherkin-project/REVIEW_CNPJ_TESTS.md será o lugar onde iremos registrar as conclusões da revisão.

2) Tarefas que você precisa executar
Agrupar e consolidar

Arquivos numerados como cnpj_alfanumerico_01.feature … cnpj_alfanumerico_20.feature:

Indique quais podem ser consolidados em um único cnpj_alfanumerico.feature com Esquema do Cenário + Exemplos.

Diga quais exemplos são realmente representativos (ex.: 1–2 válidos, 1–2 inválidos por tipo).

Arquivos cnpj_numerico_01.feature … cnpj_numerico_05.feature:

Mesmo processo, consolidar em cnpj_numerico.feature.

Manter e refatorar
Para arquivos como:

cnpj_validacao.feature

cnpj_normalizacao.feature

duplicidade.feature

auditoria.feature

integracao_consulta_externa.feature

Faça para cada um:

Liste o que está bom (cobertura, clareza de negócio).

Aponte melhorias: onde usar Esquema do Cenário, onde remover detalhes técnicos, onde dividir cenários grandes.

Sugira tags adequadas (@critical, @fast, @integration, @slow, @negative, @wip).

Reclassificar conteúdo como documentação/fixtures
Para arquivos puramente de dados ou brainstorming (ex.: cnpj_edge_cases.md, cnpj_lista_negra.md, etc.), diga:

Se devem virar cenários Gherkin reais, e em qual feature.

Ou se devem ser movidos para docs/ ou fixtures/ como apoio, sem virarem testes automatizados.

Arquivar/Remover

Indique explicitamente quais arquivos devem ir para gherkin-project/archive/ (ou serem excluídos) após consolidação dos testes.

Sempre justifique a remoção (“totalmente coberto por X”, “caso extremamente específico sem valor de negócio”, etc.).

Sugestão de nova organização de tags e execução

Propor um conjunto final de tags (ex.: @critical, @fast, @integration, @slow, @flaky, @wip).

Descrever dois comandos de execução típicos:

um para PRs (@fast and @critical and not @flaky)

outro para pipeline completa (not @wip).

3) Formato da sua resposta
Responda em Markdown, seguindo este formato:

Visão geral da suite

2–3 parágrafos avaliando clareza, redundância e riscos.

Tabela de decisões por arquivo

Colunas: Arquivo | Ação (KEEP/MERGE/MOVE/ARCHIVE) | Justificativa | Sugestão de novo nome/feature.

Sugestões de cenários parametrizados

Entregue pelo menos 2 exemplos concretos de Esquema do Cenário (Scenario Outline) prontos para colar em:

cnpj_alfanumerico.feature

cnpj_numerico.feature

Plano de refatoração passo a passo

Passos ordenados (1, 2, 3…) para aplicar as mudanças sem quebrar a suite.

Checklist de aceitação

Lista de itens para eu revisar depois de aplicar as mudanças (ex.: “todos os arquivos numerados foram consolidados”, “tags aplicadas nas features críticas”, etc.).

Use linguagem direta e opinativa, como se estivesse fazendo código review de teste em um time sênior de QA.

## Visão geral da suite

O conjunto de arquivos de CNPJ está espalhado entre features numeradas, docs de mapeamento e fixtures. Há uma forte duplicação: 20 arquivos `cnpj_alfanumerico_*` e múltiplos `cnpj_numerico_*` que repetem lógica com variações de dados triviais. Isso gera custo passivo (manutenção, ruído) e risco de testes flakey por exemplos sem valor de negócio.

A proposta aplicada: consolidar comportamento em duas features canônicas (`cnpj_alfanumerico.feature`, `cnpj_numerico.feature`), mover coleções de dados e brainstorm para `docs/` ou `fixtures/`, e arquivar versões numeradas em `gherkin-project/archive/` com cabeçalho indicando a substituição. Priorize manter arquivos que representam regras de negócio (validação, normalização, duplicidade, auditoria, integrações externas).

## Tabela de decisões por arquivo (resumo crítico)

| Arquivo | Ação | Justificativa | Novo caminho/feature |
|---|---:|---|---|
| `features/cnpj_alfanumerico.feature` | KEEP | Consolidado canônico para formatos alfanuméricos | `features/cnpj_alfanumerico.feature` (@critical @fast)
| `features/cnpj_alfanumerico_*.feature` | ARCHIVE | Variante numérica; já arquivado; duplicatas de dados | `archive/cnpj_alfanumerico_*.feature` (já movido)
| `features/cnpj_numerico.feature` | KEEP | Consolidado canônico para formatos numéricos | `features/cnpj_numerico.feature` (@critical @fast)
| `features/cnpj_numerico_*.feature` | ARCHIVE | Variações de dados; consolidado | `archive/cnpj_numerico_*.feature` (já movido)
| `features/cnpj_validacao.feature` | KEEP / REFACTOR | Regra de negócio central (checksum/formato) — parametrizar | `features/cnpj_validacao.feature` (@critical @fast)
| `features/cnpj_normalizacao.feature` | KEEP / REFACTOR | Importante para ingestão; remover detalhes técnicos | `features/cnpj_normalizacao.feature` (@critical)
| `features/duplicidade.feature` | KEEP | Cobertura de regra de negócio específica | `features/duplicidade.feature` (@critical @fast)
| `features/auditoria.feature` | KEEP / REVIEW | Pode tocar DB/logs — marcar @integration se necessário | `features/auditoria.feature` (@integration @slow)
| `features/integracao_consulta_externa.feature` | KEEP (tag) | Teste de integração externa — manter separado | `features/integracao_consulta_externa.feature` (@integration @slow)
| `cnpj_alfanumerico_mapping.md`, `cnpj_numerico_mapping.md` | MOVE → docs/fixtures | Mapeamentos são dados de apoio, não features | `docs/cnpj/` ou `fixtures/cnpj_mapping.md`
| `cnpj_edge_cases.md`, `cnpj_lista_negra.md` | MOVE → docs/fixtures | Brainstorm / coleção de dados longos | `docs/cnpj/` ou `fixtures/` (não executar como feature)
| `support/fixtures/*.json`, `pt-br/fixtures/*` | KEEP (fixtures) | Dados para parametrizar Examples | `support/fixtures/` (manter)
| `step_definitions_clean/cnpj.steps.ts` | KEEP | Implementação atual — revisar compatibilidade | `step_definitions_clean/` |
| `step_definitions_archived/*` | ARCHIVE | Versões antigas — manter histórico | `archive/` |

> Observação: muitos arquivos já foram movidos para `archive/` durante a consolidação (01–20 alfanumérico e 01–05 numérico).

## Novos arquivos consolidados (propostas)

- `features/cnpj_alfanumerico.feature` — objetivo: regras de normalização/validação para entradas que contenham letras/símbolos; substitui `cnpj_alfanumerico_01..20`.
- `features/cnpj_numerico.feature` — objetivo: canonicalização/validação para entradas estritamente numéricas; substitui `cnpj_numerico_01..05`.
- `fixtures/cnpj_invalid_inputs.md` e `docs/cnpj_edge_cases.md` — mover listas longas e brainstorm para aqui (não executar como feature).

## Sugestões de cenários parametrizados (colar em features)

1) `cnpj_alfanumerico.feature` (Scenario Outline)

```gherkin
Feature: Validação e normalização de CNPJ alfanuméricos

	Scenario Outline: Normalizar e validar entradas alfanuméricas
		Given que o usuário insere o CNPJ "<input>"
		When o sistema processa o CNPJ
		Then o status deve ser "<status>"
		And a forma normalizada deve ser "<normalized>"

		Examples:
			| input               | status  | normalized       |
			| 12.345.678/0001-95  | valid   | 12345678000195   |
			| 12345678000195      | valid   | 12345678000195   |
			| 12A345678/0001-95   | invalid |                  |
			| 00000000000000      | invalid |                  |
```

2) `cnpj_numerico.feature` (Scenario Outline)

```gherkin
Feature: Validação de CNPJ numéricos

	Scenario Outline: Canonicalização e validação numérica
		Given que o usuário insere o CNPJ "<input>"
		When o sistema canonicaliza e valida o CNPJ
		Then o resultado deve ser "<status>"

		Examples:
			| input            | status  |
			| 11222333000181   | valid   |
			| 11222333000180   | invalid |
			| 00000000000000   | invalid |
			| 12345678901234   | invalid |
```

## Plano de refatoração passo a passo

1. Confirmar com time se `features/cnpj_alfanumerico.feature` e `cnpj_numerico.feature` serão as canonicals; ajustar conteúdo se necessário.  
2. Mover permanentemente todos os `*_01..*_NN` já listados para `archive/` (já aplicado para muitos).  
3. Mover `*_mapping.md`, `edge_cases.md`, `lista_negra.md` para `docs/cnpj/` ou `fixtures/cnpj/`.  
4. Refatorar `cnpj_validacao.feature` e `cnpj_normalizacao.feature` para usar Scenario Outlines e exemplos representativos; remover detalhes de implementação dos steps.  
5. Atualizar `README.md` / índices para apontar aos novos caminhos canônicos.  
6. Rodar smoke tests com tag `@fast and @critical` e ajustar step definitions.  
7. Criar PR com inventário (`cnpj-consolidation-inventory.md`), tabela de ações e lista de arquivos arquivados; pedir revisão de domínio.

## Checklist de aceitação

- [ ] `features/cnpj_alfanumerico.feature` e `features/cnpj_numerico.feature` existem e documentam origens.  
- [ ] Todos os arquivos numerados foram movidos para `gherkin-project/archive/` ou consolidados.  
- [ ] Mappings/edge_cases/listas foram movidos para `docs/` ou `fixtures/`.  
- [ ] Tags aplicadas nas features críticas (`@critical`, `@fast`, `@integration`, `@slow`, `@negative`).  
- [ ] Smoke tests `--tags "@fast and @critical and not @flaky"` passam.  
- [ ] PR criado com inventário e tabela de ações.

---

Se deseja, eu:  
- A) atualizo `README.md`/índices automaticamente para apontar aos novos arquivos;  
- B) gero o PR draft com `cnpj-consolidation-inventory.md` e lista de alterações;  
- C) procedo com mover/escrever os `docs/` e `fixtures/` mencionados.

Indique A, B ou C (ou uma combinação).