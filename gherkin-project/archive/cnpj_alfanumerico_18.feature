<!-- ARCHIVE: substituído por features/cnpj_alfanumerico.feature em 2025-12-22 -->

Funcionalidade: CNPJ Alfanumérico — variações adicionais (18)

  Contexto: caso arquivado 18.

  @negative
  Cenário: exemplo arquivado 18
    Dado que foi informado o CNPJ "EXEMPLO-18"
    Quando o cliente validar o CNPJ informado
    Então a validação deve resultar em "inválido"
ARCHIVED: original path `features/cnpj_alfanumerico_18.feature`
Moved to: `features/cnpj_alfanumerico.feature`
Date archived: 2025-12-22

Funcionalidade: CNPJ Alfanumérico — comportamento do UI ao digitar letras

  Contexto: máscara e validação em tempo real no front-end.

  @regression
  Cenário: [UI] — usuário digita letra no campo
    Dado que o campo de CNPJ contém "12.345.678/0001-9"
    Quando o usuário digitar a letra "a"
    Então a interface deve mostrar "12.345.678/0001-9A"

  @negative
  Cenário: [UI] — impede entrada de caractere inválido
    Dado que o campo de CNPJ contém "12.345.678/0001-9"
    Quando o usuário digitar o símbolo "@"
    Então a interface deve rejeitar o caractere
