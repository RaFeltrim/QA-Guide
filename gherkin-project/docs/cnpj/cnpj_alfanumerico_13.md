`````markdown
````markdown
# cnpj_alfanumerico_13.feature

```gherkin
Funcionalidade: CNPJ Alfanumérico — formatação com máscara incluindo letras

  Contexto: aplicar máscara quando sequência contém letras.

  @regression
  Cenário: [Formatar] — máscara mantém letras na posição correta
    Dado que foi informado o CNPJ "1234567800019A"
    Quando o cliente formatar o CNPJ informado
    Então o resultado deve ser "12.345.678/0001-9A"

  @regression
  Cenário: [Remover máscara] — retorna alfanumérico limpo
    Dado que foi informado o CNPJ "12.345.678/0001-9A"
    Quando o cliente remover a máscara
    Então o resultado deve ser "1234567800019A"
```

````

`````