<!-- ARCHIVE: substituído por features/cnpj_alfanumerico.feature em 2025-12-22 -->

`````markdown
````markdown
# cnpj_alfanumerico_16.feature

```gherkin
Funcionalidade: CNPJ Alfanumérico — variações adicionais (16)

  Contexto: caso arquivado 16.

  @negative
  Cenário: exemplo arquivado 16
    Dado que foi informado o CNPJ "EXEMPLO-16"
    Quando o cliente validar o CNPJ informado
    Então a validação deve resultar em "inválido"
```

````

`````
ARCHIVED: original path `features/cnpj_alfanumerico_16.md`
Moved on: 2025-12-22

```markdown
````markdown
# cnpj_alfanumerico_16.feature

```gherkin
Funcionalidade: CNPJ Alfanumérico — validação por regex configurável

  Contexto: validar entradas conforme expressão regular configurada.

  @regression
  Cenário: [Regex] — padrão alfanumérico permitido
    Dado que a expressão regular é "^[0-9A-Z]{14,16}$"
    E foi informado o CNPJ "1234567800019A"
    Quando o cliente validar pelo regex
    Então a validação deve ser "válido"

  @negative
  Cenário: [Regex] — contém caracter inválido
    Dado que a expressão regular é "^[0-9A-Z]{14,16}$"
    E foi informado o CNPJ "1234-5678/0001-9A"
    Quando o cliente validar pelo regex
    Então a validação deve ser "inválido"
```

````
ARCHIVED: original path `features/cnpj_alfanumerico_16.md`
Moved on: 2025-12-22

```markdown
````markdown
# cnpj_alfanumerico_16.feature

```gherkin
Funcionalidade: CNPJ Alfanumérico — validação por regex configurável

  Contexto: validar entradas conforme expressão regular configurada.

  @regression
  Cenário: [Regex] — padrão alfanumérico permitido
    Dado que a expressão regular é "^[0-9A-Z]{14,16}$"
    E foi informado o CNPJ "1234567800019A"
    Quando o cliente validar pelo regex
    Então a validação deve ser "válido"

  @negative
  Cenário: [Regex] — contém caracter inválido
    Dado que a expressão regular é "^[0-9A-Z]{14,16}$"
    E foi informado o CNPJ "1234-5678/0001-9A"
    Quando o cliente validar pelo regex
    Então a validação deve ser "inválido"
```

````

```
ARCHIVED: original path `features/cnpj_alfanumerico_16.md`
Moved on: 2025-12-22

```markdown
Funcionalidade: CNPJ Alfanumérico — validação por regex configurável

  Contexto: validar entradas conforme expressão regular configurada.

  @regression
  Cenário: [Regex] — padrão alfanumérico permitido
    Dado que a expressão regular é "^[0-9A-Z]{14,16}$"
    E foi informado o CNPJ "1234567800019A"
    Quando o cliente validar pelo regex
    Então a validação deve ser "válido"

  @negative
  Cenário: [Regex] — contém caracter inválido
    Dado que a expressão regular é "^[0-9A-Z]{14,16}$"
    E foi informado o CNPJ "1234-5678/0001-9A"
    Quando o cliente validar pelo regex
    Então a validação deve ser "inválido"

```
ARCHIVED: original file from `features/cnpj_alfanumerico_16.md`
Moved to `docs/cnpj/cnpj_alfanumerico_16.md`.
Source: features/cnpj_alfanumerico_16.md
