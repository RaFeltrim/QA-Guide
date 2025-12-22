````markdown
# cnpj_alfanumerico_10.feature

```gherkin
Funcionalidade: CNPJ Alfanumérico — política de aceitação configurável

  Contexto: sistemas podem habilitar/descrabilitar aceitação de letras.

  @regression
  Cenário: [Config] — aceitação habilitada
    Dado que a configuração "aceitar_alfanumerico" está "true"
    E foi informado o CNPJ "12.345.678/0001-9A"
    Quando o cliente validar o CNPJ informado
    Então o resultado da validação deve ser "válido"

  @negative
  Cenário: [Config] — aceitação desabilitada
    Dado que a configuração "aceitar_alfanumerico" está "false"
    E foi informado o CNPJ "12.345.678/0001-9A"
    Quando o cliente validar o CNPJ informado
    Então o resultado da validação deve ser "inválido"
```

````
