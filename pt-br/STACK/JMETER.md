**Guia STACK — JMeter (uso na STACK de QA)**

Resumo
- Este documento descreve como o JMeter faz parte da STACK de QA: estrutura de planos, execução headless, geração de relatórios e integração com o fluxo Bruno/Zephyr.

Estrutura e convenções
- Pastas recomendadas:
  - `tests/jmeter/plan.jmx` — planos JMeter por cenário
  - `tests/jmeter/data/` — CSVs e fixtures
  - `reports/jmeter/` — resultados JTL/HTML
- Nomenclatura: `releaseX_scenarioY.jmx` e `releaseX_results_YYYYMMDD.jtl`.

Execução headless (CI)
```bash
jmeter -n -t tests/jmeter/plan.jmx -l reports/jmeter/result.jtl -Jthreads=100 -Jrampup=60
jmeter -g reports/jmeter/result.jtl -o reports/jmeter/report_html/
```

Integração com Bruno e Zephyr
- Use JMeter para testes de carga; Bruno foca em testes funcionais de API. Ambos os resultados devem ser coletados no CI e associados a execuções no Zephyr.
- Fluxo sugerido:
  1. Executar JMeter no CI e gerar `result.jtl` e `report_html`.
  2. Converter ou resumir resultados em JSON/JUnit se necessário.
  3. Anexar relatório ou publicar resumo no Zephyr via API para referência na execução do ciclo.

Boas práticas
- Evite listeners pesados em execução de carga; gere relatórios apenas após a execução.
- Parametrize endpoints e dados via propriedades (`-J` flags).
- Use containers/Docker para garantir reprodutibilidade: `justb4/jmeter` image.

Exemplo Docker
```bash
docker run --rm -v $(pwd):/tests -w /tests justb4/jmeter:5.4.1 -n -t tests/jmeter/plan.jmx -l reports/jmeter/result.jtl
```

Thresholds e alertas
- Defina thresholds de sucesso no CI (ex.: p95 < 500ms, erro < 0.5%). Se thresholds falharem, marcar build como falho e criar issue/alerta.
