# language: pt
Funcionalidade: Empresa — cadastro por CNPJ

  Contexto: permitir cadastrar empresas usando CNPJ, validar campos obrigatórios e evitar duplicidade.

  @smoke @regression
  Cenário: [Cadastro] — Sucesso mínimo
    Dado que existe um CNPJ válido "12.345.678/0001-95"
    Quando eu cadastrar uma empresa com CNPJ "12.345.678/0001-95" e razão social "Empresa A"
    Então o cadastro deve ser bem sucedido

  @regression
  Cenário: [Cadastro] — Campos obrigatórios
    Dado que existe um CNPJ válido "12.345.678/0001-95"
    Quando eu tentar cadastrar uma empresa com CNPJ "" e razão social ""
    Então o cadastro deve falhar com motivo "campos obrigatórios"

  @negative @regression
  Cenário: [Cadastro] — CNPJ inválido
    Dado que existe um CNPJ inválido "12.345.678/0001-00"
    Quando eu tentar cadastrar uma empresa com CNPJ "12.345.678/0001-00" e razão social "Empresa B"
    Então o cadastro deve falhar com motivo "CNPJ inválido"

  @regression
  Esquema do Cenário: [Cadastro] — Status e bloqueios
    Dado que existe um CNPJ válido "<cnpj>"
    Quando eu cadastrar uma empresa com CNPJ "<cnpj>" e razão social "<razao>"
    Então o status da empresa deve ser "ativo"

    Exemplos:
      | cnpj                  | razao      |
      | 12.345.678/0001-95    | Empresa X  |
      | 98.765.432/0001-10    | Empresa Y  |

  @negative @regression
  Cenário: [Cadastro] — Duplicidade
    Dado que já existe empresa cadastrada com CNPJ "12.345.678/0001-95"
    Quando eu tentar cadastrar novamente uma empresa com CNPJ "12.345.678/0001-95" e razão social "Empresa A"
    Então o cadastro deve falhar com motivo "duplicidade"
