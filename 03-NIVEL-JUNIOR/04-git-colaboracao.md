# Git e Colaboração (Júnior)

Fluxo recomendado: branches `feat/`, `fix/`, pull requests com descrição, reviewers, e checklist de QA.

> TODO: adicionar templates de PR e exemplos de mensagens.
## Padrões e templates

- Branch names: `feat/<area>-<descricao>`, `fix/<area>-<descricao>`, `chore/<descricao>`
- Use o template de PR disponível em `.github/PULL_REQUEST_TEMPLATE.md`.
- Ao abrir PR inclua: descrição, como testar localmente, checklist de QA, e quais flows precisam de atenção.

## Exemplo de fluxo rápido
1. `git checkout -b feat/validador-cnpj-implementacao`
2. Implementar mudança e adicionar testes
3. `git add . && git commit -m "feat(validador): implementar validação básica de CNPJ"`
4. `git push -u origin feat/validador-cnpj-implementacao`
5. Abrir PR e preencher checklist usando o template

## Exemplo de mensagem de PR (modelo)
```
[Validador] Implementa validar_cnpj e testes unitários

Resumo:
- Implementa função `validar_cnpj` em Python e testes com `pytest`.

Como testar localmente:
- `python -m venv .venv`
- `source .venv/bin/activate` (ou `\.venv\Scripts\activate` no Windows)
- `pip install -r requirements.txt`
- `pytest -q`

Issue relacionada: #123
```

