## Lógica e diretrizes usadas para criar os Gherkins

Este documento resume a lógica, decisões e padrões que usei ao escrever os arquivos `.feature` e ao modelar cenários para o repositório.

## 1) Tom e linguagem
- Escrever em linguagem do negócio (ubíqua): usar termos que stakeholders entendem (ex.: "serviço externo", "CNPJ", "razão social").
- Evitar detalhes técnicos (URLs, bibliotecas, comandos) dentro do Gherkin — esses detalhes pertencem às step definitions ou à documentação técnica.

## 2) Estrutura dos Features
- Título claro: `Funcionalidade: ...` explicando a área ou integração testada.
- Contexto/Background quando houver pré-condições comuns entre cenários.
- Cenários pequenos e independentes, cada um cobrindo um comportamento.

## 3) Given / When / Then — responsabilidades
- Given: prepara o estado do sistema (dados, mocks, modo do serviço). Não fazer ações que representam o comportamento sendo testado.
- When: ação que dispara o comportamento (ex.: "eu consultar o serviço externo").
- Then: validações observáveis — preferir 1 validação por Then, mas aceitamos validar coesão sem explodir em vários Thens.

## 4) Tags
- Usar tags para agrupar por tipo: `@integration`, `@unit`, `@regression`, `@smoke`, `@negative`.
- Tags facilitam execução seletiva em CI e em runs locais.

## 5) Data-driven & Scenario Outline
- Usar `Esquema do Cenário` (Scenario Outline) com `Exemplos` para variações de comportamento que compartilham a mesma estrutura.
- Evitar muitas colunas — manter legibilidade.

## 6) Falhas e negative cases
- Explícitos: timeout, indisponibilidade, formatos inválidos.
- Garantir que o sistema trata erros de forma previsível (mensagem/motivo, fallback, retry, circuit-breaker).

## 7) Test doubles e suporte
- Não chamar serviços reais nos testes de rotina: usar serviços simulados/in-memory (como `IntegracaoService` no projeto) ou stubs.
- Arquitetura de suporte:
  - `support/services/*` — mocks e pequenos adapters para comportamento de serviços externos.
  - `support/world.ts` — objeto `World` para manter contexto entre steps.

## 8) Organização de step definitions
- Agrupar steps por domínio (ex.: `integracao.*`, `empresa.*`) para manter clareza.
- Reutilizar steps comuns entre features quando fizer sentido.
- Evitar duplicação de regex/strings diferentes para o mesmo comportamento; padronizar frases.

## 9) Versionamento e manutenção
- Cada feature deve ter um cabeçalho ou CHANGELOG leve quando comportamentos mudarem.
- Remover steps duplicados e consolidar implementações para diminuir `Undefined`/`Ambiguous` do Cucumber.

## 10) Integração CI
- Marcar testes caros (integração externa) com tag `@integration` e executá-los em pipelines específicos.
- Executar `@smoke` ou `@regression` conforme política de release.
- Gerar relatórios JSON (ex.: `--format json:reports/cucumber.json`) para integrar com ferramentas de análise.

## 11) Como mapear Gherkin -> Steps (exemplo rápido)
- Placeholder `{string}` vira parâmetro string no handler.
- Exemplo de handler (TypeScript):

```ts
Given('existe informação externa para CNPJ {string}', function(this: TestWorld, cnpj: string) {
  integracaoService.setExternalData(cnpj, { razaoSocial: 'Empresa Externa' });
});
```

## 12) Dicas práticas para escrever bons cenários
- Comece pelo comportamento do usuário/negócio.
- Escreva cenários que sejam executáveis e automáticos.
- Evite números mágicos e use exemplos legíveis (CNPJ formatado ajuda leitura).
- Nomeie cenários com contexto entre colchetes (ex.: `[Integração] — Timeout externo`) para rápida identificação em relatórios.


Se quiser, eu converto outras features para `.md` com explicações (ex.: `empresa`, `cnpj`, `e2e`), ou adapto os `.feature` para seguir um template padrão. Quer que eu converta mais alguma feature agora?