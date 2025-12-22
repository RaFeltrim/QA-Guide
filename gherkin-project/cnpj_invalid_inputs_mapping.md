Mapeamento: `cnpj_invalid_inputs.feature` — origem dos exemplos

1) entrada = "12.345.678/0001-9@A"
   - Origem: `features/cnpj_alfanumerico_05.feature` e `cnpj_caracteres_invalidos.md`
   - Justificativa: símbolo inválido inserido no corpo do número; caso típico que deve ser rejeitado.

2) entrada = "abc.def.ghi/jklm-nn"
   - Origem: amostra representativa de entradas totalmente alfabéticas misturadas; consolidado de múltiplos arquivos de teste sem valor adicional.
   - Justificativa: garante que validadores rejeitem entradas não numéricas além de caracteres permitidos (letras apenas em sufixos autorizados).

3) entrada = "12345678"
   - Origem: `features/cnpj_numerico_03.feature` e `cnpj_comprimento_invalido.md`
   - Justificativa: comprimento insuficiente — caso negativo comum e de baixo valor para múltiplas repetições.

4) entrada = "12.345.678/0001-9"
   - Origem: variações de máscara incompleta encontradas em arquivos numerados; representatividade para checagem de formato.
   - Justificativa: captura entradas com DV ausente ou máscara parcial.

5) entrada = "12.345.678/0001-9512"
   - Origem: casos de excesso de dígitos (diversos arquivos de edge cases)
   - Justificativa: validação de tamanho e rejeição de entradas com dígitos extras.

6) entrada = "12.345.678/0001-9X"
   - Origem: `features/cnpj_alfanumerico_01.feature` e `cnpj_caracteres_invalidos.md`
   - Justificativa: letra no lugar do DV; cobre interseção entre validação DV e caracteres alfanuméricos inválidos.

7) entrada = "00.000.000/0000-00"
   - Origem: `cnpj_lista_negra.md`
   - Justificativa: exemplo de CNPJ amplamente conhecido como inválido/lista negra; testar comportamento de bloqueio.

Notas de implementação

Fixtures
- Arquivo de fixtures consolidado: `fixtures/cnpj/examples.csv`
- O CSV contém as colunas: `example_id,group,input,expected,origin_note` e inclui todas as entradas usadas no Outline para rastreabilidade.
- Para o PR: gere um `mapping.csv` (colunas: `arquivo_origem,exemplo_row`) a partir deste `examples.csv` e inclua-o no commit para facilitar revisão e rollback.
