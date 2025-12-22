<!-- ARCHIVE: substituído por features/cnpj_alfanumerico.feature em 2025-12-22 -->

`````markdown
````markdown
# cnpj_alfanumerico_02.feature

```gherkin
Funcionalidade: CNPJ Alfanumérico — letras no prefixo

  Contexto: validar presença de letras antes do número principal.

  @negative
  Cenário: [Rejeitar] — letra no prefixo inválida
    Dado que foi informado o CNPJ "A12.345.678/0001-95"
    Quando o cliente validar o CNPJ informado
    Então o resultado da validação deve ser "inválido"

  @regression
  Cenário: [Aceitar] — prefixo separado como identificador
    Dado que foi informado o CNPJ "ID-A:12.345.678/0001-95"
    Quando o cliente extrair o CNPJ do texto
    Então o CNPJ extraído deve ser "12345678000195"
```

````

`````
ARCHIVED: original path `features/cnpj_alfanumerico_02.md`
Moved on: 2025-12-22

```markdown
````markdown
# cnpj_alfanumerico_02.feature

```gherkin
Funcionalidade: CNPJ Alfanumérico — letras no prefixo

  Contexto: validar presença de letras antes do número principal.

  @negative
  Cenário: [Rejeitar] — letra no prefixo inválida
    Dado que foi informado o CNPJ "A12.345.678/0001-95"
    Quando o cliente validar o CNPJ informado
    Então o resultado da validação deve ser "inválido"

  @regression
  Cenário: [Aceitar] — prefixo separado como identificador
    Dado que foi informado o CNPJ "ID-A:12.345.678/0001-95"
    Quando o cliente extrair o CNPJ do texto
    Então o CNPJ extraído deve ser "12345678000195"
```

````

```
ARCHIVED: original file from `features/cnpj_alfanumerico_02.md`
Moved to `docs/cnpj/cnpj_alfanumerico_02.md`.
Source: features/cnpj_alfanumerico_02.md
