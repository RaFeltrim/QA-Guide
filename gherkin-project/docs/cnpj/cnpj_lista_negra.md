`````markdown
````markdown
# cnpj_lista_negra.feature

```gherkin
Funcionalidade: CNPJ — lista negra (blocklist)

  Contexto: rejeitar CNPJs presentes em lista negra conhecida.

  @security @negative
  Cenário: [Lista negra] — CNPJ bloqueado
    Dado que a lista negra contém "12345678000195"
    E foi informado o CNPJ "12.345.678/0001-95"
    Quando o cliente validar o CNPJ
    Então a ação deve ser "bloqueada"

  @regression
  Cenário: [Lista negra] — CNPJ não bloqueado
    Dado que a lista negra não contém "111222333000181"
    E foi informado o CNPJ "11.122.233/0001-81"
    Quando o cliente validar o CNPJ
    Então a ação deve ser "permitida"
```

````

`````