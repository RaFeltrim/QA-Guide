# 13 — IA como Auxílio para Testes

Aplicações práticas:
- Geração de casos de teste a partir de requisitos
- Análise de logs para identificar padrões de erro
- Geração de dados de teste e prompts para prompt engineering

Riscos: revisar saídas geradas por IA; evitar usar IA para decisões sem validação humana.

## Uso recomendado

- Gerar esboços de casos de teste a partir de requisitos.
- Sugerir cenários de borda e hipóteses de falha.
- Apoiar na geração de dados de teste sintéticos (cautela com dados sensíveis).

## Limitações e segurança

- Validar outputs da IA manualmente; IA pode gerar falsos positivos.
- Não enviar dados sensíveis para serviços externos sem anonimização.

## Exemplo de prompt

Input: "Como testar o fluxo de recuperação de senha de um usuário"

Output: Forneça 8 casos de teste, cobrindo sucessos, falhas, inputs inválidos e cenários de segurança.

## Checklist

- [ ] Output validado por humano
- [ ] Dados sensíveis protegidos
# 13 — IA como Auxílio para Testes

Aplicações práticas:
- Geração de casos de teste a partir de requisitos
- Análise de logs para identificar padrões de erro
- Geração de dados de teste e prompts para prompt engineering

Riscos: revisar saídas geradas por IA; evitar usar IA para decisões sem validação humana.

Exercício: usar um prompt básico para gerar 10 casos de teste a partir de uma história curta.
```markdown
# IA como Auxiliar de Testes (Pleno)

Visão prática de como usar modelos e ferramentas de IA para acelerar tarefas de QA.

Uso recomendado

- Gerar esboços de casos de teste a partir de requisitos.
- Sugerir cenários de borda e hipóteses de falha.
- Apoiar na geração de dados de teste sintéticos (cautela com dados sensíveis).

Limitações e segurança

- Validar outputs da IA manualmente; IA pode gerar falsos positivos.
- Não enviar dados sensíveis para serviços externos sem anonimização.

Exemplo de workflow

1. Extrair requisitos (user stories)
2. Pedir ao assistente IA por exemplos de casos de teste e critérios
3. Ajustar e validar com SME (subject-matter expert)

Checklist

- [ ] Output validado por humano
- [ ] Dados sensíveis protegidos

```
# IA como Auxiliar em Testes (Pleno)

Como usar IA para gerar cenários, analisar logs e acelerar criação de casos de teste.


Exemplos de prompts e limites práticos

Prompt exemplo para gerar casos de teste a partir de requisitos:

```
Input: "Como testar o fluxo de recuperação de senha de um usuário"
Output: Forneça 8 casos de teste, cobrindo sucessos, falhas, inputs inválidos e cenários de segurança.
```

Limites e boas práticas:
- Sempre revisar automaticamente gerado por humanos; evite usar sem validação.
- Evite expor dados sensíveis nos prompts; use exemplos sintetizados.

