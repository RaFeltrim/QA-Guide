````markdown
# cnpj_alfanumerico_07.feature

```gherkin
Funcionalidade: CNPJ Alfanumérico — letras como código de filial

  Contexto: aceitar letras como sufixo de identificação alternativa.

  @regression
  Cenário: [Aceitar] — sufixo alfa como identificador de filial
    Dado que foi informado o CNPJ "12.345.678/0001-A"
    Quando o cliente normalizar o CNPJ informado
    Então o resultado deve ser "123456780001A"

  @regression
  Cenário: [Aceitar] — sufixo alfa múltiplo
    Dado que foi informado o CNPJ "12.345.678/0001-AB"
    Quando o cliente normalizar o CNPJ informado
    Então o resultado deve ser "123456780001AB"
```

````
