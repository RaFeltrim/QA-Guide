# k6 - Guia Prático

## 🚀 Setup Rápido

```bash
# Instalar via package manager
# macOS
brew install k6

# Windows
choco install k6

# Linux (Debian/Ubuntu)
sudo apt-get install k6

# Ou usar Docker
docker pull grafana/k6
```

## 📂 Estrutura de Pastas

```
performance/
├── scripts/           # Scripts de teste
│   ├── smoke-test.js
│   ├── load-test.js
│   └── stress-test.js
├── data/             # Dados de teste
│   └── users.csv
├── thresholds/        # Configurações de SLA
│   └── sla-config.js
└── reports/          # Relatórios gerados
    └── results.json
```

## 💻 Hello World

Criar arquivo `performance/scripts/hello-world.js`:

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  const res = http.get('https://httpbin.test.k6.io/');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1);
}
```

Executar:
```bash
k6 run performance/scripts/hello-world.js
```

## 🔥 Cenário Real: Teste de Carga E-commerce

`performance/scripts/ecommerce-load-test.js`:
```javascript
import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Counter, Rate, Trend } from 'k6/metrics';

// Métricas customizadas
const productViews = new Counter('product_page_views');
const addToCartErrors = new Rate('add_to_cart_errors');
const homepageLoadTime = new Trend('homepage_load_time');

export const options = {
  stages: [
    { duration: '5m', target: 50 },  // Ramp up to 50 users
    { duration: '10m', target: 50 }, // Stay at 50 users
    { duration: '5m', target: 0 },   // Ramp down to 0 users
  ],
  thresholds: {
    'http_req_duration': ['p(95)<500'], // 95% of requests should be below 500ms
    'http_req_failed': ['rate<0.01'],   // Error rate should be less than 1%
    'homepage_load_time': ['p(95)<300'], // 95% of homepage loads should be below 300ms
  },
};

const BASE_URL = 'https://ecommerce-api.example.com';

export default function () {
  group('Homepage and Product Views', function () {
    // Visit homepage
    const homeRes = http.get(`${BASE_URL}/`);
    const homeLoadTime = homeRes.timings.duration;
    homepageLoadTime.add(homeLoadTime);
    
    check(homeRes, {
      'Homepage status is 200': (r) => r.status === 200,
      'Homepage loads within 500ms': (r) => r.timings.duration < 500,
    });
    
    productViews.add(1);
    
    // View a product
    const productRes = http.get(`${BASE_URL}/products/12345`);
    check(productRes, {
      'Product page status is 200': (r) => r.status === 200,
    });
    
    // Add to cart (10% chance)
    if (Math.random() < 0.1) {
      const addToCartRes = http.post(`${BASE_URL}/cart`, JSON.stringify({
        productId: 12345,
        quantity: 1
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
      
      const success = check(addToCartRes, {
        'Add to cart status is 200': (r) => r.status === 200,
      });
      
      addToCartErrors.add(!success);
    }
  });
  
  sleep(Math.random() * 5 + 1); // Random sleep between 1-6 seconds
}
```

## 💡 Dica de Ouro

**Use thresholds para validar SLAs automaticamente e falhar builds quando métricas estiverem fora do esperado.**

```javascript
// ❌ Ruim - Sem validação automática
export const options = {
  vus: 100,
  duration: '5m'
};

// ✅ Bom - Com thresholds que falham o teste
export const options = {
  vus: 100,
  duration: '5m',
  thresholds: {
    'http_req_duration': ['p(95)<500'],  // 95% das requisições < 500ms
    'http_req_failed': ['rate<0.01'],    // Taxa de erro < 1%
    'checks': ['rate>0.99']             // 99% dos checks passam
  }
};
```