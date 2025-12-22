<!-- ARCHIVE: substituído por features/cnpj_alfanumerico.feature em 2025-12-22 -->

Funcionalidade: CNPJ Alfanumérico — variações adicionais (14)

  Contexto: caso arquivado 14.

  @negative
  Cenário: exemplo arquivado 14
    Dado que foi informado o CNPJ "EXEMPLO-14"
    Quando o cliente validar o CNPJ informado
    Então a validação deve resultar em "inválido"
ARCHIVED: original path `features/cnpj_alfanumerico_14.feature`
Moved to: `features/cnpj_alfanumerico.feature`
Date archived: 2025-12-22

Funcionalidade: CNPJ Alfanumérico — duplicidade com variantes alfanuméricas

  Contexto: detectar duplicatas mesmo quando variantes contêm letras.

  @regression
  Cenário: [Duplicado] — mesma entidade, variante com letra
    Dado que a lista contém "1234567800019A" e "12.345.678/0001-9A"
    Quando o cliente verificar duplicatas
    Então deve ser reportado "duplicado"

  @regression
  Cenário: [Não duplicado] — variantes distintas
    Dado que a lista contém "12345678000195" e "1234567800019A"
    Quando o cliente verificar duplicatas
    Então não deve haver duplicatas
