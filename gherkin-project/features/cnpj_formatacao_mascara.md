````markdown
# cnpj_formatacao_mascara.feature

```gherkin
Funcionalidade: CNPJ — formatação com máscara

  Contexto: aplicar máscara padrão `NN.NNN.NNN/NNNN-NN` e também remover máscara.

  @regression
  Cenário: [Formatação] — Aplicar máscara a CNPJ limpo
    Dado que foi informado o CNPJ "12345678000195"
    Quando o cliente formatar o CNPJ informado
    Então o resultado formatado deve ser "12.345.678/0001-95"

  @regression
  Cenário: [Formatação] — Remover máscara
    Dado que foi informado o CNPJ "12.345.678/0001-95"
    Quando o cliente remover a máscara do CNPJ informado
    Então o resultado deve ser "12345678000195"
```

````
