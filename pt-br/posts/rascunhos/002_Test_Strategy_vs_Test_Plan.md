# Test Strategy vs Test Plan: Diferenças Claras

## Introdução

Muitos profissionais de QA confundem Test Strategy e Test Plan, mas esses documentos servem propósitos diferentes e complementares. Entender essa distinção é crucial para uma abordagem sistemática de testes.

## O que é Test Strategy?

A **Test Strategy** é um documento de alto nível que define a abordagem geral para testes no projeto ou organização. Ela responde às questões "o que" e "por que".

### Características:
- Documento estático, raramente muda durante o projeto
- Foca em objetivos e princípios
- Define padrões e metodologias
- Aplica-se a múltiplos projetos

**Exemplo de conteúdo:**
```markdown
# Test Strategy - Empresa XYZ

## Objetivos de Teste
- Garantir 99.9% de disponibilidade em produção
- Identificar 95% dos bugs antes do release
- Manter cobertura de código acima de 80%

## Abordagem de Testes
- Seguir pirâmide de testes (70/20/10)
- Automação como primeiro critério para novos testes
- Integração contínua com feedback em < 10 minutos
```

## O que é Test Plan?

O **Test Plan** é um documento detalhado e específico para um projeto ou release particular. Ele responde às questões "como", "quando" e "quem".

### Características:
- Documento dinâmico, atualizado conforme o projeto evolui
- Foca em escopo e execução
- Define cronogramas e recursos
- Específico para um contexto

**Exemplo de conteúdo:**
```markdown
# Test Plan - Feature de Checkout v2.1

## Escopo
- Inclui: Fluxo de pagamento, integração com gateways, notificações
- Exclui: Testes de performance, migração de dados históricos

## Cronograma
- Planejamento: 2 dias
- Execução: 5 dias
- Reporting: 1 dia

## Recursos
- 2 QAs dedicados
- Ambiente de teste exclusivo
- Acesso ao time de desenvolvimento
```

## Comparativo Detalhado

| Aspecto | Test Strategy | Test Plan |
|---------|--------------|-----------|
| **Nível** | Estratégico/organizacional | Operacional/projeto |
| **Escopo** | Amplo e genérico | Específico e detalhado |
| **Frequência de mudança** | Raramente | Regularmente |
| **Responsável** | QA Lead/Manager | QA Engineer |
| **Enfoque** | Princípios e diretrizes | Tarefas e execução |

## Quando Criar Cada Documento?

### Test Strategy
- Na fase inicial da organização
- Quando definindo padrões de QA
- Ao iniciar uma nova vertical de negócios
- Durante transformações de processo

### Test Plan
- No início de cada sprint/release
- Quando há mudanças significativas no escopo
- Para features críticas de negócio
- Durante planejamento de testes

## Erros Comuns

❌ **Criar apenas um documento:** Muitos times criam apenas o Test Plan e pulam a estratégia
❌ **Confundir propósito:** Usar o Test Plan para definir princípios organizacionais
❌ **Documentação excessiva:** Criar documentos muito densos que ninguém lê
❌ **Não manter atualizado:** Deixar documentos obsoletos

## Benefícios de Ter Ambos

✅ **Alinhamento estratégico:** Todos entendem os princípios por trás das ações
✅ **Execução eficiente:** Equipe sabe exatamente o que fazer e quando
✅ **Governança clara:** Facilita auditorias e conformidade
✅ **Escala organizacional:** Padrões consistentes em múltiplos projetos

## Template Simplificado

### Test Strategy Template
```markdown
# [Nome da Organização] - Test Strategy

1. **Objetivos de Qualidade**
2. **Abordagem de Testes**
3. **Ferramentas e Tecnologias**
4. **Métricas e KPIs**
5. **Responsabilidades**
```

### Test Plan Template
```markdown
# [Nome do Projeto/Release] - Test Plan

1. **Escopo e Limitações**
2. **Cronograma**
3. **Recursos Necessários**
4. **Ambientes de Teste**
5. **Riscos e Mitigações**
```

## Checklist de Criação

- [ ] Definir objetivos claros para cada documento
- [ ] Identificar público-alvo de cada artefato
- [ ] Estabelecer processo de revisão e aprovação
- [ ] Criar templates reutilizáveis
- [ ] Treinar a equipe sobre a diferença
- [ ] Integrar com processos existentes

## Conclusão

Ter uma Test Strategy sólida e Test Plans bem definidos é fundamental para uma abordagem madura de testes. Enquanto a estratégia fornece o norte, o plano dá o passo a passo para alcançá-lo.

📚 **Quer ver modelos completos?** Confira nossos templates em [modelos/test-strategy](../../modelos/README.md#test-strategy) e [modelos/test-plan](../../modelos/README.md#test-plan).

#QA #TestStrategy #TestPlan #SoftwareTesting #QualityAssurance