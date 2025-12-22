<!-- ARCHIVE: substituído por features/cnpj_alfanumerico.feature em 2025-12-22 -->

Funcionalidade: CNPJ Alfanumérico — variações adicionais (07)

  Contexto: casos auxiliares arquivados para referência.

  @negative
  Cenário: exemplo arquivado 07
    Dado que foi informado o CNPJ "EXEMPLO-07"
    Quando o cliente validar o CNPJ informado
    Então a validação deve resultar em "inválido"
ARCHIVED: original path `features/cnpj_alfanumerico_07.feature`
Moved to: `features/cnpj_alfanumerico.feature`
Date archived: 2025-12-22

Funcionalidade: CNPJ Alfanumérico — letras como código de filial

  Contexto: aceitar letras como sufixo de identificação alternativa.

  @regression
  Cenário: [Aceitar] — sufixo alfa como identificador de filial
    Dado que foi informado o CNPJ "12.345.678/0001-A"
    Quando o cliente normalizar o CNPJ informado
    Então o resultado deve ser "123456780001A"

  @regression
  Cenário: [Aceitar] — sufixo alfa múltiplo
    Dado que foi informado o CNPJ "12.345.678/0001-AB"
    Quando o cliente normalizar o CNPJ informado
    Então o resultado deve ser "123456780001AB"
