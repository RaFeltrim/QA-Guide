STACK Templates
================

Esta pasta contém templates e scripts de exemplo para integrar a STACK de QA (Bruno, JMeter) com um gerenciador de testes (Zephyr).

Observações importantes:
- São templates: não há endpoints/API reais embutidos. Configure as variáveis de ambiente descritas abaixo antes de usar.
- Nunca commite tokens/segredos em texto claro.

Variáveis de ambiente usadas nos templates (exemplos):
- `ZEPHYR_BASE_URL` – URL base da API do Zephyr (ex.: https://your-jira-instance.atlassian.net)
- `ZEPHYR_API_TOKEN` – token de autenticação (ou `ZEPHYR_USERNAME` + `ZEPHYR_PASSWORD` conforme sua instalação)
- `ZEPHYR_PROJECT_KEY` – chave do projeto no Jira
- `ZEPHYR_CYCLE_NAME` – nome do ciclo onde publicar execuções
- `BRUNO_RESULTS` – caminho para arquivo de resultados Bruno (JSON/JUnit)
- `JTL_PATH` – caminho para arquivo JMeter JTL/relatório

Arquivos neste diretório:
- `bruno_test_template.yaml` — template de caso Bruno
- `bruno-to-zephyr-template.py` — script template para consumir relatório Bruno e publicar execuções no Zephyr
- `jmeter-to-zephyr-template.sh` — script template para processar JMeter JTL/report e enviar evidências ao Zephyr

Como usar:
1. Preencha as variáveis de ambiente no seu CI ou localmente (ex.: export ZEPHYR_API_TOKEN=...)
2. Ajuste os mapeamentos internos (como `test_name -> zephyr_id`) no script ou em um arquivo de mapping.
	- Exemplo de mapping: `STACK/templates/mapping-example.json`.
3. Execute o script com o relatório gerado pelo Bruno/JMeter.

CI (exemplo GitHub Actions) - passos essenciais:

1. Instalar dependências (Python) e configurar secrets (`ZEPHYR_API_TOKEN`, `ZEPHYR_BASE_URL`, `ZEPHYR_PROJECT_KEY`).
2. Executar os testes Bruno: `bruno run tests/bruno/ --env tests/bruno/env/staging.yaml --reporter junit --output reports/bruno/results.xml`.
3. Publicar artefatos (upload `reports/bruno/results.xml`).
4. Executar o script de integração (dry-run inicialmente):

```bash
python STACK/templates/bruno-to-zephyr-template.py reports/bruno/results.xml STACK/templates/mapping-example.json --dry-run
```

5. Caso o dry-run esteja ok, executar sem `--dry-run` para efetivar as chamadas (após adaptar endpoints reais).

Notas:
- Os scripts são templates; adapte os endpoints e payloads à sua instância Zephyr (Cloud/Server).
- Use secrets do provedor de CI para armazenar tokens e URLs.
