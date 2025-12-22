ARCHIVED: original path `features/cnpj_normalizacao.md`
Moved on: 2025-12-22

```markdown
# cnpj_normalizacao.feature

```gherkin
Funcionalidade: CNPJ — normalização

  Contexto: normalizar CNPJs recebidos (remover caracteres de formatação e preservar letras) e garantir equivalência.

  @smoke @regression
  Cenário: [Normalização] — Remove pontuação
    Dado que foi informado o CNPJ formatado "12.345.678/0001-95"
    Quando o cliente normalizar o CNPJ informado
    Então a normalização deve resultar em "12345678000195"

  @regression
  Cenário: [Normalização] — Trim
    Dado que foi informado o CNPJ formatado "  12.345.678/0001-95  "
    Quando o cliente normalizar o CNPJ informado
    Então a normalização deve resultar em "12345678000195"

  @negative @regression
  Cenário: [Normalização] — Entrada vazia
    Dado que foi informado o CNPJ normalizado ""
    Quando o cliente normalizar o CNPJ informado
    Então a normalização deve resultar em ""

  @regression
  Esquema do Cenário: [Normalização] — Equivalência
    Dado que o primeiro CNPJ é "<a>" e o segundo CNPJ é "<b>"
    Quando o cliente normalizar ambos os CNPJs
    Então ambos devem ser equivalentes

    Exemplos:
      | a                      | b                    |
      | 12.345.678/0001-95     | 12345678000195       |
      | 12.345.678/0001-95     | 12.345.678/0001-95   |

  @negative @regression
  Cenário: [Normalização] — Caracteres inválidos mantidos
    Dado que foi informado o CNPJ formatado "12.345.678/0001-9X"
    Quando o cliente normalizar o CNPJ informado
    Então a normalização deve resultar em conter "9X"
```

```
ARCHIVED: original file from `features/cnpj_normalizacao.md`
Moved to `docs/cnpj/cnpj_normalizacao.md`.
Source: features/cnpj_normalizacao.md
