**Guia STACK — Zephyr for Jira (uso na STACK de QA)**

Resumo
- Documenta como usar o Zephyr como repositório de resultados de teste na STACK: mapeamento de casos, criação de ciclos, integração via API e boas práticas de evidências.

Conceitos chave
- `Test` — caso de teste no Zephyr
- `Test Cycle` — conjunto de execuções para uma release/iteração
- `Execution` — execução de um `Test` dentro de um `Test Cycle`

Fluxo integrado (Bruno / JMeter -> Zephyr)
1. Identificar o `Test` no Zephyr que corresponde ao caso Bruno/JMeter (usar um campo ID externo ou tag para mapear).
2. No CI, executar Bruno e JMeter e gerar relatórios (JUnit/JSON/JTL/HTML).
3. Rodar um script que consome os relatórios e:
   - cria/atualiza um `Test Cycle` se necessário;
   - cria/atualiza `Execution` para cada `Test` mapeado;
   - anexa relatórios/artefatos relevantes nas execuções;
   - marca o status `PASS/FAIL` conforme resultado.

APIs e autenticação
- Zephyr Cloud/Server possuem endpoints REST. Use tokens/API keys adequados e armazene-os como segredos no CI (`ZEPHYR_API_TOKEN`).

Exemplo de mapeamento
- No caso Bruno, adicione metadados no YAML do teste: `zephyr_id: Z-1234`.
- Script CI usa `zephyr_id` para localizar o `Test` e atualizar `Execution`.

Evidências
- Anexar `reports/bruno/*.json` e `reports/jmeter/report_html.zip` como evidência.
- Para artefatos grandes, anexar link (artifact storage) em vez do arquivo bruto.

Boas práticas
- Nome padrão para ciclos: `release-{version}_automated`.
- Registrar quem executou, timestamp e commit SHA no campo de execução.
- Tratar falhas transientes com retry antes de marcar como FAIL.
