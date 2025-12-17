import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m', target: 100 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    'http_req_duration': ['p(95)<800'],
  },
};

const BASE = __ENV.BASE_URL || 'https://api-staging.local';

export default function () {
  // List items
  let r1 = http.get(`${BASE}/items?page=1`);
  check(r1, {
    'list status 200': (r) => r.status === 200,
  });

  // Create item
  const payload = JSON.stringify({
    name: `item-${Math.floor(Math.random() * 100000)}`,
    price: Math.floor(Math.random() * 1000) / 100,
  });
  const params = { headers: { 'Content-Type': 'application/json' } };
  let r2 = http.post(`${BASE}/items`, payload, params);
  check(r2, { 'create status 201': (r) => r.status === 201 || r.status === 200 });

  sleep(1);
}
