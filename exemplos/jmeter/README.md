**Exemplo — JMeter**

Este diretório deve conter `plan.jmx` de exemplo e instruções para execução headless.

Comando de execução (não-GUI):

```bash
jmeter -n -t plan.jmx -l results.jtl -Jthreads=100 -Jrampup=60
jmeter -g results.jtl -o report/
```

Também é possível usar Docker para garantir reprodutibilidade:

```bash
docker run --rm -v $(pwd):/tests -w /tests justb4/jmeter:5.4.1 -n -t plan.jmx -l results.jtl
```
