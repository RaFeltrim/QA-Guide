# Exercícios — Júnior

Objetivo: consolidar automação com Python/pytest e implementar um validador de CNPJ.

1. Implementar `is_valid_cnpj(cnpj)` em `src/` (ou usar `gabarito/exemplos-codigo/validador-cnpj.py` como referência).
2. Escrever um conjunto de testes `pytest` cobrindo casos válidos, inválidos e bordas.
3. Criar um pequeno `README.md` explicando como rodar os testes localmente.
4. Adicionar um workflow simples em `.github/workflows/ci.yml` que execute `pytest`.
5. Refatorar o validador para ser testável (funções pequenas, sem I/O direto).

Critério de saída: todos os testes unitários passam em `pytest` na máquina local; README com passos claros.
# Exercícios — Júnior

Objetivo: implementar validação automatizada, testes unitários e cobrir casos reais.

Tarefas:

1. Implementar `validarCNPJ()` (TypeScript ou Python) conforme [Guia de Implementação (validador)](https://github.com/RaFeltrim/CNPJ-Docs/blob/main/docs/guides/guia-implementacao.md).
2. Escrever uma suite de testes unitários cobrindo:
   - Casos happy-path (CT-001 a CT-005)
   - Formatos inválidos (CT-006 a CT-010)
   - Dígitos verificadores (CT-011 a CT-015)
   - Edge-cases (CT-016 a CT-018)
3. Criar fixture com 100 CNPJs mistos (válidos/inválidos) — exemplo em `fixtures/cnpjs.csv` e `fixtures/cnpjs.json` — e rodar os testes.
4. Gerar relatório de cobertura (meta mínima: definida pela equipe, ex.: 80%).
5. Entrega: PR com código + `README.md` explicando como rodar os testes localmente.

Critério de aceitação:
- Implementação com testes automatizados e relatório de cobertura.
- Passar no CI local (ex.: `pytest` ou `npm test`).

Tempo estimado: 2–4 dias.