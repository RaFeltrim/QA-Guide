# CNPJ — Validação, normalização e cenários recomendados

## Contexto CNPJ

- O que é: CNPJ é o identificador fiscal de pessoas jurídicas no Brasil — composto por 14 dígitos (raiz 8 + filial 4 + 2 dígitos verificadores).
- Formato comum: `00.000.000/0000-00` (apenas para leitura).
- Uso nos testes: tratar o CNPJ como um identificador de negócio — fixtures devem cobrir formatos formatados/normalizados e casos inválidos.

## Validação técnica (resumo)

- Normalização: remover caracteres de formatação (pontos, traços, barras, espaços) e normalizar para um token com o padrão `[A-Z0-9]{14}` (preservando letras e convertendo para maiúsculas).
- Tamanho: após normalização o token deve ter exatamente 14 caracteres; caso contrário retorne `tamanho_invalido`.
- Caracteres: após normalização só são permitidos `A–Z` e `0–9`; se houver outros caracteres retorne `caracter_invalido`.
- Últimos 2 caracteres (DVs): continuam sendo numéricos (0–9). Se não forem dígitos, considerar `caracter_invalido`.
- Check-digits: os 2 últimos dígitos continuam validados via algoritmo módulo 11, mapeando letras para valores numéricos via tabela ASCII no cálculo — motivo de falha: `check_digits_invalido`.
- Rejeitar sequências triviais: bloqueamos padrões óbvios — definido aqui como: todos os 14 caracteres iguais (ex.: `AAAAAAAAAAAAAA`) ou as primeiras 12 posições iguais (ex.: `AAAAAAAAAAAA95`) — motivo: `sequencia_invalida`.

## CNPJs alfanuméricos — o que são e como tratar

- Não existem “oficialmente”: o padrão CNPJ é numérico; letras não fazem parte do identificador.
- Quando aparecem: input do usuário com letras (colagem errada), sistemas externos que retornam identificadores misturados, ou campos onde usuários digitam `CNPJ:A123...` — são dados sujos.
- Política de tratamento recomendada:
  - Normalizar primeiro: remover apenas caracteres de formatação e normalizar para o token `[A-Z0-9]{14}`; aceitar letras nas 12 primeiras posições quando a política de negócio permitir.
  - Separar casos: diferenciar "formato inválido (contém letras)" de "formato numérico mas inválido (check-digit/fixed-sequence)".
  - Tolerância controlada: só aceitar alfanuméricos se houver regra de negócio explícita que mapeie letras para significado (raríssimo para CNPJ).

## Boas práticas para escrever Gherkins sobre CNPJ

- Use linguagem de negócio: cenários descrevem comportamento esperado (ex.: validação, busca, mascaramento, fallback), não implementação.
- Normalização explícita em `Given`: crie steps que indiquem se o input está formatado, normalizado ou contém caracteres inválidos. Ex.: usar `Dado que foi informado o CNPJ formatado "..."` vs `Dado que foi informado o CNPJ normalizado "..."`.
- Diferencie tipos de falha: use motivos padronizados para asserts: `tamanho_invalido`, `caracter_invalido`, `sequencia_invalida`, `check_digits_invalido`.
- Privacidade: incluir cenário que valida mascaramento/ocultação de CNPJ nas respostas (não retornar CNPJ completo em APIs públicas).

---

## Exemplos de cenários Gherkin recomendados

### Cenário simples — sucesso

```gherkin
Funcionalidade: Consulta de CNPJ
  Cenário: Consulta por CNPJ válido
    Dado que existe um CNPJ válido "12.345.678/0001-95"
    Quando eu consultar por CNPJ "12.345.678/0001-95"
    Então devo receber dados cadastrais com razão social
```

### Cenário — caracteres inválidos (não A–Z / 0–9)

```gherkin
Funcionalidade: Validação de CNPJ
  Cenário: CNPJ contendo letras é inválido
    Dado que foi informado o CNPJ formatado "12A.345.678/0001-95"
    Quando eu validar o CNPJ informado
    Então a validação deve falhar com motivo "caracter_invalido"
```

### Cenário — check-digit inválido

```gherkin
Funcionalidade: Validação de CNPJ
  Cenário: Check-digits inválidos
    Dado que foi informado o CNPJ formatado "12.345.678/0001-00"
    Quando eu validar o CNPJ
    Então a validação deve falhar com motivo "check_digits_invalido"
```

### Cenário — sequências repetidas (trivial)

```gherkin
Funcionalidade: Validação de CNPJ
  Cenário: Sequência repetida é inválida
    Dado que foi informado o CNPJ normalizado "11111111111111"
    Quando eu validar o CNPJ
    Então a validação deve falhar com motivo "sequencia_invalida"
```

### Scenario Outline — normalização e variações

```gherkin
Funcionalidade: Validação de formatos de CNPJ
  Esquema do Cenário: validação de formatos (tokens)
    Dado que foi informado o CNPJ "<input>"
    Quando eu validar o CNPJ
    Então o resultado deve ser "<resultado>"

    Exemplos:
      | input                     | resultado           |
      | 12.345.678/0001-95        | valido              |
      | 12345678000195            | valido              |
      | 12A345678000195           | caracter_invalido   |
      | 11111111111111            | sequencia_invalida  |
      | 12.345.678/0001-00        | check_digits_invalido|
```

### Cenário — privacidade

```gherkin
Funcionalidade: Dados públicos de empresa
  Cenário: CNPJ mascarado em resposta pública
    Dado que existe empresa com CNPJ "12.345.678/0001-95"
    Quando eu solicitar os dados públicos da empresa
    Então o CNPJ retornado deve estar mascarado como "12.345.678/0001-**"
```

---

## Sugestões de step definitions (resumo)

- `Given('que existe um CNPJ válido {string}', ...)` — pré-popula fixture/serviço com registro válido.
- `Given('que foi informado o CNPJ {string}', ...)` — armazena entrada bruta no `World` para validação.
- `When('eu validar o CNPJ', ...)` — executa normalização + validação (tamanho, sequência, check-digits) e define resultado no `World`.
 - `When('eu validar o CNPJ', ...)` — executa normalização + validação (remover formatação, uppercase, checar token, tamanho, sequência, check-digits) e define resultado no `World`.
- `When('eu consultar por CNPJ {string}', ...)` — invoca serviço de consulta (mock) e armazena resposta.
- `Then('a validação deve falhar com motivo {string}', ...)` — compara `world.validationError`.
- `Then('o resultado deve ser {string}', ...)` — usado no Scenario Outline para resultados previstos.
- `Then('o CNPJ retornado deve estar mascarado como {string}', ...)` — valida mascaramento na resposta.

## Utilitários recomendados para implementação

- `normalizeCnpj(input: string): string` — remove não dígitos.
- `isValidFormat(normalized: string): boolean` — length === 14 e somente dígitos.
- `hasValidCheckDigits(normalized: string): boolean` — algoritmo módulo 11 para 2 dígitos.
- `isTrivialSequence(normalized: string): boolean` — detecta sequências repetidas.

---

## Avaliação (QA Sênior) — resumo e recomendações

- Conteúdo: claro e cobrindo os casos principais: formato, check-digits, sequências e privacidade.
- Observações para melhorar os Gherkins:
  - Especificar quem é o ator quando fizer sentido (ex.: "Quando o cliente consultar"), para aumentar legibilidade em contexto de integração.
  - Em `Given` diferenciar claramente entrada formatada vs entrada já normalizada (ex.: usar `Dado que foi informado o CNPJ formatado "..."` vs `Dado que foi informado o CNPJ normalizado "..."`).
  - Padronizar mensagens de erro (motivos) para facilitar asserts nas step definitions (ex.: `formato_invalido`, `check_digits_invalido`, `sequencia_invalida`).
  - Para mascaramento, definir regra clara de máscara (quantos dígitos expor) e usar no Then exatamente a máscara esperada.

- Próximo passo sugerido: você pode colar/editar este arquivo com mais exemplos reais (fixtures) e eu:
  1) reviso wording e sugiro reescritas nas linhas do Gherkin, e
  2) gero um arquivo `step_definitions/cnpj.steps.ts` com implementações de exemplo para os cenários acima.
