**Complete Guide — Postman (API Testing)**

Overview
- `Postman` is a collaborative platform for API development and testing. It allows creating, testing, documenting, and monitoring APIs intuitively.

Installation & Requirements
- Download Postman: https://www.postman.com/downloads/
- Or install via package manager:
  - macOS: `brew install --cask postman`
  - Windows: `choco install postman`

Project Structure
- Folder convention:
  - `postman/collections/` — request collections
  - `postman/environments/` — environments (dev, staging, prod)
  - `postman/data/` — data for parameterized tests
  - `postman/scripts/` — utility scripts

Quick Setup
```bash
# Install Newman (CLI collection runner)
npm install -g newman

# Or download Postman App:
# https://www.postman.com/downloads/
```

Hello World
1. Open Postman
2. Create new request:
   - Method: GET
   - URL: https://jsonplaceholder.typicode.com/posts/1
3. Click "Send"
4. Verify 200 status and JSON response

Via Newman:
```bash
# Run simple request
newman run collection.json -e environment.json
```

Basic Request Format
```javascript
// Environment variables
// {{baseUrl}} = https://api.staging.example.com
// {{authToken}} = token_generated_in_pre_request

GET {{baseUrl}}/users/123
Authorization: Bearer {{authToken}}
```

Basic Tests (examples)
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

// Value validation
pm.test("User name is correct", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.name).to.eql("John Doe");
});
```

Pre-request Script (generate token)
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

Real Scenario: User Authentication

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

**Collection** - `postman/collections/auth.json` (excerpt):
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

Local Execution
- GUI: open collections in Postman App
- CLI with Newman: `newman run collection.json -e env.json`

CI Integration
- In pipeline (GitHub Actions):
  - Install Newman: `npm install -g newman`
  - Run collection: `newman run collection.json -e env.json`
  - Publish reports: `--reporters cli,junit --reporter-junit-export results.xml`

Golden Tip
- Use collection variables for values that change between requests but are constant in the collection, instead of repeating hardcoded values.

Correct Usage Example:
```javascript
// ✅ Good - Collection variable
pm.collectionVariables.set("userId", jsonData.user.id);

// ❌ Bad - Hardcoded
const userId = "12345";
```

Golden Tip
**Use environment and collection variables for dynamic values.**

```javascript
// ❌ Bad - Hardcoded values
const userId = "12345";

// ✅ Good - Reusable variables
pm.environment.set("userId", jsonData.user.id);
pm.collectionVariables.set("sessionId", sessionId);
```

Best Practices and Conventions
- Don't commit credentials in collection files
- Use environments for different stages
- Document pre-conditions and cleanup data
- Organize collections by functionalities
- Use descriptive names for requests

Pre-push Checklist
- Validate that environments don't contain secrets
- Confirm tests cover positive and negative scenarios
- Verify request documentation