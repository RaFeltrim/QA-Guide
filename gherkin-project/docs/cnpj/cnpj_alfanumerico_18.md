`````markdown
````markdown
# cnpj_alfanumerico_18.feature

```gherkin
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
```

````

`````