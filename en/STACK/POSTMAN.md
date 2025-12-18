**Guia Completo — Postman (Testes de API)**

Visão geral
- `Postman` é uma plataforma de colaboração para desenvolvimento e teste de APIs. Permite criar, testar, documentar e monitorar APIs de forma intuitiva.

Instalação & requisitos
- Baixe o Postman: https://www.postman.com/downloads/
- Ou instale via package manager:
  - macOS: `brew install --cask postman`
  - Windows: `choco install postman`

Estrutura de coleções e ambientes
- Organização recomendada:
  - Coleções por recurso ou jornada (ex: Users, Orders, Auth)
  - Ambientes: `dev`, `staging`, `prod` com variáveis específicas
  - Pré-request scripts para geração de tokens
  - Testes em JavaScript na aba `Tests`

Formato de uma requisição básica
```javascript
// Variáveis de ambiente
// {{baseUrl}} = https://api.staging.example.com
// {{authToken}} = token_gerado_no_pre_request

GET {{baseUrl}}/users/123
Authorization: Bearer {{authToken}}
```

Testes básicos (exemplos)
```javascript
// Status code
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Schema validation
pm.test("Response has required fields", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('id');
    pm.expect(jsonData).to.have.property('name');
});

// Validação de valores
pm.test("User name is correct", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.name).to.eql("John Doe");
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

Execução local
- Interface gráfica: abrir coleções no Postman App
- CLI com Newman: `newman run collection.json -e env.json`

Integração com CI
- No pipeline (GitHub Actions):
  - Instalar Newman: `npm install -g newman`
  - Executar coleção: `newman run collection.json -e env.json`
  - Publicar relatórios: `--reporters cli,junit --reporter-junit-export results.xml`

Golden tip
- Use variáveis de coleção para valores que mudam entre requisições mas são constantes na coleção, ao invés de repetir valores hardcoded.

Exemplo de uso correto:
```javascript
// ✅ Bom - Variável de coleção
pm.collectionVariables.set("userId", jsonData.user.id);

// ❌ Ruim - Hardcoded
const userId = "12345";
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