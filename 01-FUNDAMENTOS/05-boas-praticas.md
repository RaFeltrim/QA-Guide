```markdown
# 05 — Boas Práticas

Lista prática de padrões, nomenclatura e exemplos reutilizáveis.

## Casos de teste claros
- Estrutura sugerida (campos): `Título`, `Pré-condições`, `Passos`, `Resultado esperado`, `Evidências`, `Notas`.

Exemplo curto:

```
Título: Login com credenciais válidas
Pré-condições: Usuário cadastrado (user@example.com)
Passos:
  1. Acessar /login
  2. Preencher email e senha
  3. Submeter
Resultado esperado: Usuário redirecionado para /dashboard
Evidência: screenshot + HTTP 200
```

## Padrões de nomenclatura
- Testes unitários: `test_<módulo>__<funcionalidade>_deve_<comportamento>` (ex.: `test_cart__calcula_total_deve_somar_itens`).
- Testes E2E (cypress): `e2e_<fluxo>_spec.js`.
- Branches: `feat/<resumo>`, `fix/<bug>`, `docs/<arquivo>`.

## Fixtures (exemplo JSON)

```json
{
  "usuario": {"email": "test@qa.example", "senha": "Senha123!"},
  "produto": {"id": 1, "nome": "Caneca", "preco": 29.9}
}
```

## Commits e mensagens de teste
- Mensagem: `test(junior): adiciona casos de validador_cnpj para entrada inválida`

## Checklist de boas práticas
- Escrever critérios de aceite antes de automatizar.
- Evitar dados reais; use fixtures ofuscadas.
- Isolar testes (sem dependência de estado compartilhado).
- Tornar testes rápidos e determinísticos (evitar sleeps sem necessidade).

## Pair testing e revisão
- Faça revisão periódica dos testes e sessions de pair testing para conhecimento compartilhado.

```
# 05 — Boas Práticas

- Escrever casos de teste claros e reproduzíveis
- Automatizar onde traz ROI
- Revisões de testes e pair testing
- Uso de fixtures e ambientes estáveis
- Observabilidade e logs úteis para debugging
# Boas Práticas de QA

Checklist rápido de boas práticas: automatizar testes desacoplados, evitar massa real em ambientes públicos, documentar critérios de aceite.

> TODO: expandir com exemplos e padrões de nomenclatura.
