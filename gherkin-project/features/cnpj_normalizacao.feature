# language: pt
Funcionalidade: CNPJ — normalização

  Contexto: normalizar CNPJs recebidos (remover pontuação, trim) e garantir equivalência.

  @smoke @regression
  Cenário: [Normalização] — Remove pontuação
    Dado que o CNPJ informado é "12.345.678/0001-95"
    Quando eu normalizar o CNPJ
    Então o resultado deve ser "12345678000195"

  @regression
  Cenário: [Normalização] — Trim
    Dado que o CNPJ informado é "  12.345.678/0001-95  "
    Quando eu normalizar o CNPJ
    Então o resultado deve ser "12345678000195"

  @negative @regression
  Cenário: [Normalização] — Entrada vazia
    Dado que o CNPJ informado é ""
    Quando eu normalizar o CNPJ
    Então o resultado deve ser ""

  @regression
  Esquema do Cenário: [Normalização] — Equivalência
    Dado que o primeiro CNPJ é "<a>" e o segundo CNPJ é "<b>"
    Quando eu normalizar ambos os CNPJs
    Então ambos devem ser equivalentes

    Exemplos:
      | a                      | b                    |
      | 12.345.678/0001-95     | 12345678000195       |
      | 12.345.678/0001-95     |  12.345.678/0001-95  |

  @negative @regression
  Cenário: [Normalização] — Caracteres inválidos mantidos
    Dado que o CNPJ informado é "12.345.678/0001-9X"
    Quando eu normalizar o CNPJ
    Então o resultado deve conter "9X"
