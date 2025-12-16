# Relatório da Sessão — QA-Guide

Data: 16 de dezembro de 2025

Resumo executivo

Nesta sessão desenvolvemos e ampliamos o conteúdo do `QA-Guide`, seguindo o padrão e o prompt de geração fornecido. O trabalho focou na finalização de materiais de nível Júnior e na criação de guias Pleno: E2E (Cypress), performance (k6), padrões de pipeline e diretrizes de uso de IA para automação.

Principais entregáveis (seleção)

- Estrutura e índices por nível criados sob `QA-Guide/`.
- Estagiário:
  - `02-NIVEL-ESTAGIARIO/01-testes-manuais.md`
  - `02-NIVEL-ESTAGIARIO/02-bug-reports.md`
  - gabaritos e checklist em `gabarito/`.
- Júnior (completo):
  - `03-NIVEL-JUNIOR/01-python-pytest.md`
  - `03-NIVEL-JUNIOR/02-javascript-jest.md`
  - `03-NIVEL-JUNIOR/03-validador-cnpj.md` + implementações e testes em `gabarito/exemplos-codigo/`
  - `03-NIVEL-JUNIOR/06-bancodados-testes.md`
  - `03-NIVEL-JUNIOR/07-agile-scrum-qa.md`
  - `03-NIVEL-JUNIOR/08-estrategia-funneling.md`
  - `03-NIVEL-JUNIOR/09-estrutura-casos-teste.md`
  - `03-NIVEL-JUNIOR/10-soft-skills-intro.md`
- Pleno (iniciado):
  - `04-NIVEL-PLENO/01-e2e-cypress.md`
  - `04-NIVEL-PLENO/02-performance-k6.md`
  - `04-NIVEL-PLENO/03-pipeline-patterns.md`
  - `04-NIVEL-PLENO/04-ia-automation-guidelines.md`
- Infra/auxiliares:
  - `README.md` (QA-Guide) atualizado
  - `requirements.txt` e `package.json` exemplos
  - `.github/` templates criados/atualizados (PR/Issue, workflows exemplos)

Status atual (progresso)

- Concluído: material Estagiário e Júnior, templates, exemplos de código/testes (Python/JS), README e arquivos auxiliares.
- Em andamento: documentação do nível Pleno (arquivos iniciais criados; ainda faltam guias avançados e gabaritos).
- Pendente/planejado:
  - Completar nível Sênior (shift-left, KPIs, LGPD, roadmap).
  - Gerar gabaritos adicionais para Júnior e Pleno (automatizações e exemplos completos).
  - Aplicar reorganização e deduplicação conforme `PROMPT_REORGANIZACAO_V1.1.md`.
  - Validar referências ao `CNPJ-Docs` e garantir separação de conteúdo.
  - Executar revisão final e validação local (rodar testes e CI quando aplicável).

Instruções rápidas para reproduzir localmente

- Instalar dependências Python:

```bash
python -m venv .venv
.venv\Scripts\Activate.ps1  # Windows PowerShell
pip install -r requirements.txt
```

- Instalar dependências Node e executar exemplos:

```bash
npm ci
npm run e2e:headless   # executar cypress headless
npm run perf           # executar k6 (se instalado)
pytest -q              # executar testes Python
```

Arquivos-chave criados (caminho relativo)

- [QA-Guide/README.md](QA-Guide/README.md)
- [QA-Guide/02-NIVEL-ESTAGIARIO/01-testes-manuais.md](QA-Guide/02-NIVEL-ESTAGIARIO/01-testes-manuais.md)
- [QA-Guide/02-NIVEL-ESTAGIARIO/02-bug-reports.md](QA-Guide/02-NIVEL-ESTAGIARIO/02-bug-reports.md)
- [QA-Guide/03-NIVEL-JUNIOR/01-python-pytest.md](QA-Guide/03-NIVEL-JUNIOR/01-python-pytest.md)
- [QA-Guide/03-NIVEL-JUNIOR/03-validador-cnpj.md](QA-Guide/03-NIVEL-JUNIOR/03-validador-cnpj.md)
- [QA-Guide/gabarito/exemplos-codigo/validador-cnpj.py](QA-Guide/gabarito/exemplos-codigo/validador-cnpj.py)
- [QA-Guide/04-NIVEL-PLENO/01-e2e-cypress.md](QA-Guide/04-NIVEL-PLENO/01-e2e-cypress.md)
- [QA-Guide/04-NIVEL-PLENO/02-performance-k6.md](QA-Guide/04-NIVEL-PLENO/02-performance-k6.md)
- [QA-Guide/04-NIVEL-PLENO/03-pipeline-patterns.md](QA-Guide/04-NIVEL-PLENO/03-pipeline-patterns.md)
- [QA-Guide/04-NIVEL-PLENO/04-ia-automation-guidelines.md](QA-Guide/04-NIVEL-PLENO/04-ia-automation-guidelines.md)

Próximos passos recomendados

1. Validar localmente os exemplos (rodar pytest, Cypress e k6 onde possível).
2. Completar guias Pleno restantes e iniciar Sênior (priorizar KPIs, LGPD e shift-left).
3. Gerar gabaritos automatizados para Júnior e Pleno (mapear exercícios para arquivos de teste reais).
4. Aplicar reorganização/deduplicação e atualizar sumário principal se necessário.

Observações finais

Todo o conteúdo gerado segue a solicitação de manter `QA-Guide` focado em QA e usar `CNPJ-Docs` apenas como referência externa. Artefatos gerados foram versionados no workspace; recomenda-se executar validações de segurança/linters antes de executar qualquer código em ambientes sensíveis.

Arquivo gerado por: workflow assistente — ver histórico de commits/edits no workspace.
