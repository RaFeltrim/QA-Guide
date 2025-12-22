`````markdown
````markdown
# cnpj_alfanumerico_16.feature

```gherkin
Funcionalidade: CNPJ Alfanumérico — validação por regex configurável

  Contexto: validar entradas conforme expressão regular configurada.

  @regression
  Cenário: [Regex] — padrão alfanumérico permitido
    Dado que a expressão regular é "^[0-9A-Z]{14,16}$"
    E foi informado o CNPJ "1234567800019A"
    Quando o cliente validar pelo regex
    Então a validação deve ser "válido"

  @negative
  Cenário: [Regex] — contém caracter inválido
    Dado que a expressão regular é "^[0-9A-Z]{14,16}$"
    E foi informado o CNPJ "1234-5678/0001-9A"
    Quando o cliente validar pelo regex
    Então a validação deve ser "inválido"
```

````

`````