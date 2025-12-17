# Planejamento de Teste (Básico)

- Escopo e objetivos
- Itens fora de escopo
- Cronograma e marcos
- Riscos e mitigação
- Critérios de aceitação

Modelo simples de plano que pode ser adaptado a sprints.
# Planejamento de Teste


Estrutura de um plano de teste: escopo, riscos, critérios de saída, estimativa.

Use o template de referência em [gabarito/templates/test-plan.md](../gabarito/templates/test-plan.md#L1).

Exemplo rápido de seção "Cronograma / Marcos":

- Sprint 1 (semana 1): diagnóstico, testes unitários iniciais
- Sprint 2 (semana 2): integração e testes de contrato
- Sprint 3 (semana 3): smoke e estabilização

Comandos/execução (exemplo):

```
pytest tests/ --maxfail=1 -q
./scripts/run-integration.sh --env=staging
```

