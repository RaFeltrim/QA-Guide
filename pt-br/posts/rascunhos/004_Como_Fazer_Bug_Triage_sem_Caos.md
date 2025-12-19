# Como Fazer Bug Triage sem Caos

## Introdução

Bug triage é o processo de analisar, classificar e priorizar bugs reportados. Quando feito corretamente, ele organiza o fluxo de correções e melhora a eficiência da equipe. Quando mal feito, vira um caos que prejudica todos.

## O que é Bug Triage?

Bug triage é uma reunião regular (diária ou semanal) onde a equipe:
- Analisa novos bugs reportados
- Classifica severidade e prioridade
- Atribui para desenvolvedores
- Define prazos de correção

## Estrutura de uma Sessão de Triage

### Participantes Essenciais:
- **QA Lead:** Facilita a sessão
- **Product Owner:** Define prioridades de negócio
- **Tech Lead:** Avalia complexidade técnica
- **Representante do Suporte:** Contexto do usuário

### Agenda Recomendada (30-45 min):

1. **Preparação (5 min)**
   - Revisar bugs novos desde última triage
   - Pre-filtrar bugs óbvios

2. **Análise Individual (25-35 min)**
   - Cada bug em 2-3 minutos
   - Discussão rápida quando necessário
   - Decisão sobre classificação

3. **Acompanhamento (5 min)**
   - Bugs em progresso
   - Bloqueadores identificados
   - Próximos passos

## Critérios de Classificação

### Severidade (Impacto Técnico):
- **S1 - Crítica:** Sistema inutilizável
- **S2 - Alta:** Funcionalidade principal afetada
- **S3 - Média:** Funcionalidade secundária afetada
- **S4 - Baixa:** Erros cosméticos/triviais

### Prioridade (Valor de Negócio):
- **P1 - Imediata:** Correção urgente
- **P2 - Alta:** Próximo release
- **P3 - Média:** Releases futuros
- **P4 - Baixa:** Opcional

### Complexidade (Esforço Técnico):
- **C1 - Simples:** Horas
- **C2 - Média:** Dias
- **C3 - Complexa:** Semanas

## Processo Passo a Passo

### 1. Pré-Triage (Async)
Antes da reunião formal:
- QA reproduz e valida o bug
- Preenche informações básicas
- Anexa prints/logs relevantes
- Propõe classificação inicial

### 2. Triage Síncrona
Durante a reunião:
- QA apresenta bug brevemente
- PO/Tech Lead discutem prioridade/complexidade
- Decisão registrada
- Atribuição feita

### 3. Pós-Triage
Após a reunião:
- Atualizar status no sistema
- Notificar desenvolvedor atribuído
- Agendar follow-up se necessário

## Template de Análise

```markdown
## Bug #12345 - Erro ao finalizar checkout

**Resumo:** Usuário recebe timeout ao clicar em "Finalizar Compra"

**Reprodução:**
1. Adicionar produto ao carrinho
2. Ir para checkout
3. Preencher dados válidos
4. Clicar "Finalizar Compra"
5. Timeout após 30 segundos

**Impacto:**
- Severidade: S1 - Crítica (bloqueia venda)
- Usuários afetados: 15% das tentativas de compra
- Métrica impactada: Conversão de checkout

**Classificação Proposta:**
- Prioridade: P1 - Imediata
- Complexidade: C2 - Média

**Atribuição:** Dev João Silva
**Prazo:** 24 horas para análise inicial
```

## Ferramentas e Sistemas

### Sistema de Tracking:
- **Jira:** Campos personalizados para triage
- **Azure DevOps:** Tags e áreas de trabalho
- **GitHub Issues:** Labels e milestones

### Métricas Importantes:
- Tempo médio para triage
- % de bugs reclassificados
- Taxa de resolução no prazo
- Satisfação dos stakeholders

## Erros Comuns

❌ **Sessões muito longas:** Perda de foco e produtividade
❌ **Participantes inadequados:** Decisões sem contexto
❌ **Falta de preparação:** Tempo desperdiçado
❌ **Sem critérios claros:** Inconsistência nas decisões
❌ **Não documentar decisões:** Conflitos posteriores

## Boas Práticas

✅ **Manter agenda fixa:** Consistência gera previsibilidade
✅ **Preparar previamente:** Maximizar tempo de reunião
✅ **Ter critérios documentados:** Todos sabem as regras
✅ **Registrar decisões:** Transparência e accountability
✅ **Revisar periodicamente:** Melhorar processo continuamente

## Checklist de Triage Eficiente

- [ ] Bugs reproduzidos e documentados
- [ ] Participantes certos na sala
- [ ] Critérios de classificação claros
- [ ] Tempo controlado por item
- [ ] Decisões registradas imediatamente
- [ ] Atribuições comunicadas
- [ ] Follow-up agendado se necessário

## Casos Especiais

### Bugs Duplicados:
- Fechar como duplicata
- Linkar ao bug original
- Transferir votos/comentários

### Bugs Não Reproduzíveis:
- Solicitar mais informações
- Tentar em diferentes ambientes
- Classificar como "needs info"

### Bugs Fora de Escopo:
- Redirecionar para time apropriado
- Explicar razão da rejeição
- Manter registro para padrões futuros

## Conclusão

Um processo de bug triage bem estruturado é como um sistema circulatório para qualidade: garante que os problemas certos cheguem às pessoas certas no momento certo. A chave é simplicidade, consistência e comunicação.

📚 **Quer modelos completos?** Confira nosso [processo de triage](../../modelos/README.md#processo-de-triage) e [exercícios práticos](../../exercicios/pleno.md#triagem-de-bugs).

#QA #BugTriage #Process #SoftwareTesting #Teamwork