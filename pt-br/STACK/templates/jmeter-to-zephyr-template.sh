#!/usr/bin/env bash
# jmeter-to-zephyr-template.sh
# Template de script que processa resultados JMeter (JTL/HTML) e publica evidências no Zephyr via API.
# Uso: export ZEPHYR_BASE_URL=...; export ZEPHYR_API_TOKEN=...; ./jmeter-to-zephyr-template.sh path/to/result.jtl

set -euo pipefail

JTL_PATH=${1:-}
if [[ -z "$JTL_PATH" ]]; then
  echo "Usage: $0 path/to/result.jtl"
  exit 1
fi

# Variáveis esperadas (configurar no CI)
ZEPHYR_BASE_URL=${ZEPHYR_BASE_URL:-}
ZEPHYR_API_TOKEN=${ZEPHYR_API_TOKEN:-}
ZEPHYR_PROJECT_KEY=${ZEPHYR_PROJECT_KEY:-}
ZEPHYR_CYCLE_NAME=${ZEPHYR_CYCLE_NAME:-automated}

echo "Processing JMeter result: $JTL_PATH"

# Exemplo: compactar relatório HTML para anexar
ZIP_OUT="$(dirname "$JTL_PATH")/jmeter-report-$(date +%Y%m%d%H%M%S).zip"
if [[ -d "${JTL_PATH%.jtl}_report" ]]; then
  zip -r "$ZIP_OUT" "${JTL_PATH%.jtl}_report"
  echo "Created $ZIP_OUT"
fi

# Template de requisição (substituir endpoint conforme Zephyr)
echo "Would upload $ZIP_OUT to Zephyr at $ZEPHYR_BASE_URL (template)."
echo "Set ZEPHYR_BASE_URL and ZEPHYR_API_TOKEN and implement the curl POST to the correct endpoint."

exit 0
