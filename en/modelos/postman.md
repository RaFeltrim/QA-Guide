**Guia Rápido — Postman**

Resumo: instruções básicas para criar coleções, utilizar ambientes, escrever testes em Postman e integrar execuções em CI.

- **Instalação:** baixe o Postman (app desktop) ou use o Postman Web.
- **Coleções:** organize requests por recurso ou jornada. Use subpastas para cenários (happy path, erros).
- **Ambientes:** criar `dev`, `staging`, `prod` com variáveis `baseUrl`, `authToken`, `userId`.
- **Pré-request scripts:** gerar/atualizar tokens e variáveis necessárias antes do request.
- **Tests (assertions):** escrever em JavaScript na aba `Tests`.

Exemplos rápidos:

```javascript
pm.test("Status 200", () => pm.response.to.have.status(200));
pm.test("Schema válido", () => {
  const json = pm.response.json();
  pm.expect(json).to.have.property('id');
});
```

- **Exportar/Versionar:** exporte coleções como JSON para `exemplos/postman/` e versione no repositório.
- **Execução em CI:** use `newman` para executar coleções no pipeline:

```bash
newman run collection.json -e env.json --reporters cli,junit --reporter-junit-export results.xml
```

- **Boas práticas:** não commitar credenciais; use variáveis de ambiente no CI; documente pré-condições e dados de limpeza.

Links úteis:
- Newman: https://www.npmjs.com/package/newman
