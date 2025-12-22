<!-- ARCHIVE: substituído por features/cnpj_alfanumerico.feature em 2025-12-22 -->

Funcionalidade: CNPJ Alfanumérico — letras no sufixo

  Contexto: aceitação e normalização quando letras aparecem no sufixo do CNPJ.

  @regression
  Cenário: [Aceitar] — letra no último dígito preservada
    Dado que foi informado o CNPJ "12.345.678/0001-9A"
    Quando o cliente normalizar o CNPJ informado
    Então a normalização deve resultar em "1234567800019A"

  @negative
  Cenário: [Rejeitar] — letra inserida em posição de DV inválida
    Dado que foi informado o CNPJ "12.345.678/0001-A5"
    Quando o cliente validar o CNPJ informado
    Então o resultado da validação deve ser "inválido"
ARCHIVED: original path `features/cnpj_alfanumerico_01.feature`
Moved to: `features/cnpj_alfanumerico.feature`
Date archived: 2025-12-22

Funcionalidade: CNPJ Alfanumérico — letras no sufixo

  Contexto: aceitação e normalização quando letras aparecem no sufixo do CNPJ.

  @regression
  Cenário: [Aceitar] — letra no último dígito preservada
    Dado que foi informado o CNPJ "12.345.678/0001-9A"
    Quando o cliente normalizar o CNPJ informado
    Então a normalização deve resultar em "1234567800019A"

  @negative
  Cenário: [Rejeitar] — letra inserida em posição de DV inválida
    Dado que foi informado o CNPJ "12.345.678/0001-A5"
    Quando o cliente validar o CNPJ informado
    Então o resultado da validação deve ser "inválido"
