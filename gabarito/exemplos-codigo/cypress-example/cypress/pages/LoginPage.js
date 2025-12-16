export default class LoginPage {
  static visit() {
    cy.visit('/')
  }

  static login(user, pass) {
    cy.get('[data-testid="username"]').type(user)
    cy.get('[data-testid="password"]').type(pass)
    cy.get('[data-testid="submit"]').click()
  }

  static assertLogged() {
    cy.url().should('not.include', '/login')
  }
}
