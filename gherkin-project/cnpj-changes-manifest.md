# Manifesto de alterações — Consolidação CNPJ (resumo)

Data: 2025-12-22

## Atualizações aplicadas (resumo de ações executadas)

- 2025-12-22: Movidos vários arquivos `*.md` que estavam em `features/` para `docs/cnpj/` (mapeamentos, edge cases e notas de brainstorming).
- 2025-12-22: Movidas features numeradas (`cnpj_alfanumerico_*`, `cnpj_numerico_*`) para `archive/` quando aplicável.
- 2025-12-22: Criados `docs/cnpj/*` mapeamentos e `fixtures/cnpj/examples.csv` como fixtures consolidadas.
- 2025-12-22: Restauradas para `features/` as features críticas: `cnpj_validacao.feature`, `cnpj_normalizacao.feature`, `cnpj_invalid_inputs.feature` (foram temporariamente arquivadas e voltaram ao diretório `features/` para permanecer canônicas).

Observação: commits foram gerados refletindo estas alterações; consulte o histórico Git para detalhes (`git log -- grep cnpj`).

Resumo: lista consolidada de arquivos criados/modificados/arquivados como parte da iniciativa de limpeza e canonicalização da suíte CNPJ.

**Features (principais arquivos canônicos e arquivos numerados preservados/arquivados)**

- features/cnpj_alfanumerico.feature — novo canonical feature (Outline)
- features/cnpj_numerico.feature — novo canonical feature (Outline)
- features/cnpj_validacao.feature — consolidado (mantido cenários de DV e caminho feliz)
- features/cnpj_normalizacao.feature
- features/cnpj_invalid_inputs.feature
- features/cnpj_alfanumerico_01.feature ... cnpj_alfanumerico_20.feature — numerados existentes (alguns mantidos em `features/` como histórico)
- features/cnpj_numerico_01.feature ... cnpj_numerico_05.feature
- features/* (diversos auxiliares: auditoria.feature, seguranca.feature, integracao_consulta_externa.feature, empresa_consulta_api.feature, empresa_cadastro.feature, duplicidade.feature)

**Arquivos arquivados** (`gherkin-project/archive/`)

- archive/ARCHIVE_README.md
- archive/cnpj_alfanumerico_01.feature ... cnpj_alfanumerico_20.feature (e correspondentes `.md` provenance)
- archive/cnpj_numerico_01.feature ... cnpj_numerico_05.feature (e `.md`)
- archive/*.md (mapeamentos e notas: cnpj_edge_cases.md, cnpj_lista_negra.md, cnpj_validacao.md, etc.)

**Docs e mapping** (`gherkin-project/docs/cnpj/`)

- docs/cnpj/cnpj_alfanumerico_mapping.md
- docs/cnpj/cnpj_numerico_mapping.md
- docs/cnpj/cnpj_edge_cases.md
- docs/cnpj/MOVED_FILES.md
- docs/cnpj/FLAKY_REPORT.md
- docs/cnpj/* (vários arquivos de justificativa e mapeamento relacionados)

**Fixtures** (`gherkin-project/fixtures/cnpj/`)

- fixtures/cnpj/examples.csv
- fixtures/cnpj/mapping.csv
- fixtures/cnpj/cnpj_lista_negra.md
- fixtures/cnpj/README.md

**Step definitions e suportes**

- step_definitions_clean/cnpj.steps.ts — atualizado (adicionados Givens/Thens e canonicalização)
- step_definitions_clean/hooks.steps.ts — presente (hooks de teste)
- support/services/cnpj.service.ts — alterado (adicionado `canonicalize`, ajustes em `normalize` e `validate`)
- support/world.ts — adicionado `lastCanonical`
- support/fixtures/*.json — fixtures de validação (cnpjs_validos/invalidos)

**Metadocs e PR**

- cnpj-consolidation-inventory.md — inventário criado
- cnpj-consolidation-PR-draft.md — rascunho de PR com mudanças descritas
- REVIEW_CNPJ_TESTS.md — notas de revisão e checklist
- cnpj-changes-manifest.md — ESTE ARQUIVO (resumo para revisão)

---

Observações importantes:
- A validação foi ajustada para aceitar sufixos alfanuméricos no segundo dígito verificador quando appropriate (regras documentadas em `docs/cnpj/cnpj_alfanumerico_mapping.md`).
- Muitos arquivos originais foram movidos para `archive/` com headers de provenance para auditoria.
- Testes smoke foram executados com `npm run test -- --tags "@fast and @critical and not @flaky"` usando `ts-node/register` e steps TypeScript; ajustes necessários em `support` e `steps` foram aplicados para que todos os cenários smoke passassem.

Se quiser, eu posso:
- Gerar um diff Git com todos os arquivos alterados (patch unificado) e salvá-lo em `gherkin-project/cnpj-changes.patch`.
- Criar uma branch e commitar as alterações automaticamente.
- Exportar uma lista detalhada CSV com colunas `path,type,notes` para auditoria.
