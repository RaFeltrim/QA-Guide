README - Fixtures de CNPJ

Este diretório contém fixtures usadas pelos outlines consolidados de CNPJ.

Arquivo principal:
- `examples.csv` — colunas: `example_id,group,input,expected,origin_note`.

Uso e rastreabilidade:
- Os `example_id` correspondem aos exemplos referenciados nos `*_mapping.md`.
- Ao abrir o PR com as consolidacoes, inclua também um `mapping.csv` (colunas: `arquivo_origem,exemplo_row`) gerado a partir deste `examples.csv` para facilitar revisão e roll-back.

Localização dos mappings relacionados:
- `cnpj_alfanumerico_mapping.md`
- `cnpj_numerico_mapping.md`
- `cnpj_invalid_inputs_mapping.md`

Recomendações:
- Mantenha este arquivo e `examples.csv` até a aprovação do PR e arquivamento final dos arquivos originais.
