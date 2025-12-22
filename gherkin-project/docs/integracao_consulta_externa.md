# Feature: Integração — consulta externa de CNPJ

```gherkin
# language: pt
Funcionalidade: Integração — consulta externa de CNPJ

  Contexto: integrar com serviço externo para buscar dados cadastrais por CNPJ e tratar falhas.

  @integration @regression
  Cenário: [Integração] — Consulta externa sucesso
    Dado que o serviço externo está disponível
    E existe informação externa para CNPJ "12.345.678/0001-95"
    Quando eu consultar o serviço externo para o CNPJ "12.345.678/0001-95"
    Então devo receber resposta externa com razão social

  @negative @integration
   # Integração — consulta externa de CNPJ

  ```gherkin
  # language: pt
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
    Dado que o serviço externo está indisponível
    Quando eu consultar o serviço externo para o CNPJ "12.345.678/0001-95"
    Então a chamada deve falhar com motivo "indisponível"

  @integration @regression
  Cenário: [Integração] — Fallback para interno
    Dado que o serviço externo está indisponível
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

  ---

  ## Explicação por cenário

  **Consulta externa sucesso**

  - Objetivo: validar o caminho feliz da integração externa quando o serviço responde com dados.
  - Tags: `@integration`, `@regression`.
  - Observações: pré-popula `externalStore` (mock) com dados para o CNPJ; a step valida `razaoSocial`.

  **Timeout externo**

  - Objetivo: garantir que um timeout externo é tratado e que o sistema propaga o motivo `timeout`.
  - Tags: `@negative`, `@integration`.

  **Indisponível**

  - Objetivo: validar que a indisponibilidade é mapeada e sinalizada como `indisponivel`.

  **Fallback para interno**

  - Objetivo: quando o externo está indisponível, usar dados internos (fallback) se existirem.

  **Esquema do Cenário: modos (data-driven)**

  - Objetivo: reduzir duplicação e testar múltiplos modos (`sucesso`, `timeout`, `indisponivel`) com uma única estrutura.

  ---

  ## Mapeamento para Step Definitions (resumo)

  - `Given('que o serviço externo está disponível', ...)` — define `world.externalMode = 'sucesso'`.
  - `Given('existe informação externa para CNPJ {string}', ...)` — chama `integracaoService.setExternalData(...)`.
  - `When('eu consultar o serviço externo para o CNPJ {string}', ...)` — invoca `integracaoService.consultarExterno(...)` e popula `externalResponse` ou `externalError` no `TestWorld`.
  - `Then('devo receber resposta externa com razão social', ...)` — valida que `externalResponse.razaoSocial` existe.
  - `Then('a chamada deve falhar com motivo {string}', ...)` — compara `externalError` com o motivo esperado.
  - `Then('devo receber dados do cadastro interno como fallback', ...)` — valida fallback para dados internos.

  ---

  ## Nota técnica sobre suporte e execução

  - Implementação de suporte: `support/services/integracao.service.ts` e `support/world.ts`.
  - Observação: o `package.json` do projeto estava configurado para `--require step_definitions_clean/**/*.ts`. Ajuste `--require` se seus steps estão em `step_definitions/`.

  ---

  ## Boas práticas observadas

  - Usar linguagem do domínio em Gherkin (não expor detalhes técnicos).
  - Cenários curtos e focados.
  - Tags para controlar execuções (`@integration`, `@regression`, `@negative`).
  - Usar Scenario Outline para variações (data-driven).

  ---

  Arquivo de step definitions relacionado: `step_definitions/integracao.steps.ts`.
