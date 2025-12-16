# 03 — Padrões e Arquitetura de Testes

Principais padrões:
- Page Object Model (POM)
- Test Factory / Data Builders
- Layers: unit → integration → e2e

Recomendações arquiteturais:
- Manter tests/ pequenos e determinísticos
- Separar helpers e fixtures em pastas
- Evitar lógica de negócio nos testes

Exemplo: `tests/` chama `helpers/` e `fixtures/`; `src/` tem adaptadores para APIs.
# Padrões de Arquitetura de Testes

Como estruturar suites, fixtures e helpers para manter testes legíveis e rápidos.

> TODO: adicionar exemplos e anti-patterns.
