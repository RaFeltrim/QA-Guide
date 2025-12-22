 # language: pt

Funcionalidade: CNPJ Alfanumérico — normalização e validação

  # Consolidado de: features/cnpj_alfanumerico_01.feature ... features/cnpj_alfanumerico_20.feature
  # Origem completa: ../cnpj-consolidation-inventory.md
  Contexto: Consolidação das variações alfanuméricas (letras no sufixo, símbolos, espaços).

  # Tags recomendadas: @critical @fast @negative
  @critical @fast
  Esquema do Cenário: [Alfanumérico] — Normalização e validação combinada
    Dado que foi informado o CNPJ "<entrada>"
    Quando o cliente normalizar o CNPJ informado
    E o cliente validar o CNPJ informado
    Então a normalização deve resultar em "<normalizado>"
    E o resultado da validação deve ser "<validacao>"

    Exemplos: # mapeamento -> arquivo/origem (ver cnpj_alfanumerico_mapping.md)
      | entrada                    | normalizado           | validacao |
      | 12.345.678/0001-9A        | 1234567800019A        | válido    | # cnpj_alfanumerico_01.feature (letra no sufixo aceita)
      | 12.345.678/0001-A5        | 123456780001A5        | inválido  | # cnpj_alfanumerico_01.feature (letra em posição de DV inválida)
      | 12.345.678/0001-9@A       | 1234567800019@A       | inválido  | # cnpj_alfanumerico_05.feature (símbolo dentro da sequência)
      |  12.345.678/0001-95       | 12345678000195        | válido    | # exemplo: formatação com espaços (normalização/trim)
      | 0012345678000195          | 12345678000195        | válido    | # cobre canonicalização e interação com alfanuméricos
      | 12.345.678/0001-00        | 12345678000100        | inválido  | # DV incorreto - garante checagem de dígitos

  # Observações:
  # - Mantivemos um conjunto pequeno (4-6) de exemplos representativos para reduzir custo de manutenção.
  # - Exemplos adicionais podem ser movidos para `fixtures/cnpj/` e referenciados em `Examples` quando necessário.
