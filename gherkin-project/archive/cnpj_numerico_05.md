<!-- ARCHIVE: substituído por features/cnpj_numerico.feature em 2025-12-22 -->

`````markdown
````markdown
# cnpj_conhecido_valido.feature

```gherkin
Funcionalidade: CNPJ — exemplos conhecidos válidos

  Contexto: testar CNPJs reais e conhecidos para regressão.

  @regression @example
  Cenário: [Exemplo válido] — Empresa X
    Dado que foi informado o CNPJ "00.000.000/0001-91"
    Quando o cliente validar o CNPJ informado
    Então o resultado da validação deve ser "válido"

  @regression
  Cenário: [Exemplo válido] — Empresa Y
    Dado que foi informado o CNPJ "11.222.333/0001-81"
    Quando o cliente validar o CNPJ informado
    Então o resultado da validação deve ser "válido"
```

````

`````
ARCHIVED: original file from `features/cnpj_numerico_05.md`
Moved to `docs/cnpj/cnpj_numerico_05.md`.
Source: features/cnpj_numerico_05.md
