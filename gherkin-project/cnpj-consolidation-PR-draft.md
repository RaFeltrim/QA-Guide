# PR Draft: Consolidação de CNPJ (cnpj_alfanumerico + cnpj_numerico)

Data: 2025-12-22

Resumo:
- Consolidada a suíte CNPJ em duas features canônicas: `features/cnpj_alfanumerico.feature` e `features/cnpj_numerico.feature`.
- Arquivados os arquivos numerados (`cnpj_alfanumerico_01..20`, `cnpj_numerico_01..05`) em `gherkin-project/archive/` com cabeçalho `<!-- ARCHIVE: substituído por ... em YYYY-MM-DD -->`.
- Criados `docs/cnpj/` com mapeamentos e `fixtures/cnpj/examples.csv` com exemplos representativos.

O que foi alterado (resumo):
- Novos: `docs/cnpj/cnpj_alfanumerico_mapping.md`, `docs/cnpj/cnpj_numerico_mapping.md`, `docs/cnpj/cnpj_edge_cases.md`.
- Novos fixtures: `fixtures/cnpj/examples.csv`, `fixtures/cnpj/cnpj_lista_negra.md`.
- Arquivos arquivados: todos `cnpj_alfanumerico_01..20` e `cnpj_numerico_01..05` (ver `cnpj-consolidation-inventory.md`).
- Atualização: `REVIEW_CNPJ_TESTS.md` (tabela de decisões e plano de execução).

Motivação:
- Reduzir ruído e custo passivo de manutenção. Consolidar testes repetitivos em Scenario Outlines com exemplos representativos. Manter dados extensos como fixtures/documentação.

Como revisar:
1. Verificar `features/cnpj_alfanumerico.feature` e `features/cnpj_numerico.feature` (cenários e Examples).  
2. Validar `fixtures/cnpj/examples.csv` — o time de negócio confirma que os exemplos representam o valor de negócio.  
3. Abrir `gherkin-project/REVIEW_CNPJ_TESTS.md` para ver a tabela completa de ações e justificativas.

Checklist antes do merge:
- [ ] `@critical` e `@fast` aplicados nas features críticas.  
- [ ] Smoke tests `npx cucumber-js --tags "@fast and @critical and not @flaky"` passam.  
- [ ] Step definitions compatíveis com os Scenario Outlines (ajustar `step_definitions_clean/cnpj.steps.ts` se necessário).

Notas técnicas:
- Arquivos originais arquivados em `gherkin-project/archive/` (não deletados).  
- Se for necessário reverter um exemplo, transcrever do `archive/` para `fixtures/cnpj/examples.csv` e reintroduzir no Scenario Outline.
