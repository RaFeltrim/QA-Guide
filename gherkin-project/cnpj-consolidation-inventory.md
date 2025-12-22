# CNPJ Consolidation Inventory

Data: 2025-12-22

Esse inventário lista arquivos relacionados a CNPJ detectados no repositório, agrupados por tipo. Use este arquivo como referência antes de consolidar/mergear.

## Resumo rápido
- Total de itens encontrados: 200 (inclui docs, features, fixtures, arquivos em archive/)
- Grupos principais: features numeradas `cnpj_alfanumerico_*`, features numeradas `cnpj_numerico_*`, docs/mappings (`*_mapping.md`), fixtures (`*.json`, `*.csv`), arquivos já em `archive/`.

---

## Features numeradas (alfanumérico)
Esses arquivos aparecem em `gherkin-project/features/` e `gherkin-project/archive/`.

- features/cnpj_alfanumerico_01.feature
- features/cnpj_alfanumerico_02.feature
- features/cnpj_alfanumerico_03.feature
- features/cnpj_alfanumerico_04.feature
- features/cnpj_alfanumerico_05.feature
- features/cnpj_alfanumerico_06.feature
- features/cnpj_alfanumerico_07.feature
- features/cnpj_alfanumerico_08.feature
- features/cnpj_alfanumerico_09.feature
- features/cnpj_alfanumerico_10.feature
- features/cnpj_alfanumerico_11.feature
- features/cnpj_alfanumerico_12.feature
- features/cnpj_alfanumerico_13.feature
- features/cnpj_alfanumerico_14.feature
- features/cnpj_alfanumerico_15.feature
- features/cnpj_alfanumerico_16.feature
- features/cnpj_alfanumerico_17.feature
- features/cnpj_alfanumerico_18.feature
- features/cnpj_alfanumerico_19.feature
- features/cnpj_alfanumerico_20.feature
- features/cnpj_alfanumerico.feature (possível consolidado já presente)

Arquivos em `archive/` relacionados:
- archive/cnpj_alfanumerico_01.feature
- archive/cnpj_alfanumerico_02.feature
- archive/cnpj_alfanumerico_03.feature
- archive/cnpj_alfanumerico_04.feature
- archive/cnpj_alfanumerico_05.feature
- archive/cnpj_alfanumerico_06.feature
- archive/cnpj_alfanumerico_07.feature
- archive/cnpj_alfanumerico_08.feature
- archive/cnpj_alfanumerico_09.feature
- archive/cnpj_alfanumerico_10.feature
- archive/cnpj_alfanumerico_11.feature
- archive/cnpj_alfanumerico_12.feature
- archive/cnpj_alfanumerico_13.feature
- archive/cnpj_alfanumerico_14.feature
- archive/cnpj_alfanumerico_15.feature
- archive/cnpj_alfanumerico_16.feature
- archive/cnpj_alfanumerico_17.feature
- archive/cnpj_alfanumerico_18.feature
- archive/cnpj_alfanumerico_19.feature
- archive/cnpj_alfanumerico_20.feature

---

## Features numeradas (numérico)
- features/cnpj_numerico_01.feature
- features/cnpj_numerico_02.feature
- features/cnpj_numerico_03.feature
- features/cnpj_numerico_04.feature
- features/cnpj_numerico_05.feature
- features/cnpj_numerico.feature (consolidado existente)

Arquivos em `archive/` relacionados:
- archive/cnpj_numerico_01.feature
- archive/cnpj_numerico_02.feature
- archive/cnpj_numerico_03.feature
- archive/cnpj_numerico_04.feature
- archive/cnpj_numerico_05.feature

---

## Features / Docs únicas de negócio (KEEP candidates)
- features/cnpj_validacao.feature
- features/cnpj_normalizacao.feature
- features/duplicidade.feature (ou cnpj_duplicado.md)
- features/auditoria.feature
- features/integracao_consulta_externa.feature
- features/cnpj_validacao_dv.md
- features/cnpj_validacao.md

---

## Mappings / Data / Fixtures (mover para fixtures/ ou docs/)
- cnpj_alfanumerico_mapping.md
- cnpj_numerico_mapping.md
- cnpj_invalid_inputs_mapping.md
- features/cnpj_edge_cases.md
- features/cnpj_lista_negra.md
- support/fixtures/cnpjs_validos.json
- support/fixtures/cnpjs_invalidos.json
- en/fixtures/cnpj-validos.json
- en/fixtures/cnpj-invalidos.json
- pt-br/fixtures/cnpj-validos.json
- pt-br/fixtures/cnpj-invalidos.json
- pt-br/fixtures/cnpjs.csv

---

## Step definitions / services / helpers
- step_definitions_clean/cnpj.steps.ts
- step_definitions_archived/cnpj.steps.ts
- support/services/cnpj.service.ts
- en/gabarito/exemplos_codigo/validador-cnpj.py (exemplos) 
- pt-br/gabarito/exemplos-codigo/validador-cnpj.py

---

## Observações e próximos passos sugeridos
1. Parece haver um `features/cnpj_alfanumerico.feature` e `features/cnpj_numerico.feature` já presentes — revisar conteúdo para decidir se servem como consolidado final.  
2. Recomendo: criar `gherkin-project/features/cnpj_alfanumerico.feature` e `.../cnpj_numerico.feature` oficiais (se não forem válidos os atuais), mover os numerados para `archive/` com cabeçalho `<!-- ARCHIVE: substituído por ... em YYYY-MM-DD -->`.  
3. Mover todos os arquivos de mapping/edge_cases para `gherkin-project/fixtures/` ou `gherkin-project/docs/cnpj/` conforme uso.  


Arquivo gerado automaticamente por auditoria rápida em 2025-12-22.
## Decisões sugeridas (detalhado)
Abaixo uma tabela prática com ações recomendadas para aplicar imediatamente. Priorize os itens marcados como MERGE ou ARCHIVE primeiro.

| Arquivo | Ação | Justificativa | Novo caminho / Observação |
|---|---:|---|---|
| `features/cnpj_alfanumerico_*.feature` | MERGE | Alto ruído: muitas variações com mesmo comportamento | Consolidar em `features/cnpj_alfanumerico.feature`; mover originais para `archive/` |
| `features/cnpj_numerico_*.feature` | MERGE | Redundância de exemplos numéricos | Consolidar em `features/cnpj_numerico.feature` |
| `features/cnpj_alfanumerico.feature` | REVIEW/KEEP | Possível consolidado existente — validar conteúdo | Se OK, marcar como canonical; se não, substituir pela versão gerada |
| `features/cnpj_numerico.feature` | REVIEW/KEEP | Mesmo que acima | Revisar Examples e Background |
| `features/cnpj_validacao.feature` | KEEP/REFACTOR | Regra de negócio crítica (checksum, formato) | Parametrizar com Scenario Outline; tag `@critical @fast` |
| `features/cnpj_normalizacao.feature` | KEEP/REFACTOR | Importante para fluxo de ingestão | Remover detalhes técnicos e dividir cenários grandes; tag `@critical` |
| `features/cnpj_invalid_inputs.feature` | MERGE | Casos inválidos espalhados por várias features | Extrair exemplos representativos para `cnpj_alfanumerico`/`cnpj_numerico`; mover restante para `fixtures/` |
| `features/cnpj_edge_cases.md` | MOVE → docs/fixtures | Brainstorm/lista extensa de inputs | `docs/cnpj/cnpj_edge_cases.md` (não executar) |
| `features/cnpj_lista_negra.md` | MOVE → fixtures | Lista de blacklist — serve como fixture | `fixtures/cnpj_lista_negra.md` |
| `cnpj_alfanumerico_mapping.md` | MOVE → docs/fixtures | Mapping valioso para referência | `docs/cnpj/cnpj_alfanumerico_mapping.md` |
| `cnpj_numerico_mapping.md` | MOVE → docs/fixtures | Mesma ação | `docs/cnpj/cnpj_numerico_mapping.md` |
| `cnpj_invalid_inputs_mapping.md` | MOVE → fixtures | Dados de testes inválidos | `fixtures/cnpj_invalid_inputs.md` |
| `support/fixtures/cnpjs_validos.json` | KEEP (fixture) | Fonte de dados para testes parametrizados | Manter em `support/fixtures/` |
| `support/fixtures/cnpjs_invalidos.json` | KEEP (fixture) | Fonte de negativos | Manter em `support/fixtures/` |
| `step_definitions_clean/cnpj.steps.ts` | KEEP | Implementação atual dos steps | Ajustar para novos Scenario Outlines se necessário |
| `step_definitions_archived/cnpj.steps.ts` | ARCHIVE | Versão obsoleta | Permanecer em `archive/` com cabeçalho de origem |
| `archive/*` | KEEP | Histórico — não remover sem política | Garantir cabeçalho `<!-- ARCHIVE: substituído por <novo> em YYYY-MM-DD -->` |

### Critérios rápidos para Examples
- Válidos: 1–2 exemplos (com máscara e limpo).  
- Inválidos: 2 exemplos que representem classes diferentes de erro (caractere inválido, checksum errado/zeros repetidos).  
- Não adicionar grandes listas de números que não mudam a regra.

### Tags recomendadas
- `@critical` — regras de negócio essenciais (validação/normalização).  
- `@fast` — execução rápida, unit-like.  
- `@integration` / `@slow` — testes que tocam DB ou serviços externos.  
- `@negative` — cenários de entradas inválidas.  
- `@flaky` — marcar para investigar ou isolar.  
- `@wip` — trabalho em andamento.

### Passos imediatos sugeridos
1. Criar `features/cnpj_alfanumerico.feature` e `features/cnpj_numerico.feature` com Scenario Outlines mínimos.  
2. Revisar `features/cnpj_alfanumerico.feature` existente — usar como base se estiver completo.  
3. Mover arquivos numerados obsoletos para `archive/` adicionando cabeçalho `<!-- ARCHIVE: substituído por <novo_caminho> em YYYY-MM-DD -->`.  
4. Mover mappings/edge_cases para `docs/cnpj/` ou `fixtures/`.  
5. Atualizar `README.md`/índices apontando para os novos arquivos canonical.

---

Arquivo atualizado em 2025-12-22 por auditoria automatizada.
