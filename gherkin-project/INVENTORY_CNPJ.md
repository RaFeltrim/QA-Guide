**Inventário e Mapeamento de Features — CNPJ**

Visão geral

A suíte atual tem muitos arquivos individuais que testam variações de entrada (alfanumérico e numérico) e uma coleção de features que cobrem regras de negócio (validação, normalização, duplicidade, auditoria, integração). Aplicando a mentalidade de "manutenção de jardim", priorizei: reduzir duplicidade, consolidar variações triviais em Scenario Outlines parametrizados, manter features de negócio críticas com tags e mover material de referência/dados para `docs/` ou `fixtures/`.

Resumo das decisões principais

- Consolidar (MERGE) sequências numeradas em arquivos parametrizados para reduzir manutenção.
- Manter (KEEP) features de negócio (validação, duplicidade, auditoria, integração) com tags claras e exemplos representativos.
- Agrupar inputs inválidos/especiais em `cnpj_invalid_inputs.feature` para reduzir testes dispersos.
- Mover arquivos puramente de dados/brainstorm para `docs/` ou `fixtures/` (MOVE) e arquivar versões numeradas originais após consolidação.

Tabela de decisões por arquivo

| Arquivo | Ação | Justificativa | Sugestão de novo nome / destino |
|---|---:|---|---|
| cnpj_alfanumerico_01.feature … cnpj_alfanumerico_20.feature | MERGE | Variações pequenas e repetitivas sobre letras/palavras no sufixo; alto custo de manutenção. | `cnpj_alfanumerico.feature` (Scenario Outline com 6–8 exemplos representativos) |
| cnpj_numerico_01.feature … cnpj_numerico_05.feature | MERGE | Mesma razão: variações de zeros, canonicalização e tamanho. | `cnpj_numerico.feature` (Scenario Outline com 4–6 exemplos) |
| cnpj_validacao.feature | KEEP (refatorar) | Cobre regras críticas de negócio (DV, formato, tamanho). Já contém Outline — refinar tags e exemplos. | `cnpj_validacao.feature` (adicionar `@critical @fast` nos cenários essenciais) |
| cnpj_normalizacao.feature | KEEP (refatorar) | Normalização é suporte básico usado por outras regras — manter e garantir exemplos determinísticos. | `cnpj_normalizacao.feature` (adicionar `@fast`) |
| duplicidade.feature | KEEP | Requisito de negócio; possui Outline útil. | `duplicidade.feature` (`@critical @regression`) |
| auditoria.feature | KEEP | Importante para rastreabilidade e compliance. | `auditoria.feature` (`@regression @slow` se depender de DB) |
| integracao_consulta_externa.feature | KEEP (integration) | Testes de integração; marcar `@integration` e `@slow`. | `integracao_consulta_externa.feature` (`@integration @slow`) |
| empresa_cadastro.feature, empresa_consulta_api.feature | KEEP | Cobrem flows de cadastro/consulta que dependem de CNPJ; integrar cenários que dependem de normalização/validação. | manter com tags adequadas (`@critical` para cadastro) |
| cnpj_extrair_texto.md, cnpj_edge_cases.md, cnpj_lista_negra.md, cnpj_duplicado.md, cnpj_filial_0001.md, cnpj_formatacao_mascara.md, cnpj_canonicalizar_zeros.md, cnpj_caracteres_invalidos.md, cnpj_comprimento_invalido.md, cnpj_conhecido_invalido.md, cnpj_conhecido_valido.md, cnpj_alfanumerico_*.md, cnpj_numerico_*.md | MOVE (docs/fixtures) | Conteúdo majoritariamente data-driven / exemplos / brainstorm; não precisam ser arquivos de feature separados. | mover para `docs/cnpj/` ou `fixtures/cnpj/` e referenciar nas features; transformar somente casos com valor de negócio claro em cenários. |
| cnpj_validacao_dv.md | MOVE/KEEP como fixture | Pode virar dataset de exemplos para `cnpj_validacao.feature`. | `fixtures/cnpj/dv_examples.csv` |
| arquivos numerados consolidados (originais) | ARCHIVE | Após consolidação, mover os arquivos originais para `gherkin-project/archive/` por 30 dias antes de remoção. | `gherkin-project/archive/` |

Critérios para escolher exemplos representativos

- Para `cnpj_alfanumerico.feature`: manter 1 exemplo com letra aceita no sufixo, 1 com letra em posição inválida, 1 com símbolos especiais, 1 com mistura alfanumérica aparentemente válida mas com DV inválido, 1 com espaços/padding. (Total 4–6 exemplos)
- Para `cnpj_numerico.feature`: manter 1 CNPJ corretamente formatado, 1 com zeros à esquerda que precisam ser canonicalizados, 1 com tamanho inválido curto, 1 com DV inválido, 1 com 14 dígitos válidos já normalizados. (Total 4–5 exemplos)
- Nos outlines, priorizar exemplos que representam falhas reais observadas ou que já causaram bugs em produção.

Sugestões de tags e execução

- Tags propostas: `@critical`, `@fast`, `@regression`, `@integration`, `@slow`, `@negative`, `@flaky`, `@wip`.
- Execução típica PR: `--tags "@fast and @critical and not @flaky"`
- Execução pipeline completa: `--tags "not @wip"` (pipeline paralelo roda `@integration` em job separado)

Exemplos de arquivos parametrizados a criar

- `cnpj_alfanumerico.feature` — Scenario Outline com exemplos representativos (veja arquivo `templates/cnpj_alfanumerico.example.feature` proposto).
- `cnpj_numerico.feature` — Scenario Outline consolidado.

Plano de refatoração passo a passo (ordem segura)

1) Criar `cnpj_alfanumerico.feature` parametrizado com exemplos mapeados (não deletar originais).
2) Criar `cnpj_numerico.feature` parametrizado.
3) Atualizar `cnpj_validacao.feature` e `cnpj_normalizacao.feature` com tags (`@critical`, `@fast`) e mover exemplos duplicados aos outlines consolidados.
4) Rodar suíte `@fast` localmente para validar passos (busca por fail/flake).
5) Mover arquivos originais consolidados para `gherkin-project/archive/` e adicionar `ARCHIVE` header com link para consolidado.
6) Mover documentos/brainstorm para `docs/cnpj/` ou `fixtures/cnpj/` com README explicando datasets.
7) Abrir PR com diffs e mapping (cada exemplo do Outline tem comentário indicando de qual arquivo original foi extraído).
8) Marcar qualquer cenário com histórico de instabilidade como `@flaky` e anexar ticket de investigação.

Checklist de aceitação (o que revisar após aplicar mudanças)

- [ ] `cnpj_alfanumerico.feature` criado e cobre os exemplos dos arquivos numerados.
- [ ] `cnpj_numerico.feature` criado e cobre os exemplos dos arquivos numerados.
- [ ] Arquivos consolidados movidos para `gherkin-project/archive/` com notas.
- [ ] `cnpj_validacao.feature` e `cnpj_normalizacao.feature` têm tags aplicadas e não duplicam casos consolidados.
- [ ] Dados e brainstorm movidos para `docs/cnpj/` ou `fixtures/cnpj/`.
- [ ] Scripts/CI ajustados para rodar `@integration` separadamente.
- [ ] PR com mapeamento de exemplos aberto e aprovado.

Registro do processo de inventário (como eu mapeei)

1) Listei os arquivos da pasta `features/` e identifiquei padrões por nome (arquivos numerados, features com foco em regra de negócio, arquivos .md com dados).
2) Li amostras representativas (`cnpj_alfanumerico_01`, `cnpj_alfanumerico_05`, `cnpj_numerico_01`, `cnpj_validacao.feature`, `cnpj_normalizacao.feature`, `duplicidade.feature`, `integracao_consulta_externa.feature`) para confirmar conteúdo e identificar over-testing (muitos arquivos com pequenas variações de entrada).
3) Para cada grupo numerado, decidi consolidar em Outline parametrizado — justificativa: reduzir custo passivo e melhorar manutenção sem perda de cobertura.
4) Para features de negócio, mantive-as e sugeri tags e pequenos refinamentos (ex.: mover dados para fixtures, usar Examples para variações relevantes).
5) Para arquivos .md de dados/edge-cases, classifiquei como `docs/fixtures` para não virar teste automático sem critério de valor.

Próximos passos sugeridos (posso executar)

- Gerar `cnpj_alfanumerico.feature` e `cnpj_numerico.feature` com exemplos. (Posso criar agora e colocar os originais em `archive/` em seguida.)
- Criar `docs/cnpj/` e mover arquivos .md que são referência.

Se aprovar, eu crio os arquivos parametrizados agora e abro um patch que mostra o mapeamento entre exemplos e arquivos originais.
