````markdown
# cnpj_alfanumerico_17.feature

```gherkin
Funcionalidade: CNPJ Alfanumérico — sanitização de entrada

  Contexto: remover prefixos/sufixos não relacionados antes de validar.

  @regression
  Cenário: [Sanitizar] — remove prefixo textual
    Dado que foi informado o CNPJ "ID:12.345.678/0001-9A"
    Quando o cliente sanitizar a entrada
    Então o resultado deve ser "1234567800019A"

  @negative
  Cenário: [Sanitizar] — rejeita caracteres no meio após sanitização
    Dado que foi informado o CNPJ "ID:12.3A5.678/0001-95"
    Quando o cliente sanitizar e validar a entrada
    Então a validação deve ser "inválido"
```

````
