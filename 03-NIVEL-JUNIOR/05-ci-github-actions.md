# CI / GitHub Actions (Júnior)

Como integrar testes unitários em um workflow simples de CI. Abaixo um exemplo mínimo de workflow e recomendações para dividir jobs rápidos e lentos.

## Exemplo mínimo de workflow (`.github/workflows/ci.yml`)

```yaml
name: CI
on: [push, pull_request]
jobs:
	test:
		runs-on: ubuntu-latest
		steps:
			- uses: actions/checkout@v3
			- name: Setup Python
				uses: actions/setup-python@v4
				with:
					python-version: '3.10'
			- name: Install
				run: |
					python -m pip install --upgrade pip
					pip install -r requirements.txt
			- name: Run unit tests
				run: pytest -q
```

## Recomendações de jobs e matrix

- Separe jobs rápidos (unit) dos lentos (e2e/perf).
- Use `matrix` para testar em múltiplas versões (ex.: Python 3.9/3.10/3.11 ou Node 16/18).

## Exemplo de matrix (Node.js)

```yaml
jobs:
	js-tests:
		runs-on: ubuntu-latest
		strategy:
			matrix:
				node-version: [16, 18]
		steps:
			- uses: actions/checkout@v3
			- name: Setup Node
				uses: actions/setup-node@v3
				with:
					node-version: ${{ matrix.node-version }}
			- run: npm ci
			- run: npm test
```

## Quando falhar o job

- Expor logs e artifacts de cobertura para facilitar o debug
- Documentar passos usados para reproduzir localmente no PR

