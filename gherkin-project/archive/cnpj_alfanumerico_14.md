<!-- ARCHIVE: substituído por features/cnpj_alfanumerico.feature em 2025-12-22 -->

`````markdown
````markdown
# cnpj_alfanumerico_14.feature

```gherkin
Funcionalidade: CNPJ Alfanumérico — variações adicionais (14)

  Contexto: caso arquivado 14.

  @negative
  Cenário: exemplo arquivado 14
    Dado que foi informado o CNPJ "EXEMPLO-14"
    Quando o cliente validar o CNPJ informado
    Então a validação deve resultar em "inválido"
```

````

`````
ARCHIVED: original path `features/cnpj_alfanumerico_14.md`
Moved on: 2025-12-22

```markdown
````markdown
# cnpj_alfanumerico_14.feature

```gherkin
Funcionalidade: CNPJ Alfanumérico — duplicidade com variantes alfanuméricas

  Contexto: detectar duplicatas mesmo quando variantes contêm letras.

  @regression
  Cenário: [Duplicado] — mesma entidade, variante com letra
    Dado que a lista contém "1234567800019A" e "12.345.678/0001-9A"
    Quando o cliente verificar duplicatas
    Então deve ser reportado "duplicado"

  @regression
  Cenário: [Não duplicado] — variantes distintas
    Dado que a lista contém "12345678000195" e "1234567800019A"
    Quando o cliente verificar duplicatas
    Então não deve haver duplicatas
```

````
ARCHIVED: original path `features/cnpj_alfanumerico_14.md`
Moved on: 2025-12-22

```markdown
````markdown
# cnpj_alfanumerico_14.feature

```gherkin
Funcionalidade: CNPJ Alfanumérico — duplicidade com variantes alfanuméricas

  Contexto: detectar duplicatas mesmo quando variantes contêm letras.

  @regression
  Cenário: [Duplicado] — mesma entidade, variante com letra
    Dado que a lista contém "1234567800019A" e "12.345.678/0001-9A"
    Quando o cliente verificar duplicatas
    Então deve ser reportado "duplicado"

  @regression
  Cenário: [Não duplicado] — variantes distintas
    Dado que a lista contém "12345678000195" e "1234567800019A"
    Quando o cliente verificar duplicatas
    Então não deve haver duplicatas
```

````

```
ARCHIVED: original path `features/cnpj_alfanumerico_14.md`
Moved on: 2025-12-22

```markdown
Funcionalidade: CNPJ Alfanumérico — duplicidade com variantes alfanuméricas

  Contexto: detectar duplicatas mesmo quando variantes contêm letras.

  @regression
  Cenário: [Duplicado] — mesma entidade, variante com letra
    Dado que a lista contém "1234567800019A" e "12.345.678/0001-9A"
    Quando o cliente verificar duplicatas
    Então deve ser reportado "duplicado"

  @regression
  Cenário: [Não duplicado] — variantes distintas
    Dado que a lista contém "12345678000195" e "1234567800019A"
    Quando o cliente verificar duplicatas
    Então não deve haver duplicatas

```
ARCHIVED: original file from `features/cnpj_alfanumerico_14.md`
Moved to `docs/cnpj/cnpj_alfanumerico_14.md`.
Source: features/cnpj_alfanumerico_14.md
