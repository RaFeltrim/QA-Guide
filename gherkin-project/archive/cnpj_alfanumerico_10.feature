<!-- ARCHIVE: substituído por features/cnpj_alfanumerico.feature em 2025-12-22 -->

Funcionalidade: CNPJ Alfanumérico — variações adicionais (10)

  Contexto: caso arquivado 10.

  @negative
  Cenário: exemplo arquivado 10
    Dado que foi informado o CNPJ "EXEMPLO-10"
    Quando o cliente validar o CNPJ informado
    Então a validação deve resultar em "inválido"
ARCHIVED: original path `features/cnpj_alfanumerico_10.feature`
Moved to: `features/cnpj_alfanumerico.feature`
Date archived: 2025-12-22

Funcionalidade: CNPJ Alfanumérico — política de aceitação configurável

  Contexto: sistemas podem habilitar/descrabilitar aceitação de letras.

  @regression
  Cenário: [Config] — aceitação habilitada
    Dado que a configuração "aceitar_alfanumerico" está "true"
    E foi informado o CNPJ "12.345.678/0001-9A"
    Quando o cliente validar o CNPJ informado
    Então o resultado da validação deve ser "válido"

  @negative
  Cenário: [Config] — aceitação desabilitada
    Dado que a configuração "aceitar_alfanumerico" está "false"
    E foi informado o CNPJ "12.345.678/0001-9A"
    Quando o cliente validar o CNPJ informado
    Então o resultado da validação deve ser "inválido"
