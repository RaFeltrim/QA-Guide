````markdown
# cnpj_alfanumerico_19.feature

```gherkin
Funcionalidade: CNPJ Alfanumérico — auditoria de entradas inválidas

  Contexto: registrar motivos quando entradas alfanuméricas são rejeitadas.

  @audit @negative
  Cenário: [Auditar] — registrar motivo de rejeição por letra inesperada
    Dado que foi informado o CNPJ "12.345.678/0001-9@"
    Quando o cliente validar o CNPJ
    Então o sistema deve registrar "rejeitado: caracter inválido"

  @audit
  Cenário: [Auditar] — registrar normalização bem-sucedida
    Dado que foi informado o CNPJ "12.345.678/0001-9A"
    Quando o cliente normalizar o CNPJ
    Então o sistema deve registrar "normalizado: 1234567800019A"
```

````
