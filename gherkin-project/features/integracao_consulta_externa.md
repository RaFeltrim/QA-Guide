# integracao_consulta_externa.feature

```gherkin
Funcionalidade: Integração — consulta externa de CNPJ

  Contexto: integrar com serviço externo para buscar dados cadastrais por CNPJ e tratar falhas.

  @integration @regression
  Cenário: [Integração] — Consulta externa sucesso
    Dado que o serviço externo está disponível
    E existe informação externa para CNPJ "12.345.678/0001-95"
    Quando eu consultar o serviço externo para o CNPJ "12.345.678/0001-95"
    Então devo receber resposta externa com razão social

  @negative @integration
  Cenário: [Integração] — Timeout externo
    Dado que o serviço externo está com timeout
    Quando eu consultar o serviço externo para o CNPJ "12.345.678/0001-95"
    Então a chamada deve falhar com motivo "timeout"

  @negative @integration
  Cenário: [Integração] — Indisponível
    Dado que o serviço externo está indisponivel
    Quando eu consultar o serviço externo para o CNPJ "12.345.678/0001-95"
    Então a chamada deve falhar com motivo "indisponivel"

  @integration @regression
  Cenário: [Integração] — Fallback para interno
    Dado que o serviço externo está indisponivel
    E existe empresa cadastrada internamente com CNPJ "12.345.678/0001-95" e razão social "Empresa A"
    Quando eu consultar o serviço externo para o CNPJ "12.345.678/0001-95"
    Então devo receber dados do cadastro interno como fallback

  @integration @regression
  Esquema do Cenário: [Integração] — modos
    Dado que o serviço externo está em modo "<modo>"
    Quando eu consultar o serviço externo para o CNPJ "12.345.678/0001-95"
    Então o resultado deve ser "<resultado>"

    Exemplos:
      | modo         | resultado    |
      | sucesso      | sucesso      |
      | timeout      | timeout      |
      | indisponivel | indisponivel |
```
