# Testes de API: Como Pensar em Contratos

## Introdução

Testes de API vão muito além de verificar se um endpoint responde. O verdadeiro valor está em validar contratos - garantir que a comunicação entre sistemas seja consistente e confiável. Vamos explorar como pensar em contratos ao testar APIs.

## O que é um Contrato de API?

Um contrato de API define:
- **Endpoints disponíveis:** Rotas e métodos HTTP
- **Formato de requisição:** Headers, body, parâmetros
- **Formato de resposta:** Estrutura, códigos HTTP, dados
- **Comportamentos esperados:** Cenários de sucesso e erro

## Pilares dos Testes de Contrato

### 1. Especificação Clara
Antes de testar, é essencial ter uma especificação bem definida:

```yaml
# OpenAPI/Swagger spec excerpt
paths:
  /usuarios:
    post:
      summary: Cria novo usuário
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - nome
                - email
              properties:
                nome:
                  type: string
                email:
                  type: string
                  format: email
      responses:
        '201':
          description: Usuário criado
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: integer
                  nome:
                    type: string
                  email:
                    type: string
```

### 2. Validação de Schema
Garantir que requisições e respostas sigam o formato esperado:

```javascript
// Teste de schema de resposta
pm.test("Validar schema da resposta", function () {
    const schema = {
        "type": "object",
        "required": ["id", "nome", "email"],
        "properties": {
            "id": {"type": "integer"},
            "nome": {"type": "string"},
            "email": {"type": "string", "format": "email"}
        }
    };
    
    pm.response.to.have.jsonSchema(schema);
});
```

### 3. Cenários Completos
Testar não apenas o caminho feliz, mas todos os cenários:

```javascript
// Teste completo de contrato
describe('POST /usuarios - Contrato completo', () => {
  it('deve criar usuário com dados válidos', () => {
    cy.request({
      method: 'POST',
      url: '/usuarios',
      body: {
        nome: 'João Silva',
        email: 'joao@teste.com'
      }
    }).then((response) => {
      // Status code
      expect(response.status).to.eq(201);
      
      // Estrutura da resposta
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('nome', 'João Silva');
      expect(response.body).to.have.property('email', 'joao@teste.com');
      
      // Tipos de dados
      expect(response.body.id).to.be.a('number');
      expect(response.body.nome).to.be.a('string');
    });
  });
  
  it('deve retornar 400 para email inválido', () => {
    cy.request({
      method: 'POST',
      url: '/usuarios',
      body: {
        nome: 'João Silva',
        email: 'email-invalido'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('erro');
    });
  });
});
```

## Tipos de Testes de Contrato

### 1. Consumer-Driven Contract Testing
O consumidor define o contrato e o provedor deve atendê-lo:

```javascript
// Pact test example
describe('Consumer', () => {
  it('deve buscar usuário por ID', () => {
    // Define expectativa do consumer
    const interaction = {
      state: 'usuário com ID 123 existe',
      uponReceiving: 'requisição para buscar usuário',
      withRequest: {
        method: 'GET',
        path: '/usuarios/123'
      },
      willRespondWith: {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: {
          id: 123,
          nome: 'João Silva',
          email: 'joao@teste.com'
        }
      }
    };
    
    return provider.addInteraction(interaction);
  });
});
```

### 2. Provider Verification
O provedor verifica que atende a todos os contratos definidos:

```javascript
// Verificação do provider
describe('Provider', () => {
  it('deve respeitar contrato com consumers', () => {
    // Verifica todos os contratos definidos
    return verifier.verifyProvider({
      provider: 'UsuarioService',
      providerBaseUrl: 'http://localhost:3000',
      pactUrls: ['path/to/pacts']
    });
  });
});
```

## Estratégias de Teste

### 1. Testes de Happy Path
Validar o fluxo principal da API:

```javascript
// CRUD completo
describe('API de Usuários - Happy Path', () => {
  let userId;
  
  it('deve criar usuário', () => {
    cy.request('POST', '/usuarios', {
      nome: 'Maria Santos',
      email: 'maria@teste.com'
    }).then((response) => {
      expect(response.status).to.eq(201);
      userId = response.body.id;
    });
  });
  
  it('deve buscar usuário criado', () => {
    cy.request('GET', `/usuarios/${userId}`)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.nome).to.eq('Maria Santos');
      });
  });
  
  it('deve atualizar usuário', () => {
    cy.request('PUT', `/usuarios/${userId}`, {
      nome: 'Maria Silva Santos',
      email: 'maria.silva@teste.com'
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
  
  it('deve deletar usuário', () => {
    cy.request('DELETE', `/usuarios/${userId}`)
      .then((response) => {
        expect(response.status).to.eq(204);
      });
  });
});
```

### 2. Testes de Erro
Validar comportamentos em cenários de erro:

```javascript
describe('API de Usuários - Cenários de Erro', () => {
  it('deve retornar 404 para usuário inexistente', () => {
    cy.request({
      method: 'GET',
      url: '/usuarios/999999',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
  
  it('deve retornar 400 para dados inválidos', () => {
    cy.request({
      method: 'POST',
      url: '/usuarios',
      body: {
        nome: '', // Campo obrigatório vazio
        email: 'invalido'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('erros');
    });
  });
});
```

### 3. Testes de Segurança
Validar aspectos de segurança do contrato:

```javascript
describe('API de Usuários - Segurança', () => {
  it('deve exigir autenticação', () => {
    cy.request({
      method: 'GET',
      url: '/usuarios',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
  
  it('deve validar permissões', () => {
    cy.request({
      method: 'DELETE',
      url: '/usuarios/123',
      auth: {
        bearer: 'token_usuario_comum'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(403);
    });
  });
});
```

## Ferramentas Recomendadas

### 1. Postman/Newman
- Coleções reutilizáveis
- Ambientes parametrizáveis
- Relatórios detalhados

### 2. Bruno
- Cliente leve e rápido
- Formato YAML/JSON
- Integração fácil com CI/CD

### 3. Pact
- Consumer-driven contracts
- Verificação automática
- Ecossistema rico

## Erros Comuns

❌ **Testar apenas happy path:** Ignorar cenários de erro
❌ **Não validar schemas:** Assumir formato correto
❌ **Hardcoded values:** Dados fixos em testes
❌ **Ignorar headers:** Content-Type, Authorization
❌ **Não testar limites:** Valores máximos/mínimos

## Boas Práticas

✅ **Definir specs primeiro:** Documentação como base
✅ **Validar tudo:** Status, headers, body, schema
✅ **Parametrizar dados:** Evitar hardcoded values
✅ **Testar edge cases:** Limites e cenários extremos
✅ **Automatizar verificação:** Integração contínua

## Checklist de Contrato

- [ ] Especificação da API claramente definida
- [ ] Todos os endpoints cobertos por testes
- [ ] Validação de schema de requisição/resposta
- [ ] Cenários de sucesso e erro contemplados
- [ ] Códigos HTTP apropriados para cada situação
- [ ] Headers esperados validados
- [ ] Dados parametrizados e reutilizáveis
- [ ] Testes de segurança implementados

## Template de Teste

```javascript
// Template completo de teste de contrato
describe('POST /{endpoint} - Contrato', () => {
  context('Cenário de sucesso', () => {
    it('deve responder com 201 e dados válidos', () => {
      cy.request({
        method: 'POST',
        url: '/endpoint',
        body: {/* dados válidos */}
      }).then((response) => {
        // Status
        expect(response.status).to.eq(201);
        
        // Headers
        expect(response.headers).to.have.property('content-type')
          .that.includes('application/json');
        
        // Body structure
        expect(response.body).to.have.all.keys(['id', 'campo1', 'campo2']);
        
        // Data types
        expect(response.body.id).to.be.a('number');
        expect(response.body.campo1).to.be.a('string');
        
        // Values
        expect(response.body.campo1).to.eq('valor esperado');
      });
    });
  });
  
  context('Cenários de erro', () => {
    it('deve responder com 400 para dados inválidos', () => {
      // Teste de validação
    });
    
    it('deve responder com 401 sem autenticação', () => {
      // Teste de segurança
    });
  });
});
```

## Conclusão

Pensar em contratos ao testar APIs eleva a qualidade dos testes de verificação para garantia de comunicação confiável. A chave é ser completo, consistente e automatizado.

📚 **Quer modelos completos?** Confira nossos guias sobre [Postman](../../STACK/POSTMAN.md), [Bruno](../../STACK/BRUNO.md) e [exercícios práticos](../../exercicios/junior.md#testes-de-api).

#QA #APITesting #Contracts #Postman #Bruno