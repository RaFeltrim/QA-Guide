 # language: pt

Funcionalidade: CNPJ Numérico — canonicalização e validação

  # Consolidado de: features/cnpj_numerico_01.feature ... features/cnpj_numerico_05.feature
  # Origem completa: ../cnpj-consolidation-inventory.md
  Contexto: Consolidação das variações numéricas (zeros à esquerda, tamanho, dígitos verificadores).

  # Tags recomendadas: @critical @fast @negative
  @critical @fast
  Esquema do Cenário: [Numérico] — Canonicalização e validação
    Dado que foi informado o CNPJ "<entrada>"
    Quando o cliente canonicalizar o CNPJ informado
    E o cliente validar o CNPJ informado
    Então o resultado da canonicalização deve ser "<canonicalizado>"
    E o resultado da validação deve ser "<validacao>"

    Exemplos: # mapeamento -> arquivo/origem (ver cnpj_numerico_mapping.md)
      | entrada              | canonicalizado     | validacao |
      | 0012345678000195     | 12345678000195     | válido    | # cnpj_numerico_01.feature (zeros à esquerda)
      | 012345678000195      | 12345678000195     | válido    | # cnpj_numerico_02.feature (preservar 14 dígitos quando já válidos)
      | 12345678             | 12345678           | inválido  | # cnpj_numerico_03.feature (tamanho curto -> inválido)
      | 12.345.678/0001-00   | 12345678000100     | inválido  | # DV incorreto (checar dígitos)
      | 12345678000195       | 12345678000195     | válido    | # entrada já normalizada (cobertura de caminho feliz)

  # Observações:
  # - Mantemos 4–5 exemplos representativos que cobrem canonicalização, tamanho inválido e dígito verificador.
  # - Exemplos adicionais (casos extremos) devem ir para `fixtures/cnpj/` e só serem promovidos a testes se justificarem valor.
