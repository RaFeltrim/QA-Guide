**Exemplo — Postman**

Este diretório deve conter coleções exportadas (JSON) e arquivos de ambiente usados como exemplos e gabaritos.

Sugestões:
- `collection-example.json` — coleção exportada do Postman com requests e testes básicos.
- `env-example.json` — ambiente com `baseUrl` e variáveis de placeholder (não inclua segredos).

Para executar localmente com Newman:

```bash
npm install -g newman
newman run collection-example.json -e env-example.json
```
