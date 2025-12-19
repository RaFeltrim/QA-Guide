# O que Automatizar e o que Não Automatizar

## Introdução

Automação de testes é uma das habilidades mais valiosas para QAs modernos, mas nem todos os testes devem ser automatizados. Saber escolher o que automatizar é tão importante quanto saber como fazer.

## Critérios para Automação

### 1. Frequência de Execução
**Automatizar quando:**
- Teste é executado em múltiplos ciclos
- Parte de regressão regular
- Validado em múltiplos ambientes

**Não automatizar quando:**
- Teste é único/avançado
- Exploração ad-hoc
- Validação inicial de feature

### 2. Estabilidade do Caso de Teste
**Automatizar quando:**
- Fluxo é consistente
- Poucas mudanças esperadas
- Baixo risco de quebra frequente

**Não automatizar quando:**
- UI em constante mudança
- Feature em desenvolvimento ativo
- Requisitos instáveis

### 3. Complexidade Técnica
**Automatizar quando:**
- Processo repetitivo
- Dados parametrizáveis
- Cenários previsíveis

**Não automatizar quando:**
- Necessita julgamento humano
- Validação visual subjetiva
- Testes de usabilidade

## Matriz de Decisão

| Tipo de Teste | Frequência | Estabilidade | Complexidade | Automatizar? |
|---------------|------------|--------------|--------------|--------------|
| **Login** | Alta | Alta | Baixa | ✅ Sim |
| **Checkout** | Alta | Média | Média | ✅ Sim |
| **Exploratório** | Baixa | Baixa | Alta | ❌ Não |
| **Acessibilidade** | Média | Alta | Alta | ⚠️ Parcial |
| **Visual** | Média | Média | Média | ⚠️ Com cuidado |
| **API** | Alta | Alta | Baixa | ✅ Sim |
| **Performance** | Média | Alta | Alta | ✅ Sim |
| **Usabilidade** | Baixa | Baixa | Alta | ❌ Não |

## O que Automatizar (Prioridade Alta)

### 1. Testes de Regressão
- Fluxos críticos de negócio
- Funcionalidades estáveis
- Cenários repetidos em releases

**Exemplo:**
```javascript
// Teste automatizado de login
describe('Login', () => {
  it('deve permitir login com credenciais válidas', () => {
    cy.visit('/login');
    cy.get('#email').type('usuario@teste.com');
    cy.get('#password').type('senha123');
    cy.get('#submit').click();
    cy.url().should('include', '/dashboard');
  });
});
```

### 2. Testes de API
- Contratos estáveis
- Validações de dados
- Integrações entre sistemas

**Exemplo:**
```javascript
// Teste de API de usuários
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response contains user data", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('id');
    pm.expect(jsonData).to.have.property('name');
});
```

### 3. Testes de Performance
- Cargas consistentes
- SLAs definidos
- Métricas comparativas

## O que Não Automatizar (Prioridade Baixa)

### 1. Testes Exploratórios
- Descoberta de bugs não óbvios
- Criatividade e intuição humana
- Validação de edge cases inesperados

### 2. Testes de Usabilidade
- Percepção visual subjetiva
- Experiência do usuário
- Feedback emocional

### 3. Testes Ad-hoc
- Validações pontuais
- Investigação de bugs específicos
- Experimentação rápida

## Estratégia de Implementação

### Fase 1: Comece pelo Básico
1. **Testes de fumaça** - Verificação rápida
2. **Fluxos críticos** - Caminhos principais do usuário
3. **APIs estáveis** - Contratos bem definidos

### Fase 2: Expanda Gradualmente
1. **Regressão completa** - Cobertura ampliada
2. **Testes de integração** - Entre sistemas
3. **Performance básica** - Cargas padrão

### Fase 3: Otimize e Evolua
1. **Manutenção de suíte** - Refatoração contínua
2. **Paralelização** - Execução mais rápida
3. **Relatórios avançados** - Insights melhores

## Erros Comuns

❌ **Automatizar tudo:** Perda de tempo com manutenção
❌ **Ignorar estabilidade:** Suíte quebrando constantemente
❌ **Não considerar ROI:** Custo maior que benefício
❌ **Escolher ferramentas erradas:** Incompatibilidade com stack
❌ **Falta de padrões:** Código inconsistente e difícil de manter

## Boas Práticas

✅ **Começar pequeno:** Provar valor antes de escalar
✅ **Medir ROI:** Tempo economizado vs tempo investido
✅ **Manter padrões:** Código limpo e reutilizável
✅ **Revisar periodicamente:** Remover testes obsoletos
✅ **Treinar a equipe:** Capacidade técnica distribuída

## Checklist de Decisão

- [ ] Identificar frequência de execução
- [ ] Avaliar estabilidade do fluxo
- [ ] Considerar complexidade técnica
- [ ] Calcular ROI potencial
- [ ] Escolher ferramenta apropriada
- [ ] Definir padrões de codificação
- [ ] Planejar manutenção contínua

## Template de Avaliação

```markdown
## Avaliação de Automação - Fluxo de Cadastro

**Frequência:** Alta (executado diariamente)
**Estabilidade:** Média (mudanças mensais)
**Complexidade:** Baixa (dados simples)

**ROI Estimado:**
- Tempo manual: 5 min/execução × 20 execuções = 100 min/semana
- Tempo automação: 2 horas desenvolvimento + 30 min manutenção/mês
- Economia: ~90% de tempo após primeiro mês

**Decisão:** ✅ Automatizar

**Responsável:** QA João
**Prazo:** 3 dias para implementação
```

## Conclusão

A chave para uma estratégia de automação bem-sucedida é equilibrar oportunidades com realidades técnicas. Nem tudo precisa ser automatizado, mas tudo pode ser avaliado para automação.

📚 **Quer modelos completos?** Confira nossos [critérios de automação](../../modelos/README.md#critérios-de-automação) e [exercícios práticos](../../exercicios/pleno.md#seleção-de-casos-para-automação).

#QA #TestAutomation #SoftwareTesting #Strategy