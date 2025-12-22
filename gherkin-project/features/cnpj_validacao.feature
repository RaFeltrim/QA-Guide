 # language: pt

Funcionalidade: CNPJ — validação

  # CONSOLIDATION NOTE:
  # - Casos negativos de formato/comprimento/ caracteres foram consolidados em
  #   `features/cnpj_invalid_inputs.feature`.
  # - Canonicalização, zeros à esquerda e exemplos numéricos movidos para
  #   `features/cnpj_numerico.feature`.
  # Objetivo: manter aqui apenas cenários de negócio críticos e o Outline de DV.

  Contexto: validar se um CNPJ informado está correto em formato e dígitos verificadores.

  @smoke @regression @critical @fast
  Cenário: [Validação] — Formato válido (caminho feliz)
    # Exemplo referenciado em `fixtures/cnpj/examples.csv` (example_id E008)
    Dado que foi informado o CNPJ formatado "12.345.678/0001-95"
    Quando o cliente validar o CNPJ informado
    Então a validação deve ser bem sucedida

  # Observação: testes negativos de tamanho e caracteres estão marcados como duplicados
  # e foram movidos para `features/cnpj_invalid_inputs.feature` (veja `fixtures/cnpj/mapping.csv`).
  # Mantém-se o histórico em `archive/` para auditoria.

  @regression @critical
  Esquema do Cenário: [Validação] — Dígito verificador
    Dado que foi informado o CNPJ formatado "<cnpj>"
    Quando o cliente validar o CNPJ informado
    Então o resultado deve ser <esperado>

    Exemplos:
      | cnpj                  | esperado |
      | 12.345.678/0001-95    | válido   |
      | 11.222.333/0001-81    | inválido |
      | 12.345.678/0001-00    | inválido |

  # Nota: entradas adicionais para validação de DV podem ser referenciadas em
  # `fixtures/cnpj/examples.csv` e `fixtures/cnpj/mapping.csv`.
