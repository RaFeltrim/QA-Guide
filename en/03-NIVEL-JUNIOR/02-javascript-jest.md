# JavaScript + Jest (Júnior)


Exemplos de testes unitários com Jest, mocks e execução em CI.

Exemplo mínimo de `package.json` e scripts para rodar testes:

```json
{
	"name": "proj-exemplo",
	"version": "0.1.0",
	"scripts": {
		"test": "jest --coverage",
		"test:watch": "jest --watch"
	},
	"devDependencies": {
		"jest": "^29.0.0"
	}
}
```

No CI, configure um job que rode `npm ci` e `npm test` e armazene `coverage` como artifact.

