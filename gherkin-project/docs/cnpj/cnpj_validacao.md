# cnpj_validacao.feature

```gherkin
Funcionalidade: CNPJ — validação

  Contexto: validar se um CNPJ informado está correto formato e dígitos verificadores.

  @smoke @regression
  Cenário: [Validação] — Formato válido
    Dado que foi informado o CNPJ formatado "12.345.678/0001-95"
    Quando o cliente validar o CNPJ informado
    Então a validação deve ser bem sucedida

  @negative @regression
  Cenário: [Validação] — Tamanho inválido
    Dado que foi informado o CNPJ normalizado "12345678"
    Quando o cliente validar o CNPJ informado
    Então a validação deve falhar com motivo "tamanho_invalido"

  @negative @regression
  Cenário: [Validação] — Caracteres inválidos
    Dado que foi informado o CNPJ formatado "12.345.678/0001-9X"
    Quando o cliente validar o CNPJ informado
    Então a validação deve falhar com motivo "caracter_invalido"

  @regression
  Esquema do Cenário: [Validação] — Dígito verificador
    Dado que foi informado o CNPJ formatado "<cnpj>"
    Quando o cliente validar o CNPJ informado
    Então o resultado deve ser <esperado>

    Exemplos:
      | cnpj                  | esperado             |
      | 12.345.678/0001-95    | válido               |
      | 11.222.333/0001-81    | inválido             |

  @negative @regression
  Cenário: [Validação] — DV incorreto
    Dado que foi informado o CNPJ formatado "12.345.678/0001-00"
    Quando o cliente validar o CNPJ informado
    Então a validação deve falhar com motivo "check_digits_invalido"
```
