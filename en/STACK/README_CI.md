README — Integração CI (exemplo GitHub Actions)
=============================================

Este documento descreve um exemplo de integração contínua para executar testes Bruno e JMeter, publicar artefatos e usar o template `bruno-to-zephyr-template.py` para enviar resultados ao Zephyr (modo `--dry-run` por padrão).

Segurança / Secrets
- Defina os seguintes secrets em seu repositório (Settings -> Secrets):
  - `ZEPHYR_BASE_URL` — URL base da API Zephyr/Jira
  - `ZEPHYR_API_TOKEN` — token de API do Zephyr
  - `ZEPHYR_PROJECT_KEY` — chave do projeto Jira
  - `BRUNO_CLI_INSTALL` — comando ou instrução para instalar o CLI Bruno (opcional)

Exemplo de workflow (GitHub Actions)
----------------------------------

```yaml
name: CI - Tests (Bruno + JMeter)

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.10'

      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install requests
          # Instale aqui o Bruno CLI se necessário
          # ${{ secrets.BRUNO_CLI_INSTALL }}

      - name: Run Bruno tests
        run: |
          mkdir -p reports/bruno
          bruno run tests/bruno/ --env tests/bruno/env/staging.yaml --reporter junit --output reports/bruno/results.xml || true
        continue-on-error: true

      - name: Run JMeter (headless)
        run: |
          mkdir -p reports/jmeter
          # Exemplo usando Docker image oficial de JMeter
          docker run --rm -v ${{ github.workspace }}:/tests -w /tests justb4/jmeter:5.4.1 -n -t tests/jmeter/plan.jmx -l reports/jmeter/result.jtl || true
        continue-on-error: true

      - name: Upload test artifacts
        uses: actions/upload-artifact@v4
        with:
          name: test-reports
          path: |
            reports/bruno/**
            reports/jmeter/**

      - name: Publish Bruno results to Zephyr (dry-run)
        env:
          ZEPHYR_BASE_URL: ${{ secrets.ZEPHYR_BASE_URL }}
          ZEPHYR_API_TOKEN: ${{ secrets.ZEPHYR_API_TOKEN }}
          ZEPHYR_PROJECT_KEY: ${{ secrets.ZEPHYR_PROJECT_KEY }}
        run: |
          python STACK/templates/bruno-to-zephyr-template.py reports/bruno/results.xml STACK/templates/mapping-example.json --dry-run

      # Se validar o dry-run, remova o flag --dry-run para efetivar.

```

Notas finais
- Ajuste os comandos `bruno` e JMeter conforme sua infraestrutura.
- Os templates e scripts em `STACK/templates/` são exemplos; personalize endpoints e payloads antes de executar em produção.
