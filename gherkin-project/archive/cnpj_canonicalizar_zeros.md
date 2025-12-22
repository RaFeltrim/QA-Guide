ARCHIVED: original path `features/cnpj_canonicalizar_zeros.md`
Moved on: 2025-12-22

```markdown
# cnpj_canonicalizar_zeros.feature

```gherkin
Funcionalidade: CNPJ — canonicalização e zeros à esquerda

  Contexto: garantir equivalência independentemente de zeros à esquerda.

  @regression
  Cenário: [Canonicalização] — Remove zeros à esquerda quando necessário
    Dado que foi informado o CNPJ "0012345678000195"
    Quando o cliente canonicalizar o CNPJ informado
    Então o resultado deve ser "12345678000195"

  @regression
  Cenário: [Canonicalização] — Preserve 14 dígitos válidos
    Dado que foi informado o CNPJ "012345678000195"
    Quando o cliente canonicalizar o CNPJ informado
    Então o resultado deve ter 14 dígitos
```

```
ARCHIVED: original path `features/cnpj_canonicalizar_zeros.md`
Moved on: 2025-12-22

```markdown
Funcionalidade: CNPJ — canonicalização e zeros à esquerda

  Contexto: garantir equivalência independentemente de zeros à esquerda.

  @regression
  Cenário: [Canonicalização] — Remove zeros à esquerda quando necessário
    Dado que foi informado o CNPJ "0012345678000195"
    Quando o cliente canonicalizar o CNPJ informado
    Então o resultado deve ser "12345678000195"

  @regression
  Cenário: [Canonicalização] — Preserve 14 dígitos válidos
    Dado que foi informado o CNPJ "012345678000195"
    Quando o cliente canonicalizar o CNPJ informado
    Então o resultado deve ter 14 dígitos

```
ARCHIVED: original file from `features/cnpj_canonicalizar_zeros.md`
Moved to `docs/cnpj/cnpj_canonicalizar_zeros.md`.
Source: features/cnpj_canonicalizar_zeros.md
