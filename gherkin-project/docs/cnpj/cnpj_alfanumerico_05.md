`````markdown
````markdown
# cnpj_alfanumerico_05.feature

```gherkin
Funcionalidade: CNPJ Alfanumérico — remoção de caracteres não alfanuméricos

  Contexto: pontos e símbolos devem ser removidos, letras preservadas.

  @regression
  Cenário: [Strip] — remove símbolos mantendo letras
    Dado que foi informado o CNPJ "12.345.678/0001-9A"
    Quando o cliente normalizar o CNPJ informado
    Então o resultado deve ser "1234567800019A"

  @negative
  Cenário: [Rejeitar] — contém símbolo dentro da sequência alfanumérica
    Dado que foi informado o CNPJ "12.345.678/0001-9@A"
    Quando o cliente validar o CNPJ informado
    Então a validação deve falhar por "caracter inválido"
```

````

`````