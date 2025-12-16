# Gabarito — Júnior

Referências e soluções para os exercícios propostos.

1. Implementação: ver `gabarito/exemplos-codigo/validador-cnpj.py` — função `is_valid_cnpj` que limpa entrada, verifica tamanho, rejeita sequências e calcula dígitos verificadores.
2. Testes: exemplos em `gabarito/exemplos-codigo/test-validador.py` usando `pytest.mark.parametrize`.
3. README: instruções mínimas — criar venv, instalar `pytest`, rodar `pytest -q`.
4. CI (exemplo): workflow deve instalar dependências e rodar `pytest`; falhar o build quando testes falharem.

Notas: usar os arquivos do `gabarito/exemplos-codigo/` como base e adaptar ao layout do projeto.
# Gabarito — Nível Júnior

Este arquivo mapeia exercícios do nível Júnior para gabaritos automatizados e instruções de execução.

1) Exercício: Validador de CNPJ

- Código de referência: `gabarito/exemplos-codigo/validador-cnpj.py`
- Testes automatizados (pytest): `gabarito/exemplos-codigo/tests/test_validador_pytest.py`
- Como executar (na raiz `QA-Guide`):

```bash
python -m venv .venv
.venv\Scripts\Activate.ps1   # Windows PowerShell
pip install -r requirements.txt
pytest gabarito/exemplos-codigo/tests/test_validador_pytest.py -q
```

- Resultado esperado: todos os testes passam; saída `.` por teste ou relatório junit se configurado.

2) Exercício: Converter caso API (JUN-API-001) para PyTest

- Arquivo sugerido de entrega: `gabarito/exemplos-codigo/tests/test_jun_api_001.py` (sugestão de skeleton abaixo).
- Skeleton recomendado (incluir em PR):

```py
import requests

def test_create_user():
    payload = {"name":"Ana QA","email":"ana.qa+teste@example.com","role":"tester"}
    r = requests.post('https://api-staging.local/users', json=payload)
    assert r.status_code == 201
    data = r.json()
    assert 'id' in data

```

3) Boas práticas para gabaritos Júnior

- Documentar como executar localmente e dependências (ver `requirements.txt`).
- Incluir fixtures em `fixtures/` e referenciar nos testes.
- Garantir que testes sejam determinísticos e não dependam de dados reais.

Referências rápidas: `gabarito/templates/test-case.md`, `gabarito/exemplos-codigo/`.
