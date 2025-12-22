````markdown
# cnpj_alfanumerico_12.feature

```gherkin
Funcionalidade: CNPJ Alfanumérico — lista negra com variantes alfanuméricas

  Contexto: bloquear registros com variantes alfanuméricas equivalentes.

  @security
  Cenário: [Bloquear] — variante com letra na lista negra
    Dado que a lista negra contém "1234567800019A"
    E foi informado o CNPJ "12.345.678/0001-9A"
    Quando o cliente validar o CNPJ
    Então a ação deve ser "bloqueada"

  @regression
  Cenário: [Permitir] — diferente mesmo com letra
    Dado que a lista negra contém "12345678000199"
    E foi informado o CNPJ "12.345.678/0001-9A"
    Quando o cliente validar o CNPJ
    Então a ação deve ser "permitida"
```

````
