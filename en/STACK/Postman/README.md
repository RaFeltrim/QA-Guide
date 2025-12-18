# Postman - Practical Guide

## 🚀 Quick Setup

```bash
# Install Newman (CLI collection runner)
npm install -g newman

# Or download Postman App:
# https://www.postman.com/downloads/
```

## 📂 Folder Structure

```
postman/
├── collections/       # Request collections
│   ├── auth.json
│   └── users.json
├── environments/      # Environments (dev, staging, prod)
│   ├── dev.json
│   └── staging.json
├── data/             # Data for parameterized tests
│   └── test-users.csv
└── scripts/          # Utility scripts
    └── auth-helper.js
```

## 💻 Hello World

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

## 🔥 Real Scenario: User Authentication

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

## 💡 Golden Tip

**Use environment and collection variables for dynamic values.**

```javascript
// ❌ Bad - Hardcoded values
const userId = "12345";

// ✅ Good - Reusable variables
pm.environment.set("userId", jsonData.user.id);
pm.collectionVariables.set("sessionId", sessionId);
```