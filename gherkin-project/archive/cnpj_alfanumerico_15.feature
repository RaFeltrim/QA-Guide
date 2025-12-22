<!-- ARCHIVE: substituído por features/cnpj_alfanumerico.feature em 2025-12-22 -->

Funcionalidade: CNPJ Alfanumérico — variações adicionais (15)

  Contexto: caso arquivado 15.

  @negative
  Cenário: exemplo arquivado 15
    Dado que foi informado o CNPJ "EXEMPLO-15"
    Quando o cliente validar o CNPJ informado
    Então a validação deve resultar em "inválido"
ARCHIVED: original path `features/cnpj_alfanumerico_15.feature`
Moved to: `features/cnpj_alfanumerico.feature`
Date archived: 2025-12-22

Funcionalidade: CNPJ Alfanumérico — conversão/mapeamento de letras

  Contexto: em migrações, letras podem ser convertidas para códigos numéricos.

  @regression
  Cenário: [Migrar] — mapear letra para código numérico
    Dado que a política de migração mapeia "A" -> "10"
    E foi informado o CNPJ "123456780001A"
    Quando o cliente aplicar a migração
    Então o resultado deve ser "12345678000110"

  @negative
  Cenário: [Migrar] — letra sem mapeamento falha
    Dado que não há mapeamento para "Z"
    E foi informado o CNPJ "123456780001Z"
    Quando o cliente aplicar a migração
    Então a migração deve falhar com "mapa ausente"
