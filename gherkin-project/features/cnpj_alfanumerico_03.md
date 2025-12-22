````markdown
# cnpj_alfanumerico_03.feature

```gherkin
Funcionalidade: CNPJ Alfanumérico — letras intercaladas

  Contexto: letras no meio do corpo do número normalmente tornam inválido.

  @negative
  Cenário: [Rejeitar] — letra entre dígitos centrais
    Dado que foi informado o CNPJ "12.34A.678/0001-95"
    Quando o cliente validar o CNPJ informado
    Então o resultado da validação deve ser "inválido"

  @negative
  Cenário: [Rejeitar] — múltiplas letras intercaladas
    Dado que foi informado o CNPJ "1A.23B.678/0C01-95"
    Quando o cliente validar o CNPJ informado
    Então o resultado da validação deve ser "inválido"
```

````
