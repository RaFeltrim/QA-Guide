<!-- ARCHIVE: substituído por features/cnpj_alfanumerico.feature em 2025-12-22 -->

Funcionalidade: CNPJ Alfanumérico — variações adicionais (08)

  Contexto: casos auxiliais arquivados para referência.

  @negative
  Cenário: exemplo arquivado 08
    Dado que foi informado o CNPJ "EXEMPLO-08"
    Quando o cliente validar o CNPJ informado
    Então a validação deve resultar em "inválido"
ARCHIVED: original path `features/cnpj_alfanumerico_08.feature`
Moved to: `features/cnpj_alfanumerico.feature`
Date archived: 2025-12-22

Funcionalidade: CNPJ Alfanumérico — letras em DV

  Contexto: dígitos verificadores devem ser numéricos; letras aqui invalidam.

  @negative
  Cenário: [Rejeitar] — letra na posição de DV
    Dado que foi informado o CNPJ "12.345.678/0001-9A"
    Quando o cliente validar o CNPJ informado
    Então o resultado da validação deve ser "inválido"

  @negative
  Cenário: [Rejeitar] — dois DVs alfanuméricos
    Dado que foi informado o CNPJ "12.345.678/0001-AA"
    Quando o cliente validar o CNPJ informado
    Então o resultado da validação deve ser "inválido"
