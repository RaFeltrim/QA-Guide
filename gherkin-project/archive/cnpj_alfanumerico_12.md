<!-- ARCHIVE: substituído por features/cnpj_alfanumerico.feature em 2025-12-22 -->

`````markdown
````markdown
# cnpj_alfanumerico_12.feature

```gherkin
Funcionalidade: CNPJ Alfanumérico — variações adicionais (12)

  Contexto: caso arquivado 12.

  @negative
  Cenário: exemplo arquivado 12
    Dado que foi informado o CNPJ "EXEMPLO-12"
    Quando o cliente validar o CNPJ informado
    Então a validação deve resultar em "inválido"
```

````

`````
ARCHIVED: original path `features/cnpj_alfanumerico_12.md`
Moved on: 2025-12-22

```markdown
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
ARCHIVED: original path `features/cnpj_alfanumerico_12.md`
Moved on: 2025-12-22

```markdown
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

```
ARCHIVED: original path `features/cnpj_alfanumerico_12.md`
Moved on: 2025-12-22

```markdown
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
ARCHIVED: original file from `features/cnpj_alfanumerico_12.md`
Moved to `docs/cnpj/cnpj_alfanumerico_12.md`.
Source: features/cnpj_alfanumerico_12.md
