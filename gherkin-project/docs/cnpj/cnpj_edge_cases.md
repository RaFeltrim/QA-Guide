# CNPJ Edge Cases

Coleção de casos extremos e notas de brainstorm — manter em `docs/` como referência de análise, não como testes automatizados.

- entradas com sufixos alfanuméricos (ex.: `12.345.678/0001-9A`)
- entradas com símbolos embutidos (ex.: `12.345.678/0001-9@A`)
- entradas com espaços/formatos incomuns
- zeros repetidos e sequências óbvias (ex.: `00000000000000`)

Para promover qualquer um desses casos a teste automatizado, mova o caso para `fixtures/cnpj/examples.csv` e adicione como `Examples` no Scenario Outline correspondente.
`````markdown
````markdown
# cnpj_edge_cases.feature

```gherkin
Funcionalidade: CNPJ — casos de borda e robustez

  Contexto: testes para entradas estranhas e limites.

  @negative
  Cenário: [Borda] — Null/None input
    Dado que foi informado o CNPJ ""
    Quando o cliente validar o CNPJ informado
    Então a validação deve falhar com motivo "entrada vazia"

  @negative
  Cenário: [Borda] — Espaços e quebras de linha
    Dado que foi informado o CNPJ "\n12.345.678/0001-95\t"
    Quando o cliente normalizar e validar o CNPJ informado
    Então o resultado deve ser "válido"

  @negative
  Cenário: [Borda] — Número com prefixo/sufixo
    Dado que foi informado o CNPJ "ID:12345678000195;"
    Quando o cliente extrair e validar o CNPJ informado
    Então o resultado da validação deve ser "válido"
```

````

`````