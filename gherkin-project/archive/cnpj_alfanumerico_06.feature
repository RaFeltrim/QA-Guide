<!-- ARCHIVE: substituído por features/cnpj_alfanumerico.feature em 2025-12-22 -->

Funcionalidade: CNPJ Alfanumérico — variações adicionais (06)

  Contexto: casos auxiliares arquivados para referência.

  @negative
  Cenário: exemplo arquivado 06
    Dado que foi informado o CNPJ "EXEMPLO-06"
    Quando o cliente validar o CNPJ informado
    Então a validação deve resultar em "inválido"
ARCHIVED: original path `features/cnpj_alfanumerico_06.feature`
Moved to: `features/cnpj_alfanumerico.feature`
Date archived: 2025-12-22

Funcionalidade: CNPJ Alfanumérico — caracteres Unicode

  Contexto: caracteres acentuados e não ASCII devem ser rejeitados.

  @negative
  Cenário: [Rejeitar] — letra acentuada
    Dado que foi informado o CNPJ "12.345.678/0001-9á"
    Quando o cliente validar o CNPJ informado
    Então a validação deve falhar por "caracter inválido"

  @negative
  Cenário: [Rejeitar] — cedilha
    Dado que foi informado o CNPJ "12.345.678/0001-9ç"
    Quando o cliente validar o CNPJ informado
    Então a validação deve falhar por "caracter inválido"
