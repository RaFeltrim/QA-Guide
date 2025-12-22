 # language: pt

Funcionalidade: Segurança — não expor dados sensíveis

  Contexto: garantir que respostas e logs não exponham dados sensíveis além do necessário.

  @regression
  Cenário: [Segurança] — Resposta não expõe CNPJ completo
    Dado que existe uma empresa cadastrada com CNPJ "12.345.678/0001-95"
    Quando eu consultar a empresa pelo CNPJ "12.345.678/0001-95"
    Então a resposta não deve exibir o CNPJ completo

  @negative @regression
  Cenário: [Segurança] — Logs não expõem CNPJ completo
    Dado que ocorreu erro em validação para CNPJ "12.345.678/0001-00"
    Quando o sistema registrar o log
    Então o log não deve conter o CNPJ completo

  @regression
  Cenário: [Segurança] — Máscara parcial na resposta
    Dado que existe empresa cadastrada com CNPJ "12.345.678/0001-95"
    Quando eu consultar a empresa pelo CNPJ "12.345.678/0001-95"
    Então o CNPJ na resposta deve estar mascarado (ex.: "12.345.678/****-95")

  @regression
  Cenário: [Segurança] — Não retornar dados sensíveis desnecessários
    Dado que existe uma empresa cadastrada com CNPJ "12.345.678/0001-95"
    Quando eu consultar a empresa pelo CNPJ "12.345.678/0001-95"
    Então a resposta não deve conter campos sensíveis não necessários

  @regression
  Esquema do Cenário: [Segurança] — formas de exposição
    Dado que há um evento de log com nível "<nivel>" e motivo "<motivo>"
    Quando o sistema persistir o log
    Então o registro não deve expor dados sensíveis

    Exemplos:
      | nivel   | motivo          |
      | INFO    | consulta         |
      | ERROR   | validacao        |
