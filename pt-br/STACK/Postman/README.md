# Postman - Guia Prático

## 🚀 Setup Rápido

```bash
# Instalar Newman (executor de coleções via CLI)
npm install -g newman

# Ou baixar o Postman App:
# https://www.postman.com/downloads/
```

## 📂 Estrutura de Pastas

```
postman/
├── collections/       # Coleções de requisições
│   ├── auth.json
│   └── users.json
├── environments/      # Ambientes (dev, staging, prod)
│   ├── dev.json
│   └── staging.json
├── data/             # Dados para testes parametrizados
│   └── test-users.csv
└── scripts/          # Scripts utilitários
    └── auth-helper.js
```

## 💻 Hello World

1. Abrir Postman
2. Criar nova requisição:
   - Method: GET
   - URL: https://jsonplaceholder.typicode.com/posts/1
3. Clicar em "Send"
4. Verificar status 200 e resposta JSON

Via Newman:
```bash
# Executar requisição simples
newman run collection.json -e environment.json
```

## 🔥 Cenário Real: Autenticação de Usuário

**Environment** - `postman/environments/dev.json`:
```json
{
  "id": "dev-env",
  "name": "Development",
  "values": [
    {
      "key": "baseUrl",
      "value": "https://api.dev.example.com",
      "enabled": true
    },
    {
      "key": "username",
      "value": "testuser@example.com",
      "enabled": true
    },
    {
      "key": "password",
      "value": "testpassword",
      "enabled": true
    }
  ]
}
```

**Collection** - `postman/collections/auth.json` (fragmento):
```json
{
  "info": {
    "name": "Authentication API"
  },
  "item": [
    {
      "name": "Login User",
      "event": [
        {
          "listen": "test",
          "script": {
            "exec": [
              "pm.test(\"Status code is 200\", function () {",
              "    pm.response.to.have.status(200);",
              "});",
              "",
              "pm.test(\"Response has access token\", function () {",
              "    const jsonData = pm.response.json();",
              "    pm.expect(jsonData).to.have.property('access_token');",
              "    pm.environment.set(\"authToken\", jsonData.access_token);",
              "});"
            ]
          }
        }
      ],
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"username\": \"{{username}}\",\n  \"password\": \"{{password}}\"\n}"
        },
        "url": {
          "raw": "{{baseUrl}}/auth/login",
          "host": ["{{baseUrl}}"],
          "path": ["auth", "login"]
        }
      }
    }
  ]
}
```

## 💡 Dica de Ouro

**Use variáveis de ambiente e collection variables para valores dinâmicos.**

```javascript
// ❌ Ruim - Valores hardcoded
const userId = "12345";

// ✅ Bom - Variáveis reutilizáveis
pm.environment.set("userId", jsonData.user.id);
pm.collectionVariables.set("sessionId", sessionId);
```