Arquivos movidos/copied para `docs/cnpj/`

Estes arquivos foram copiados de `features/` para `docs/cnpj/` como parte da reorganização para separar dados/brainstorm dos arquivos de feature executáveis.

Lista (origem -> destino):
- features/auditoria.md -> docs/cnpj/auditoria.md
- features/cnpj_alfanumerico_01.md -> docs/cnpj/cnpj_alfanumerico_01.md
- features/cnpj_alfanumerico_02.md -> docs/cnpj/cnpj_alfanumerico_02.md
- features/cnpj_alfanumerico_03.md -> docs/cnpj/cnpj_alfanumerico_03.md
- features/cnpj_alfanumerico_04.md -> docs/cnpj/cnpj_alfanumerico_04.md
- features/cnpj_alfanumerico_05.md -> docs/cnpj/cnpj_alfanumerico_05.md
- features/cnpj_alfanumerico_06.md -> docs/cnpj/cnpj_alfanumerico_06.md
- features/cnpj_alfanumerico_07.md -> docs/cnpj/cnpj_alfanumerico_07.md
- features/cnpj_alfanumerico_08.md -> docs/cnpj/cnpj_alfanumerico_08.md
- features/cnpj_alfanumerico_09.md -> docs/cnpj/cnpj_alfanumerico_09.md
- features/cnpj_alfanumerico_10.md -> docs/cnpj/cnpj_alfanumerico_10.md
- features/cnpj_alfanumerico_11.md -> docs/cnpj/cnpj_alfanumerico_11.md
- features/cnpj_alfanumerico_12.md -> docs/cnpj/cnpj_alfanumerico_12.md
- features/cnpj_alfanumerico_13.md -> docs/cnpj/cnpj_alfanumerico_13.md
- features/cnpj_alfanumerico_14.md -> docs/cnpj/cnpj_alfanumerico_14.md
- features/cnpj_alfanumerico_15.md -> docs/cnpj/cnpj_alfanumerico_15.md
- features/cnpj_alfanumerico_16.md -> docs/cnpj/cnpj_alfanumerico_16.md
- features/cnpj_alfanumerico_17.md -> docs/cnpj/cnpj_alfanumerico_17.md
- features/cnpj_alfanumerico_18.md -> docs/cnpj/cnpj_alfanumerico_18.md
- features/cnpj_alfanumerico_19.md -> docs/cnpj/cnpj_alfanumerico_19.md
- features/cnpj_alfanumerico_20.md -> docs/cnpj/cnpj_alfanumerico_20.md
- features/cnpj_canonicalizar_zeros.md -> docs/cnpj/cnpj_canonicalizar_zeros.md
- features/cnpj_caracteres_invalidos.md -> docs/cnpj/cnpj_caracteres_invalidos.md
- features/cnpj_comprimento_invalido.md -> docs/cnpj/cnpj_comprimento_invalido.md
- features/cnpj_conhecido_invalido.md -> docs/cnpj/cnpj_conhecido_invalido.md
- features/cnpj_conhecido_valido.md -> docs/cnpj/cnpj_conhecido_valido.md
- features/cnpj_duplicado.md -> docs/cnpj/cnpj_duplicado.md
- features/cnpj_edge_cases.md -> docs/cnpj/cnpj_edge_cases.md
- features/cnpj_extrair_texto.md -> docs/cnpj/cnpj_extrair_texto.md
- features/cnpj_filial_0001.md -> docs/cnpj/cnpj_filial_0001.md
- features/cnpj_formatacao_mascara.md -> docs/cnpj/cnpj_formatacao_mascara.md
- features/cnpj_lista_negra.md -> docs/cnpj/cnpj_lista_negra.md
- features/cnpj_normalizacao.md -> docs/cnpj/cnpj_normalizacao.md
- features/cnpj_numerico_01.md -> docs/cnpj/cnpj_numerico_01.md
- features/cnpj_numerico_02.md -> docs/cnpj/cnpj_numerico_02.md
- features/cnpj_numerico_03.md -> docs/cnpj/cnpj_numerico_03.md
- features/cnpj_numerico_04.md -> docs/cnpj/cnpj_numerico_04.md
- features/cnpj_numerico_05.md -> docs/cnpj/cnpj_numerico_05.md
- features/cnpj_numerico_06.md -> docs/cnpj/cnpj_numerico_06.md
- features/cnpj_numerico_07.md -> docs/cnpj/cnpj_numerico_07.md
- features/cnpj_numerico_08.md -> docs/cnpj/cnpj_numerico_08.md
- features/cnpj_numerico_09.md -> docs/cnpj/cnpj_numerico_09.md
- features/cnpj_numerico_10.md -> docs/cnpj/cnpj_numerico_10.md
- features/cnpj_validacao.md -> docs/cnpj/cnpj_validacao.md
- features/cnpj_validacao_dv.md -> docs/cnpj/cnpj_validacao_dv.md
- features/duplicidade.md -> docs/cnpj/duplicidade.md
- features/empresa_cadastro.md -> docs/cnpj/empresa_cadastro.md
- features/empresa_consulta_api.md -> docs/cnpj/empresa_consulta_api.md
- features/integracao_consulta_externa.md -> docs/cnpj/integracao_consulta_externa.md
- features/seguranca.md -> docs/cnpj/seguranca.md

Próximos passos recomendados:
1) Revisar `docs/cnpj/` e confirmar que os arquivos de referência não precisam ser executáveis.
2) Se aprovado, mover/arquivar os arquivos `.md` antigos em `features/` para `gherkin-project/archive/` (manual ou via PR automatizada).
3) Atualizar CI para ignorar `features/*.md` (se aplicável) ou remover arquivos residuais.

Observação: mantive todos os `.feature` executáveis em `features/` (incluindo os novos `cnpj_alfanumerico.feature`, `cnpj_numerico.feature`, `cnpj_invalid_inputs.feature`).
