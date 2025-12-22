<!-- ARCHIVE: substituído por features/cnpj_numerico.feature em 2025-12-22 -->

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
ARCHIVED: original path `features/cnpj_numerico_02.feature`
Moved to: `features/cnpj_numerico.feature`
Date archived: 2025-12-22

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
