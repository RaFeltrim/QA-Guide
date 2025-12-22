ARCHIVED: original path `features/cnpj_filial_0001.md`
Moved on: 2025-12-22

```markdown
````markdown
# cnpj_filial_0001.feature

```gherkin
Funcionalidade: CNPJ — tratamento de filiais (0001)

  Contexto: garantir que filiais com sufixo 0001 são aceitas e preservadas.

  @regression
  Cenário: [Filial] — Filial 0001 preservada
    Dado que foi informado o CNPJ "12.345.678/0001-95"
    Quando o cliente normalizar e validar o CNPJ
    Então o ramo/filial deve ser "0001"

  @regression
  Cenário: [Filial] — Filial diferente de 0001
    Dado que foi informado o CNPJ "12.345.678/0002-95"
    Quando o cliente normalizar e validar o CNPJ
    Então o ramo/filial deve ser "0002"
```

````
ARCHIVED: original file from `features/cnpj_filial_0001.md`
Moved to `docs/cnpj/cnpj_filial_0001.md`.
Source: features/cnpj_filial_0001.md
