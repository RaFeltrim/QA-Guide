`````markdown
````markdown
# cnpj_duplicado.feature

```gherkin
Funcionalidade: CNPJ — detecção de duplicidade em listas

  Contexto: identificar CNPJs duplicados em uma coleção/arquivo de entrada.

  @regression
  Cenário: [Duplicado] — Dois registros com mesmo CNPJ
    Dado que a lista contém os CNPJs "12345678000195" e "12.345.678/0001-95"
    Quando o cliente verificar duplicatas
    Então deve ser reportado "duplicado"

  @regression
  Cenário: [Duplicado] — Registros distintos
    Dado que a lista contém os CNPJs "12345678000195" e "111222333000181"
    Quando o cliente verificar duplicatas
    Então não deve haver duplicatas
```

````

`````