<!-- ARCHIVE: substituído por features/cnpj_alfanumerico.feature em 2025-12-22 -->

Funcionalidade: CNPJ Alfanumérico — variações adicionais (13)

  Contexto: caso arquivado 13.

  @negative
  Cenário: exemplo arquivado 13
    Dado que foi informado o CNPJ "EXEMPLO-13"
    Quando o cliente validar o CNPJ informado
    Então a validação deve resultar em "inválido"
ARCHIVED: original path `features/cnpj_alfanumerico_13.feature`
Moved to: `features/cnpj_alfanumerico.feature`
Date archived: 2025-12-22

Funcionalidade: CNPJ Alfanumérico — formatação com máscara incluindo letras

  Contexto: aplicar máscara quando sequência contém letras.

  @regression
  Cenário: [Formatar] — máscara mantém letras na posição correta
    Dado que foi informado o CNPJ "1234567800019A"
    Quando o cliente formatar o CNPJ informado
    Então o resultado deve ser "12.345.678/0001-9A"

  @regression
  Cenário: [Remover máscara] — retorna alfanumérico limpo
    Dado que foi informado o CNPJ "12.345.678/0001-9A"
    Quando o cliente remover a máscara
    Então o resultado deve ser "1234567800019A"
