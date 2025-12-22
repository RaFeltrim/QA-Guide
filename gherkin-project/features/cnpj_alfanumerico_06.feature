 # language: pt

Funcionalidade: CNPJ Alfanumérico — caracteres Unicode

  Contexto: caracteres acentuados e não ASCII devem ser rejeitados.

  @negative
  Cenário: [Rejeitar] — letra acentuada
    Dado que foi informado o CNPJ "12.345.678/0001-9á"
    Quando o cliente validar o CNPJ informado
    Então a validação deve falhar por "caracter inválido"

  @negative
  Cenário: [Rejeitar] — cedilha
    Dado que foi informado o CNPJ "12.345.678/0001-9ç"
    Quando o cliente validar o CNPJ informado
    Então a validação deve falhar por "caracter inválido"
