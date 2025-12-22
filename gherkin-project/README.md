# gherkin-project

Projeto exemplo para mapear comportamentos e regras de negócio sobre CNPJ (Brasil) usando Gherkin (PT-BR) e cucumber-js com TypeScript.

Objetivo

- Fornecer um repositório padrão para BDD com features em PT-BR, exemplos e uma implementação mínima com `cucumber-js` + TypeScript.

Instalação

```bash
cd gherkin-project
npm install
```

Execução

Guia passo-a-passo para aplicar Gherkin e executar o projeto (PT-BR)

Visão geral
---------
Esse projeto é um exemplo prático que demonstra como escrever cenários em Gherkin (em português), mapear para step definitions em TypeScript usando `@cucumber/cucumber`, organizar suporte (services, fixtures, world) e executar os testes localmente.

Público alvo
------------
Pessoas que nunca aplicaram Gherkin ou que já conhecem a teoria e querem ver um fluxo completo: escrever feature → mapear steps → rodar testes → analisar relatórios.

Pré-requisitos
--------------
- Node.js 18+ instalado
- npm (vem com Node.js) ou yarn
- Editor de texto (VS Code recomendado)

Estrutura do projeto (resumo)
-----------------------------
- `features/` — arquivos `.feature` em PT-BR (Gherkin)
- `step_definitions/` — implementações dos passos em TypeScript
- `support/` — `world.ts`, serviços (`support/services`) e fixtures
- `docs/` — documentação e convenções do projeto
- `package.json` e `cucumber.json` — scripts e configuração

Índices rápidos — CNPJ
---------------------
Para referência rápida das features canônicas e fixtures relacionadas à suíte CNPJ:

- `features/cnpj_alfanumerico.feature` — feature canônica para entradas alfanuméricas (ex.: com letras, símbolos).  
- `features/cnpj_numerico.feature` — feature canônica para entradas numéricas (apenas dígitos).  
- `fixtures/cnpj/examples.csv` — arquivos de exemplos representativos usados nos Scenario Outlines.  
- `docs/cnpj/cnpj_alfanumerico_mapping.md` — mapeamento e notas sobre casos alfanuméricos.  
- `docs/cnpj/cnpj_numerico_mapping.md` — mapeamento e notas sobre casos numéricos.  
- `gherkin-project/cnpj-consolidation-PR-draft.md` — rascunho de PR descrevendo todas as mudanças de consolidação.

Como rodar os smoke tests (exemplo rápido):

```bash
cd gherkin-project
npm install
npx cucumber-js --tags "@fast and @critical and not @flaky"
```


Primeiros passos (instalação)
----------------------------
1. Abra um terminal na pasta `gherkin-project`.
2. Instale dependências:

```bash
npm install
```

3. Para rodar todos os cenários:

```bash
npm test
```

4. Para rodar apenas cenários com uma tag (ex.: `@smoke`):

```bash
npm run test:smoke
```

Entendendo Gherkin (passo-a-passo simples)
----------------------------------------
1. O que é um arquivo `.feature`?
	 - Um arquivo `.feature` contém especificações escritas em linguagem natural seguindo a sintaxe Gherkin: `Feature`, `Background`, `Scenario`, `Given`, `When`, `Then`, `And`, `But`, `Scenario Outline` e `Examples`.

2. Exemplo mínimo (em PT-BR):

```gherkin
# language: pt
Feature: Validação de CNPJ

	Scenario: CNPJ válido deve ser aceito
		Given que eu tenho um CNPJ "12.345.678/0001-95"
		When eu valido o CNPJ
		Then o resultado deve ser "válido"
```

3. Boas práticas ao escrever features:
	 - Use linguagem do negócio (evite detalhes de UI/implementação)
	 - Mantenha cenários curtos e focados
	 - Use `Background` para passos repetidos
	 - Prefira exemplos (Scenario Outline) para casos data-driven

Mapeando Gherkin para code (passo-a-passo)
----------------------------------------
1. Escreva a `feature` e salve em `features/` com `# language: pt` no topo.
2. Execute `npm test` — o Cucumber acusará passos não implementados e exibirá snippets de step definitions.
3. Copie o snippet sugerido e cole em um arquivo dentro de `step_definitions/`, por exemplo `cnpj.steps.ts`.
4. Implemente a lógica do passo chamando serviços do diretório `support/services`.

Exemplo de step definition (fluxo resumido):

```ts
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { TestWorld } from '../support/world';

Given('que eu tenho um CNPJ {string}', function (this: TestWorld, cnpj) {
	this.cnpj = cnpj;
});

When('eu valido o CNPJ', async function (this: TestWorld) {
	this.result = await this.services.cnpj.validate(this.cnpj);
});

Then('o resultado deve ser {string}', function (this: TestWorld, esperado) {
	expect(this.result).to.equal(esperado);
});
```

World e serviços
-----------------
- `support/world.ts` inicializa um `TestWorld` por cenário, contendo referência aos serviços (CNPJ, Empresa, Integração) e estado transitório.
- `support/services/*` contém lógica de domínio (ex.: validação de dígito verificador, normalização, repositório em memória para exemplos).

Executando e depurando
----------------------
- Executar com `npm test` roda o Cucumber com `ts-node` para interpretar TypeScript direto.
- Para ver saídas detalhadas, execute com `--format progress` ou verifique `reports/cucumber.json`.
- Se um passo falhar, o Cucumber mostra o stack trace; use `console.log` temporário nos steps/services para inspecionar valores.

Lint e qualidade de Gherkin
--------------------------
Este repositório inclui uma configuração de `gherkin-lint` (na pasta `pt-br/STACK`), sugerida para aplicar regras de estilo. Para usar localmente, instale `gherkin-lint` globalmente ou no seu fluxo de CI e execute nas `features/`.

Fluxo recomendado para adicionar um novo cenário (tutorial rápido)
----------------------------------------------------------------
1. Abra `features/` e crie `minha_nova_feature.feature` com `# language: pt`.
2. Escreva um cenário simples (Given/When/Then) usando termos do negócio.
3. Rode `npm test` — copie o snippet de steps não implementados.
4. Crie/abra `step_definitions/minha.steps.ts` e cole os snippets.
5. Implemente cada step chamando `this.services.*` ou escrevendo lógica pequena direto no step (evite lógica complexa no step).
6. Rode novamente `npm test` até todos passarem.

Usando tags para execuções seletivas
-----------------------------------
- Tags comuns: `@smoke`, `@regression`, `@wip`, `@integration`.
- Use nos cenários: `@smoke Scenario: ...` e rode com o filtro no `cucumber.json` ou via script.

Contribuindo (se você for iniciante)
----------------------------------
1. Crie uma branch com nome claro: `feat/feature-cnpj-normalizacao`.
2. Escreva a feature e implemente os steps.
3. Execute `npm test` localmente.
4. Abra um PR descrevendo: objetivo, mudanças, como rodar, e que tags usar.
5. Use o checklist PR (em `docs/` quando criado) para verificar qualidade de BDD.

Erros comuns e soluções rápidas
------------------------------
- "Passos não implementados": copie o snippet gerado pelo Cucumber para `step_definitions`.
- Problemas de import/ts-node: verifique `tsconfig.json` e a versão do Node.
- Dados compartilhados entre cenários: use `Before` hook para resetar `TestWorld`.

Próximos passos sugeridos para aprender aplicando
-----------------------------------------------
1. Leia os arquivos em `docs/` para entender convenções desse projeto.
2. Abra uma feature simples e altere para ver como as mudanças afetam os steps.
3. Integre `gherkin-lint` no seu workflow local (VS Code + task) para obter feedback imediato.
4. Experimente criar um `Scenario Outline` com `Examples` para ver o data-driven em ação.

Suporte e contato
-----------------
Se ficar travado, abra uma issue no repositório principal ou pergunte por uma revisão de PR com alguém que já tenha experiência em BDD.

Boa prática final: escreva features pensando em comportamentos do usuário/negócio, não na UI ou implementação.

----

Se quiser, eu posso:
- Rodar `npm install` e `npm test` neste ambiente agora (precisa autorizar instalação de dependências),
- Adicionar um arquivo `PR_Checklist_BDD.md` em `docs/`, ou
- Criar um workflow GitHub Actions básico para rodar os testes no push/PR.

Informe qual desses próximos passos você prefere.
- Executar suíte completa:

```bash
npm test
```

- Executar apenas smoke:

```bash
npm run test:smoke
```

Execução por tags (exemplo):

```bash
npx cucumber-js --tags "@regression and not @wip"
```

Estrutura do repositório

- `docs/` — documentação de padrões e convenções
- `features/` — arquivos `.feature` em PT-BR
- `step_definitions/` — implementações em TypeScript
- `support/` — world, services e fixtures

Como contribuir

- Siga os padrões em `docs/01_padroes_nomenclatura_e_convencoes.md`.
- Abra PRs pequenos e com uma feature por PR.
