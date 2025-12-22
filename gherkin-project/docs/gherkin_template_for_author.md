# Template para escrever Gherkins — Para revisão por QA SR

Use este arquivo para escrever suas features e cenários em Gherkin antes de solicitar revisão. Preencha as seções abaixo; mantenha a linguagem do negócio, cenários curtos e exemplos legíveis.

---

## Metadados
- Autor: 
- Data: 
- Propósito / Contexto (uma linha): 
- Tags sugeridas: `@integration`, `@regression`, `@smoke`, `@negative`, ...

---

## Feature (escreva o Gherkin abaixo)
Cole seu Gherkin inteiro dentro do bloco. Exemplo:

```gherkin
Funcionalidade: <Título claro da funcionalidade>
  Contexto: <(opcional) pré-condições que se aplicam a todos os cenários>

  @tag1 @tag2
  Cenário: [Contexto] — Descrição curta do comportamento
    Dado <pré-condição legível>
    Quando <ação do usuário/sistema>
    Então <resultado observável>
```

<Cole aqui seu .feature completo>

```gherkin

```

---

## Observações para revisão (preencha antes de pedir revisão)
- Objetivo do(s) cenário(s): (o que estamos garantindo?)
- Restrições/limitações: (ex.: ambiente, dados, mocks necessários)
- Passos que você já automatizou (se houver): (arquivo/steps/etc.)

---

## Checklist rápido do QA SR (preencher e verificar)
- [ ] Linguagem de negócio clara (sem termos técnicos desnecessários)
- [ ] Cada cenário foca um comportamento (sem efeitos colaterais ocultos)
- [ ] Given/When/Then bem separados (Given prepara, When age, Then verifica)
- [ ] Tags apropriadas aplicadas (facilitam execução seletiva)
- [ ] Data-driven: usar Scenario Outline quando houver variações semelhantes
- [ ] Casos negativos cobertos (formato inválido, timeout, indisponível, etc.)
- [ ] Reutilizável: cenários não dependem de ordens de execução entre si
- [ ] Privacidade: confirmar mascaramento de dados sensíveis quando aplicável
- [ ] Automatizável: passos acionáveis via step definitions (sem "manual steps")

---

## Guia rápido: como eu (QA SR) vou avaliar
1. Verifico clareza do domínio e se os cenários descrevem comportamento observável. 
2. Verifico cobertura de happy path e negativos críticos. 
3. Sugiro consolidar cenários parecidos via Scenario Outline. 
4. Aponto melhorias de wording (Given mais explícito, Then mais testável). 
5. Indico se é necessário criar/mudar step definitions ou suporte/mocks.

---

Quando terminar, salve este arquivo e me avise (ou cole o conteúdo no chat). Eu revisarei e devolvo sugestões concretas de reescrita e mapeamento para steps.
