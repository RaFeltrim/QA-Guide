# 02 — Performance com k6

Objetivo: apresentar k6 para testes de carga e métricas essenciais.

- Instalação: `brew install k6` ou usar imagem Docker `loadimpact/k6`
- Script básico (`script.js`):

```js
import http from 'k6/http';
import { check } from 'k6';

export default function() {
  const res = http.get('https://example.com')
  check(res, { 'status 200': r => r.status === 200 })
}
```

Métricas: RPS, p95/p99 latência, erros por segundo, throughput.
Boas práticas: começar com testes de baseline, parametrizar cenários e usar thresholds.
# Performance com k6 — Nível Pleno

Guia prático para criação de testes de performance usando `k6`. Contém configuração mínima, exemplos de scripts, integração com CI e exercício hands-on.

Quando usar k6

- Testes de carga e stress em endpoints críticos.
- Medir throughput, latência, erros e comportamento sob concorrência.

Instalação rápida

```bash
# via Homebrew / macOS
brew install k6

# ou usando binário via releases
# https://k6.io/docs/getting-started/installation/
```

Estrutura de um script k6 básico (`scripts/load_test.js`)

```js
import http from 'k6/http'
import { check, sleep } from 'k6'

export let options = {
	stages: [
		{ duration: '30s', target: 20 },
		{ duration: '1m', target: 50 },
		{ duration: '30s', target: 0 },
	],
	thresholds: {
		'http_req_duration': ['p(95)<500'],
	},
}

export default function () {
	const res = http.get('https://api-staging.local/health')
	check(res, { 'status is 200': r => r.status === 200 })
	sleep(1)
}
```

Boas práticas Pleno

- Comece com scripts pequenos e evolua para cenários representativos.
- Use `stages` ao invés de `vus` fixos para simular ramp-up/hold/teardown.
- Defina `thresholds` para falhar builds automaticamente quando SLAs forem violados.
- Parametrize dados via `__ENV` e use fixtures em `fixtures/` quando necessário.
- Não execute testes de carga em ambientes de produção sem autorização.

Coleta de resultados e análise

- Rode localmente com `k6 run scripts/load_test.js`.
- Para coleta centralizada, use InfluxDB + Grafana ou `k6 cloud`.
- Salve resultados em JSON para comparação automatizada:

```bash
k6 run --out json=results.json scripts/load_test.js
```

Integração com CI (snippet GitHub Actions)

```yaml
name: perf
on: [push]
jobs:
	k6:
		runs-on: ubuntu-latest
		steps:
			- uses: actions/checkout@v3
			- name: Install k6
				run: sudo apt-get update && sudo apt-get install -y gnupg software-properties-common && \
						 sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 68B6B5A8 && \
						 sudo add-apt-repository "deb https://dl.k6.io/deb stable main" && \
						 sudo apt-get update && sudo apt-get install -y k6
			- name: Run k6
				run: k6 run --out json=results.json scripts/load_test.js
			- name: Upload results
				uses: actions/upload-artifact@v3
				with:
					name: k6-results
					path: results.json
```

Exercício prático (nível Pleno)

- Objetivo: criar um script de carga que simule o fluxo de listagem e criação de recursos (GET /items, POST /items) com ramp-up até 100 VUs e thresholds para 95º percentil < 800ms.
- Entregáveis:
	- `scripts/load_items_test.js`
	- comando `npm run perf` no `package.json` ou README com instruções de execução
	- `results.json` de uma execução de exemplo (anexar como artefato no PR)

Critérios de aceitação

- Script atende thresholds locais; resultados gerados em `results.json`.
- CI snippet integrado e executável (pelo menos em branch de teste).

Referências: documentação oficial `k6` — https://k6.io/docs/, integração com Grafana/InfluxDB e exemplos internos de `cypress` para fluxos E2E.

# Performance com k6 (Pleno)

Introdução a scripts k6, métricas P95/P99, e análise de resultados.


Script exemplo (k6) e interpretação básica

Exemplo `k6` simples (`k6-script.js`):

```js
import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
	vus: 10,
	duration: '30s'
};

export default function () {
	http.get('https://test-app.local/');
	sleep(1);
}
```

Interpretação de resultados:
- `vus` e `duration` mostram carga aplicada; aumentar até encontrar degradação.
- VT: Latência média e p95 são métricas-chave; se p95 sobe muito, investigar backend/DB.
- Erros non-2xx indicam problemas funcionais sob carga.

Inclua execução no CI como job agendado (nightly) e armazene resultados como artifacts para análise.

