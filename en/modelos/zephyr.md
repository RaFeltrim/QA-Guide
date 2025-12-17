**Guia Rápido — Zephyr for Jira**

Resumo: como integrar casos de teste e resultados ao Zephyr (para Jira), fluxos comuns (import, execução, registro de evidências) e boas práticas.

- **Pré-requisitos:** acesso a um projeto Jira com Zephyr (Cloud ou Server) e permissões para criar/editar testes e ciclos.
- **Modelar casos de teste:** cada caso deve ter: título claro, passos numerados, dados de entrada, resultado esperado, tags/componentes e prioridade.
- **Importar casos em massa:**
  - Usar CSV/Excel com colunas mapeadas (Summary, Description, Steps, Estimated Time, Priority).
  - Ferramentas de terceiros ou APIs Zephyr para automação de import.
- **Executar e registrar resultados:**
  - Criar um Test Cycle para a execução.
  - Registrar `Pass/Fail` e anexar evidências (logs, screenshots, response.json do Postman, relatórios JMeter).
- **Integração com Postman/Newman:**
  - Exportar coleção Postman e executar com `newman` no CI, gerar report JUnit/JSON.
  - Usar scripts ou integrações (APIs Zephyr) para criar execuções e anexar resultados programaticamente a itens de teste (por exemplo, associar um request a um `Test` e anexar `response.json`).
- **Integração com JMeter:**
  - Gerar relatórios JMeter (JTL/HTML). Converter ou anexar como evidência em execuções no Zephyr.
  - Para automação, criar um job no CI que execute JMeter e, pelo API, atualize status no Zephyr.
- **Automação via API:**
  - Zephyr fornece endpoints REST para criar/atualizar Test, Test Cycle, Execution e anexos. Use tokens de API e scripts (Python/Node) no CI.
- **Boas práticas:**
  - Vincular casos de teste a issues de requisito (Jira Issue Links).
  - Não anexar arquivos muito grandes — armazene artefatos em storage e anexe links quando apropriado.
  - Padronizar nomenclatura de ciclos (ex.: `release-1.2_regressao`).

Exemplo (fluxo simplificado):

1. Criar/importar casos em Zephyr.
2. Criar Test Cycle para a release.
3. Executar manualmente ou automatizar via CI (Newman/JMeter).
4. Publicar resultados no Zephyr via API (marcar Execução como PASS/FAIL e anexar relatórios).

Links úteis:
- Zephyr REST API (consultar docs do seu provedor — Cloud/Server).
