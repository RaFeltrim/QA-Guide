ARCHIVED: original path `features/cnpj_duplicado.md`
Moved on: 2025-12-22

```markdown
````markdown
# cnpj_duplicado.feature

```gherkin
Funcionalidade: CNPJ — detecção de duplicidade em listas

  Contexto: identificar CNPJs duplicados em uma coleção/arquivo de entrada.

  @regression
  Cenário: [Duplicado] — Dois registros com mesmo CNPJ
    Dado que a lista contém os CNPJs "12345678000195" e "12.345.678/0001-95"
    Quando o cliente verificar duplicatas
    Então deve ser reportado "duplicado"

  @regression
  Cenário: [Duplicado] — Registros distintos
    Dado que a lista contém os CNPJs "12345678000195" e "111222333000181"
    Quando o cliente verificar duplicatas
    Então não deve haver duplicatas
```

````
ARCHIVED: original path `features/cnpj_duplicado.md`
Moved on: 2025-12-22

```markdown
Funcionalidade: CNPJ — detecção de duplicidade em listas

  Contexto: identificar CNPJs duplicados em uma coleção/arquivo de entrada.

  @regression
  Cenário: [Duplicado] — Dois registros com mesmo CNPJ
    Dado que a lista contém os CNPJs "12345678000195" e "12.345.678/0001-95"
    Quando o cliente verificar duplicatas
    Então deve ser reportado "duplicado"

  @regression
  Cenário: [Duplicado] — Registros distintos
    Dado que a lista contém os CNPJs "12345678000195" e "111222333000181"
    Quando o cliente verificar duplicatas
    Então não deve haver duplicatas

```
ARCHIVED: original file from `features/cnpj_duplicado.md`
Moved to `docs/cnpj/cnpj_duplicado.md`.
Source: features/cnpj_duplicado.md
