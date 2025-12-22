 # language: pt

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
