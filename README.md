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

Este guia referencia e reutiliza conteúdo do projeto `CNPJ-Docs` para casos práticos, massa de dados e exemplos de implementação (validador de CNPJ). Links diretos:

- Repositório de origem: https://github.com/RaFeltrim/CNPJ-Docs
- Documentos referenciados no conteúdo:
  - [Casos de Teste Realistas](https://github.com/RaFeltrim/CNPJ-Docs/blob/main/docs/testing/casos-teste-realistas.md)
  - [Shift Left Testing — README](https://github.com/RaFeltrim/CNPJ-Docs/blob/main/docs/testing/shift-left-testing/README.md)
  - [Guia de Implementação (validador)](https://github.com/RaFeltrim/CNPJ-Docs/blob/main/docs/guides/guia-implementacao.md)
  - [Plano de Estudo / Treinamento](https://github.com/RaFeltrim/CNPJ-Docs/blob/main/docs/training/plano-estudo.md)

Ao aplicar os exercícios, você pode clonar o `CNPJ-Docs` e usar os arquivos de exemplo como fixtures e referências.

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

Boa aprendizagem! Se quiser, eu posso:
- Adicionar `.github/workflows/ci.yml` com um pipeline inicial;
- Gerar fixtures CSV/JSON para os exercícios do nível Júnior;
- Criar templates MD para entregas (bug report, checklist) dentro de `gabarito/`.
