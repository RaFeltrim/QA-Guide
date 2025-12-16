# Python + pytest (Júnior)

## Seção 1 – Conceito e por que importa

`pytest` é a ferramenta padrão para testes em Python graças à sua simplicidade, fixtures poderosas e ecossistema. Para QAs júnior, dominar `pytest` permite escrever testes unitários e de integração, automatizar verificações e integrar testes em pipelines CI para feedback rápido.

O foco deste documento é: estrutura de testes, fixtures, parametrização, boas práticas e como executar localmente e em CI.

## Seção 2 – Ambiente e instalação

Recomendado (Windows):

```powershell
python -m venv .venv
.\.venv\Scripts\activate
pip install pytest pytest-cov
```

Arquivo opcional `pytest.ini` mínimo:

```ini
[pytest]
addopts = -q --cov=src --cov-report=term-missing
python_files = test_*.py
```

## Seção 3 – Exemplo prático (validador simples)

Arquivo exemplo: `src/validador.py`

```python
def normalizar(cnpj: str) -> str:
	return ''.join(filter(str.isdigit, (cnpj or '')))

def validar_cnpj_basico(cnpj: str) -> bool:
	"""Validação simples: apenas checa se há 14 dígitos após normalização."""
	n = normalizar(cnpj)
	return len(n) == 14
```

Teste com `pytest`: `tests/test_validador.py`

```python
import pytest
from src.validador import validar_cnpj_basico

@pytest.mark.parametrize("input,expected", [
	("11.222.333/0001-81", True),
	("11222333000181", True),
	("11.222.333/0001-8", False),
	("", False),
	(None, False),
])
def test_validar_cnpj_basico(input, expected):
	assert validar_cnpj_basico(input) is expected
```

Explicação:
- `parametrize` permite testar múltiplos casos com menos código
- Separar `src/` e `tests/` deixa o projeto organizado

## Seção 4 – Fixtures úteis e técnicas

- `tmp_path`: para arquivos temporários
- `monkeypatch`: modificar variáveis/ambiente
- `capsys`: capturar saída do console

Exemplo de fixture em `tests/conftest.py`:

```python
import pytest

@pytest.fixture
def usuario_fixture():
	return {"email": "qa+teste1@example.com", "nome": "QA Teste"}
```

Uso no teste:

```python
def test_algo_com_fixture(usuario_fixture):
	assert usuario_fixture['email'].startswith('qa+')
```

## Seção 5 – Boas práticas

- Testes pequenos, determinísticos e rápidos
- Nomeie testes com `test_<funcionalidade>_<condicao>`
- Evite dependência entre testes
- Use `pytest.mark.skip` ou `xfail` quando necessário, com justificativa

## Seção 6 – Executando local e em CI

Comandos locais:

```bash
pytest -q
coverage run -m pytest && coverage report
```

Exemplo mínimo de job GitHub Actions (trecho):

```yaml
- name: Run tests
  uses: actions/setup-python@v4
  with:
	python-version: 3.10
- run: |
	python -m pip install --upgrade pip
	pip install pytest pytest-cov
	pytest --maxfail=1 --disable-warnings -q
```

## Seção 7 – Exercícios (scaffolded)

### Exercício 1 — Escrever testes parametrizados (guiado)
- **Objetivo:** Implementar `validar_cnpj_basico()` em `src/validador.py` e escrever os testes parametrizados em `tests/test_validador.py`.
- **Critério de aceitação:** Todos os testes passam localmente; `pytest -q` retorna exit code 0.

### Exercício 2 — Fixtures e isolamento (intermediário)
- **Objetivo:** Criar `conftest.py` com fixture `usuario_fixture` e usar `tmp_path` para criar um arquivo CSV de massa de teste.
- **Critério de aceitação:** Teste lê o CSV do `tmp_path` e valida registros.

### Exercício 3 — Cobertura e CI (autônomo)
- **Objetivo:** Adicionar `pytest-cov` e configurar `pytest.ini` para gerar relatório. Criar workflow simples no `.github/workflows/ci.yml` que roda testes e falha se cobertura < 80%.
- **Critério de aceitação:** Workflow executa localmente (via `act` ou GitHub) e o job falha quando cobertura abaixo do limite.

## Seção 8 – Dica de mercado / Soft skill

Ao abrir PR, inclua comandos para executar testes localmente e capture rapidamente logs de falhas. Explique não só o que falhou, mas o impacto do erro no usuário.

## Seção 9 – Referências / Próximos passos

- Exemplo de validador: `gabarito/exemplos-codigo/validador-cnpj.py`
- Próximo documento recomendado: `03-NIVEL-JUNIOR/03-validador-cnpj.md` (implementar validador completo e gabaritos)

---

> Observação: mantenha os testes no controle de versão e execute-os em PRs para garantir qualidade contínua.

