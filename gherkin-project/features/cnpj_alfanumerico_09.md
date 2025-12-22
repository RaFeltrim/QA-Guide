````markdown
# cnpj_alfanumerico_09.feature

```gherkin
Funcionalidade: CNPJ Alfanumérico — extração em texto com letras

  Contexto: localizar e preservar componentes alfanuméricos ao extrair.

  @regression
  Cenário: [Extrair] — texto com CNPJ alfanumérico
    Dado que o texto contém "Empresa: 12.345.678/0001-9A (contato)"
    Quando o cliente extrair o CNPJ do texto
    Então o CNPJ extraído deve ser "1234567800019A"

  @regression
  Cenário: [Extrair] — mistura de símbolos e letras
    Dado que o texto contém "ref: (12.345.678/0001-AB)"
    Quando o cliente extrair o CNPJ do texto
    Então o CNPJ extraído deve ser "123456780001AB"
```

````
