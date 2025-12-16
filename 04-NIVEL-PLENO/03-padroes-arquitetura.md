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


Exemplos e anti-patterns

Boas práticas:
- Aplicar testes em camadas: unit -> integration -> contract -> e2e
- Projetar serviços pequenos e testáveis (interfaces claras, pontos de injeção de dependências)

Anti-patterns comuns:
- Testar internals em vez de comportamento (fragiliza testes)
- Bases de testes acopladas a dados reais sem isolamento (dificulta rollback)
- Testes e2e enormes que cobrem toda a jornada com muitos pontos de falha (dividir em smoke + componentes)

Exemplo rápido: usar testes de contrato (PACT ou similares) para validar integração entre serviços sem precisar do serviço real durante desenvolvimento.

