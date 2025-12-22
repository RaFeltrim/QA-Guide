 # language: pt

Funcionalidade: CNPJ — entradas inválidas e sanitização

  Contexto: Consolidar casos de entradas inválidas (caracteres proibidos, comprimento, máscara incorreta) em um único lugar para reduzir duplicidade.
 
  @negative
  Esquema do Cenário: [Entradas inválidas] — Detecção e motivo
    Dado que foi informado o CNPJ "<entrada>"
    Quando o cliente normalizar o CNPJ informado
    E o cliente validar o CNPJ informado
    Então a validação deve ser "<resultado>"
    E o motivo deve conter "<motivo>"

    Exemplos: # mapeamento -> arquivo/origem (ver cnpj_invalid_inputs_mapping.md)
      | entrada                       | resultado | motivo                 |
      | 12.345.678/0001-9@A           | inválido  | caracter_invalido      | # cnpj_alfanumerico_05.feature / cnpj_caracteres_invalidos.md
      | abc.def.ghi/jklm-nn           | inválido  | caracter_invalido      | # caso com letras não esperadas no bloco numérico
      | 12345678                      | inválido  | tamanho_invalido       | # cnpj_numerico_03.feature / cnpj_comprimento_invalido.md
      | 12.345.678/0001-9             | inválido  | formato_invalido       | # máscara incompleta (DV ausente) — validação de formato
      | 12.345.678/0001-9512          | inválido  | tamanho_invalido       | # excesso de dígitos
      | 12.345.678/0001-9X            | inválido  | caracter_invalido      | # letra no lugar de DV inválida (cobre alfanuméricos malformados)
      | 00.000.000/0000-00            | inválido  | lista_negra            | # exemplo de CNPJ bloqueado / lista negra

  # Observações:
  # - Mantemos um conjunto enxuto de exemplos negativos representativos evitando testes redundantes.
  # - Exemplos adicionais de edge-cases devem ficar em `fixtures/cnpj/` e referenciados por cobertura exploratória ou testes específicos quando houver histórico de bugs.
