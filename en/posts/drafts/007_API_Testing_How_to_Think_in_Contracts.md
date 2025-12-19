# API Testing: How to Think in Contracts

## Introduction

API testing goes far beyond verifying if an endpoint responds. The real value lies in validating contracts - ensuring reliable communication between systems. Let's explore how to think in contracts when testing APIs.

## What is an API Contract?

An API contract defines:
- **Available endpoints:** Routes and HTTP methods
- **Request format:** Headers, body, parameters
- **Response format:** Structure, HTTP codes, data
- **Expected behaviors:** Success and error scenarios

## Pillars of Contract Testing

### 1. Clear Specification
Before testing, it's essential to have a well-defined specification:

```yaml
# OpenAPI/Swagger spec excerpt
paths:
  /users:
    post:
      summary: Create new user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - name
                - email
              properties:
                name:
                  type: string
                email:
                  type: string
                  format: email
      responses:
        '201':
          description: User created
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: integer
                  name:
                    type: string
                  email:
                    type: string
```

### 2. Schema Validation
Ensure requests and responses follow the expected format:

```javascript
// Schema validation test
pm.test("Validate response schema", function () {
    const schema = {
        "type": "object",
        "required": ["id", "name", "email"],
        "properties": {
            "id": {"type": "integer"},
            "name": {"type": "string"},
            "email": {"type": "string", "format": "email"}
        }
    };
    
    pm.response.to.have.jsonSchema(schema);
});
```

### 3. Complete Scenarios
Test not just the happy path, but all scenarios:

```javascript
// Complete contract test
describe('POST /users - Complete Contract', () => {
  it('should create user with valid data', () => {
    cy.request({
      method: 'POST',
      url: '/users',
      body: {
        name: 'John Silva',
        email: 'john@test.com'
      }
    }).then((response) => {
      // Status code
      expect(response.status).to.eq(201);
      
      // Response structure
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('name', 'John Silva');
      expect(response.body).to.have.property('email', 'john@test.com');
      
      // Data types
      expect(response.body.id).to.be.a('number');
      expect(response.body.name).to.be.a('string');
    });
  });
  
  it('should return 400 for invalid email', () => {
    cy.request({
      method: 'POST',
      url: '/users',
      body: {
        name: 'John Silva',
        email: 'invalid-email'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error');
    });
  });
});
```

## Types of Contract Tests

### 1. Consumer-Driven Contract Testing
The consumer defines the contract and the provider must meet it:

```javascript
// Pact test example
describe('Consumer', () => {
  it('should fetch user by ID', () => {
    // Define consumer expectation
    const interaction = {
      state: 'user with ID 123 exists',
      uponReceiving: 'request to fetch user',
      withRequest: {
        method: 'GET',
        path: '/users/123'
      },
      willRespondWith: {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: {
          id: 123,
          name: 'John Silva',
          email: 'john@test.com'
        }
      }
    };
    
    return provider.addInteraction(interaction);
  });
});
```

### 2. Provider Verification
The provider verifies that it meets all defined contracts:

```javascript
// Provider verification
describe('Provider', () => {
  it('should respect contracts with consumers', () => {
    // Verify all defined contracts
    return verifier.verifyProvider({
      provider: 'UserService',
      providerBaseUrl: 'http://localhost:3000',
      pactUrls: ['path/to/pacts']
    });
  });
});
```

## Testing Strategies

### 1. Happy Path Tests
Validate the main API flow:

```javascript
// Complete CRUD
describe('Users API - Happy Path', () => {
  let userId;
  
  it('should create user', () => {
    cy.request('POST', '/users', {
      name: 'Mary Santos',
      email: 'mary@test.com'
    }).then((response) => {
      expect(response.status).to.eq(201);
      userId = response.body.id;
    });
  });
  
  it('should fetch created user', () => {
    cy.request('GET', `/users/${userId}`)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq('Mary Santos');
      });
  });
  
  it('should update user', () => {
    cy.request('PUT', `/users/${userId}`, {
      name: 'Mary Silva Santos',
      email: 'mary.silva@test.com'
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
  
  it('should delete user', () => {
    cy.request('DELETE', `/users/${userId}`)
      .then((response) => {
        expect(response.status).to.eq(204);
      });
  });
});
```

### 2. Error Tests
Validate behaviors in error scenarios:

```javascript
describe('Users API - Error Scenarios', () => {
  it('should return 404 for non-existent user', () => {
    cy.request({
      method: 'GET',
      url: '/users/999999',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
  
  it('should return 400 for invalid data', () => {
    cy.request({
      method: 'POST',
      url: '/users',
      body: {
        name: '', // Required field empty
        email: 'invalid'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('errors');
    });
  });
});
```

### 3. Security Tests
Validate security aspects of the contract:

```javascript
describe('Users API - Security', () => {
  it('should require authentication', () => {
    cy.request({
      method: 'GET',
      url: '/users',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
  
  it('should validate permissions', () => {
    cy.request({
      method: 'DELETE',
      url: '/users/123',
      auth: {
        bearer: 'regular_user_token'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(403);
    });
  });
});
```

## Recommended Tools

### 1. Postman/Newman
- Reusable collections
- Parameterizable environments
- Detailed reports

### 2. Bruno
- Lightweight and fast client
- YAML/JSON format
- Easy CI/CD integration

### 3. Pact
- Consumer-driven contracts
- Automatic verification
- Rich ecosystem

## Common Mistakes

❌ **Testing only happy path:** Ignoring error scenarios
❌ **Not validating schemas:** Assuming correct format
❌ **Hardcoded values:** Fixed data in tests
❌ **Ignoring headers:** Content-Type, Authorization
❌ **Not testing boundaries:** Maximum/minimum values

## Best Practices

✅ **Define specs first:** Documentation as baseline
✅ **Validate everything:** Status, headers, body, schema
✅ **Parameterize data:** Avoid hardcoded values
✅ **Test edge cases:** Boundaries and extreme scenarios
✅ **Automate verification:** Continuous integration

## Contract Checklist

- [ ] API specification clearly defined
- [ ] All endpoints covered by tests
- [ ] Request/response schema validation
- [ ] Success and error scenarios covered
- [ ] Appropriate HTTP codes for each situation
- [ ] Expected headers validated
- [ ] Parameterized and reusable data
- [ ] Security tests implemented

## Test Template

```javascript
// Complete contract test template
describe('POST /{endpoint} - Contract', () => {
  context('Success scenario', () => {
    it('should respond with 201 and valid data', () => {
      cy.request({
        method: 'POST',
        url: '/endpoint',
        body: {/* valid data */}
      }).then((response) => {
        // Status
        expect(response.status).to.eq(201);
        
        // Headers
        expect(response.headers).to.have.property('content-type')
          .that.includes('application/json');
        
        // Body structure
        expect(response.body).to.have.all.keys(['id', 'field1', 'field2']);
        
        // Data types
        expect(response.body.id).to.be.a('number');
        expect(response.body.field1).to.be.a('string');
        
        // Values
        expect(response.body.field1).to.eq('expected value');
      });
    });
  });
  
  context('Error scenarios', () => {
    it('should respond with 400 for invalid data', () => {
      // Validation test
    });
    
    it('should respond with 401 without authentication', () => {
      // Security test
    });
  });
});
```

## Conclusion

Thinking in contracts when testing APIs elevates test quality from verification to reliable communication guarantee. The key is to be complete, consistent, and automated.

📚 **Want complete templates?** Check out our guides on [Postman](../../STACK/POSTMAN.md), [Bruno](../../STACK/BRUNO.md) and [practical exercises](../../exercicios/junior.md#testes-de-api).

#QA #APITesting #Contracts #Postman #Bruno