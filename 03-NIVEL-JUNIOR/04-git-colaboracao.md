# Git e Colaboração (Júnior)

Fluxo recomendado: branches `feat/`, `fix/`, pull requests com descrição, reviewers, e checklist de QA.


Templates e boas práticas (PRs e commits)

Exemplo de template de PR (curto):

```
Título: [FEAT|FIX|DOC] <breve descrição>

Descrição:
- Contexto breve do problema/feature
- O que foi alterado
- Como testar (passos rápidos)

Checklist:
- [ ] Testes unitários adicionados/atualizados
- [ ] Documentação atualizada
- [ ] Revisão de segurança/privacidade (se aplicável)
```

Exemplo de mensagem de commit (convenção simples):

- `feat(auth): adicionar validação de tokens` 
- `fix(login): corrigir condição de borda em senha`

Dicas:
- Abra PRs pequenos e focados (máx 200 linhas de mudança quando possível).
- Inclua instruções claras de como validar localmente e com dados de teste.

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

