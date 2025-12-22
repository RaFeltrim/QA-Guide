# empresa_consulta_api.feature

```gherkin
Funcionalidade: Empresa — consulta interna por CNPJ (API)

  Contexto: consultar cadastro interno de empresas por CNPJ via API simulada.

  @smoke @regression @integration
  Cenário: [Consulta] — Sucesso interno
    Dado que existe uma empresa cadastrada com CNPJ "12.345.678/0001-95" e razão social "Empresa A"
    Quando eu consultar a empresa pelo CNPJ "12.345.678/0001-95"
    Então a resposta deve conter razão social "Empresa A"

  @negative @regression
  Cenário: [Consulta] — Não encontrada
    Dado que não existe empresa com CNPJ "11.111.111/1111-11"
    Quando eu consultar a empresa pelo CNPJ "11.111.111/1111-11"
    Então a resposta deve ser vazia

  @negative @regression
  Cenário: [Consulta] — CNPJ inválido
    Dado que o CNPJ informado é "123"
    Quando eu consultar a empresa pelo CNPJ "123"
    Então a resposta deve falhar com motivo "formato_invalido"

  @regression
  Esquema do Cenário: [Consulta] — Variações
    Dado que existe uma empresa cadastrada com CNPJ "<cnpj>" e razão social "<razao>"
    Quando eu consultar a empresa pelo CNPJ "<cnpj>"
    Então a resposta deve conter razão social "<razao>"

    Exemplos:
      | cnpj                  | razao      |
      | 12.345.678/0001-95    | Empresa A  |
      | 98.765.432/0001-10    | Empresa B  |

  @negative @regression
  Cenário: [Consulta] — Campo sensível não exposto
    Dado que existe uma empresa cadastrada com CNPJ "12.345.678/0001-95"
    Quando eu consultar a empresa pelo CNPJ "12.345.678/0001-95"
    Então a resposta não deve expor dados sensíveis
```
