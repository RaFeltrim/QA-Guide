```markdown
Mapeamento: `cnpj_numerico.feature` — exemplos para origem

Este arquivo relaciona cada exemplo presente em `features/cnpj_numerico.feature` aos arquivos originais numerados e justifica a escolha.

1) Exemplo: entrada = "0012345678000195"
   - Origem: `features/cnpj_numerico_01.feature`
   - Justificativa: representa zeros à esquerda que devem ser canonicalizados; caso comum em integrações que recebem dados sem formatação.

2) Exemplo: entrada = "012345678000195"
   - Origem: `features/cnpj_numerico_02.feature`
   - Justificativa: garante preservação de 14 dígitos válidos quando já presentes, e testa idempotência da canonicalização.

3) Exemplo: entrada = "12345678"
   - Origem: `features/cnpj_numerico_03.feature`
   - Justificativa: caso de tamanho muito curto; considerado custo de manutenção se replicado muitas vezes — mantido como exemplo negativo.

4) Exemplo: entrada = "12.345.678/0001-00"
   - Origem: casos de DV incorreto (vários arquivos de validação)
   - Justificativa: garante que a validação de dígitos verificadores continue sendo testada no Outline.

5) Exemplo: entrada = "12345678000195"
   - Origem: amostra consolidada (caminho feliz, já normalizado)
   - Justificativa: garante execução do fluxo quando a entrada já está na forma canonicalizada.

Notas de implementação

Fixtures
- Arquivo de fixtures consolidado: `fixtures/cnpj/examples.csv`
- O CSV contém as colunas: `example_id,group,input,expected,origin_note` e inclui todas as entradas usadas no Outline para rastreabilidade.

```
Mapeamento: `cnpj_numerico.feature` — exemplos para origem

Este arquivo relaciona cada exemplo presente em `features/cnpj_numerico.feature` aos arquivos originais numerados e justifica a escolha.

1) Exemplo: entrada = "0012345678000195"
   - Origem: `features/cnpj_numerico_01.feature`
   - Justificativa: representa zeros à esquerda que devem ser canonicalizados; caso comum em integrações que recebem dados sem formatação.

2) Exemplo: entrada = "012345678000195"
   - Origem: `features/cnpj_numerico_02.feature`
   - Justificativa: garante preservação de 14 dígitos válidos quando já presentes, e testa idempotência da canonicalização.

3) Exemplo: entrada = "12345678"
   - Origem: `features/cnpj_numerico_03.feature`
   - Justificativa: caso de tamanho muito curto; considerado custo de manutenção se replicado muitas vezes — mantido como exemplo negativo.

4) Exemplo: entrada = "12.345.678/0001-00"
   - Origem: casos de DV incorreto (vários arquivos de validação)
   - Justificativa: garante que a validação de dígitos verificadores continue sendo testada no Outline.

5) Exemplo: entrada = "12345678000195"
   - Origem: amostra consolidada (caminho feliz, já normalizado)
   - Justificativa: garante execução do fluxo quando a entrada já está na forma canonicalizada.

Notas de implementação

Fixtures
- Arquivo de fixtures consolidado: `fixtures/cnpj/examples.csv`
- O CSV contém as colunas: `example_id,group,input,expected,origin_note` e inclui todas as entradas usadas no Outline para rastreabilidade.
- Para o PR: gere um `mapping.csv` (colunas: `arquivo_origem,exemplo_row`) a partir deste `examples.csv` e inclua-o no commit para facilitar revisão e rollback.
