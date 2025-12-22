<!-- ARCHIVE: substituído por features/cnpj_alfanumerico.feature em 2025-12-22 -->

`````markdown
````markdown
# cnpj_alfanumerico_09.feature

```gherkin
Funcionalidade: CNPJ Alfanumérico — variações adicionais (09)

  Contexto: caso arquivado 09.

  @negative
  Cenário: exemplo arquivado 09
    Dado que foi informado o CNPJ "EXEMPLO-09"
    Quando o cliente validar o CNPJ informado
    Então a validação deve resultar em "inválido"
```

````

`````
ARCHIVED: original path `features/cnpj_alfanumerico_09.md`
Moved on: 2025-12-22

```markdown
````markdown
# cnpj_alfanumerico_09.feature

```gherkin
Funcionalidade: CNPJ Alfanumérico — extração em texto com letras

  Contexto: localizar e preservar componentes alfanuméricos ao extrair.

  @regression
  Cenário: [Extrair] — texto com CNPJ alfanumérico
    Dado que o texto contém "Empresa: 12.345.678/0001-9A (contato)"
    Quando o cliente extrair o CNPJ do texto
    Então o CNPJ extraído deve ser "1234567800019A"

  @regression
  Cenário: [Extrair] — mistura de símbolos e letras
    Dado que o texto contém "ref: (12.345.678/0001-AB)"
    Quando o cliente extrair o CNPJ do texto
    Então o CNPJ extraído deve ser "123456780001AB"
```

````

```
ARCHIVED: original file from `features/cnpj_alfanumerico_09.md`
Moved to `docs/cnpj/cnpj_alfanumerico_09.md`.
Source: features/cnpj_alfanumerico_09.md
