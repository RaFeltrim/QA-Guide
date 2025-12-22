````markdown
# cnpj_validacao_dv.feature

```gherkin
Funcionalidade: CNPJ — validação de dígitos verificadores (DV)

  Contexto: validar cálculo dos dígitos verificadores do CNPJ.

  @regression @critical
  Cenário: [Validação] — CNPJ válido com DVs corretos
    Dado que foi informado o CNPJ "12.345.678/0001-95"
    Quando o cliente validar o CNPJ informado
    Então o resultado da validação deve ser "válido"

  @negative
  Cenário: [Validação] — CNPJ com DVs incorretos
    Dado que foi informado o CNPJ "12.345.678/0001-94"
    Quando o cliente validar o CNPJ informado
    Então o resultado da validação deve ser "inválido"

  @regression
  Esquema do Cenário: [Validação] — Vários exemplos
    Dado que foi informado o CNPJ "<cnpj>"
    Quando o cliente validar o CNPJ informado
    Então o resultado da validação deve ser "<resultado>"

    Exemplos:
      | cnpj                  | resultado |
      | 12.345.678/0001-95    | válido     |
      | 11.222.333/0001-81    | válido     |
      | 12.345.678/0001-00    | inválido   |
```

````
