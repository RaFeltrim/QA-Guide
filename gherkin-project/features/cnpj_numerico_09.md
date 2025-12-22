````markdown
# cnpj_extrair_texto.feature

```gherkin
Funcionalidade: CNPJ — extrair CNPJ de texto livre

  Contexto: localizar sequências que correspondem a CNPJ dentro de textos.

  @regression
  Cenário: [Extração] — Encontrar CNPJ com máscara em texto
    Dado que o texto contém "Contato: 12.345.678/0001-95 - financeiro"
    Quando o cliente extrair o CNPJ do texto
    Então o CNPJ extraído deve ser "12345678000195"

  @regression
  Cenário: [Extração] — Encontrar CNPJ sem máscara em texto
    Dado que o texto contém "Id: 12345678000195 registrado"
    Quando o cliente extrair o CNPJ do texto
    Então o CNPJ extraído deve ser "12345678000195"
```

````
