````markdown
# cnpj_alfanumerico_14.feature

```gherkin
Funcionalidade: CNPJ Alfanumérico — duplicidade com variantes alfanuméricas

  Contexto: detectar duplicatas mesmo quando variantes contêm letras.

  @regression
  Cenário: [Duplicado] — mesma entidade, variante com letra
    Dado que a lista contém "1234567800019A" e "12.345.678/0001-9A"
    Quando o cliente verificar duplicatas
    Então deve ser reportado "duplicado"

  @regression
  Cenário: [Não duplicado] — variantes distintas
    Dado que a lista contém "12345678000195" e "1234567800019A"
    Quando o cliente verificar duplicatas
    Então não deve haver duplicatas
```

````
