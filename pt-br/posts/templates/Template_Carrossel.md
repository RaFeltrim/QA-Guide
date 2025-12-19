# Template de Carrossel

## Estrutura Padrão

Slide 1: Título + Hook
Slide 2-6: Pontos principais (1 por slide)
Slide 7: Exemplo prático
Slide 8: Call to action + créditos

---

## Exemplo Preenchido

### Slide 1
# Testes Flaky: Como Reduzir a Instabilidade?

💡 Seus testes automatizados falham aleatoriamente? Você não está louco!

### Slide 2
## O que são testes flaky?

🧪 Testes que falham intermitentemente
❌ Mesmo sem mudanças no código
⏰ Causam perda de tempo e confiança
💸 Impacto financeiro significativo

### Slide 3
## Principais causas

⏰ **Tempo de espera inadequado**
🔄 **Dependências externas instáveis**
💾 **Estado compartilhado entre testes**
🌐 **Problemas de rede**
🖥️ **Diferenças entre ambientes**

### Slide 4
## Estratégias de prevenção

🛡️ **Isolamento completo dos testes**
⏱️ **Wait explícito ao invés de sleep**
🧹 **Teardown rigoroso**
🔒 **Mock de serviços externos**
📋 **Padrões consistentes de seletores**

### Slide 5
## Técnicas de detecção

📊 **Monitoramento contínuo**
🔁 **Re-execução automática**
📝 **Logs detalhados**
🔔 **Alertas para flakiness > 5%**

### Slide 6
## Processo de correção

1️⃣ Identificar padrões de falha
2️⃣ Classificar por frequência
3️⃣ Priorizar os mais críticos
4️⃣ Corrigir na ordem de impacto
5️⃣ Monitorar após correção

### Slide 7
## Exemplo prático

**Antes (flaky):**
```javascript
cy.visit('/login')
cy.wait(2000) // Espera fixa
cy.get('#email').type('user@test.com')
cy.get('#password').type('123456')
cy.get('#submit').click()
cy.contains('Dashboard') // Pode falhar por timing
```

**Depois (estável):**
```javascript
cy.visit('/login')
cy.get('#email').should('be.visible').type('user@test.com')
cy.get('#password').should('be.visible').type('123456')
cy.get('#submit').should('be.enabled').click()
cy.contains('Dashboard', {timeout: 10000}) // Wait explícito
```

### Slide 8
## Quer eliminar os testes flaky do seu projeto?

📘 Acesse nosso guia completo sobre testes E2E no [QA-Guide](../../STACK/CYPRESS.md)

#QA #TestAutomation #Cypress #FlakyTests #SoftwareTesting

---

## Dicas para criação

✅ Mantenha texto conciso (máximo 3 linhas por slide)
✅ Use emojis estrategicamente para engajamento
✅ Inclua exemplos visuais quando possível
✅ Termine com CTA claro e específico
✅ Use hashtags relevantes (3-5 hashtags)