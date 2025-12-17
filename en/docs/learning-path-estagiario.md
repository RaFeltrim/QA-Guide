# Trilha de Aprendizado — Estagiário (2 semanas)

Objetivo: aprender fundamentos de QA, executar testes manuais, preencher templates e reportar bugs com qualidade.

Duração sugerida: 2 semanas (flexível). Entregável final: 1 bug report completo + checklist preenchido.

---

## Semana 1 — Fundamentos e Testes Manuais

Dia 1 — Introdução
- Ler: `01-FUNDAMENTOS/01-conceitos-basicos.md`
- Ler: `00_Guia_QA.md` e `README.md` para contexto do repositório
- Tarefa: criar um documento de notas pessoais com dúvidas e tópicos não claros

Dia 2 — Tipos de teste e pirâmide
- Ler: `01-FUNDAMENTOS/02-tipos-teste.md`
- Ler: `01-FUNDAMENTOS/03-piramide-testes.md`
- Tarefa: identificar, em uma aplicação qualquer (ou exemplo), 3 cenários para testes manuais, unitários e E2E

Dia 3 — Métricas básicas e boas práticas
- Ler: `01-FUNDAMENTOS/04-metricas-qualidade.md`
- Ler: `01-FUNDAMENTOS/05-boas-praticas.md`
- Tarefa: escrever um checklist rápido (3–6 itens) para validar um caso de teste manual

Dia 4 — Execução de testes manuais
- Ler: `02-NIVEL-ESTAGIARIO/01-testes-manuais.md`
- Prática: executar 3 casos de teste manual em um sistema (ou site de demo) e anotar evidências

Dia 5 — Bug reports e comunicação
- Ler: `02-NIVEL-ESTAGIARIO/02-bug-reports.md`
- Usar: `gabarito/bug_report_template.md` para preencher um bug real ou simulado
- Entregável parcial: 1 bug report preenchido

Fim de semana (opcional)
- Revisar materiais, documentar dúvidas e pesquisar termos desconhecidos

---

## Semana 2 — Checklist, documentação e colaboração

Dia 6 — Documentação de casos de teste
- Ler: `02-NIVEL-ESTAGIARIO/05-documentacao-casos.md`
- Usar: `gabarito/checklist_template.md` para criar um checklist detalhado para um fluxo escolhido

Dia 7 — Ambiente de teste e evidências
- Ler: `02-NIVEL-ESTAGIARIO/03-ambiente-teste.md`
- Tarefa: descrever o ambiente (browser, versão, dados) usado nos testes e anexar evidências

Day 8 — Planejamento de teste e priorização
- Ler: `02-NIVEL-ESTAGIARIO/04-planejamento-teste.md`
- Tarefa: criar um pequeno plano de teste (1 página) para uma funcionalidade simples

Day 9 — Revisão de gabaritos e templates
- Explorar: `gabarito/` — templates e exemplos
- Tarefa: adaptar `test-case.md` ou `test-plan.md` (do `gabarito/templates/`) para o caso escolhido

Dia 10 — Entregável final e PR
- Consolidar: bug report final + checklist preenchido + plano de teste
- Criar um repositório ou branch (se possível) e abrir um PR com os arquivos como evidência (README ou `docs/experimentos/`)

---

## Entregáveis (checklist)
- [ ] Bug report preenchido (`gabarito/bug_report_template.md`)
- [ ] Checklist preenchido (`gabarito/checklist_template.md`)
- [ ] Plano de teste curto (`docs/experimentos/<nome>-plan.md`)
- [ ] Evidências (screenshots/logs) anexadas ao PR ou pasta `docs/experimentos/`

## Dicas rápidas
- Mantenha commits pequenos e descritivos ao salvar evidências.
- Use nomes claros para screenshots (ex.: `login-falha-500.png`) e indique passos reproduzíveis.
- Se tiver dúvidas, documente e abra uma issue em `.github` para discussão.

## Comandos úteis
Nenhum requisito de execução obrigatório neste nível — foco manual e documentação. Para tarefas futuras com testes automatizados:
```powershell
# Ativar virtualenv (quando chegar em Júnior)
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
pytest -q
```

---

Se quiser, eu crio a pasta `docs/experimentos/` e um template `docs/experimentos/exemplo-plan.md` e faço commit em uma branch `learning/estagiario`.
