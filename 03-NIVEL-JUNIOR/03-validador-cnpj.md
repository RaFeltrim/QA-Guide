# 03 — Validador de CNPJ (Descrição + Exercícios)

Objetivo: explicar o algoritmo de validação do CNPJ e fornecer exemplos práticos em Python.

Resumo do algoritmo:
- Remover caracteres não numéricos
- Verificar tamanho (14 dígitos)
- Calcular primeiro dígito verificador com multiplicadores
- Calcular segundo dígito verificador
- Comparar dígitos calculados com os do CNPJ

Exemplo (referência de implementação em `gabarito/exemplos-codigo/validador-cnpj.py`).

Padrões a considerar:
- Rejeitar sequências repetidas (ex.: '00000000000000')
- Tratar entradas nulas ou com tamanho incorreto

Exercícios sugeridos neste tópico:
1. Implementar o validador em Python (usar a referência como base).
2. Criar testes `pytest` cobrindo válidos e inválidos.
3. Adicionar CLI simples que aceita CNPJ e imprime válido/inválido.

Critério de aceitação: função `is_valid_cnpj(cnpj)` deve retornar boolean correto para uma lista de entradas de teste.
# Validador de CNPJ (Júnior)

## Seção 1 – Conceito e por que importa

Validar CNPJ é um exercício clássico para QAs júnior: envolve normalização de entrada, regras de negócio simples e verificação algorítmica (dígitos verificadores). É útil para aprender a escrever testes unitários e integrar validações em pipelines.

Este documento traz uma implementação de referência, exemplos em Python e JavaScript, e exercícios scaffolded com gabarito comentado.

## Seção 2 – Regras rápidas

- Aceitar entradas com ou sem formatação (ex.: `11.222.333/0001-81` ou `11222333000181`).
- Normalizar: remover qualquer caractere não numérico.
- Rejeitar entradas com menos ou mais de 14 dígitos.
- Rejeitar sequências com todos os dígitos iguais (ex.: `00.000.000/0000-00`).
- Validar dígitos verificadores usando o algoritmo módulo 11 (pesos específicos para CNPJ).

## Seção 3 – Exemplo de implementação (Python)

Veja o arquivo de referência em `gabarito/exemplos-codigo/validador-cnpj.py`.

Resumo do algoritmo:

1. Normalizar para obter 14 dígitos numéricos.
2. Verificar tamanho e sequências inválidas.
3. Calcular primeiro dígito verificador usando pesos [5,4,3,2,9,8,7,6,5,4,3,2].
4. Calcular segundo dígito verificador usando pesos [6,5,4,3,2,9,8,7,6,5,4,3,2].

## Seção 4 – Exemplo de implementação (JavaScript)

Há um exemplo funcional em `gabarito/exemplos-codigo/js/validador.js` com testes em `gabarito/exemplos-codigo/js/validador.test.js`.

## Seção 5 – Exercícios (scaffolded)

### Exercício 1 — Implementação básica (guiado)
- **Objetivo:** Implementar `validar_cnpj()` em Python (arquivo `src/validador_cnpj.py` ou usar o gabarito para referência).
- **O que fazer:** Use o algoritmo descrito; escreva testes parametrizados com `pytest` cobrindo: formatos com máscara, sem máscara, dígitos verificador incorretos, entradas curtas e sequências repetidas.
- **Critério de aceitação:** Todos os testes passam localmente com `pytest`.

### Exercício 2 — Casos de borda (intermediário)
- **Objetivo:** Adicionar testes para edge-cases: restos 0/1 no cálculo do DV, filiais com ordem diferente, grandes entradas reais.
- **Critério de aceitação:** Testes adicionais cobrem esses casos e passam.

### Exercício 3 — Integração (autônomo)
- **Objetivo:** Integrar os testes em CI e configurar cobertura mínima (ex.: >80%).
- **Critério de aceitação:** Workflow de CI executa testes e falha se cobertura menor que o limiar.

## Seção 6 – Gabarito (referência rápida)

- Implementação Python: `gabarito/exemplos-codigo/validador-cnpj.py` (contém função `validar_cnpj(cnpj: str) -> bool`).
- Testes pytest: `gabarito/exemplos-codigo/tests/test_validador_pytest.py`.
- Implementação JS: `gabarito/exemplos-codigo/js/validador.js` (já presente).

## Seção 7 – Dica de mercado / Soft skill

Explique nos PRs a limitação do validador (ex.: apenas validação sintática, não consulta a Receita). Ao escrever testes, descreva também por que cada caso foi incluído (impacto no usuário).

## Seção 8 – Próximos passos

- Depois de implementar e validar localmente, adicione exemplos em `gabarito/exemplos-codigo/` e referencie-os no exercício.
- Próximo documento recomendado: `03-NIVEL-JUNIOR/04-git-colaboracao.md` (faça PR com seu exercício implementado).

---

> Observação: use os gabaritos apenas para validar-se depois de tentar implementar por conta própria — scaffolding pedagógico ajuda a aprender.
# Validador de CNPJ (Júnior)

Contexto: implementar e testar um validador de CNPJ (apenas a lógica, sem dependências externas).

> TODO: criar exercício com critérios e adicionar gabarito em `gabarito/exemplos-codigo/validador-cnpj.py`.
