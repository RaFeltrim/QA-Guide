**Guia Completo — Postman (Testes de API)**

Visão geral
- `Postman` é uma plataforma de colaboração para desenvolvimento e teste de APIs. Permite criar, testar, documentar e monitorar APIs de forma intuitiva.

Instalação & requisitos
- Baixe o Postman: https://www.postman.com/downloads/
- Ou instale via package manager:
  - macOS: `brew install --cask postman`
  - Windows: `choco install postman`

Estrutura de projetos e arquivos
- Convenção de pastas:
  - `postman/collections/` — coleções de requisições
  - `postman/environments/` — ambientes (dev, staging, prod)
  - `postman/data/` — dados para testes parametrizados
  - `postman/scripts/` — scripts utilitários

Setup Rápido
```bash
# Instalar Newman (executor de coleções via CLI)
npm install -g newman

# Ou baixar o Postman App:
# https://www.postman.com/downloads/
```

Hello World
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

Formato de uma requisição básica
```javascript
// Variáveis de ambiente
// {{baseUrl}} = https://api.staging.exemplo.com
// {{authToken}} = token_gerado_no_pre_request

GET {{baseUrl}}/usuarios/123
Authorization: Bearer {{authToken}}
```

Testes básicos (exemplos)
```javascript
// Status code
pm.test("Código de status é 200", function () {
    pm.response.to.have.status(200);
});

// Validação de schema
pm.test("Resposta tem campos obrigatórios", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('id');
    pm.expect(jsonData).to.have.property('nome');
});

// Validação de valores
pm.test("Nome do usuário está correto", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.nome).to.eql("João Silva");
});
```

Pre-request script (gerar token)
```javascript
pm.sendRequest({
    url: pm.environment.get("baseUrl") + "/auth/login",
    method: 'POST',
    header: {
        'Content-Type': 'application/json'
    },
    body: {
        mode: 'raw',
        raw: JSON.stringify({
            username: pm.environment.get("username"),
            password: pm.environment.get("password")
        })
    }
}, function (err, response) {
    if (!err) {
        const token = response.json().access_token;
        pm.environment.set("authToken", token);
    }
});
```

Cenário Real: Autenticação de Usuário

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

Execução local
- Interface gráfica: abrir coleções no Postman App
- CLI com Newman: `newman run colecao.json -e ambiente.json`

Integração com CI
- No pipeline (GitHub Actions):
  - Instalar Newman: `npm install -g newman`
  - Executar coleção: `newman run colecao.json -e ambiente.json`
  - Publicar relatórios: `--reporters cli,junit --reporter-junit-export resultados.xml`

Golden tip
- Use variáveis de coleção para valores que mudam entre requisições mas são constantes na coleção, ao invés de repetir valores hardcoded.

Exemplo de uso correto:
```javascript
// ✅ Bom - Variável de coleção
pm.collectionVariables.set("userId", jsonData.usuario.id);

// ❌ Ruim - Hardcoded
const userId = "12345";
```

Dica de Ouro
**Use variáveis de ambiente e collection variables para valores dinâmicos.**

```javascript
// ❌ Ruim - Valores hardcoded
const userId = "12345";

// ✅ Bom - Variáveis reutilizáveis
pm.environment.set("userId", jsonData.user.id);
pm.collectionVariables.set("sessionId", sessionId);
```

Boas práticas e convenções
- Não commite credenciais nos arquivos de coleção
- Use ambientes para diferentes stages
- Documente pré-condições e dados de limpeza
- Organize coleções por funcionalidades
- Use nomes descritivos para requisições

Checklist antes do push
- Validar que ambientes não contêm secrets
- Confirmar que testes cobrem cenários positivos e negativos
- Verificar documentação das requisições