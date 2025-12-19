# Flakiness em E2E: Como Reduzir

## Introdução

Testes flaky (instáveis) são o pesadelo de qualquer QA. Eles falham intermitentemente sem mudanças no código, causando perda de confiança na suíte de testes e desperdício de tempo valioso. Vamos explorar estratégias práticas para reduzi-los drasticamente.

## O que são Testes Flaky?

Testes flaky são aqueles que:
- Passam e falham aleatoriamente
- Sem alterações no código de produção
- Mesmo ambiente e dados de teste
- Comportamento inconsistente ao longo do tempo

**Exemplo:**
```javascript
// Teste flaky - falha 30% das vezes
it('deve mostrar mensagem de sucesso', () => {
  cy.visit('/cadastro');
  cy.get('#nome').type('João');
  cy.get('#email').type('joao@teste.com');
  cy.get('#submit').click();
  // Às vezes a mensagem aparece, às vezes não
  cy.contains('Cadastro realizado com sucesso!').should('be.visible');
});
```

## Principais Causas

### 1. Timing Issues
- **Sleeps fixos:** `cy.wait(2000)` 
- **Race conditions:** Elementos carregando assincronamente
- **Timeouts curtos:** Sistema mais lento que o esperado

### 2. Estado Compartilhado
- **Dados de teste contaminados:** IDs duplicados
- **Cookies/sessões persistentes:** Estados anteriores afetando
- **Banco de dados não resetado:** Registros acumulados

### 3. Dependências Externas
- **APIs de terceiros:** Disponibilidade variável
- **Serviços mockados instáveis:** Configurações inconsistentes
- **Rede instável:** Latência variável

### 4. Seletores Frágeis
- **IDs/classes dinâmicos:** Gerados automaticamente
- **XPath complexos:** Quebram com pequenas mudanças
- **Seletores baseados em posição:** Fragilidade estrutural

## Estratégias de Prevenção

### 1. Isolamento Completo
```javascript
// Antes: Testes compartilhando estado
describe('Cadastro de Usuários', () => {
  it('cria usuário', () => {
    // Usa email fixo
    cy.get('#email').type('usuario@teste.com');
  });
  
  it('valida usuário existente', () => {
    // Depende do teste anterior
  });
});

// Depois: Isolamento completo
describe('Cadastro de Usuários', () => {
  const emailUnico = `usuario_${Date.now()}@teste.com`;
  
  it('cria usuário', () => {
    cy.get('#email').type(emailUnico);
  });
  
  it('valida usuário existente', () => {
    // Cria usuário próprio para teste
    const outroEmail = `usuario2_${Date.now()}@teste.com`;
    cy.get('#email').type(outroEmail);
  });
});
```

### 2. Waits Explícitos
```javascript
// Antes: Sleep fixo
cy.visit('/pagina');
cy.wait(3000); // Espera arbitrária
cy.get('#botao').click();

// Depois: Wait condicional
cy.visit('/pagina');
cy.get('#botao').should('be.visible').click();
```

### 3. Teardown Rigoroso
```javascript
// Hooks para limpeza
beforeEach(() => {
  // Setup do teste
  cy.visit('/');
});

afterEach(() => {
  // Limpeza pós-teste
  cy.clearCookies();
  cy.clearLocalStorage();
  // Resetar estado do banco se necessário
});
```

## Técnicas de Detecção

### 1. Monitoramento Contínuo
- **Dashboards de flakiness:** % de falhas intermitentes
- **Alertas automáticos:** Notificação quando flakiness > 5%
- **Histórico de execuções:** Padrões de falha identificados

### 2. Re-execução Inteligente
```bash
# Re-executar testes falhos automaticamente
npx cypress run --spec "cypress/integration/flaky-test.js" --retries 2
```

### 3. Logs Detalhados
```javascript
// Adicionar contexto aos logs
it('deve processar pagamento', function() {
  cy.log(`Iniciando teste: ${this.test.title}`);
  cy.log(`Timestamp: ${new Date().toISOString()}`);
  // ... test steps
  cy.log('Teste concluído com sucesso');
});
```

## Processo de Correção

### 1. Identificação
- Coletar histórico de falhas
- Agrupar por padrões similares
- Priorizar por frequência de ocorrência

### 2. Análise
- Reproduzir manualmente
- Verificar logs detalhados
- Identificar ponto exato de falha

### 3. Correção
- Aplicar estratégias apropriadas
- Testar fix extensivamente
- Documentar solução implementada

### 4. Monitoramento
- Acompanhar por 2-3 semanas
- Verificar redução de flakiness
- Ajustar se necessário

## Erros Comuns

❌ **Ignorar flakiness:** "É só rodar de novo"
❌ **Não investigar causa raiz:** Patches superficiais
❌ **Falta de isolamento:** Estado compartilhado persistente
❌ **Waits inadequados:** Sleeps ou timeouts ruins
❌ **Seletores frágeis:** XPath e classes instáveis

## Boas Práticas

✅ **Design robusto:** Testes independentes e isolados
✅ **Waits inteligentes:** Esperas condicionais
✅ **Seletores estáveis:** Atributos dedicados para testes
✅ **Monitoramento contínuo:** Detecção precoce
✅ **Documentação clara:** Registro de soluções

## Checklist de Estabilidade

- [ ] Testes completamente independentes
- [ ] Waits explícitos ao invés de sleeps
- [ ] Seletores estáveis e semânticos
- [ ] Teardown completo após cada teste
- [ ] Dados de teste únicos por execução
- [ ] Mock de dependências externas
- [ ] Logs detalhados para debug
- [ ] Monitoramento de flakiness configurado

## Template de Análise

```markdown
## Análise de Flakiness - Teste de Checkout

**Padrão de Falha:** Intermittent failure (30% das execuções)
**Últimas Ocorrências:** 15/12, 16/12, 18/12/2025

**Causa Identificada:** Race condition no carregamento do carrinho

**Solução Aplicada:**
```javascript
// Antes
cy.visit('/checkout');
cy.get('#finalizar-compra').click();

// Depois
cy.visit('/checkout');
cy.get('#carrinho-itens').should('have.length.greaterThan', 0);
cy.get('#finalizar-compra').should('be.enabled').click();
```

**Resultado:** 0 falhas em 50 execuções consecutivas
**Responsável:** QA Maria
**Data:** 18/12/2025
```

## Conclusão

Eliminar testes flaky requer disciplina técnica e processo estruturado. A chave é prevenir antes de corrigir, e monitorar continuamente após a solução. Lembre-se: um teste flaky é pior que nenhum teste.

📚 **Quer aprofundar no tema?** Confira nosso guia completo sobre [Cypress](../../STACK/CYPRESS.md) e [Playwright](../../STACK/PLAYWRIGHT.md), além dos [exercícios práticos](../../exercicios/pleno.md#debug-de-testes-flaky).

#QA #TestAutomation #FlakyTests #Cypress #E2E