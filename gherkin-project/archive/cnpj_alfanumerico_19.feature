<!-- ARCHIVE: substituído por features/cnpj_alfanumerico.feature em 2025-12-22 -->

Funcionalidade: CNPJ Alfanumérico — variações adicionais (19)

  Contexto: caso arquivado 19.

  @negative
  Cenário: exemplo arquivado 19
    Dado que foi informado o CNPJ "EXEMPLO-19"
    Quando o cliente validar o CNPJ informado
    Então a validação deve resultar em "inválido"
ARCHIVED: original path `features/cnpj_alfanumerico_19.feature`
Moved to: `features/cnpj_alfanumerico.feature`
Date archived: 2025-12-22

Funcionalidade: CNPJ Alfanumérico — auditoria de entradas inválidas

  Contexto: registrar motivos quando entradas alfanuméricas são rejeitadas.

  @audit @negative
  Cenário: [Auditar] — registrar motivo de rejeição por letra inesperada
    Dado que foi informado o CNPJ "12.345.678/0001-9@"
    Quando o cliente validar o CNPJ
    Então o sistema deve registrar "rejeitado: caracter inválido"

  @audit
  Cenário: [Auditar] — registrar normalização bem-sucedida
    Dado que foi informado o CNPJ "12.345.678/0001-9A"
    Quando o cliente normalizar o CNPJ
    Então o sistema deve registrar "normalizado: 1234567800019A"
