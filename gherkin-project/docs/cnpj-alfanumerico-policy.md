## Política de Variantes Alfanuméricas para CNPJ

Objetivo: documentar regras de normalização, validação e armazenamento para variantes que contêm letras.

- **Normalização (`normalize`)**: remove espaços e pontuação, converte para maiúsculas e preserva letras e dígitos. Ex.: `12.345.678/0001-9a` -> `1234567800019A`.

- **Canonicalização (`canonicalize`)**: produz a forma usada para armazenamento/lookup. Por padrão preserva letras; se a política `strip_letters` estiver habilitada, letras podem ser removidas antes do armazenamento.

- **Política `acceptAlfanumerico`**:
  - Tipo: boolean (opção passada a `validate`).
  - Comportamento: quando `true` permite variantes alfanuméricas *apenas* no segundo dígito verificador (DV2, última posição). Quando `false` qualquer letra numa posição numérica torna a entrada inválida.
  - Valor padrão no código atual: `true` (aceita sufixos alfanuméricos controlados).

- **Posições permitidas para letras**:
  - Somente o DV2 (índice 13, 14º caractere) pode ser alfanumérico quando `acceptAlfanumerico=true`.
  - DV1 (13º caractere / índice 12) deve ser sempre dígito.
  - Letras em qualquer outra posição são tratadas como `caracter_invalido`.

- **Letras aceitas no DV2**: por compatibilidade e segurança, apenas as letras documentadas são aceitas (implementação atual permite apenas `A` e `B`). Letras diferentes resultam em `caracter_invalido` quando `acceptAlfanumerico=true`.

- **Validação de dígitos verificadores**:
  - Se DV2 for numérico, é validado por checksum como o CNPJ numérico tradicional.
  - Se DV2 for uma letra permitida e `acceptAlfanumerico=true`, a verificação de checksum é ignorada para o DV2 (aceitação baseada na política).

- **Lista negra / sequences triviais**: sequências óbvias (ex.: `00...00`, `11...11`) são tratadas como `lista_negra` e rejeitadas independentemente de outras políticas.

- **Migração / Mapeamento (`applyMigration`)**:
  - Deve haver um mapa explícito para cada letra usada (ex.: `A -> 10`) quando for necessário converter variantes alfanuméricas para sistemas que aceitam apenas dígitos.
  - Ausência de mapa para qualquer letra usada resulta em `mapa ausente`.

- **Logs de depuração**: logs de validação foram condicionados à variável de ambiente `CNPJ_DEBUG=true`. Não habilitar em ambiente de produção.

Exemplos rápidos:

- `validate('12.345.678/0001-9A', { acceptAlfanumerico: true })` -> válido (se `A` for permitido como DV2).
- `validate('A12.345.678/0001-95')` -> inválido (letra no prefixo).
- `canonicalize('12.345.678/0001-9A')` -> `1234567800019A` (por padrão preserva letra).
- `applyMigration('123456780001A', { A: '10' })` -> `12345678000110`.

Recomendações de operação:

- Revisar a lista de letras permitidas no DV2 antes de liberar aceitação ampla.
- Se precisar de compatibilidade com sistemas legados que aceitam apenas números, habilitar `strip_letters` na canonicalização ou fornecer mappings robustos de migração.
- Não habilitar `CNPJ_DEBUG` em pipelines públicos ou ambientes que possam vazar dados sensíveis.

Arquivo gerado automaticamente por correções CNPJ — manter versão atualizada junto às alterações do serviço.
