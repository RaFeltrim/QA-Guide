**Guia Completo — Bruno (Testes de API)**

Visão geral
- `Bruno` é a ferramenta/stack oficial usada para execução e gestão de testes de API nesta equipe. Este documento descreve instalação, estrutura de casos, formatos de arquivo, execução local, execução em CI, geração de relatórios e integração com Zephyr/Jira.

Instalação & requisitos
- Obtenha o binário/cliente `Bruno` interno a partir do repositório de ferramentas da equipe (ou instale via package manager se disponível).
- Requisitos mínimos: Python 3.8+ (se o cliente for Python), Node 14+ (se for JS), ou binário distribuído. Confirme com o time de infra.

Estrutura de projetos e arquivos
- Convenção de pastas (na raiz do repositório de testes):
  - `tests/bruno/` — casos de teste Bruno (YAML/JSON)
  - `tests/bruno/env/` — arquivos de ambiente (staging, prod, dev)
  - `tests/bruno/data/` — CSV/JSON com dados de teste
  - `reports/bruno/` — relatórios gerados (JUnit, JSON, HTML)

Formato de um caso (exemplo YAML)
```yaml
name: Health check
description: Verifica /health retorna 200 e campo status
request:
  method: GET
  url: "{{baseUrl}}/health"
  headers:
    Accept: application/json
assertions:
  - type: status
    expected: 200
  - type: jsonpath
    path: $.status
    expected: UP
```

Variáveis de ambiente (exemplo `env/staging.yaml`)
```yaml
baseUrl: https://staging.api.example.com
authToken: "{{seu_token_aqui}}"
```

Execução local
- Executar um único arquivo:
```
bruno run tests/bruno/health.yaml --env tests/bruno/env/staging.yaml --reporter junit --output reports/bruno/health-results.xml
```
- Executar toda a pasta:
```
bruno run tests/bruno/ --env tests/bruno/env/staging.yaml --reporter json --output reports/bruno/summary.json
```

Integração com CI (exemplo básico)
- Em pipelines (GitHub Actions / GitLab CI / Jenkins) executar:
  - Instalar dependências / ferramenta Bruno
  - Rodar `bruno run` com o ambiente apropriado
  - Publicar artefatos (`reports/bruno/*.xml`, `*.json`)
  - Converter relatórios para JUnit (se necessário) e usar para quebrar build quando falhas críticas ocorrerem

Geração de relatórios
- Recomendado: gerar JUnit (`results.xml`) e JSON (`summary.json`).
- Relatórios JUnit permitem integração com sistemas de CI e com Zephyr (via upload ou scripts que consomem JUnit).

Integração com Zephyr (fluxo sugerido)
- Fluxo mínimo automatizado:
  1. Executar `bruno run` no CI e gerar `results.xml` (JUnit) ou `summary.json`.
  2. Usar script que consome esse relatório e atualiza execuções no Zephyr via API (associar cada caso Bruno a um `Test` do Zephyr).
  3. Anexar artefatos (JSON/JUnit/HTML) nas execuções.

Boas práticas e convenções
- Nomeie casos e arquivos de forma descritiva: `01_health.yaml`, `user_login.yaml`.
- Padronize variáveis de ambiente (ex.: `BASE_URL`, `AUTH_TOKEN`) e não commite segredos.
- Mantenha dados de teste em `tests/bruno/data/` e use `CSV Data Set` style para parametrização.
- Limpe e isole estados: sempre inclua passos de setup/teardown quando o teste altera dados.

Exemplo de script para publicar resultados (pseudo):
```python
# bruno-to-zephyr.py (pseudo)
import requests, xml.etree.ElementTree as ET

# carregar results.xml
# iterar testes e chamar Zephyr API para criar/atualizar execuções
```

Checklist antes do push
- Validar que `env` não contém tokens harmônicos.
- Gerar relatório local e revisá-lo.
- Incluir commit com mensagem clara: `test(bruno): adicionar X`.

Observações finais
- Este guia descreve convenções e exemplos; adapte comandos `bruno` de acordo com a implementação real do cliente (substitua `bruno` pelo binário/CLI correto e opções reais). Documente quaisquer flags especiais do Bruno no README da ferramenta interna.
