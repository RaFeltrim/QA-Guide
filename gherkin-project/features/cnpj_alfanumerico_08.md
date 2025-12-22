````markdown
# cnpj_alfanumerico_08.feature

```gherkin
Funcionalidade: CNPJ Alfanumérico — letras em DV

  Contexto: dígitos verificadores devem ser numéricos; letras aqui invalidam.

  @negative
  Cenário: [Rejeitar] — letra na posição de DV
    Dado que foi informado o CNPJ "12.345.678/0001-9A"
    Quando o cliente validar o CNPJ informado
    Então o resultado da validação deve ser "inválido"

  @negative
  Cenário: [Rejeitar] — dois DVs alfanuméricos
    Dado que foi informado o CNPJ "12.345.678/0001-AA"
    Quando o cliente validar o CNPJ informado
    Então o resultado da validação deve ser "inválido"
```

````
