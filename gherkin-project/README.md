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
