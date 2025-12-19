# 03 — Estratégia de tags

- `@smoke` — testes rápidos essenciais para validar build.
- `@regression` — suíte completa de aceitação.
- `@wip` — em desenvolvimento; exclua no CI.
- `@negative` — cenários de erro/validação.
- `@integration` — integrações externas ou testes lentos.

Executar por tag (exemplo):

```bash
npx cucumber-js --tags "@smoke and not @wip"
```
