import LoginPage from '../pages/LoginPage'

describe('Login flow (exemplo)', () => {
  it('deve logar com credenciais válidas (exemplo)', () => {
    LoginPage.visit()
    LoginPage.login('tester@example.com', 'senha123')
    LoginPage.assertLogged()
  })
})
