<!-- ARCHIVE: substituído por features/cnpj_alfanumerico.feature em 2025-12-22 -->

Funcionalidade: CNPJ Alfanumérico — variações adicionais (11)

  Contexto: caso arquivado 11.

  @negative
  Cenário: exemplo arquivado 11
    Dado que foi informado o CNPJ "EXEMPLO-11"
    Quando o cliente validar o CNPJ informado
    Então a validação deve resultar em "inválido"
ARCHIVED: original path `features/cnpj_alfanumerico_11.feature`
Moved to: `features/cnpj_alfanumerico.feature`
Date archived: 2025-12-22

Funcionalidade: CNPJ Alfanumérico — canonicalização para armazenamento

  Contexto: decidir regras de armazenamento (preservar ou remover letras).

  @regression
  Cenário: [Armazenar] — preserva letras por padrão
    Dado que foi informado o CNPJ "12.345.678/0001-9A"
    Quando o cliente canonicalizar para armazenamento
    Então o valor armazenado deve ser "1234567800019A"

  @regression
  Cenário: [Armazenar] — remove letras se política exigir
    Dado que a política de armazenamento "strip_letters" está "true"
    E foi informado o CNPJ "12.345.678/0001-9A"
    Quando o cliente canonicalizar para armazenamento
    Então o valor armazenado deve ser "1234567800019"
