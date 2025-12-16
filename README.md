# QA-Guide — Como usar este repositório

Este repositório contém guias, exercícios e gabaritos para formação em QA (Estagiário → Sênior).

Sumário rápido

- `02-NIVEL-ESTAGIARIO/` — testes manuais, bug reports e checklists.
- `03-NIVEL-JUNIOR/` — pytest, jest, CI básico, casos de teste e exercícios práticos.
- `04-NIVEL-PLENO/` — E2E (Cypress), performance (k6), padrões de pipeline e IA.
- `gabarito/` — templates, exemplos de código e testes.
- `fixtures/` — arquivos JSON com dados de exemplo.

Pré-requisitos (local)

- Node.js (18+) e `npm` para executar Cypress e scripts JS.
- Python 3.8+ e `pip` para executar exemplos em Python.
- `k6` instalado para executar testes de performance (opcional).

Instalação rápida

Python (recomendado criar venv):

```bash
python -m venv .venv
source .venv/bin/activate   # macOS / Linux
.venv\Scripts\Activate.ps1 # Windows PowerShell
pip install -r requirements.txt
```

Node (instalar dependências):

```bash
npm ci
```

Comandos úteis

- Executar testes Python (pytest):

```bash
pytest -q
```

- Executar Cypress (headless):

```bash
npm run e2e:headless
```

- Executar perf (k6):

```bash
npm run perf
```

Estrutura de desenvolvimento

- Os exercícios automatizados de exemplo estão em `gabarito/exemplos-codigo/`.
- Coloque novos casos de teste em `03-NIVEL-JUNIOR/` ou `04-NIVEL-PLENO/` conforme o nível.
- Use os templates em `gabarito/templates/` para padronizar casos e bug reports.

Como contribuir

- Abra um branch com `feature/docs/<resumo>`.
- Crie PR com descrição, link para issues relacionadas e marque revisores.
- Para artefatos gerados por IA, inclua o prompt em `gabarito/prompts/` e marque o PR com `ai-generated`.

Suporte local — dicas rápidas

- Para rodar apenas os exemplos Python do validador de CNPJ:

```bash
pytest gabarito/exemplos-codigo/tests/test_validador_pytest.py -q
```

- Se precisar iniciar a API de testes local, verifique `npm run start:test` nos `package.json` ou inicie o serviço conforme o README do projeto relacionado.

Problemas e contatos

- Abra uma issue usando o template em `.github/ISSUE_TEMPLATE.md`.

— Fim —
# QA-Guide

Guia completo de Quality Assurance (QA) — trilhas do nível Estagiário ao Sênior.

Este repositório contém material pedagógico, exercícios e gabaritos estruturados para treinar profissionais de QA com foco prático e progressivo. O conteúdo foi desenvolvido a partir da base técnica e metodológica do repositório `CNPJ-Docs` e adaptado para formar trilhas de aprendizado reutilizáveis.

## Índice

- Visão Geral
- Estrutura do Repositório
- Como Usar este Guia
- Instalação e Pré-requisitos
- Execução dos Exercícios (por nível)
- Modelos e Templates (bug report, checklist, entrega)
- Integração com `CNPJ-Docs`
- Fluxo de Contribuição (PRs, issues)
- CI / Automatização recomendada
- Licença e Contato

---

## Visão Geral

O objetivo deste repositório é oferecer uma trilha de aprendizado compacta e reproduzível para equipes e instrutores de QA. O material cobre:

- Fundamentos de teste manual e automatizado
- Implementação e testes de validadores (ex.: CNPJ)
- Estratégias de Shift Left e pipelines CI
- Exercícios práticos com gabarito e critérios de aceitação

Destina-se a: estagiários, juniores, plenos, líderes e instrutores.

---

## Estrutura do Repositório

- [GUIA-QA.md](GUIA-QA.md) - Guia principal (visão e trilhas)
- [exercicios/](exercicios/) - Exercícios por nível (`estagiario.md`, `junior.md`, `pleno.md`, `senior.md`)
- [gabarito/](gabarito/) - Respostas e templates para cada nível
- [README.md](README.md) - Este arquivo

---

## Como Usar este Guia

1. Clone o repositório:

```bash
git clone https://github.com/RaFeltrim/QA-Guide.git
cd QA-Guide
```

2. Leia o [GUIA-QA.md](GUIA-QA.md) para entender a trilha recomendada para o seu nível.
3. Escolha o nível apropriado (veja [exercicios/](exercicios/)): [estagiario](exercicios/estagiario.md), [junior](exercicios/junior.md), [pleno](exercicios/pleno.md) ou [senior](exercicios/senior.md) e siga os passos e critérios de aceitação.
4. Utilize os gabaritos em [gabarito/](gabarito/) somente após tentar resolver os exercícios por conta própria.

---

## Instalação e Pré-requisitos

Dependendo do exercício, você pode precisar de ferramentas como:

- Node.js (para exemplos TypeScript/Cypress)
- Python 3.10+ (para exemplos com pytest)
- Git
- Cypress ou Playwright (E2E)
- k6 (testes de performance)

Exemplo: configurar ambiente Python (Windows):

```powershell
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt  # se houver
```

Exemplo: configurar Node (Windows):

```powershell
npm install
```

---

## Execução dos Exercícios (por nível)

Estagiário
- Objetivo: executar testes manuais, aprender a documentar e reportar bugs.
- Arquivo: `exercicios/estagiario.md`
- Saída esperada: `estagiario-entrega.md` contendo 10 execuções + 3 bug reports.

Júnior
- Objetivo: implementar `validarCNPJ()` e testes unitários.
- Arquivo: `exercicios/junior.md`
- Exemplos de execução (pytest):

```bash
# Python
pytest -q
coverage run -m pytest && coverage report

# Node (Jest)
npm test
```

Pleno
- Objetivo: criar pipeline CI e cenários E2E.
- Arquivo: `exercicios/pleno.md`
- Exemplos:
  - Workflow GitHub Actions no diretório `.github/workflows/ci.yml`
  - Scripts k6 em `performance/` (quando aplicável)

Sênior
- Objetivo: planejamento estratégico, métricas e LGPD.
- Arquivo: `exercicios/senior.md`
- Saída esperada: documento estratégico + apresentação.

---

## Modelos e Templates

Alguns modelos úteis estão em `gabarito/`, reutilize-os para padronizar entregas:

- Template de bug report (`gabarito/estagiario.md`) — campos: título, ambiente, passos, resultado esperado/observado, evidências.
- Template de checklist de QA
- Exemplos de scripts e workflows (unit, integration, E2E, performance)

---

## Integração com `CNPJ-Docs`

O `QA-Guide` referencia materiais do repositório `CNPJ-Docs`. Para evitar duplicação e manter uma fonte de verdade, consulte o arquivo de referências canônicas:

- [QA-Guide/REFERENCES.md](REFERENCES.md)

Se precisar dos arquivos originais como fixtures, clone `CNPJ-Docs` conforme instruções no `REFERENCES.md`.

---

## Fluxo de Contribuição

1. Abra uma issue para discutir mudanças significativas.
2. Crie uma branch com prefixo `feat/` ou `fix/`.
3. Envie PR com descrição clara e referência à issue.
4. Inclua testes sempre que possível.

Exemplo de comandos:

```bash
git checkout -b feat/add-exercise-xyz
# fazer alterações
git add .
git commit -m "feat(docs): add exercise xyz"
git push -u origin feat/add-exercise-xyz
```

---

## CI / Automatização recomendada

Sugestões de pipelines:

- `ci.yml`: rodar `unit` → `integration` → gerar relatório de coverage
- `e2e.yml`: executar E2E em matrix (chrome, firefox)
- `perf.yml`: testes de carga agendados (k6)

Exemplo mínimo (GitHub Actions):

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
          python-version: 3.10
      - name: Install
        run: pip install -r requirements.txt
      - name: Run tests
        run: pytest -q
```

---

## Boas práticas e considerações de segurança/LGPD

- Não logar dados sensíveis (mascarar CPFs/CNPJs quando necessário).
- Minimizar massa de dados reais em ambientes públicos.
- Usar fixtures fictícias ou dados ofuscados em testes automatizados.

---

## Licença

Este repositório está aberto a contribuições; defina a licença desejada (por exemplo, MIT). Se quiser que eu adicione uma licença, diga qual.

---

## Contato

- Mantido por: Rafael Feltrim
- Repositórios relacionados:
  - https://github.com/RaFeltrim/CNPJ-Docs
  - https://github.com/RaFeltrim/QA-Guide

---

Boa aprendizagem!