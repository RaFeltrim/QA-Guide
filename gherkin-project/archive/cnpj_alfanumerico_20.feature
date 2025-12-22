<!-- ARCHIVE: substituído por features/cnpj_alfanumerico.feature em 2025-12-22 -->

Funcionalidade: CNPJ Alfanumérico — variações adicionais (20)

  Contexto: caso arquivado 20.

  @negative
  Cenário: exemplo arquivado 20
    Dado que foi informado o CNPJ "EXEMPLO-20"
    Quando o cliente validar o CNPJ informado
    Então a validação deve resultar em "inválido"
ARCHIVED: original path `features/cnpj_alfanumerico_20.feature`
Moved to: `features/cnpj_alfanumerico.feature`
Date archived: 2025-12-22

Funcionalidade: CNPJ Alfanumérico — compatibilidade retroativa

  Contexto: garantir interoperabilidade entre sistemas que aceitam apenas números e os que aceitam letras.

  @regression
  Cenário: [Compatibilidade] — sistema antigo (numérico) e novo (alfanumérico)
    Dado que o sistema antigo aceita somente "12345678000195"
    E o sistema novo recebe "1234567800019A"
    Quando sincronizar registros entre sistemas
    Então o processo deve reportar "incompatibilidade" para o registro com letra

  @regression
  Cenário: [Compatibilidade] — fallback por mapeamento
    Dado que existe mapeamento para "A" -> "10"
    E o sistema novo envia "123456780001A"
    Quando aplicar fallback para o sistema antigo
    Então o registro convertido deve ser "12345678000110"
