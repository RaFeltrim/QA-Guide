`````markdown
````markdown
# cnpj_conhecido_invalido.feature

```gherkin
Funcionalidade: CNPJ — exemplos conhecidos inválidos

  Contexto: manter casos de CNPJ historicamente inválidos para regressão.

  @negative
  Cenário: [Exemplo inválido] — padrão óbvio
    Dado que foi informado o CNPJ "11.111.111/1111-11"
    Quando o cliente validar o CNPJ informado
    Então o resultado da validação deve ser "inválido"

  @negative
  Cenário: [Exemplo inválido] — repetição simples
    Dado que foi informado o CNPJ "00.000.000/0000-00"
    Quando o cliente validar o CNPJ informado
    Então o resultado da validação deve ser "inválido"
```

````

`````
