# 00 — Guia do QA

Como navegar neste repositório

1. Comece por este arquivo (`00_Guia_do_QA.md`) para entender o objetivo e a ordem de leitura.
2. Consulte `capitulos/` para os capítulos consolidados por nível.
3. Utilize `modelos/` para templates reutilizáveis e `exemplos/` para snippets de código.
4. Consulte `STACK/` para documentação completa das ferramentas de automação (Cypress, Playwright, k6, Postman, GitHub Actions).

Ordem sugerida de leitura

1. `capitulos/01_Fundamentos.md`
2. `capitulos/02_Estagio.md`
3. `capitulos/03_Junior.md`
4. `capitulos/04_Pleno.md`
5. `capitulos/05_Senior.md`

Nota: os arquivos originais permanecem sob `01-FUNDAMENTOS/`, `03-NIVEL-JUNIOR/`, etc., para referência e granularidade.

Uso dos templates e integração CI

- Os templates para integração Bruno/JMeter/Zephyr estão em `STACK/templates/`.
- Exemplo de mapping (mapeamento entre nome de teste e `zephyr_id`): `STACK/templates/mapping-example.json`.
- Fluxo CI recomendado (resumo):
  1. Executar testes Bruno em modo non-interactive e gerar `reports/bruno/results.xml` (JUnit) ou JSON.
  2. Publicar artefatos no job (para inspeção).
  3. Executar `python STACK/templates/bruno-to-zephyr-template.py reports/bruno/results.xml STACK/templates/mapping-example.json --dry-run`.
  4. Validar o dry-run; depois executar sem `--dry-run` após ajustar endpoints.

Considere atualizar `99_Indice_de_Arquivos.md` e o README do projeto com links para os templates de integração.