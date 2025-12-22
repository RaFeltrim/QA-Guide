```markdown
Mapeamento: `cnpj_alfanumerico.feature` — exemplos para origem

Este arquivo relaciona cada exemplo presente em `features/cnpj_alfanumerico.feature` aos arquivos originais numerados e justifica a escolha.

1) Exemplo: entrada = "12.345.678/0001-9A"
   - Origem: `features/cnpj_alfanumerico_01.feature`
   - Justificativa: representa letra no sufixo preservada durante normalização; caso comum em fontes que adicionam sufixos.

2) Exemplo: entrada = "12.345.678/0001-A5"
   - Origem: `features/cnpj_alfanumerico_01.feature`
   - Justificativa: letra inserida em posição de DV inválida — cobre validação negativa específica.

3) Exemplo: entrada = "12.345.678/0001-9@A"
   - Origem: `features/cnpj_alfanumerico_05.feature`
   - Justificativa: símbolo inválido dentro da sequência — uso para detectar caracteres proibidos.

4) Exemplo: entrada = "  12.345.678/0001-95  "
   - Origem: amostra combinada (vários arquivos numerados que testavam trim/espacos)
   - Justificativa: garante trim/normalização de espaços laterais.

5) Exemplo: entrada = "0012345678000195"
   - Origem: casos numéricos relacionados (cnpj_numerico_*); incluído para garantir interação entre canonicalização e alfanumérico.
   - Justificativa: cobre zeros à esquerda e canonicalização na mesma suíte consolidada.

6) Exemplo: entrada = "12.345.678/0001-00"
   - Origem: casos de DV incorreto (vários arquivos de validação)
   - Justificativa: garante que a validação de dígitos verificadores continue sendo testada no Outline.

Notas de implementação

Fixtures
- Arquivo de fixtures consolidado: `fixtures/cnpj/examples.csv`
- O CSV contém as colunas: `example_id,group,input,expected,origin_note` e inclui todas as entradas usadas no Outline para rastreabilidade.
- Para o PR: gere um `mapping.csv` (colunas: `arquivo_origem,exemplo_row`) a partir deste `examples.csv` e inclua-o no commit para facilitar revisão e rollback.

```
Mapeamento: `cnpj_alfanumerico.feature` — exemplos para origem

Este arquivo relaciona cada exemplo presente em `features/cnpj_alfanumerico.feature` aos arquivos originais numerados e justifica a escolha.

1) Exemplo: entrada = "12.345.678/0001-9A"
   - Origem: `features/cnpj_alfanumerico_01.feature`
   - Justificativa: representa letra no sufixo preservada durante normalização; caso comum em fontes que adicionam sufixos.

2) Exemplo: entrada = "12.345.678/0001-A5"
   - Origem: `features/cnpj_alfanumerico_01.feature`
   - Justificativa: letra inserida em posição de DV inválida — cobre validação negativa específica.

3) Exemplo: entrada = "12.345.678/0001-9@A"
   - Origem: `features/cnpj_alfanumerico_05.feature`
   - Justificativa: símbolo inválido dentro da sequência — uso para detectar caracteres proibidos.

4) Exemplo: entrada = "  12.345.678/0001-95  "
   - Origem: amostra combinada (vários arquivos numerados que testavam trim/espacos)
   - Justificativa: garante trim/normalização de espaços laterais.

5) Exemplo: entrada = "0012345678000195"
   - Origem: casos numéricos relacionados (cnpj_numerico_*); incluído para garantir interação entre canonicalização e alfanumérico.
   - Justificativa: cobre zeros à esquerda e canonicalização na mesma suíte consolidada.

6) Exemplo: entrada = "12.345.678/0001-00"
   - Origem: casos de DV incorreto (vários arquivos de validação)
   - Justificativa: garante que a validação de dígitos verificadores continue sendo testada no Outline.

Notas de implementação

Fixtures
- Arquivo de fixtures consolidado: `fixtures/cnpj/examples.csv`
- O CSV contém as colunas: `example_id,group,input,expected,origin_note` e inclui todas as entradas usadas no Outline para rastreabilidade.
- Para o PR: gere um `mapping.csv` (colunas: `arquivo_origem,exemplo_row`) a partir deste `examples.csv` e inclua-o no commit para facilitar revisão e rollback.
