`````markdown
````markdown
# cnpj_alfanumerico_11.feature

```gherkin
Funcionalidade: CNPJ Alfanumérico — canonicalização para armazenamento

  Contexto: decidir regras de armazenamento (preservar ou remover letras).

  @regression
  Cenário: [Armazenar] — preserva letras por padrão
    Dado que foi informado o CNPJ "12.345.678/0001-9A"
    Quando o cliente canonicalizar para armazenamento
    Então o valor armazenado deve ser "1234567800019A"

  @regression
  Cenário: [Armazenar] — remove letras se política exigir
    Dado que a política de armazenamento "strip_letters" está "true"
    E foi informado o CNPJ "12.345.678/0001-9A"
    Quando o cliente canonicalizar para armazenamento
    Então o valor armazenado deve ser "1234567800019"
```

````

`````