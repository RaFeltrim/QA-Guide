# Guia de QA — Do Estagiário ao Sênior

Este guia apresenta um percurso de aprendizagem e entregáveis práticos para QA, do nível estagiário ao sênior, baseado na metodologia e conteúdo do repositório `CNPJ-Docs`.

## Objetivo
- Fornecer trilhas de conhecimento claras por nível
- Mapear habilidades técnicas e comportamentais necessárias
- Sugerir exercícios práticos, checkpoints e métricas de sucesso

## Estrutura do Guia
- Níveis: Estagiário → Júnior → Pleno → Sênior
- Para cada nível: responsabilidades, capacidades técnicas, ferramentas, exercícios e critérios de avaliação
- Metodologia: scaffolding pedagógico (exemplo resolvido → prática guiada → prática independente)

---

## Nível: Estagiário (Onboarding)
- Responsabilidades-chave:
  - Aprender processos de QA da equipe
  - Executar testes manuais guiados
  - Reportar defeitos com evidências
- Competências técnicas iniciais:
  - Testes manuais (casos happy-path)
  - Noções básicas de Git e linha de comando
  - Leitura e execução de casos de teste
- Ferramentas sugeridas:
  - Browser, Postman, Excel/Google Sheets
  - VS Code (editor)
- Exercícios práticos:
  - Seguir os exercícios básicos do material: [Shift Left Testing — README](https://github.com/RaFeltrim/CNPJ-Docs/blob/main/docs/testing/shift-left-testing/README.md)
  - Executar os casos de teste do nível básico: [03-exercicios/01-nivel-basico](https://github.com/RaFeltrim/CNPJ-Docs/blob/main/docs/testing/shift-left-testing/03-exercicios/01-nivel-basico.md)
  - Validar massa de dados simples em: [Casos de Teste Realistas](https://github.com/RaFeltrim/CNPJ-Docs/blob/main/docs/testing/casos-teste-realistas.md)
- Critério de saída:
  - Executa e documenta 10 casos básicos sem supervisão

---

## Nível: Júnior
- Responsabilidades:
  - Escrever e manter casos de teste
  - Criar e rodar suites de teste automatizadas simples
  - Investigar e reproduzir bugs
- Competências técnicas:
  - Testes unitários e integração básicos (ex.: `pytest` / `jest`)
  - Noções de CI (executar pipelines básicos)
  - Normalização e validação de input (ex.: validação de CNPJ)
- Ferramentas:
  - Python/TypeScript, pytest/jest, GitHub Actions (noções)
- Exercícios práticos:
  - Implementar `validarCNPJ()` com testes unitários (veja exemplo e arquitetura em: [Guia de Implementação (validador)](https://github.com/RaFeltrim/CNPJ-Docs/blob/main/docs/guides/guia-implementacao.md))
  - Cobrir casos de teste reais: [Casos de Teste Realistas](https://github.com/RaFeltrim/CNPJ-Docs/blob/main/docs/testing/casos-teste-realistas.md)
  - Seguir plano de estudo (dias 1–3): [Plano de Estudo / Treinamento](https://github.com/RaFeltrim/CNPJ-Docs/blob/main/docs/training/plano-estudo.md)
- Critério de saída:
  - Testes unitários com cobertura mínima definida pela equipe (ex.: >80%) e documentação de 5 bugs reproduzíveis

---

## Nível: Pleno
- Responsabilidades:
  - Projetar estratégias de teste (unit → integration → e2e)
  - Integrar testes em pipelines CI/CD
  - Mentorar juniores/estagiários
- Competências técnicas:
  - Testes de integração, E2E (Cypress, Playwright), automação de APIs
  - Performance básica (k6, metas P95)
  - Boas práticas de arquitetura de testes (padrões, fixtures)
- Ferramentas:
  - CI/CD (GitHub Actions), Cypress/Playwright, k6, pytest/jest avançado
- Exercícios práticos:
  - Implementar pipeline com runs de unit + integration + E2E (veja exemplos: [Shift Left Testing — Exemplos Práticos](https://github.com/RaFeltrim/CNPJ-Docs/blob/main/docs/testing/shift-left-testing/05-exemplos-pratica/README.md))
  - Projetar massa de testes realistas a partir de [Casos de Teste Realistas](https://github.com/RaFeltrim/CNPJ-Docs/blob/main/docs/testing/casos-teste-realistas.md)
- Critério de saída:
  - Pipeline automatizado com gatilhos em PRs e relatórios reproduzíveis

---

## Nível: Sênior
- Responsabilidades:
  - Definir estratégia de qualidade do produto
  - Liderar iniciativas de Shift Left e práticas de qualidade
  - Auditar métricas e ROI de automação
- Competências técnicas e estratégicas:
  - Arquitetura de testes em múltiplos times
  - Observabilidade, métricas (MTTR, flakiness, coverage trending)
  - Considerações de segurança, LGPD e compliance nos testes
- Ferramentas e práticas esperadas:
  - Integração com security scans (bandit, safety), monitoramento e alerting
  - Testes de performance e análise de capacidade
- Exercícios práticos:
  - Criar um plano de adoção Shift Left para um produto (base: [Shift Left Testing — README](https://github.com/RaFeltrim/CNPJ-Docs/blob/main/docs/testing/shift-left-testing/README.md))
  - Mapear riscos e políticas de logs/LGPD (veja plano de estudo, dia 6): [Plano de Estudo / Treinamento](https://github.com/RaFeltrim/CNPJ-Docs/blob/main/docs/training/plano-estudo.md)
- Critério de saída:
  - Roadmap aprovável pela liderança com KPIs e plano de execução

---

## Metodologia de ensino (resumo)
- Scaffolding pedagógico: exemplo resolvido → prática guiada → prática independente
- Ciclos curtos com entregáveis (critério por dia/seção)
- Uso intensivo de casos reais (CNPJ) para aprendizagem aplicada
- Gabaritos e correções comentadas para feedback contínuo

Referências canônicas

Este guia referencia e reutiliza material do repositório `CNPJ-Docs`. Para consultar os recursos originais e links canônicos, veja o arquivo de referências:

- [QA-Guide/REFERENCES.md](REFERENCES.md)

---

## Sugestão de estrutura de entrega (6 semanas)
- Semana 1–2: Onboarding + Fundamentos (estagiário → júnior)
- Semana 3–4: Automação básica + integração (júnior → pleno)
- Semana 5: Performance, segurança e integração (pleno)
- Semana 6: Projetos aplicados, revisão e apresentação (pleno → sênior)

## Próximos passos que eu posso executar para você
- Converter este guia em um conjunto de arquivos no `CNPJ-Docs` como `docs/guides/qa/GUIA-QA.md`
- Gerar exercícios com gabarito para cada nível (baseados em `casos-teste-realistas.md`)
- Criar uma versão em HTML/MD para leitura pública

---

> Arquivo gerado automaticamente com base na documentação do repositório `CNPJ-Docs`.
