# language: pt
Funcionalidade: CNPJ — validação

  Contexto: validar se um CNPJ informado está correto formato e dígitos verificadores.

  @smoke @regression
  Cenário: [Validação] — Formato válido
    Dado que o CNPJ informado é "12.345.678/0001-95"
    Quando eu validar o CNPJ
    Então o resultado deve ser válido

  @negative @regression
  Cenário: [Validação] — Formato inválido (tamanho)
    Dado que o CNPJ informado é "12345678"
    Quando eu validar o CNPJ
    Então o resultado deve ser inválido com motivo "formato inválido"

  @negative @regression
  Cenário: [Validação] — Caracteres inválidos
    Dado que o CNPJ informado é "12.345.678/0001-9X"
    Quando eu validar o CNPJ
    Então o resultado deve ser inválido com motivo "formato inválido"

  @regression
  Esquema do Cenário: [Validação] — Dígito verificador
    Dado que o CNPJ informado é "<cnpj>"
    Quando eu validar o CNPJ
    Então o resultado deve ser <esperado>

    Exemplos:
      | cnpj                  | esperado             |
      | 12.345.678/0001-95    | válido               |
      | 11.222.333/0001-81    | inválido             |

  @negative @regression
  Cenário: [Validação] — DV incorreto
    Dado que o CNPJ informado é "12.345.678/0001-00"
    Quando eu validar o CNPJ
    Então o resultado deve ser inválido com motivo "DV inválido"
