# 02 — Tipos de Teste


Quando usar cada tipo e exemplos práticos.
# Tipos de Teste


> TODO: adicionar exemplos práticos e critérios por tipo.

## Tipos e definições
- **Testes manuais**: exploração, testes ad-hoc e verificação de UX; usados quando a automação não traz ROI imediato.
- **Testes unitários**: validam pequenas unidades (funções/métodos). Rápidos e determinísticos.
- **Testes de integração**: verificam a interação entre módulos (DB, API, filas).
- **Testes de componente**: testes de partes maiores isoladas (ex.: componente UI isolado).
- **E2E (end-to-end)**: simulam fluxo do usuário através do sistema completo.
- **Performance**: carga, stress e benchmarks (k6, JMeter).
- **Segurança**: análise automatizada e pentests.
- **Usabilidade**: sessões com usuários reais ou heurísticas.

## Quando usar (resumo)
- Unitários: para regras de negócio e funções críticas (sempre).
- Integração: quando há dependências externas (DB, serviços) críticas.
- E2E: fluxos essenciais (login, checkout), com cobertura limitada por custo.
- Manual: testes exploratórios, validação visual e checagem de hipóteses.
- Performance/Security: em releases com mudanças em infra, autenticação ou endpoints de alto tráfego.

## Exemplos práticos e critérios
- Unitário — Exemplo: função `calcula_total(carrinho)` deve retornar soma esperada; **critério**: 100% dos caminhos lógicos cobertos por teste.
- Integração — Exemplo: endpoint `/orders` grava no DB e retorna 201; **critério**: testes que validam fluxo com DB em ambiente de CI.
- E2E — Exemplo: fluxo de compra completo (login → adicionar produto → checkout); **critério**: cenário crítico passa em < 3 min.

## Checklist rápido por tipo
- Unitários: isolados, rápidos (<100ms), executáveis em cada commit.
- Integração: usam seed de dados, ambiente estável, rollback de DB.
- E2E: rodar em nightly ou pré-release; evitar rodar em cada commit.
- Performance: definir SLA (pico RPS, latência P95).

