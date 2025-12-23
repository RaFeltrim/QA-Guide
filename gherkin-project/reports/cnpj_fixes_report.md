**Resumo**
- **Objetivo**: consolidar validação CNPJ (suporte a variantes alfanuméricas), corrigir steps/serviços e priorizar `EmpresaService`.
- **Resultado**: suite completa executada com sucesso após correções: **115 cenários, 400 steps — todos passaram**.

**Patches Aplicados**
- **`support/services/empresa.service.ts`**: validação passou a usar token normalizado; armazenamento e chaves do `store` usam `canonicalize()` para consistência; `removeCompany`/`forceInsertCompany`/`getCompanyByCnpj` atualizados para usar forma canônica.
- **`support/services/cnpj.service.ts`**: reescrita de regras de validação alfanumérica:
  - Letras permitidas apenas na posição do segundo dígito verificador (índice 13) quando `acceptAlfanumerico === true`.
  - Letras fora dessa posição são rejeitadas com `reason: 'caracter_invalido'`.
  - Letras permitidas em `dv2` limitadas ao conjunto documentado `['A','B']`.
  - Mantidas mensagens de debug e motivos canônicos (`tamanho_invalido`, `formato_invalido`, `caracter_invalido`, `check_digits_invalido`, `lista_negra`).
- (Contexto) Foi previamente alinhado um exemplo na feature de validação (`features/cnpj_validacao.feature`) durante trabalho anterior.

**Falhas Identificadas e Resolução**
- Cenário que falhava durante iterações: em `features/cnpj_invalid_inputs.feature` (esquema "[Entradas inválidas] — Detecção e motivo") com input `"12.345.678/0001-9X"` a asserção esperava `"inválido"` com motivo `"caracter_invalido"`.
- Causa: regras anteriores permitiam letras em posições além do DV2, causando resultados inesperados para tokens com letras em posições intermediárias.
- Solução: restrição de letras apenas ao `dv2` + limitação do conjunto aceito (`A`,`B`) e aplicação de validação sobre token normalizado.
- Verificação: reexecutei a suíte e confirmei que a falha foi resolvida.

**Execução de Testes**
- Comando usado:

```bash
npm test
```

- Saída resumida: `115 scenarios (115 passed)`, `400 steps (400 passed)` — tempo ~3.4s no ambiente local.

**Recomendações**
- Documentar na especificação do projeto o comportamento esperado para variantes alfanuméricas (posição permitida, conjunto de letras aceitas, políticas de migração) para evitar regressões.
- Considerar extrair a lista de letras permitidas para configuração externa (fixtures/docs) se houver expansão futura das variantes.
- Remover ou condicionar logs debug (`console.debug`) em `CnpjService.validate()` quando migrar para ambiente CI mais ruidoso.

**Próximos Passos**
- Gerar changelog de patches (diffs) se desejar commit/PR organizado.
- Consolidar especificação de `acceptAlfanumerico` e `mapping` em `docs/`.

**Arquivos alterados (resumo)**
- `support/services/empresa.service.ts` — ajustes de validação/armazenamento.
- `support/services/cnpj.service.ts` — regras de validação alfanumérica e posição permitida das letras.

Relatório gerado em: `reports/cnpj_fixes_report.md`
