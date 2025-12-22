FLAKY REPORT - CNPJ SUITE

Data: 2025-12-22

Resumo:
- Identifiquei cenários com maior probabilidade de instabilidade e marquei como `@flaky`.

Marcados como `@flaky`:

- `features/integracao_consulta_externa.feature`
  - Motivo: depende de serviço externo (modos: sucesso, timeout, indisponivel). Falhas de rede, latência e disponibilidade tornam esses cenários propensos a flakiness. Marquei todos os cenários e o Outline de modos com `@flaky`.

- `features/cnpj_alfanumerico_18.feature` (UI)
  - Motivo: testa comportamento de interface (máscara e rejeição de caracteres). Dependências de front-end, drivers e timings de renderização podem causar instabilidade em CI; marquei os cenários UI como `@flaky`.

Observações e recomendações:
- Estratégia: mantenha os cenários `@flaky` excluídos dos runs rápidos (PRs). Execute-os em um job separado de integração/integração lenta com retries controlados.
- Isolamento: para `integracao_consulta_externa.feature`, prefira mocks/fixtures (`support/services/integracao.service.ts` já suporta modos) durante pipeline; reserve execuções end-to-end contra o serviço externo apenas em um pipeline agendado ou nightly.
- Retries: se a plataforma de runner suportar, aplique `retry` apenas para cenários marcados `@flaky` com um limite baixo (ex.: 2 tentativas).
- Documentação: manter este arquivo e referenciar-o no `REVIEW_CNPJ_TESTS.md` ao abrir o commit final.
