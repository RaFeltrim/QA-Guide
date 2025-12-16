**Guia Rápido — JMeter**

Resumo: orientações para criar planos de teste de carga com Apache JMeter, execução em modo não-GUI e integração com CI.

- **Instalação:** baixe JMeter (binário) ou use imagem Docker oficial.
- **Estrutura do Test Plan:** Thread Group -> Samplers (HTTP Request) -> Listeners (Summary, Aggregate) -> Assertions -> Timers.
- **Modo não-GUI (recomendado para CI):** execute com `-n -t testplan.jmx -l results.jtl`.

Exemplo de execução:

```bash
jmeter -n -t tests/plan.jmx -l results/result.jtl -Jthreads=50 -Jrampup=30
```

- **Relatórios:** gerar relatório HTML com `jmeter -g results.jtl -o report/`.
- **Integração CI:** usar imagem Docker ou executar comandos headless; exportar resultados e falhar build se thresholds forem violados.
- **Melhores práticas:** parametrizar endpoints, usar CSV Data Set para dados, evitar listeners pesados em execução de carga, ajustar ramp-up e duration.

Links úteis:
- JMeter: https://jmeter.apache.org/
