# Severidade vs Prioridade: Como Não Brigar com PO

## Introdução

Um dos maiores desafios para QAs iniciantes é entender a diferença entre severidade e prioridade. Confundir esses conceitos pode gerar conflitos desnecessários com Product Owners e desenvolvedores.

## O que é Severidade?

**Severidade** (Severity) refere-se ao **impacto técnico** que um bug tem no sistema. É uma medida objetiva do dano causado.

### Níveis de Severidade:

**S1 - Crítica/Bloqueadora**
- Sistema inacessível
- Perda de dados
- Falha de segurança crítica
- *Exemplo:* Usuário não consegue fazer login

**S2 - Alta**
- Funcionalidade principal afetada
- Workaround complexo
- *Exemplo:* Carrinho de compras não calcula frete

**S3 - Média**
- Funcionalidade secundária afetada
- Workaround simples existe
- *Exemplo:* Botão de ajuda não abre modal

**S4 - Baixa/Trivial**
- Erros de digitação
- Layout menor
- *Exemplo:* Espaçamento incorreto entre botões

## O que é Prioridade?

**Prioridade** (Priority) refere-se à **ordem de correção** definida pelo negócio. É uma decisão subjetiva baseada em valor para o usuário.

### Níveis de Prioridade:

**P1 - Imediata**
- Correção imediata necessária
- Afeta usuários em produção
- *Exemplo:* Bug que impede vendas

**P2 - Alta**
- Corrigir no próximo release
- Impacto significativo no negócio
- *Exemplo:* Funcionalidade nova com bugs

**P3 - Média**
- Corrigir em releases futuros
- Pequeno impacto no usuário
- *Exemplo:* Melhoria de UX solicitada

**P4 - Baixa**
- Correção opcional
- Não afeta experiência do usuário
- *Exemplo:* Pequenas melhorias estéticas

## Matriz Severidade x Prioridade

| Severidade \ Prioridade | Imediata (P1) | Alta (P2) | Média (P3) | Baixa (P4) |
|-------------------------|---------------|-----------|------------|------------|
| **Crítica (S1)** | 🔴 Mais comum | 🟠 Possível | 🟡 Raro | ⚪ Quase impossível |
| **Alta (S2)** | 🔴 Comum | 🟠 Mais comum | 🟡 Comum | ⚪ Raro |
| **Média (S3)** | 🟠 Possível | 🟡 Comum | 🟢 Mais comum | ⚪ Comum |
| **Baixa (S4)** | ⚪ Quase impossível | 🟡 Raro | 🟡 Possível | 🟢 Mais comum |

## Exemplos Práticos

### Exemplo 1: Alta Severidade, Baixa Prioridade
**Bug:** Crash na tela de configurações avançadas
**Severidade:** S1 - Crítica (sistema trava)
**Prioridade:** P4 - Baixa (99% dos usuários não acessam)
**Decisão:** Corrigir em release futuro

### Exemplo 2: Baixa Severidade, Alta Prioridade
**Bug:** Erro de digitação no botão de checkout
**Severidade:** S4 - Baixa (apenas texto errado)
**Prioridade:** P1 - Imediata (afeta conversão de vendas)
**Decisão:** Corrigir imediatamente

### Exemplo 3: Alta Severidade, Alta Prioridade
**Bug:** Usuário não consegue finalizar pagamento
**Severidade:** S1 - Crítica (funcionalidade principal)
**Prioridade:** P1 - Imediata (perda financeira direta)
**Decisão:** Corrigir imediatamente

## Como Classificar Corretamente

### Etapas para Avaliação:

1. **Analisar o Impacto Técnico**
   - Quantos usuários são afetados?
   - Qual a gravidade funcional?
   - Há workaround possível?

2. **Entender o Valor de Negócio**
   - Qual o impacto no ROI?
   - Afeta métricas-chave?
   - Há pressão de stakeholders?

3. **Validar com Stakeholders**
   - Discutir com PO/Product Manager
   - Considerar roadmap do produto
   - Alinhar expectativas de entrega

## Erros Comuns

❌ **Usar severidade como única base:** Ignorar o valor de negócio
❌ **Classificar tudo como crítica:** Perder credibilidade com a equipe
❌ **Não validar com PO:** Criar expectativas irreais de correção
❌ **Documentar mal:** Não explicar razão da classificação

## Boas Práticas

✅ **Separar claramente os campos:** Nunca misturar severidade e prioridade
✅ **Justificar a classificação:** Explicar raciocínio no bug report
✅ **Manter consistência:** Usar mesma escala em toda a organização
✅ **Revisar periodicamente:** Ajustar classificações conforme aprendizado

## Template de Classificação

```markdown
## Classificação

**Severidade:** S2 - Alta
**Justificativa:** Funcionalidade principal afetada, workaround complexo necessário

**Prioridade:** P3 - Média
**Justificativa:** Funcionalidade secundária, não bloqueia release atual

**Stakeholders envolvidos:** PO João, Dev Maria
**Data da validação:** 15/12/2025
```

## Checklist de Classificação

- [ ] Analisar impacto técnico objetivamente
- [ ] Considerar valor de negócio
- [ ] Validar classificação com PO
- [ ] Documentar justificativa clara
- [ ] Usar linguagem consistente
- [ ] Revisar com desenvolvedores

## Conclusão

Entender a diferença entre severidade e prioridade é essencial para uma comunicação eficaz com o time. Lembre-se: alta severidade não significa alta prioridade, e vice-versa. O diálogo com o Product Owner é fundamental para alinhar expectativas.

📚 **Quer aprofundar no tema?** Confira nosso guia sobre [Bug Reports](../../02-NIVEL-ESTAGIARIO/02-bug-reports.md) e [Bug Triage](../../04-NIVEL-PLENO/07-shift-left-basico.md).

#QA #BugTriage #Severity #Priority #SoftwareTesting