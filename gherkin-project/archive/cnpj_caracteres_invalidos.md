ARCHIVED: original path `features/cnpj_caracteres_invalidos.md`
Moved on: 2025-12-22

```markdown
# cnpj_caracteres_invalidos.feature

```gherkin
Funcionalidade: CNPJ — caracteres inválidos

  Contexto: caracteres não alfanuméricos devem ser rejeitados.

  @negative
  Cenário: [Caracteres] — contém símbolo
    Dado que foi informado o CNPJ "12.345.678/0001-9@"
    Quando o cliente validar o CNPJ informado
    Então a validação deve falhar por "caracter inválido"

  @negative
  Cenário: [Caracteres] — contém letra no meio
    Dado que foi informado o CNPJ "12.34A.678/0001-95"
    Quando o cliente validar o CNPJ informado
    Então a validação deve ser "inválido"
```

```
ARCHIVED: original path `features/cnpj_caracteres_invalidos.md`
Moved on: 2025-12-22

```markdown
Funcionalidade: CNPJ — tratamento de caracteres inválidos

  Contexto: identificar e reportar caracteres não numéricos inesperados.

  @negative
  Cenário: [Caracteres inválidos] — Letras na sequência numérica
    Dado que foi informado o CNPJ "12.345.678/0001-9A"
    Quando o cliente validar o CNPJ informado
    Então a validação deve falhar por "caracteres inválidos"

  @negative
  Cenário: [Caracteres inválidos] — Símbolos estranhos
    Dado que foi informado o CNPJ "12.345.678/0001-9@"
    Quando o cliente validar o CNPJ informado
    Então a validação deve falhar por "caracteres inválidos"

```
ARCHIVED: original file from `features/cnpj_caracteres_invalidos.md`
Moved to `docs/cnpj/cnpj_caracteres_invalidos.md`.
Source: features/cnpj_caracteres_invalidos.md
