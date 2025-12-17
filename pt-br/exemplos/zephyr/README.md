**Exemplo — Integração Zephyr**

Este diretório contém exemplos e scripts que ajudam a enviar resultados automáticos para o Zephyr via API.

Conteúdo sugerido:
- `postman-to-zephyr.py` — script exemplo que pega um report JUnit/JSON do Newman e cria execuções no Zephyr via API.
- `jmeter-to-zephyr.sh` — script que converte JMeter JTL/HTML em um artefato anexável e atualiza execuções.

Observação: os scripts devem usar variáveis de ambiente para credenciais (`ZEPHYR_API_TOKEN`, `JIRA_BASE_URL`).

Exemplo de uso (placeholder):

```bash
python postman-to-zephyr.py --report newman-report.json --cycle "release-1.2"
```
