`````markdown
````markdown
# cnpj_comprimento_invalido.feature

```gherkin
Funcionalidade: CNPJ — validação de comprimento

  Contexto: CNPJ deve ter 14 dígitos após normalização.

  @negative
  Cenário: [Comprimento] — CNPJ curto
    Dado que foi informado o CNPJ "12345678"
    Quando o cliente validar o CNPJ informado
    Então a validação deve falhar com motivo "comprimento inválido"

  @negative
  Cenário: [Comprimento] — CNPJ longo
    Dado que foi informado o CNPJ "12345678000195999"
    Quando o cliente validar o CNPJ informado
    Então a validação deve falhar com motivo "comprimento inválido"
```

````

`````
