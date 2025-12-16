# Diretrizes de IA para Geração de Testes e Automação — Nível Pleno

Este guia aborda como usar ferramentas de IA para apoiar a geração de casos de teste, scaffolding de automação e inspeção de resultados, preservando qualidade, segurança e responsabilidade.

1. Princípios e limites

- IA é assistiva: sempre exigir revisão humana antes de aceitar artefatos gerados.
- Reprodutibilidade: armazenar prompts, contexto e versão da ferramenta usada para auditoria.
- Privacidade e compliance (LGPD): não enviar dados sensíveis ou pessoais para serviços externos sem anonimização e autorização.
- Segurança: validar código gerado (linters, scanners SAST) antes de executar em CI/agents.

2. Casos de uso recomendados

- Gerar esboços de casos de teste a partir de requisitos (candidatos para revisão humana).
- Sugerir dados de teste e parametrizações a partir de fixtures.
- Criar esqueleto de testes automatizados (PyTest/Jest/Cypress) com placeholders para ajustes manuais.
- Gerar descrições e sumários para relatórios de teste e evidências.

3. Fluxo seguro sugerido

1. Preparar contexto: coletar requisitos, endpoints, fixtures e política de privacidade.
2. Anonimizar dados sensíveis dos fixtures (substituir emails, CPFs/CNPJs reais por exemplos).
3. Enviar prompt controlado à ferramenta de IA com instruções claras (ver templates abaixo).
4. Receber artefato gerado e executar validações estáticas (linters, testes de sintaxe, SAST).
5. Revisão humana por um engenheiro de QA (checagem de lógica, cobertura e viés).
6. Integração ao repositório via PR com checklist de revisão e tags `ai-generated`.

4. Template de prompt — gerar casos de teste a partir de requisitos

Use este template como base e mantenha-o versionado em `gabarito/prompts/`.

```
Context: Você é um gerador de casos de teste para equipe de QA. Não inclua dados reais.
Input: [INCLUIR AQUI descrição do requisito ou endpoint — por exemplo: POST /users cria um usuário com name,email,role]
Fixtures available: [listar fixtures relevantes e campos]
Goal: Gere 5 casos de teste com título, id (prefixo JUN-AI-), pré-condições, passos numerados, dados de teste (anônimos), resultado esperado e tags.
Constraints: Use no more than 10 passos; não contenha dados pessoais; marque os casos com `ai-generated` e inclua sugestão de automatização (arquivo de teste path).
Output format: JSON array with fields: id,title,preconditions,steps,data,expected,tags,automation_suggestion
```

Exemplo de prompt reduzido para gerar um esqueleto de teste PyTest

```
Context: gerar um esqueleto PyTest que valide POST /users (status 201). Use fixtures users.json como base.
Constraints: não inclua credenciais reais; gere um arquivo `tests/test_create_user_ai.py` com funções e asserts básicos.
```

5. Boas práticas ao integrar IA em pipelines

- Sempre criar PRs para artefatos gerados e exigir revisão humana antes do merge.
- Marcar commits/PRs com `ai-generated` para rastreabilidade.
- Validar automaticamente: rodar linters, tipos (mypy/tsc), testes de sintaxe e um teste de smoke antes de permitir execução completa.
- Log de prompts: salvar prompt e saída como artefato no PR (por exemplo `ai/prompt_v1.json`) para auditoria.

6. Exemplo prático: gerar esqueleto PyTest e validar localmente

- Passos rápidos:

```bash
# 1. Gerar esqueleto via IA (manual/CLI) e salvar em ai/output/test_create_user.py
# 2. Rodar linter e sintaxe
python -m pyflakes ai/output/test_create_user.py || echo "lint failed"
# 3. Adicionar como PR com label `ai-generated` e solicitar revisão de QA
```

7. Riscos e mitigação

- Falsos positivos/negativos: IA pode sugerir asserts incorretos — mitigar com revisão humana e testes adicionais.
- Viés: modelos podem replicar padrões errados — auditar fixtures e prompts para remover vieses históricos.
- Segurança: não execute código gerado em ambientes sensíveis sem sandboxing e análise prévia.

8. Política de dados (LGPD)

- Nunca enviar dados pessoais identificáveis (PII) para serviços públicos de IA sem consentimento e contrato.
- Preferir anonimização/mascaramento e usar datasets sintéticos para geração.
- Registrar finalidade e base legal quando usar qualquer dado real no processo de geração.

9. Exercício prático (nível Pleno)

- Objetivo: usar o template de prompt para gerar 5 casos de teste para `POST /orders`, revisar e criar PR com os arquivos de teste esqueleto e o registro do prompt.
- Entregáveis:
  - `gabarito/prompts/generate_tests_post_orders_v1.txt` (prompt usado)
  - `ai/output/post_orders_tests.json` (saída da IA)
  - PR com `tests/test_post_orders_ai.py` + checklist de revisão humana e label `ai-generated`.

Critérios de aceitação

- Prompt salvo no repositório; saída da IA validada por checklist automatizado (linters) e revisão humana cadastrada no PR.

Referências internas: `gabarito/templates`, `04-NIVEL-PLENO/01-e2e-cypress.md`, `04-NIVEL-PLENO/02-performance-k6.md`.
