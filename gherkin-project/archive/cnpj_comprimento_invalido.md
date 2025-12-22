ARCHIVED: original path `features/cnpj_comprimento_invalido.md`
Moved on: 2025-12-22

```markdown
# cnpj_comprimento_invalido.feature

```gherkin
Funcionalidade: CNPJ — comprimento inválido

  Contexto: validar entradas com número de dígitos incorreto.

  @negative
  Cenário: [Comprimento] — menos que 14 dígitos
    Dado que foi informado o CNPJ "12345678"
    Quando o cliente validar o CNPJ informado
    Então a validação deve ser "inválido"

  @negative
  Cenário: [Comprimento] — mais que 14 dígitos
    Dado que foi informado o CNPJ "12345678000195123"
    Quando o cliente validar o CNPJ informado
    Então a validação deve ser "inválido"
```

```
ARCHIVED: original path `features/cnpj_comprimento_invalido.md`
Moved on: 2025-12-22

```markdown
Funcionalidade: CNPJ — validação de comprimento

  Contexto: CNPJ deve ter 14 dígitos após normalização.

  @negative
  Cenário: [Comprimento] — CNPJ curto
    Dado que foi informado o CNPJ "12345678"
    Quando o cliente validar o CNPJ informado
    Então a validação deve falhar com motivo "comprimento inválido"

  @negative
  Cenário: [Comprimento] — CNPJ longo
    Dado que foi informado o CNPJ "12345678000195999"
    Quando o cliente validar o CNPJ informado
    Então a validação deve falhar com motivo "comprimento inválido"

```
ARCHIVED: original file from `features/cnpj_comprimento_invalido.md`
Moved to `docs/cnpj/cnpj_comprimento_invalido.md`.
Source: features/cnpj_comprimento_invalido.md
