// Exemplo simples de teste API com node-fetch
// Requer: npm install node-fetch@2

const fetch = require('node-fetch')

async function checkHealth() {
  const res = await fetch('https://httpbin.org/status/200')
  console.log('status', res.status)
  if (res.status !== 200) process.exitCode = 1
}

if (require.main === module) {
  checkHealth()
}

module.exports = { checkHealth }
