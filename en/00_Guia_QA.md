# 00 — QA Guide

How to navigate this repository

1. Start with this file (`00_Guia_QA.md`) to understand the purpose and reading order.
2. Check `capitulos/` for consolidated chapters by level.
3. Use `modelos/` for reusable templates and `exemplos/` for code snippets.
4. Check `STACK/` for complete documentation of automation tools (Cypress, Playwright, k6, Postman, GitHub Actions).

Suggested reading order

1. `capitulos/01_Fundamentos.md`
2. `capitulos/02_Estagio.md`
3. `capitulos/03_Junior.md`
4. `capitulos/04_Pleno.md`
5. `capitulos/05_Senior.md`

Note: The original files remain under `01-FUNDAMENTOS/`, `03-NIVEL-JUNIOR/`, etc., for reference and granularity.

Using templates and CI integration

- Templates for Bruno/JMeter/Zephyr integration are in `STACK/templates/`.
- Mapping example (mapping between test name and `zephyr_id`): `STACK/templates/mapping-example.json`.
- Recommended CI flow (summary):
  1. Run Bruno tests in non-interactive mode and generate `reports/bruno/results.xml` (JUnit) or JSON.
  2. Publish artifacts in the job (for inspection).
  3. Run `python STACK/templates/bruno-to-zephyr-template.py reports/bruno/results.xml STACK/templates/mapping-example.json --dry-run`.
  4. Validate the dry-run; then run without `--dry-run` after adjusting endpoints.

Consider updating `99_Indice_de_Arquivos.md` and the project README with links to integration templates.