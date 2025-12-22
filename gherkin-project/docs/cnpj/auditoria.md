````markdown
# auditoria.feature

```gherkin
Funcionalidade: Auditoria — logs de tentativas

  Contexto: registrar tentativas de validação/cadastro, sem vazar dados sensíveis.

  @regression
  Cenário: [Auditoria] — Registrar tentativa inválida
    Dado que uma tentativa de cadastro falha por motivo "formato_invalido"
    Quando eu registrar a tentativa
    Então deve existir um log de tentativa com motivo "formato_invalido" sem expor o CNPJ completo

  @regression
  Cenário: [Auditoria] — Registrar tentativa bem sucedida
    Dado que um cadastro foi realizado com sucesso para CNPJ "12.345.678/0001-95"
    Quando eu registrar a tentativa
    Então deve existir um log com status "sucesso" e sem dados sensíveis expostos

  @negative @regression
  Cenário: [Auditoria] — Não vazar dados em logs
    Dado que ocorreu falha de validação para CNPJ "12.345.678/0001-00"
    Quando eu registrar a tentativa
    Então o log não deve conter o CNPJ completo

  @regression
  Cenário: [Auditoria] — Contagem de tentativas
    Dado que houveram 2 tentativas falhas para o mesmo usuário
    Quando eu consultar os logs
    Então o sistema deve retornar pelo menos 2 registros

  @regression
  Esquema do Cenário: [Auditoria] — motivos
    Dado que ocorreu uma tentativa com motivo "<motivo>"
    Quando eu registrar a tentativa
    Então o log deve conter o motivo "<motivo>"

    Exemplos:
      | motivo            |
      | formato_invalido  |
      | duplicidade       |
```

````