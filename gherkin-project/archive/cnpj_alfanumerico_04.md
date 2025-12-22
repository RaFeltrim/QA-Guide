<!-- ARCHIVE: substituído por features/cnpj_alfanumerico.feature em 2025-12-22 -->

`````markdown
````markdown
# cnpj_alfanumerico_04.feature

```gherkin
Funcionalidade: CNPJ Alfanumérico — normalização de caso

  Contexto: letras devem ser canonicalizadas para caixa alta quando preservadas.

  @regression
  Cenário: [Normalize] — converte letra minúscula para maiúscula
    Dado que foi informado o CNPJ "12.345.678/0001-9a"
    Quando o cliente normalizar o CNPJ informado
    Então a normalização deve resultar em "1234567800019A"

  @regression
  Cenário: [Preservar] — já em maiúscula
    Dado que foi informado o CNPJ "12.345.678/0001-9A"
    Quando o cliente normalizar o CNPJ informado
    Então a normalização deve resultar em "1234567800019A"
```

````

`````
ARCHIVED: original path `features/cnpj_alfanumerico_04.md`
Moved on: 2025-12-22

```markdown
````markdown
# cnpj_alfanumerico_04.feature

```gherkin
Funcionalidade: CNPJ Alfanumérico — normalização de caso

  Contexto: letras devem ser canonicalizadas para caixa alta quando preservadas.

  @regression
  Cenário: [Normalize] — converte letra minúscula para maiúscula
    Dado que foi informado o CNPJ "12.345.678/0001-9a"
    Quando o cliente normalizar o CNPJ informado
    Então a normalização deve resultar em "1234567800019A"

  @regression
  Cenário: [Preservar] — já em maiúscula
    Dado que foi informado o CNPJ "12.345.678/0001-9A"
    Quando o cliente normalizar o CNPJ informado
    Então a normalização deve resultar em "1234567800019A"
```

````

```
ARCHIVED: original file from `features/cnpj_alfanumerico_04.md`
Moved to `docs/cnpj/cnpj_alfanumerico_04.md`.
Source: features/cnpj_alfanumerico_04.md
