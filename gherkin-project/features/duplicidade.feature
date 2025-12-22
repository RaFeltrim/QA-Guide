 # language: pt

Funcionalidade: Empresa — duplicidade

  Contexto: impedir que o mesmo CNPJ seja cadastrado mais de uma vez.

  @regression @negative
  Cenário: [Duplicidade] — Bloqueio no cadastro
    Dado que já existe empresa cadastrada com CNPJ "12.345.678/0001-95"
    Quando eu tentar cadastrar uma nova empresa com CNPJ "12.345.678/0001-95" e razão social "Empresa D"
    Então o cadastro deve falhar com motivo "duplicidade"

  @regression
  Cenário: [Duplicidade] — Consulta após tentativa
    Dado que já existe empresa cadastrada com CNPJ "12.345.678/0001-95"
    Quando eu consultar o CNPJ "12.345.678/0001-95"
    Então devo receber os dados da empresa cadastrada

  @negative @regression
  Cenário: [Duplicidade] — Sensibilidade de comparação
    Dado que já existe empresa cadastrada com CNPJ "12.345.678/0001-95"
    Quando eu tentar cadastrar com CNPJ "12345678000195"
    Então o cadastro deve falhar com motivo "duplicidade"

  @regression
  Cenário: [Duplicidade] — Não duplicar outros CNPJs
    Dado que existe empresa cadastrada com CNPJ "12.345.678/0001-95"
    Quando eu tentar cadastrar com CNPJ "98.765.432/0001-10"
    Então o cadastro deve ser bem sucedido

  @regression
  Esquema do Cenário: [Duplicidade] — variações
    Dado que já existe empresa cadastrada com CNPJ "<existente>"
    Quando eu tentar cadastrar com CNPJ "<tentativa>"
    Então o resultado deve ser "<resultado>"

    Exemplos:
      | existente              | tentativa             | resultado     |
      | 12.345.678/0001-95     | 12345678000195        | duplicidade   |
      | 12.345.678/0001-95     | 98.765.432/0001-10    | sucesso       |
