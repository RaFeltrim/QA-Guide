<!-- ARCHIVE: substituído por features/cnpj_alfanumerico.feature em 2025-12-22 -->

`````markdown
````markdown
# cnpj_alfanumerico_17.feature

```gherkin
Funcionalidade: CNPJ Alfanumérico — variações adicionais (17)

  Contexto: caso arquivado 17.

  @negative
  Cenário: exemplo arquivado 17
    Dado que foi informado o CNPJ "EXEMPLO-17"
    Quando o cliente validar o CNPJ informado
    Então a validação deve resultar em "inválido"
```

````

`````
ARCHIVED: original path `features/cnpj_alfanumerico_17.md`
Moved on: 2025-12-22

```markdown
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

```
ARCHIVED: original path `features/cnpj_alfanumerico_17.md`
Moved on: 2025-12-22

```markdown
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
ARCHIVED: original file from `features/cnpj_alfanumerico_17.md`
Moved to `docs/cnpj/cnpj_alfanumerico_17.md`.
Source: features/cnpj_alfanumerico_17.md
