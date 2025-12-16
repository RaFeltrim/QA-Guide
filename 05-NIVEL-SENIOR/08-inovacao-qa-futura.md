# 08 — Inovação e Futuro do QA

Temas estratégicos:
- IA para geração de testes, análise de logs e automação de triagem
- Observability e self-healing tests
- Testes shift-right (canary, chaos, observability-driven)
- Automação inteligente: priorização de testes baseada em risco

Exercício: propor 3 experimentos de IA aplicáveis ao fluxo de QA da empresa e critérios de sucesso.
```markdown
# Inovação e Futuro do QA (Sênior)

Visão sobre tendências e oportunidades (IA, observabilidade avançada, shift-left em larga escala).

Iniciativas recomendadas

- Experimentações com IA para geração de casos de teste e análise de logs.
- Observability-driven QA: integrar traces, logs e métricas nos critérios de qualidade.

Roadmap de POC

- POC IA: 6 semanas
- POC Observability: 8 semanas

Checklist

- [ ] POCs definidos e cronograma
- [ ] Critérios de sucesso mensuráveis

```
# Inovação e Futuro do QA (Sênior)

Tópicos sobre IA, automação avançada e práticas emergentes.


Roadmap de adoção de IA em QA (POC -> escala)

- Fase 0 (4-6 semanas): POC de geração assistida de casos de teste
	- Objetivo: avaliar qualidade das sugestões e esforço humano para validação
	- Critério de sucesso: redução de 30% no tempo de escrita de TC para features piloto

- Fase 1 (6-12 semanas): POC de análise de logs para detecção de anomalias
	- Objetivo: identificar padrões de erro repetitivos que não aparecem em testes
	- Critério de sucesso: identificar 3 classes de bugs não cobertas por testes automatizados

- Fase 2 (12-24 semanas): Automação inteligente de priorização de testes
	- Objetivo: usar modelos de risco para priorizar execução de suites em CI
	- Critério de sucesso: reduzir tempo de CI médio sem aumentar regressões

Estudos de caso (sugestões)
- Caso 1: uso de LLM para gerar skeletons de casos de teste a partir de histórias (validar com QA humano)
- Caso 2: modelos simples de classificação de logs para apontar onde investir em testes de integração

Limites e guardrails
- Sempre revisar saídas geradas por IA por um engenheiro/QA antes de execução automatizada.
- Evitar enviar dados sensíveis em prompts; usar dados sintetizados.

